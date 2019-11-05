var path = require('path');
var fse  = require('fs-extra');

var name = 'xian';
var file = name => path.join(__dirname, '../../', `src/assets/map-data/${name}.json`);

function load() {
  fse.readJSON(file(name)).then(content => {
    content = recast(content);
    console.log(content);
    fse.writeJSON(file('xian.new'), content);
  });
}

function recast(content) {
  var paths = content.paths;
  content.paths = paths.map(p => ({ name: '', mark: {}, legend: {}, fill: '', d: p }));
  return content;
}

load()
