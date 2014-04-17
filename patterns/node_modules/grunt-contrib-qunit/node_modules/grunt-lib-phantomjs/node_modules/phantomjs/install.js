// Copyright 2012 The Obvious Corporation.

/*
 * This simply fetches the right version of phantom for the current platform.
 */

'use strict'

var AdmZip = require('adm-zip')
var cp = require('child_process')
var fs = require('fs')
var helper = require('./lib/phantomjs')
var http = require('http')
var kew = require('kew')
var ncp = require('ncp')
var npmconf = require('npmconf')
var mkdirp = require('mkdirp')
var path = require('path')
var rimraf = require('rimraf').sync
var url = require('url')
var util = require('util')
var which = require('which')

var downloadUrl = 'http://cdn.bitbucket.org/ariya/phantomjs/downloads/phantomjs-' + helper.version + '-'

var originalPath = process.env.PATH

// NPM adds bin directories to the path, which will cause `which` to find the
// bin for this package not the actual phantomjs bin.  Also help out people who
// put ./bin on their path
process.env.PATH = helper.cleanPath(originalPath)

var libPath = path.join(__dirname, 'lib')
var pkgPath = path.join(libPath, 'phantom')
var phantomPath = null
var tmpPath = null

var whichDeferred = kew.defer()
which('phantomjs', whichDeferred.makeNodeResolver())
whichDeferred.promise
  .then(function (path) {
    phantomPath = path

    // Horrible hack to avoid problems during global install. We check to see if
    // the file `which` found is our own bin script.
    // See: https://github.com/Obvious/phantomjs/issues/85
    if (/NPM_INSTALL_MARKER/.test(fs.readFileSync(phantomPath, 'utf8'))) {
      console.log('Looks like an `npm install -g`; unable to check for already installed version.')
      throw new Error('Global install')

    } else {
      var checkVersionDeferred = kew.defer()
      cp.execFile(phantomPath, ['--version'], checkVersionDeferred.makeNodeResolver())
      return checkVersionDeferred.promise
    }
  })
  .then(function (stdout) {
    var version = stdout.trim()
    if (helper.version == version) {
      writeLocationFile(phantomPath)
      console.log('PhantomJS is already installed at', phantomPath + '.')
      exit(0)

    } else {
      console.log('PhantomJS detected, but wrong version', stdout.trim(), '@', phantomPath + '.')
      throw new Error('Wrong version')
    }
  })
  .fail(function (err) {
    // Trying to use a local file failed, so initiate download and install
    // steps instead.
    var npmconfDeferred = kew.defer()
    npmconf.load(npmconfDeferred.makeNodeResolver())
    return npmconfDeferred.promise
  })
  .then(function (conf) {
    tmpPath = findSuitableTempDirectory(conf)

    // Can't use a global version so start a download.
    if (process.platform === 'linux' && process.arch === 'x64') {
      downloadUrl += 'linux-x86_64.tar.bz2'
    } else if (process.platform === 'linux') {
      downloadUrl += 'linux-i686.tar.bz2'
    } else if (process.platform === 'darwin' || process.platform === 'openbsd' || process.platform === 'freebsd') {
      downloadUrl += 'macosx.zip'
    } else if (process.platform === 'win32') {
      downloadUrl += 'windows.zip'
    } else {
      console.log('Unexpected platform or architecture:', process.platform, process.arch)
      exit(1)
    }

    var fileName = downloadUrl.split('/').pop()
    var downloadedFile = path.join(tmpPath, fileName)

    // Start the install.
    if (!fs.existsSync(downloadedFile)) {
      console.log('Downloading', downloadUrl)
      console.log('Saving to', downloadedFile)
      return requestBinary(getRequestOptions(conf), downloadedFile)
    } else {
      console.log('Download already available at', downloadedFile)
      return downloadedFile
    }
  })
  .then(function (downloadedFile) {
    return extractDownload(downloadedFile)
  })
  .then(function (extractedPath) {
    return copyIntoPlace(extractedPath, pkgPath)
  })
  .then(function () {
    var location = process.platform === 'win32' ?
        path.join(pkgPath, 'phantomjs.exe') :
        path.join(pkgPath, 'bin' ,'phantomjs')
    var relativeLocation = path.relative(libPath, location)
    writeLocationFile(relativeLocation)
    console.log('Done. Phantomjs binary available at', location)
    exit(0)
  })
  .fail(function (err) {
    console.error('Phantom installation failed', err, err.stack)
    exit(1)
  })


function writeLocationFile(location) {
  console.log('Writing location.js file')
  if (process.platform === 'win32') {
    location = location.replace(/\\/g, '\\\\')
  }
  fs.writeFileSync(path.join(libPath, 'location.js'),
      'module.exports.location = "' + location + '"')
}


function exit(code) {
  process.env.PATH = originalPath
  process.exit(code || 0)
}


