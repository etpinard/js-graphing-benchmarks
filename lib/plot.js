var fs = require('fs');
var path = require('path');
var glob = require('glob');

var creds = require('../plotly_credentials.json');
var plotly = require('plotly')(creds.username, creds.apiKey);

var pathToResults = path.join(__dirname, '..', 'results');

/**
 * Plot the results of one benchmark suite (or all of them)
 *
 * Example 1:
 *
 *  npm run plot -- scatter-markers-1e5
 *
 * plots the results of "scatter-markers-1e5" The complete list of benchmarks
 * suite is in the suites/ directory.
 *
 * Example 2:
 *
 *  npm run plot
 *
 * plots the results of benchmarks in results/
 *
 */
var suiteName = process.argv[2];

if(suiteName) {
  var pathToResult = path.join(pathToResults, suiteName + '.json');
  plotOne(pathToResult);
}
else {
  glob(pathToResults + '/*.json', function(err, files) {
    files.forEach(plotOne);
  });
}

function plotOne(file) {
  fs.readFile(file, 'utf-8', function(err, raw) {
    var mark = JSON.parse(raw);
    var suite = mark.meta.suite;
    var figure = makeFigure(mark);

    plotly.plot(figure.data, figure.graphOptions, function(err, msg) {
      console.log([
        '> See results suite',
        '"' + suite + '"',
        'at:',
        msg.url
      ].join(' '));
    });

    // TODO download image with toImage ?

  });
}

function makeFigure(mark) {
  var suite = mark.meta.suite;

  var trace = {
    type: 'bar',
    orientation: 'h',
    y: [],
    x: [],
    error_x: { array: [] }
  };

  var longestLabel = 0;

  mark.results.forEach(function(r) {
    trace.y.push(r.name);
    trace.x.push(r.mean);
    trace.error_x.array.push(r.std);

    longestLabel = Math.max(longestLabel, r.name);
  });

  // TODO add some meta in annotation(s)

  return {
    data: [trace],
    graphOptions: {
      filename: 'benchmark-' + suite,
      fileopt: 'overwrite',
      layout: {
        title: formatTitle(suite),
        margin: {l: 80 + 4*longestLabel},
        yaxis: { autorange: 'reversed' },
        xaxis: { title: 'time [sec]' }
      }
    }


  };
}

function formatTitle(suite) {
  var s = suite.replace(/-/g, ' ');
  return s[0].toUpperCase() + s.slice(1, s.length);
}
