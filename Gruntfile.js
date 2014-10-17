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
          '(function ( window, angular, undefined ) {' + '\n',
        footer: '})( window, window.angular );'
      },
      dist: {
        src: ['src/common.js', 'src/angular-local-storage.js'],
        dest: '<%= dirs.dest %>/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
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
