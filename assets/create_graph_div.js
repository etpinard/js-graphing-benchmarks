'use strict';

module.exports = function createGraphDiv() {
  var graphDiv = document.createElement('div');
  graphDiv.id = 'graph';
  document.body.appendChild(graphDiv);
};
