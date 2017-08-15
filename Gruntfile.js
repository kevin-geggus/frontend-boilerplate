var extend = require('extend');

module.exports = function (grunt) {
    var webpackConfig = require('./webpack.config.js');
    var webpackWatchConfig = extend({}, webpackConfig, {
        watch: true,
        keepalive: true,
        progress: true,
        failOnError: false
    });

    grunt.initConfig({
        webpack: {
            build: webpackConfig,
            watch: webpackWatchConfig
        },
        clean: {
            webpack: ['web/assets/scripts/**/*']
        },
        imagemin: {
            assets: {
                expand: true,
                src: [
                    'web/assets/img/**/*.{jpg,jpeg,png,gif,svg}',
                    'web/favicon.ico'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('watch', ['clean:webpack', 'webpack:watch']);
    grunt.registerTask('build', ['clean:webpack', 'webpack:build']);
    grunt.registerTask('default', ['build']);
};
