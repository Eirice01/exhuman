import axios from 'axios'
import jsonData1 from './drug-peoples.json'
import jsonData2 from './type-peoples.json'
import extremHistoryData from './extrem-history.json'
import popFind from './popFind'
import controlInfo from './controlInfo.json'
import controlMoreInfo from './controlMoreInfo.json'
import Red from '@assets/images/home/red.png';
import Blue from '@assets/images/home/blue.png';
import Orange from '@assets/images/home/orange.png';
import Person from '@assets/images/home/person.png';
import personPush from "./personPush"
import pieData from "./pieData"
import district from './district.json'
import result1 from './result1'
import result2 from './result2'
import policeTable from './policeTableSource/policeTable.json'
import cqTable from './policeTableSource/cq_table.json'
import gcTable from './policeTableSource/gc_table.json'
import hyTable from './policeTableSource/hy_table.json'
import jyTable from './policeTableSource/jy_table.json'
import lcTable from './policeTableSource/lc_table.json'
import lwTable from './policeTableSource/lw_table.json'
import lxTable from './policeTableSource/lx_table.json'
import pyTable from './policeTableSource/py_table.json'
import shTable from './policeTableSource/sh_table.json'
import szTable from './policeTableSource/sz_table.json'
import tqTable from './policeTableSource/tq_table.json'
import zqTable from './policeTableSource/zq_table.json'

const COLORS = { 'Red': Red, 'Blue': Blue, 'Orange': Orange, 'Person': Person };

export async function fetchPeopleByType(type) {
  return await axios.get(type ? `/people/${type}` : `/people`);
}


export async function fetchMapStyle() {
  return  await axios({method:'get',url:'http://192.168.1.224:8089/styles/base/style.json',headers:{'use-mock-service':false}});
}


export async function fetchPeoples() {
  return await fetchMapStyle();
}

export async function fetchExtremePeople() {
  return await fetchExtremePeople('extreme');
}

export async function fetchImportantPeople() {
  return await fetchExtremePeople('important');
}

export async function fetchAbnormalPeople() {
  return await fetchExtremePeople('abnormal');
}

//const peoples = 275;
const [extremes1,extremes2,importants] = [12, 30, 3];

function Compare(a, b) {
  let e = a['percent'], f = b['percent'];

  if(e > f) return -1;
  if(e < f) return 1;
  return 0
}

const AreasPeoples = {
  '商河县': 27,
  '济阳区': 31,
  '章丘区': 42,
  '莱芜区': 12,
  '钢城区': 22,
  '平阴县': 9,
  '历下区': 35,
  '历城区': 55,
  '长清区': 19,
  '市中区': 52,
  '槐荫区': 11,
  '天桥区': 23
};

