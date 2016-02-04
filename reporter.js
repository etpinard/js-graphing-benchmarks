var fs = require('fs');
var path  = require('path');

// var plotly = require('plotly');

var pendingRequest = 0;
var requestFinished = function () {};


var reporter = function(baseReporterDecorator, config) {
  baseReporterDecorator(this);

  var pathToOut = path.join(__dirname, 'results', config.suiteName + '.json');

  var meta = {};
  var opts = {};
  var results = [];

  this.specSuccess = function(browser, result) {
    meta = result.meta;
    opts = result.opts;

    result.benchmark.browser = browser.name;
    results.push(result.benchmark);
  };

  this.onRunComplete = function(browser, info) {

    fs.writeFileSync(pathToOut, formatResults(results, meta, opts, config));

  };

};

function formatResults(results, meta, opts, config) {
  results = results.sort(function(a, b) {
    return a.mean - b.mean;
  });

  meta.suite = config.suiteName;
  meta.date = (new Date()).toString();

  return JSON.stringify({
    meta: meta,
    opts: opts,
    results: results
  }, null, 2);
}

reporter.$inject = ['baseReporterDecorator', 'config'];

module.exports = {
  'reporter:custom': ['type', reporter]
};
