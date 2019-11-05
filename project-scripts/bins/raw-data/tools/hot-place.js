var path = require('path');
var fse  = require('fs-extra');

var base = path.join(__dirname, '../');
var file  = path.join(base, '西安.raw.svg');
var name = path.join(base, 'xian.json');

const REG_PATH_TAG = /<path [^>]+\/>/g;
const REG_SVG_TAG = /<svg .*?>/;
const REG_ATTRS = /\w+=".*?"/g;
const REG_TRIM_QUOT = /^['"]|['"]$/g;

function load() {
  fse.readFile(file).then(content => {
    content = content.toString();

    const svg = cast_data_object(content.match(REG_SVG_TAG).pop(), filter_attrs(['width', 'height', 'viewBox']));

    let paths = content.toString().match(REG_PATH_TAG);

    paths = paths.map(p => {
      const item = cast_data_object(p, filter_attrs(['id', 'fill', 'd']));
      return item;
    });

    normalize_item(svg, item => item['name'] = '西安');
    normalize_item(paths, item => {
      item['name'] = item.id;
      delete item['id'];

      item['mark'] = {};
      item['legend'] = {};
    });

    const mapData = { svg, paths };

    console.log(mapData);

    output(name, mapData);
  });
}

function cast_data_object(input, filter) {
  const segs = input.match(REG_ATTRS);

  const pairs = segs.reduce((acc, seg) => {
      if(/[^ ]+=[^ ]+/.test(seg)) {
        acc.push(seg);
      }
      return acc;
    }, []);

  return pairs.reduce((acc, item) => {
    let [key, value] = item.split('=');
    value = value.replace(REG_TRIM_QUOT, '');
    if(filter(key, value)) {
      acc[key] = key !== '' ? value.replace(/'|"/g) : 'svg::path::d';
    }
    return acc;
  }, {});
}

function filter_attrs(fields) {
  fields = Array.isArray(fields) ? fields : [];
  return (key, value) => fields.some(k => k === key)
}

function normalize_item(items, fieldFunc) {
  items = Array.isArray(items) ? items : [items];

  items.forEach(item => fieldFunc(item));
}

function output(file, content) {
  fse.writeJSON(file, content);
}

load();
