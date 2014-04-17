/*
 * grunt-contrib-watch
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  var path = require('path');
  var fs = require('fs');
  var Gaze = require('gaze').Gaze;

  // Default options for the watch task
  var defaults = {
    interrupt: false
  };

  grunt.registerTask('watch', 'Run predefined tasks whenever watched files change.', function(target) {
    var name = this.name || 'watch';
    this.requiresConfig(name);

    // Build an array of files/tasks objects
    var watch = grunt.config(name);
    var targets = target ? [target] : Object.keys(watch).filter(function(key) {
      return typeof watch[key] !== 'string' && !Array.isArray(watch[key]);
    });

    targets = targets.map(function(target) {
      // Fail if any required config properties have been omitted
      target = [name, target];
      this.requiresConfig(target.concat('files'), target.concat('tasks'));
      return grunt.config(target);
    }, this);

    // Allow "basic" non-target format
    if (typeof watch.files === 'string' || Array.isArray(watch.files)) {
      targets.push({files: watch.files, tasks: watch.tasks});
    }

    // Message to display when waiting for changes
    var waiting = 'Waiting...';

    // File changes to be logged.
    var changedFiles = Object.create(null);

    // Keep track of spawns per tasks
    var spawned = Object.create(null);

    // List of changed / deleted file paths.
    grunt.file.watchFiles = {changed: [], deleted: [], added: []};

    // Get process.argv options without grunt.cli.tasks to pass to child processes
    var cliArgs = grunt.util._.without.apply(null, [[].slice.call(process.argv, 2)].concat(grunt.cli.tasks));

    // Call to close this task
    var done = this.async();
    grunt.log.write(waiting);

    // Run the tasks for the changed files
    var runTasks = grunt.util._.debounce(function runTasks(i, tasks, options) {
      // If interrupted, reset the spawned for a target
      if (options.interrupt && typeof spawned[i] === 'object') {
        grunt.log.writeln('').write('Previously spawned task has been interrupted...'.yellow);
        spawned[i].kill('SIGINT');
        delete spawned[i];
      }

      // Only spawn one at a time unless interrupt is specified
      if (!spawned[i]) {
        grunt.log.ok();

        var fileArray = Object.keys(changedFiles);
        fileArray.forEach(function(filepath) {
          // Log which file has changed, and how.
          grunt.log.ok('File "' + filepath + '" ' + changedFiles[filepath] + '.');
        });

        // Reset changedFiles
        changedFiles = Object.create(null);

        // Spawn the tasks as a child process
        var start = Date.now();
        spawned[i] = grunt.util.spawn({
          // Spawn with the grunt bin
          grunt: true,
          // Run from current working dir and inherit stdio from process
          opts: {cwd: process.cwd(), stdio: 'inherit'},
          // Run grunt this process uses, append the task to be run and any cli options
          args: grunt.util._.union(tasks, cliArgs)
        }, function(err, res, code) {
          // Spawn is done
          delete spawned[i];
          var msg = String(
            'Completed in ' +
            Number((Date.now() - start) / 1000).toFixed(2) +
            's at ' +
            (new Date()).toString()
          ).cyan;
          grunt.log.writeln('').write(msg + ' - ' + waiting);
        });
      }
    }, 250);

    targets.forEach(function(target, i) {
      if (typeof target.files === 'string') {
        target.files = [target.files];
      }

      // Process into raw patterns
      var patterns = grunt.util._.chain(target.files).flatten().map(function(pattern) {
        return grunt.config.process(pattern);
      }).value();

      // Default options per target
      var options = grunt.util._.defaults(target.options || {}, defaults);

      // Create watcher per target
      var gaze = new Gaze(patterns, options, function(err) {
        if (err) {
          grunt.log.error(err.message);
          return done();
        }

        // On changed/added/deleted
        this.on('all', function(status, filepath) {
          filepath = path.relative(process.cwd(), filepath);
          changedFiles[filepath] = status;
          runTasks(i, target.tasks, options);
        });

        // On watcher error
        this.on('error', function(err) { grunt.log.error(err); });
      });
    });

    // Keep the process alive
    setInterval(function() {}, 250);
  });
};
