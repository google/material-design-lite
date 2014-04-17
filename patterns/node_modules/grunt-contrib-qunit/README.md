# grunt-contrib-qunit v0.4.0 [![Build Status](https://travis-ci.org/gruntjs/grunt-contrib-qunit.png?branch=master)](https://travis-ci.org/gruntjs/grunt-contrib-qunit)

> Run QUnit unit tests in a headless PhantomJS instance.



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-contrib-qunit --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-contrib-qunit');
```




## Qunit task
_Run this task with the `grunt qunit` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

When installed by npm, this plugin will automatically download and install [PhantomJS][] locally via the [grunt-lib-phantomjs][] library.

[PhantomJS]: http://www.phantomjs.org/
[grunt-lib-phantomjs]: https://github.com/gruntjs/grunt-lib-phantomjs

Also note that running grunt with the `--debug` flag will output a lot of PhantomJS-specific debugging information. This can be very helpful in seeing what actual URIs are being requested and received by PhantomJS.

#### OS Dependencies
This plugin uses PhantomJS to run tests. PhantomJS requires these dependencies

**On Ubuntu/Debian**

`apt-get install libfontconfig1 fontconfig libfontconfig1-dev libfreetype6-dev`

**On CentOS**

`yum install fontconfig freetype`

### Options

#### timeout
Type: `Number`  
Default: `5000`

The amount of time (in milliseconds) that grunt will wait for a QUnit `start()` call before failing the task with an error.

#### inject
Type: `String`  
Default: (built-in)

Path to an alternate QUnit-PhantomJS bridge file to be injected. See [the built-in bridge](https://github.com/gruntjs/grunt-contrib-qunit/blob/master/phantomjs/bridge.js) for more information.

#### urls
Type: `Array`  
Default: `[]`

Absolute `http://` or `https://` urls to be passed to PhantomJS. Specified URLs will be merged with any specified `src` files first. Note that urls must be served by a web server, and since this task doesn't contain a web server, one will need to be configured separately. The [grunt-contrib-connect plugin](https://github.com/gruntjs/grunt-contrib-connect) provides a basic web server.

#### force
Type: `boolean`  
Default: `false`

When true, the whole task will not fail when there are individual test failures, or when no assertions for a test have run. This can be set to true when you always want other tasks in the queue to be executed.

#### (-- PhantomJS arguments)
Type: `String`  
Default: (none)

Additional `--` style arguments that need to be passed in to PhantomJS may be specified as options, like `{'--option': 'value'}`. This may be useful for specifying a cookies file, local storage file, or a proxy. See the [PhantomJS API Reference][] for a list of `--` options that PhantomJS supports.

### Usage examples

#### Wildcards
In this example, `grunt qunit:all` will test all `.html` files in the test directory _and all subdirectories_. First, the wildcard is expanded to match each individual file. Then, each matched filename is passed to [PhantomJS][] (one at a time).

```js
// Project configuration.
grunt.initConfig({
  qunit: {
    all: ['test/**/*.html']
  }
});
```

#### Testing via http:// or https://
In circumstances where running unit tests from local files is inadequate, you can specify `http://` or `https://` URLs via the `urls` option. Each URL is passed to [PhantomJS][] (one at a time).

In this example, `grunt qunit` will test two files, served from the server running at `localhost:8000`.

```js
// Project configuration.
grunt.initConfig({
  qunit: {
    all: {
      options: {
        urls: [
          'http://localhost:8000/test/foo.html',
          'http://localhost:8000/test/bar.html'
        ]
      }
    }
  }
});
```

Wildcards and URLs may be combined by specifying both.

#### Using the grunt-contrib-connect plugin
It's important to note that grunt does not automatically start a `localhost` web server. That being said, the [grunt-contrib-connect plugin][] `connect` task can be run before the `qunit` task to serve files via a simple [connect][] web server.

[grunt-contrib-connect plugin]: https://github.com/gruntjs/grunt-contrib-connect
[connect]: http://www.senchalabs.org/connect/

