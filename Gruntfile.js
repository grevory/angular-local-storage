module.exports = function(grunt) {
  'use strict';

  // Load the grunt tasks
  require('load-grunt-tasks')(grunt);

  // Time the grunt tasks
  require('time-grunt')(grunt);

  grunt.initConfig({
    karma: {
      options: {
        autowatch: true,
        browsers: [
          'PhantomJS'
        ],
        configFile: 'test/karma.conf.js',
        reporters: ['dots'],
        singleRun: true
      },
      unit: {}
    },
    jshint: {
      grunt: {
        src: ['Gruntfile.js'],
        options: {
          node: true
        }
      },
      dev: {
        src: ['angular-local-storage.js'],
        options: {}
      },
      test: {
        src: ['test/spec/**/*.js'],
        options: {
          jshintrc: 'test/.jshintrc',
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'angular-local-storage.min.js': 'angular-local-storage.js'
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

  grunt.registerTask('dist', [
    'uglify'
  ]);
};
