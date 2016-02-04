'use strict';

exports.forPlotly = function(N) {
  var x = new Array(N);
  var y = new Array(N);

  for(var i=0; i<N; i++) {
    x[i] = Math.random();
    y[i] = Math.random();
  }

  return {x: x, y: y};
};

exports.forHighcharts = function(N) {
  var xy = [];

  for(var i=0; i<N; i++) {
    xy.push([Math.random(), Math.random()]);
  }

  return xy;
};
