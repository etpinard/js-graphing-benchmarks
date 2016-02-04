var fs = require('fs');
var path  = require('path');

var reporter = function(baseReporterDecorator, config) {
  baseReporterDecorator(this);

  var suite = config.suiteName;
  var pathToOut = path.join(__dirname, '..', 'results', suite + '.json');

  var meta = {};
  var opts = {};
  var results = [];

  this.specSuccess = function(browser, result) {
    // same for all specs
    meta = result.meta;  
    opts = result.opts;  

    result.benchmark.browser = browser.name;
    results.push(result.benchmark);
  };

  this.onRunComplete = function(browser, info) {
    var formattedResults = formatResults(results, meta, opts, config);
    fs.writeFileSync(pathToOut, formattedResults);
    this.write('  Results written in ' + pathToOut + '\n');
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