export const NonServerData = {
  AreasPeoples() {
    return AreasPeoples;
  },

  PeoplesStatics() {
    return { importants, extremes1,extremes2 };
  },

  ExtremePeoples() {
    return pieData.fenju
  },
  CommunityData(){
    return pieData.shequ
  },
  importantsPeoples() {
    return [
      { type: '群组', group: 5, member: 40 },
      { type: '个人', group: 1, member: 34 },
      { type: '涉暴', group: 3, member: 20 },
      { type: '涉黑', group: 2, member: 18 }
    ]
  },

  targetPeoples() {
    return [
      { title:'全部' },
      { title:'刘响塘' },
			{ title:'李月' },
			{ title:'刘强' },
			{ title:'杨可欣' },
			{ title:'赵飞' },
      { title:'张强' },
      { title:'李欢' },
      { title:'张建林' },
      { title:'王永' },
      { title:'徐武' }
		]
  },

  DrugPeoples() {
    const data = jsonData1.map(item => {
      const percent  = item['?percent'] + '%';
      const aberrant = item['?aberrant'].map( ab => ({...ab, value: COLORS[ab.value]}) );
      return ({ ...item, aberrant, percent, notPercent: true  });
    });

    return data.sort(Compare);
  },

  //极端人发现卡片信息数据
  popFindData(){
    const data = popFind.map(item => {
      const percent  = item['percent'] + '%';
      return ({ ...item, percent, notPercent: true  });
    });

    return data.sort(Compare);
  },
  //极端人管控卡片信息
  popControlData(){
    const data = popFind.map(item => {
      const percent  = item['percent'] + '%';
      return ({ ...item, percent, notPercent: true  });
    });
    return data.sort(Compare);
  },
  //首页今日推送数据
  personPushData(){
    return personPush
  },
  //个人详情左侧数据
  personInfo(type){
    let baseUrl="./findLeft/"
    return    require(baseUrl+type+'_info.json')

  },
  //个人情绪数据 短信
  emotionalState(type){
    let baseUrl="./msgciyun/"
    return   require(baseUrl+type+'-msg_state.json')

  },
  //个人详情高频词柱状图数据(短信)
  heighWords(type){
    let baseUrl="./msgTop10/"
    return  require(baseUrl+type+'-msg_top10.json')

  },
  //个人详情短信词云数据
  msgyunData(type){
    let baseUrl="./msgciyun/"
    return   require(baseUrl+type+'-msg_ciyun.json')

  },
  //个人详情评论词云
  discusYunData(type){
    let baseUrl="./discusCiYun/"
    return   require(baseUrl+type+'-discus_ciyun.json')

  },
  //个人详情评论Top10
  discusTopData(type){
    let baseUrl="./discusTop10/"
    return  require(baseUrl+type+'-discus_top10.json')

  },

  //个人信息评论弹框数据
  discusPicData(type){
    let baseUrl="./discusPic/"
    return  require(baseUrl+type+'-discus_pic.json')

  },

  //个人详情搜索词云
  searchYunData(type){
    let baseUrl="./serchCiYun/"
    return   require(baseUrl+type+'-serch_ciyun.json')

  },

  //个人详情搜索Top10
  searchTopData(type){
    let baseUrl="./serchTop10/"
    return   require(baseUrl+type+'-serch_top10.json')


  },

  //人物画像卡片信息（搜索）
  picWords(type){
    let baseUrl="./serchPicData/"
    return   require(baseUrl+type+'-serch_picWord.json').data

  },

  //个人详情通联模块模型列表数据(pic)
  comcationModalData(type){
    let baseUrl="./comcationPic/"
    return   require(baseUrl+type+'-concation_picmodal.json')

  },
  //个人详情通联模块柱状图数据
  comcationEchartsData(type){

    let baseUrl="./comcationEcharts/"

    return   require(baseUrl+type+'-concation_echarts.json')

  },

  //通联详单数据
  comcationTableData(type){
    let baseUrl="./comcationTable/"
    return   require(baseUrl+type+'-comcation_table.json')

  },

  //个人详情轨迹模块时间切换数据
  locusTimeData(type){
    let baseUrl="./locusTime/"
    return   require(baseUrl+type+'-locs_time.json').locustime

  },

 //个人详情轨迹地左侧表格数据
  locusMapTableData(type){
    let baseUrl="./locusTable1/"
    return   require(baseUrl+type+'-locs_0816table.json')

  },
//地图表格动态切换数据
  locusMapTableData2(type){
    let baseUrl="./locusTable2/"

    return   require(baseUrl+type+'-locs_0817table.json')

  },
  locusMapTableData3(type){
    let baseUrl="./locusTable3/"

    return   require(baseUrl+type+'-locs_0818table.json')

  },

  //个人详情轨迹地图点数据1
  PersonStateData(type){
    let baseUrl="./locusMap1/"
    return   require(baseUrl+type+'-locs-map_0816personpoint.json')

  },

  //轨迹切换地图
  MapData2(type){
    let baseUrl="./locusMap2/"
    return   require(baseUrl+type+'-locs-map_0817personpoint.json')

  },
  MapData3(type){
    let baseUrl="./locusMap3/"
    return   require(baseUrl+type+'-locs-map_0818personpoint.json')

  },

  //个人详情轨迹线1
  PersonLine(type){
    let baseUrl="./locusLine1/"
    return   require(baseUrl+type+'-locs-map_0816line.json')

  },
  lin2(type){
    let baseUrl="./locusLine2/"

    return   require(baseUrl+type+'-locs-map_0817line.json')

  },
  lin3(type){
    let baseUrl="./locusLine3/"

    return   require(baseUrl+type+'-locs-map_0818line.json')

  },

//超出活动范围顶部卡片数据
  overlocusPicData(type){

    let baseUrl="./overPic/"
    return   require(baseUrl+type+'-overlocs_toppic.json')

  },
 //超出活动范围echarts图数据
  overlocusEchartsData(type){
    let baseUrl="./overEcharts/"
    return   require(baseUrl+type+'-overlocs_echarts.json')

  },
 //常规活动表格数据
  usualTableData(type){

    let baseUrl="./usualActiveTable/"

    return   require(baseUrl+type+'-usual_statetable.json')

  },

 //近日活动场所
  nerPutOrOutTableData(type){
    let baseUrl="./unUsualTable/"

    return   require(baseUrl+type+'-unusual_statetable.json')
  },


  abnormalPeoples() {
    const data = jsonData2.map(item => {
      const percent  = item['?percent'] + '%';
      const aberrant = item['?aberrant'].map( ab => ({...ab, value: COLORS[ab.value]}) );
      return ({ ...item, aberrant, percent });
    });
    return data.sort(Compare);
  },
  controlInfoData(){
    return controlInfo;
  },
  controlMoreInfoData(){
    return controlMoreInfo;
  },
  ExtremHistory() {
    const data = extremHistoryData;
    return data;
  },

  HistoryTableTitle() {
    return [
      { type: '疑似极端人姓名', width: 150, rowKey: 'extName' },
      { type: '极端人身份证号', width: 150, rowKey: 'extIdCard' },
      { type: '极端人家庭住址', width: 250, rowKey: 'extAddress' },
      { type: '预警理由', width: 150, rowKey: 'WarnInfo' },
      { type: '推送时间', width: 250, rowKey: 'pushTime' },
      { type: '推送民警', width: 150, rowKey: 'pushPoli' },
      { type: '民警联系方式', width: 150, rowKey: 'poliPhone' },
      { type: '反馈信息', width: 250, rowKey: 'fbackInfo' },
    ]
  },
  policeTableData(type){
    switch(type){
      // 长清区
      case "370113":
        return cqTable;
      // 莱芜区
      case "370116":
        return lwTable;
      // 钢城区
      case "370117":
        return gcTable;
      // 天桥区
      case "370105":
        return tqTable;
      // 槐荫区
      case "370104":
        return hyTable;
      // 市中区
      case "370103":
        return szTable;
      // 平阴县
      case "370124":
        return pyTable;
      // 历下区
      case "370102":
        return lxTable;
      // 济阳区
      case "370115":
        return jyTable;
      // 商河县
      case "370126":
        return shTable;
      // 历城区
      case "370112":
        return lcTable;
      // 章丘区
      case "370114":
        return zqTable;
      default:
        return policeTable;
    }

  },
  policeInfoCardData(type){
    let baseUrl= './exhumanPoints/';
    let temp;
    switch (type){
      case "张浪":
        temp = require(baseUrl+'zl_exhumans.json');
        break;
      case "石建军":
        temp =  require(baseUrl+'sjj-exhumans.json')
        break;
      case "杨福林":
        temp =  require(baseUrl+'yfl-exhumans.json')
        break;
      case "杨立军":
        temp =  require(baseUrl+'ylj-exhumans.json')
        break;
      case "李大林":
        temp =  require(baseUrl+'ldl-exhumans.json')
        break;
      case "李景云":
        temp =   require(baseUrl+'ljy-exhumans.json')
        break;
      case "张亮":
        temp =   require(baseUrl+'zl-exhumans.json')
        break;
      case "孙宏斌":
        temp =   require(baseUrl+'shb-exhumans.json')
        break;
      case "李杰":
        temp =   require(baseUrl+'lj-exhumans.json')
        break;
      case "张汉涛":
        temp =   require(baseUrl+'zht-exhumans.json')
        break;
      case "郑成志":
        temp =   require(baseUrl+'zcz-exhumans.json')
        break;
      case "高文军":
        temp =   require(baseUrl+'gwj-exhumans.json')
        break;
      case "李长乐":
        temp =   require(baseUrl+'lcl-exhumans.json')
        break;
      case "杜永强":
        temp =   require(baseUrl+'dyq-exhumans.json')
        break;
      case "牛伟":
        temp =   require(baseUrl+'nw-exhumans.json')
        break;
      case "郭磊":
        temp =   require(baseUrl+'gl-exhumans.json')
        break;
      case "王勇":
        temp =   require(baseUrl+'wy-exhumans.json')
        break;
    }
    const data = temp.map(item => {
      const percent  = item['percent'] + '%';
      return ({ ...item, percent, notPercent: true  });
    });
    return data.sort(Compare);
  },
  districtData(){
    return district
  },
  myAreaData(type){
    let baseUrl='./areaSource/';
    switch (type){
      case "张浪":
        return  require(baseUrl+'zl-area.json')
      case "石建军":
        return  require(baseUrl+'sjj-area.json')
      case "杨福林":
        return   require(baseUrl+'yfl-area.json')
      case "杨立军":
        return   require(baseUrl+'ylj-area.json')
      case "李大林":
        return   require(baseUrl+'ldl-area.json')
      case "李景云":
        return    require(baseUrl+'ljy-area.json')
      case "张亮":
        return    require(baseUrl+'zl-area.json')
      // case "孙宏斌":
      //   return    require(baseUrl+'shb-area.json')
      // case "李杰":
      //   return    require(baseUrl+'lj-area.json')
      case "张汉涛":
        return    require(baseUrl+'zht-area.json')
      case "郑成志":
        return    require(baseUrl+'zcz-area.json')
      case "高文军":
        return    require(baseUrl+'gwj-area.json')
      case "李长乐":
        return    require(baseUrl+'lcl-area.json')
      case "杜永强":
        return    require(baseUrl+'dyq-area.json')
      case "牛伟":
        return    require(baseUrl+'nw-area.json')
      case "郭磊":
        return    require(baseUrl+'gl-area.json')
      case "王勇":
        return    require(baseUrl+'wy-area.json')
    }
  },
   resultData(){
    return {
      result1,
      result2
    }
}
}
