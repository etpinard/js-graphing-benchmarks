'use strict';

module.exports = function destroyGraphDiv() {
  var graphDiv = document.getElementById('graph');
  document.body.removeChild(graphDiv);
};
