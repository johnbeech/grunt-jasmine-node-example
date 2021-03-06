/*global module:false*/
module.exports = function(grunt) {


  // npm install jasmine-json-test-reporter@1.0.0-beta --save-dev
  var JasmineJsonTestReporter = require('jasmine-json-test-reporter');
  var customJasmineReporter = new JasmineJsonTestReporter({
    file: 'jasmine-test-results.json',
    beautify: true,
    indentationLevel: 2
  });

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        node: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    jasmine_nodejs: {
      // task specific (default) options
      options: {
        specNameSuffix: "Spec.js", // also accepts an array
        helperNameSuffix: "helper.js",
        useHelpers: false,
        stopOnFailure: false,
        // configure one or more built-in reporters
        reporters: {
          console: {
            colors: true,
            cleanStack: 1, // (0|false)|(1|true)|2|3
            verbosity: 3, // (0|false)|1|2|(3|true)
            listStyle: "indent", // "flat"|"indent"
            activity: false
          }
        },
        // add custom Jasmine reporter(s)
        customReporters: [customJasmineReporter]
      },
      project: {
        // target specific options
        options: {
          useHelpers: true
        },
        // spec files
        specs: [
          "spec/**",
          "test/core/**"
        ],
        helpers: [
          "test/helpers/**"
        ]
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'nodeunit']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-jasmine-nodejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jasmine_nodejs:project', 'jshint']);

};
