var path = require('path');

var plotlyCredentials = require('./plotly_credentials');


module.exports = function(config) {
    config.set({
        basePath: '.',

        frameworks: ['benchmark', 'browserify'],

        files: [
            // plotly.js
            'https://cdn.plot.ly/plotly-latest.min.js',

            // highcharts
            'http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js',
            'https://code.highcharts.com/highcharts.js',
            'https://code.highcharts.com/modules/boost.js',
            'https://code.highcharts.com/modules/exporting.js',

            'suites/*.js'
        ],

        preprocessors: {
            'suites/*.js': ['browserify']
        },

        reporters: ['plotly'],
        plotlyReporter: {
            pathToJson: path.join(__dirname, 'results', 'benchmarks.json'),
            formatJson: function(results) {
                results.meta.date = (new Date()).toTimeString();
                results.meta.version = 'v1.5.1';
                return results;
            },
            username: plotlyCredentials.username,
            apiKey: plotlyCredentials.apiKey,
            filename: 'benchmarks',
            fileopt: 'overwrite'
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
//         browsers: ['Chrome'],
        browsers: ['Firefox'],
//         browsers: ['Chrome', 'Firefox'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // to avoid DISCONNECTED messages
        captureTimeout: 100000, // default 60000
        browserDisconnectTimeout: 500000, // default 2000
        browserDisconnectTolerance: 0, // default 0
        browserNoActivityTimeout: 500000, //default 10000
    });
};
