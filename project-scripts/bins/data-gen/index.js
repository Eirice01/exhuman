const path = require('path');
const fse  = require('fs-extra');
const chalk = require('chalk');

// const t = require('../../../src/services');

const { RAM, RAMR, Popout, PhoneNumber, IDNumber } = require('../tools');

const files = [
  'drug-peoples.json',
  'type-peoples.json'
];
const output = path.join(__dirname, '../../../src/services');

// const txt = '坐上铺，大电视，小电视，猪肉群，瘦肉群，散冰，窑口，踢货，住院，翻车，落难，饮茶，打麻雀，靠死了，还愿，开天窗，high，闷子，白雪公主，嗑药，开马会，兵马俑';
const list = [
  "王军 张林 刘彤 李苏 杨可欣 李玉 杨寻 谢终辉 胡乐 赵莉 王宗伟 张发闰 郭祖凯 李小路 陈起 苏萧 陈小懂 董云娜",
  "刘微琪 张强 张国宇 苏裂 杨小杰 李玉婷 李梅 马明明 马俊东 赵莉莉 张彤雨 郭明 刘君霞 惠阳阳 高帅",
  "李月", "刘强", "赵飞", "李欢", "张建林", "王永", "徐武"
];

const list2 = ["李月", "刘强", "杨可欣", "赵飞", "张强", "李欢", "张建林", "王永", "徐武"];

const [ Red, Blue, Orange, Person ] = [ 'Red', 'Blue', 'Orange', 'Person' ];
const Names = list.join(' ').split(' ');
const Terms = ["活够了", "活腻了", "砍刀", "硫酸", "汽油", "氯化钾", "T61", "爆炸", "麦司卡林", "阿托品", "致幻剂", "毒鼠强", "躲避安检", "躲避监控", "一起死"]; // ["坐上铺","大电视","小电视","猪肉群","瘦肉群","散冰","窑口","踢货","住院","翻车","落难","饮茶","打麻雀","靠死了","还愿","开天窗","high","闷子","白雪公主","嗑药","开马会","兵马俑"];
const Aberrants =[ { label:'极端人', value: Red }, {label:'在控重点人', value: Blue }, { label:'涉贷', value: Orange }, { label:'社会边缘人', value: Person } ];

function gen(inputs, high_order, opts = {  }) {
  const nums = inputs.length;

  let result = [];

  for(let i = 0; i < nums; i++) {
    const len = Aberrants.length;
    const flat = RAMR(1, len);
    const beg = RAMR(0, len - flat);

    result.push({
      id: `#${i}`,
      name: inputs[i],
      label: Terms[RAMR(0, Terms.length - 1)],
      '?percent': RAMR(20, 80),
      collect: false,
      tel: PhoneNumber(),
      idCard: IDNumber(),
      '?aberrant': RAM({ bit: 1, time: flat }).split('').reduce((acc, noop, idx) => (acc.push(Aberrants[idx + beg]), acc), []),
      AbnormalBehavior: '异常位置极高，频繁出入敏感地'
    });
  }

  function compare(a, b) {
    let e = a['?percent'], f = b['?percent'];

    if(e > f) return -1;
    if(e < f) return 1;
    return 0
  }

  result = result.sort(compare);

  const { names, terms, index } = high_order ? high_order : { names: [] };
  while (names.length) {
    const len = Aberrants.length;
    const flat = RAMR(1, len);
    const beg = RAMR(0, len - flat);

    const name = Popout(names);
    const term = Popout(terms);
    const _idx = Popout(index);

    const durg = {
      id: `#${name}`, name, label: term,
      '?percent': RAMR(60, 90),
      collect: false,
      tel: PhoneNumber(),
      idCard: IDNumber(),
      '?aberrant': RAM({ bit: 1, time: flat }).split('').reduce((acc, noop, idx) => (acc.push(Aberrants[idx + beg]), acc), []),
      AbnormalBehavior: '异常位置极高，频繁出入敏感地'
    };

    const field = '?percent', temp = result[_idx][field];
    if(temp > durg[field]) {
      result[_idx][field] = durg[field];
      durg[field] = temp;
    }

    result.splice(_idx, 0, durg);
  }

  return result;
}

function writeFiles() {
  const pushs = gen(list2, {
    names: ['王军'],
    terms: [Terms[RAMR(0, Terms.length - 1)]],
    index: [0]
  });


  const database = [
    gen(Names, null),
    ['王军', ...list2].map((n, i) => ({ ...pushs[i], name: n }))
  ];

  database[1][0]['?percent'] = 89;

  Promise.all(files.map(f => fse.writeJson(path.join(output, f), database.shift()))).then(() => console.log(chalk.green('\n自动生成数据完成!'), chalk.yellow('\n等待编译完成...')));
}

writeFiles();