In the following example, if a web server isn't running at `localhost:8000`, running `grunt qunit` with the following configuration will fail because the `qunit` task won't be able to load the specified URLs. However, running `grunt connect qunit` will first start a static [connect][] web server at `localhost:8000` with its base path set to the Gruntfile's directory. Then, the `qunit` task will be run, requesting the specified URLs.

```js
// Project configuration.
grunt.initConfig({
  qunit: {
    all: {
      options: {
        urls: [
          'http://localhost:8000/test/foo.html',
          'http://localhost:8000/test/bar.html',
        ]
      }
    }
  },
  connect: {
    server: {
      options: {
        port: 8000,
        base: '.'
      }
    }
  }
});

// This plugin provides the "connect" task.
grunt.loadNpmTasks('grunt-contrib-connect');

// A convenient task alias.
grunt.registerTask('test', ['connect', 'qunit']);
```

#### Custom timeouts and PhantomJS options
In the following example, the default timeout value of `5000` is overridden with the value `10000` (timeout values are in milliseconds). Additionally, PhantomJS will read stored cookies from the specified file. See the [PhantomJS API Reference][] for a list of `--` options that PhantomJS supports.

[PhantomJS API Reference]: https://github.com/ariya/phantomjs/wiki/API-Reference

```js
// Project configuration.
grunt.initConfig({
  qunit: {
    options: {
      timeout: 10000,
      '--cookies-file': 'misc/cookies.txt'
    },
    all: ['test/**/*.html']
  }
});
```

#### Events and reporting
[QUnit callback](http://api.qunitjs.com/category/callbacks/) methods and arguments are also emitted through grunt's event system so that you may build custom reporting tools. Please refer to to the QUnit documentation for more information.

The events, with arguments, are as follows:

* `qunit.begin`
* `qunit.moduleStart` `(name)`
* `qunit.testStart` `(name)`
* `qunit.log` `(result, actual, expected, message, source)`
* `qunit.testDone` `(name, failed, passed, total)`
* `qunit.moduleDone` `(name, failed, passed, total)`
* `qunit.done` `(failed, passed, total, runtime)`

In addition to QUnit callback-named events, the following events are emitted by Grunt:

* `qunit.spawn` `(url)`: when [PhantomJS][] is spawned for a test
* `qunit.fail.load` `(url)`: when [PhantomJS][] could not open the given url
* `qunit.fail.timeout`: when a QUnit test times out, usually due to a missing `QUnit.start()` call
* `qunit.error.onError` `(message, stackTrace)`

You may listen for these events like so:

```js
grunt.event.on('qunit.spawn', function (url) {
  grunt.log.ok("Running test: " + url);
});
```


## Release History

 * 2013-09-29   v0.3.0   Update grunt-lib-phantomjs to v0.4.0. Add qunit.fail.load and qunit.fail.timeout events. Update QUnit to v1.12.0. Add force option. Propagate onError events from phantomjs through the qunit.error.onError event. Remove confusing error message.
 * 2013-06-06   v0.2.2   Warn if no assertions ran in a single test. Spaces instead of newlines for clickable urls. Wrap bridge.js in a IIFE.
 * 2013-04-05   v0.2.1   Update to use PhantomJS 1.9.0. Fixes PhantomJS not found errors.
 * 2013-02-28   v0.2.0   Update to use PhantomJS 1.8.1.
 * 2013-02-15   v0.1.1   First official release for Grunt 0.4.0.
 * 2013-01-18   v0.1.1rc6   Updating grunt/gruntplugin dependencies to rc6. Changing in-development grunt/gruntplugin dependency versions from tilde version ranges to specific versions.
 * 2013-01-09   v0.1.1rc5   Updating to work with grunt v0.4.0rc5. Switching to this.filesSrc api. Adding "urls" option for specifying absolute test URLs.
 * 2012-10-05   v0.1.0   Work in progress, not yet officially released.

---

Task submitted by ["Cowboy" Ben Alman](http://benalman.com/)

*This file was generated on Fri Jan 17 2014 11:25:56.*
