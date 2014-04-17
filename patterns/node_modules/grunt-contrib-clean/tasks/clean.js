/*
 * grunt-contrib-clean
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Tim Branyen, contributors
 * Licensed under the MIT license.
 */

'use strict';

var rimraf = require('rimraf');

module.exports = function(grunt) {

  function clean(filepath, options) {
    if (!grunt.file.exists(filepath)) {
      return false;
    }

    grunt.log.write((options['no-write'] ? 'Not actually cleaning ' : 'Cleaning ') + filepath + '...');

    // Only delete cwd or outside cwd if --force enabled. Be careful, people!
    if (!options.force) {
      if (grunt.file.isPathCwd(filepath)) {
        grunt.verbose.error();
        grunt.fail.warn('Cannot delete the current working directory.');
        return false;
      } else if (!grunt.file.isPathInCwd(filepath)) {
        grunt.verbose.error();
        grunt.fail.warn('Cannot delete files outside the current working directory.');
        return false;
      }
    }

    try {
      // Actually delete. Or not.
      if (!options['no-write']) {
        rimraf.sync(filepath);
      }
      grunt.log.ok();
    } catch (e) {
      grunt.log.error();
      grunt.fail.warn('Unable to delete "' + filepath + '" file (' + e.message + ').', e);
    }
  }

  grunt.registerMultiTask('clean', 'Clean files and folders.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      force: grunt.option('force') === true,
      'no-write': grunt.option('no-write') === true,
    });

    grunt.verbose.writeflags(options, 'Options');

    // Clean specified files / dirs.
    this.filesSrc.forEach(function(filepath) {
      clean(filepath, options);
    });
  });

};
