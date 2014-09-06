module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    typescript: {
      base: {
        src: ['src/**/*.ts'],
        dest: 'build/',
        options: {
          module: 'commonjs', //or commonjs
          target: 'es5', //or es3
          basePath: 'src/',
          sourceMap: false,
          declaration: false
        }
      }
    },
    watch: {
      scripts: {
        files: ['src/**/*.ts'],
        tasks: ['typescript'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['typescript']);

};