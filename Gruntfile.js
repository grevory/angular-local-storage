module.exports = function(grunt) {
  'use strict';

  // Load the grunt tasks
  require('load-grunt-tasks')(grunt);

  // Time the grunt tasks
  require('time-grunt')(grunt);

  grunt.initConfig({
    karma: {
      options: {
        autowatch: false,
        browsers: [
          'PhantomJS'
        ],
        configFile: 'test/karma.conf.js',
        reporters: [ 'dots' ],
        singleRun: true
      },
      unit: {}
    },
    jshint: {
      grunt: {
        src: [ 'Gruntfile.js' ],
        options: {
          node: true
        }
      },
      dev: {
        src: [ 'angular-local-storage.js' ],
        options: {
          jshintrc: '.jshintrc',
        }
      },
      test: {
        src: [ 'test/spec/**/*.js' ],
        options: {
          jshintrc: 'test/.jshintrc',
        }
      }
    }
  });

  grunt.registerTask('test', [
    'karma'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test'
  ]);
};
