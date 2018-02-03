module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['Gruntfile.js', 'protractor.conf.js']
    },
    protractor: {
      options: {
        keepAlive: true, // If false, the grunt process stops when the test fails.
        configFile: "protractor.conf.js"
      },
      singlerun: {},  // If true, will run just once and stop the task.
      auto: {
        keepAlive: true, // If false, stop testing when meets the first failed test.
        options: {
          args: {
            seleniumPort: 4444
          }
        }
      }
    },
    shell: {
        options: {
            stdout: true
        },
		allure_open: {
            command: 'node ./node_modules/allure-commandline/bin/allure serve ./allure-results/'
        }
    }
      
  });


  grunt.loadNpmTasks('grunt-protractor-runner');
  
  grunt.loadNpmTasks('jasmine');

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.loadNpmTasks('grunt-shell-spawn');
  
  grunt.registerTask('default', ['jshint', 'protractor:singlerun', 'shell:allure_open']);

};