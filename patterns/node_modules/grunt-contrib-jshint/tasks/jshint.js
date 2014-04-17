/*
 * grunt-contrib-jshint
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Internal lib.
  var jshint = require('./lib/jshint').init(grunt);

  grunt.registerMultiTask('jshint', 'Validate files with JSHint.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      force: false
    });

    // Report JSHint errors but dont fail the task
    var force = options.force;
    delete options.force;

    // Read JSHint options from a specified jshintrc file.
    if (options.jshintrc) {
      options = grunt.file.readJSON(options.jshintrc);
    }
    // If globals weren't specified, initialize them as an empty object.
    if (!options.globals) {
      options.globals = {};
    }
    // Convert deprecated "predef" array|object into globals.
    if (options.predef) {
      if (!Array.isArray(options.predef) && typeof options.predef === "object") {
        options.predef = Object.keys(options.predef);
      }
      options.predef.forEach(function(key) {
        options.globals[key] = true;
      });
      delete options.predef;
    }
    // Extract globals from options.
    var globals = options.globals;
    delete options.globals;

    grunt.verbose.writeflags(options, 'JSHint options');
    grunt.verbose.writeflags(globals, 'JSHint globals');

    // Lint specified files.
    var files = this.filesSrc;
    files.forEach(function(filepath) {
      jshint.lint(grunt.file.read(filepath), options, globals, filepath);
    });

    // Fail task if errors were logged except if force was set.
    if (this.errorCount) { return force; }

    // Otherwise, print a success message.
    grunt.log.ok(files.length + ' file' + (files.length === 1 ? '' : 's') + ' lint free.');
  });

};
