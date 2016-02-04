'use strict';

var createBencher = require('./bencher');

module.exports = function run(suite) {

  // karma-custom framework
  window.karmaCustomEnv = {};
  window.karmaCustomEnv.execute = function(karma, window) {
      var bencher = createBencher(karma, suite);
      bencher.run();
  };

};
