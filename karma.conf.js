/**
 * This karma configuration file takes one argument,
 * specifying which benchmark suite to run.
 *
 * Example:
 *
 *  npm run bench -- scatter-markers-1e5
 *
 * The complete list of benchmarks suite is in the
 * suites/ directory.
 *
 */
var suiteName = process.argv[4];

if(!suiteName) {
  throw new Error('Must provide a valid suite name');
}

var suitePath = 'suites/' + suiteName + '.js';


function func(config) {
  config.set(func.defaultConfig);
}

func.defaultConfig = {

  // start these browsers
  // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
  browsers: ['Chrome'],
//   browsers: ['Chrome', 'Firefox'],

  basePath: '.',

  files: [
    // plotly.js
    'https://cdn.plot.ly/plotly-latest.min.js',

    // highcharts
    'http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js',
    'https://code.highcharts.com/highcharts.js',
    'https://code.highcharts.com/modules/boost.js',
    'https://code.highcharts.com/modules/exporting.js',

    suitePath
  ],

  frameworks: ['browserify', 'custom'],
  reporters: ['custom'],

  // pass suite name onto reporter
  suiteName: suiteName,

  // N.B. set below
  preprocessors: {},

  // web server port
  port: 9876,

  // enable / disable colors in the output (reporters and logs)
  colors: true,

  // enable / disable watching file and executing tests whenever any file changes
  autoWatch: false,

  // Continuous Integration mode
  // if true, Karma captures browsers, runs the tests and exits
  singleRun: true,

  // to avoid DISCONNECTED messages
  captureTimeout: 100000, // default 60000
  browserDisconnectTimeout: 500000, // default 2000
  browserDisconnectTolerance: 0, // default 0
  browserNoActivityTimeout: 500000, //default 10000
};

// browserify the benchmark suite file
func.defaultConfig.preprocessors[suitePath] = ['browserify'];

module.exports = func;
