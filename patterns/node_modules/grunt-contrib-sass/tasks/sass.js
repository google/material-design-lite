/*
 * grunt-contrib-sass
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Sindre Sorhus, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var path = require('path');

  grunt.registerMultiTask('sass', 'Compile Sass to CSS', function() {
    var helpers = require('grunt-lib-contrib').init(grunt);
    var options = this.options();
    var cb = this.async();

    grunt.verbose.writeflags(options, 'Options');

    grunt.util.async.forEachSeries(this.files, function(f, next) {
      var args = [f.dest, '--stdin'].concat(helpers.optsToArgs(options));

      // If were compiling scss files
      if (path.extname(f.src[0]) === '.scss') {
        args.push('--scss');
      }

      var max = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Add dirs of specified files to the sass path
        args.push('--load-path', path.dirname(filepath));

        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(grunt.util.linefeed));

      // Make sure grunt creates the destination folders
      grunt.file.write(f.dest, '');

      var sass = grunt.util.spawn({
        cmd: process.platform === 'win32' ? 'sass.bat' : 'sass',
        args: args
      }, function(error, result, code) {
        if (code === 127) {
          return grunt.warn(
            'You need to have Ruby and Sass installed and in your PATH for\n' +
            'this task to work. More info:\n' +
            'https://github.com/gruntjs/grunt-contrib-sass'
          );
        }
        next(error);
      });

      sass.stdin.write(new Buffer(max));
      sass.stdin.end();
      sass.stdout.pipe(process.stdout);
      sass.stderr.pipe(process.stderr);
    }, cb);
  });
};
