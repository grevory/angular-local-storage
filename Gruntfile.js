module.exports = function(grunt) {
  'use strict';

  // Load the grunt tasks
  require('load-grunt-tasks')(grunt);

  // Time the grunt tasks
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: [
        '/**',
        ' * <%= pkg.description %>',
        ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>',
        ' * @link <%= pkg.homepage %>',
        ' * @author <%= pkg.author %>',
        ' * @license MIT License, http://www.opensource.org/licenses/MIT',
        ' */'
      ].join('\n')
    },
    dirs: {
      dest: 'dist'
    },
    concat: {
      options: {
        banner: '<%= meta.banner %>' + '\n' +
        "(function (factory) {\n" +
        "  if (typeof define === 'function' && define.amd) {\n" +
        "    define(['exports', 'angular'], factory);\n" +
        "  } else if (typeof module === 'object' && typeof module.exports === 'object') {\n" +
        "    factory(module.exports, require('angular'));\n" +
        "  } else if (typeof angular !== 'undefined') {\n" +
        "    root = (typeof root !== 'undefined') ? root : {};\n" +
        "    factory((root.exports || (root.exports = {})), angular);\n" +
        "  } else {\n" +
        "    throw new Error('Unable to initialize angular-local-storage');\n" +
        "  }\n" +
        "})(function(exports, angular) {\n" +
        "exports = 'LocalStorageModule';\n",
        footer: '});'
      },
      dist: {
        src: ['src/common.js', 'src/angular-local-storage.js'],
        dest: '<%= dirs.dest %>/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>',
        sourceMap: true
      },
      dist: {
        src: ['<%= concat.dist.dest %>'],
        dest: '<%= dirs.dest %>/<%= pkg.name %>.min.js'
      }
    },
    karma: {
      options: {
        autowatch: true,
        configFile: 'test/karma.conf.js'
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
    }
  });

  grunt.registerTask('test', [
    'concat',
    'karma'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test'
  ]);

  grunt.registerTask('dist', [
    'concat',
    'uglify'
  ]);
};
