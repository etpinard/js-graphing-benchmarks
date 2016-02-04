var path = require('path');
var fs = require('fs-extra');

var fakeModuleName = 'karma-custom-reporter';
var pathToFakeModule = path.join(__dirname, 'node_modules', fakeModuleName);
var target = path.join(__dirname, 'report.js');
var link = path.join(pathToFakeModule, 'index.js');


fs.mkdirs(pathToFakeModule, function(err) {
  if(err) throw err;
  
  fs.symlinkSync(target, link);
});