function findSuitableTempDirectory(npmConf) {
  var now = Date.now()
  var candidateTmpDirs = [
    process.env.TMPDIR || process.env.TEMP || '/tmp',
    npmConf.get('tmp'),
    path.join(process.cwd(), 'tmp')
  ]

  for (var i = 0; i < candidateTmpDirs.length; i++) {
    var candidatePath = path.join(candidateTmpDirs[i], 'phantomjs')

    try {
      mkdirp.sync(candidatePath, '0777')
      // Make double sure we have 0777 permissions; some operating systems
      // default umask does not allow write by default.
      fs.chmodSync(candidatePath, '0777')
      var testFile = path.join(candidatePath, now + '.tmp')
      fs.writeFileSync(testFile, 'test')
      fs.unlinkSync(testFile)
      return candidatePath
    } catch (e) {
      console.log(candidatePath, 'is not writable:', e.message)
    }
  }

  console.error('Can not find a writable tmp directory, please report issue ' +
      'on https://github.com/Obvious/phantomjs/issues/59 with as much ' +
      'information as possible.')
  exit(1)
}


function getRequestOptions(conf) {
  var proxyUrl = conf.get('http-proxy') || conf.get('proxy')

  if (proxyUrl) {
    console.log('Using proxy ' + proxyUrl)
    var options = url.parse(proxyUrl)
    options.path = downloadUrl
    options.headers = { Host: url.parse(downloadUrl).host }
    // If going through proxy, spoof the User-Agent, since may commerical proxies block blank or unknown agents in headers
    options.headers['User-Agent'] = 'curl/7.21.4 (universal-apple-darwin11.0) libcurl/7.21.4 OpenSSL/0.9.8r zlib/1.2.5'
    // Turn basic authorization into proxy-authorization.
    if (options.auth) {
      options.headers['Proxy-Authorization'] = 'Basic ' + new Buffer(options.auth).toString('base64')
      delete options.auth
    }

    return options
  } else {
    return url.parse(downloadUrl)
  }
}


function requestBinary(requestOptions, filePath) {
  var deferred = kew.defer()

  var count = 0
  var notifiedCount = 0
  var writePath = filePath + '-download-' + Date.now()
  var outFile = fs.openSync(writePath, 'w')

  var client = http.get(requestOptions, function (response) {
    var status = response.statusCode
    console.log('Receiving...')

    if (status === 200) {
      response.addListener('data',   function (data) {
        fs.writeSync(outFile, data, 0, data.length, null)
        count += data.length
        if ((count - notifiedCount) > 800000) {
          console.log('Received ' + Math.floor(count / 1024) + 'K...')
          notifiedCount = count
        }
      })

      response.addListener('end',   function () {
        console.log('Received ' + Math.floor(count / 1024) + 'K total.')
        fs.closeSync(outFile)
        fs.renameSync(writePath, filePath)
        deferred.resolve(filePath)
      })

    } else {
      client.abort()
      console.error('Error requesting archive')
      deferred.reject(new Error('Error with http request: ' + util.inspect(response.headers)))
    }
  })

  return deferred.promise
}


function extractDownload(filePath) {
  var deferred = kew.defer()
  // extract to a unique directory in case multiple processes are
  // installing and extracting at once
  var extractedPath = filePath + '-extract-' + Date.now()
  var options = {cwd: extractedPath}

  mkdirp.sync(extractedPath, '0777')
  // Make double sure we have 0777 permissions; some operating systems
  // default umask does not allow write by default.
  fs.chmodSync(extractedPath, '0777')

  if (filePath.substr(-4) === '.zip') {
    console.log('Extracting zip contents')

    try {
      var zip = new AdmZip(filePath)
      zip.extractAllTo(extractedPath, true)
      deferred.resolve(extractedPath)
    } catch (err) {
      console.error('Error extracting archive')
      deferred.reject(err)
    }

  } else {
    console.log('Extracting tar contents (via spawned process)')
    cp.execFile('tar', ['jxf', filePath], options, function (err, stdout, stderr) {
      if (err) {
        console.error('Error extracting archive')
        deferred.reject(err)
      } else {
        deferred.resolve(extractedPath)
      }
    })
  }
  return deferred.promise
}


function copyIntoPlace(extractedPath, targetPath) {
  rimraf(targetPath)

  var deferred = kew.defer()
  // Look for the extracted directory, so we can rename it.
  var files = fs.readdirSync(extractedPath)
  for (var i = 0; i < files.length; i++) {
    var file = path.join(extractedPath, files[i])
    if (fs.statSync(file).isDirectory() && file.indexOf(helper.version) != -1) {
      console.log('Copying extracted folder', file, '->', targetPath)
      ncp(file, targetPath, deferred.makeNodeResolver())
      break
    }
  }

  // Cleanup extracted directory after it's been copied
  return deferred.promise.then(function() {
    try {
      return rimraf(extractedPath)
    } catch (e) {
      console.warn('Unable to remove temporary files at "' + extractedPath +
          '", see https://github.com/Obvious/phantomjs/issues/108 for details.')
    }
  });
}
