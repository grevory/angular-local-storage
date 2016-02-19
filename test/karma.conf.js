// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  'use strict';

  var bower = 'test/lib/bower_components/';

  config.set({

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // list of files / patterns to load in the browser
    files: [
      bower + 'angular/angular.js',
      bower + 'angular-mocks/angular-mocks.js',
      'dist/angular-local-storage.js',
      'test/mock/*.js',
      'test/spec/**/*.js'
    ],

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-coverage'
    ],

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // web server port
    port: 8999,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,

    reporters: ['progress', 'coverage'],

    // preprocessors
    preprocessors: {
      'src/*.js': ['coverage']
    },

    // configure the reporter
    coverageReporter: {
      type : 'lcov',
      dir : 'coverage/'
    }
  });
};
