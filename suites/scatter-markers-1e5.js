'use strict';

/* global Plotly:false, $:false, Highcharts:false */

var run = require('../lib/run');
var makeRandomData = require('../assets/make_random_data');
var createGraphDiv = require('../assets/create_graph_div');
var createGraphDiv = require('../assets/create_graph_div');
var destroyGraphDiv = require('../assets/destroy_graph_div');

// number of points to plot
var N = 1e5;

// set the sample size
var SAMPLE_SIZE = 10;

var specs = [{

  // taken from http://codepen.io/etpinard/pen/XXrzBe
  name: 'plotly.js',
  getVersion: function() {
    return Plotly.version;
  },
  setup: function() {
    var data = makeRandomData.forPlotly(N);

    return [{
      type: 'scattergl',
      mode: 'markers',
      x: data.x,
      y: data.y
    }];
  },
  beforeEach: function() {
    createGraphDiv();
  },
  bench: function(benchObj, setupData) {
    benchObj.startTimer();
    Plotly.plot('graph', setupData);
    benchObj.stopTimer();
  },
  afterEach: function() {
    destroyGraphDiv();
  }

}, {

  // taken from http://jsfiddle.net/highcharts/utvok2zo/
  name: 'highcharts',
  getVersion: function() {
    return Highcharts.version;
  },
  setup: function(benchObj) {
    var data = makeRandomData.forHighcharts(N);

    return {
      series: [{
        type: 'scatter',
        data: data,
        events: {
          renderedCanvas: function () {
            benchObj.stopTimer();
          }
        }
      }]
    };
  },
  beforeEach: function() {
    createGraphDiv();
  },
  bench: function(benchObj, setupData) {
    benchObj.startTimer();
    $('#graph').highcharts(setupData);
  },
  afterEach: function() {
    destroyGraphDiv();
  }

}];

var suite = {
  meta: {
    N: N
  },
  opts: {
    sampleSize: SAMPLE_SIZE
  },
  specs: specs
};

run(suite);
