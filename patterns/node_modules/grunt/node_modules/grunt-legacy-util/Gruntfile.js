'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    nodeunit: {
      util: ['test/index.js']
    },

  });

  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('default', ['nodeunit']);

};
