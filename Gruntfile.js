module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {

        }
    });

    grunt.loadNpmTasks('grunt-browserify');
};