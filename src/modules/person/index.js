import React, { Component} from 'react'
import './person.less'
import pieWaring from '../../assets/images/person/pieWaring.png'
import pieLine from '../../assets/images/person/pieLine.png'
import pieheigh from '../../assets/images/person/pieheigh.png'
import { HGroup, VGroup } from 'v-block.lite/layout'
import { DatePicker, Icon} from 'antd';
import { withRouter } from 'react-router-dom'
import { NonServerData } from '@store/people-store'
import PersonTopTen from "../../components/personTopTen"
import PersonWordsYun from "../../components/personyun"
import moment from 'moment';
import 'moment/locale/zh-cn'
import DiscusModal from './discusModal'
import ComcationModalList from './comcationModalList'
import ComcationEchartsModal from './comcationEcharts'
import LocusMapTable from '../locusTable/locusMapTable'
import ComcationTableModal from '../comcationTable/comcationTableModal'
import OverLocusEcharts from './overLocusEcharts'
import UsualTableModal from '../usualTable/usualTableModal'
import NerPOrOutTableModal from '../nerPutOrOut/nerPutOrOut'
import OverlocusPic from '../overlocusPic/overlocusPic'
import PicCard from '../humanPicCard/picCard'
import TimePic from '../TimePicCard/timePic'
import PersonLeft from '../personLeft/personLeft'
import MapBoxGlModal from '../../components/mapbox/mapbox'
import personStore from "../../store/person-store";
const dateFormat = 'YYYY-MM-DD';
@withRouter
 class Person extends Component{
  constructor(props){
    super(props)
    this.state={
      cellData:{},
      discusModal:false,
      comcationTable:false,
      lineData:[],
      isLine:true,
      mapStyle:{},

    }
    //绑定this
    this.jupBackInfo=this.jupBackInfo.bind(this);
    this.scrollTop=this.scrollTop.bind(this);
    this.closeDiscusModal=this.closeDiscusModal.bind(this);
    this.closeComcationTable=this.closeComcationTable.bind(this);
    this.showComcationTable=this.showComcationTable.bind(this);
    this.showDiscusModal=this.showDiscusModal.bind(this)
  }

  closeDiscusModal(){
    this.setState({discusModal:false})
  }
  showDiscusModal(){
    this.setState({discusModal:true})
  }
  closeComcationTable(){
   this.setState({comcationTable:false})
  }
  showComcationTable(){
    this.setState({comcationTable:true})
  }

  componentDidMount(){
   // this.getMapStyle()
  }

  //回到顶部
  scrollTop(){
    let el = document.getElementById("person-content-right")
    const c = el.scrollTop;
    if(c > 0) {
      window.requestAnimationFrame(this.scrollTop);
      el.scrollTo(0,c- c/8)
    }
  }
  jupBackInfo=(props)=>{
    props.history.goBack()
  }


 //地图时间点击切换表格数据
  changeMapTableData=(data)=>{
    setTimeout(()=>{
      this.locusTableData.changeData(data)
    },100)

  }
  //轨迹地图数据切换
  changeMapData=(data,line)=>{
    this.setState({isLine:false}, ()=> {
      this.locusMap.changeMyMapData(data,line)
    })
  }

 // //轨迹线数据切换
 //  changeLineData=()=>{
 //    if(this.state.isLine){
 //      this.setState({isLine:false}, ()=> {
 //        this.locusMap.changeLine(this.state.isLine,this.state.lineData)
 //      })
 //    }else {
 //      this.setState({isLine:true}, ()=> {
 //        this.locusMap.changeLine(this.state.isLine,this.state.lineData)
 //      })
 //    }
 //  }
  //任务搜索卡片
  picCell(){
    const picWords=NonServerData.picWords(personStore.personInfo.fuullName);
    for(let i=0;i<picWords.length;i++){
      if(i==0){
        picWords[i].bgColor="#a32f4c"
      }else if(i==1){
        picWords[i].bgColor="#8e4b36"
      }else if(i==2){
        picWords[i].bgColor="#a2732c"
      }else {
        picWords[i].bgColor="#275c9e"
      }
    }
    let cell1=[];
    let cell2=[];
    let cell3=[];
    cell1=picWords.slice(0,4)
    cell2=picWords.slice(8,10)
    cell3=picWords.slice(4,8)
    return this.setState.cellData={
      cell1:cell1,
      cell2:cell2,
      cell3:cell3
    }
  }

  render(){

    var srcs="";
    const MapStyleData= personStore.mapStyleJSON.data
    const heighWords=NonServerData.heighWords(personStore.personInfo.fuullName)
    const emotionalState=NonServerData.emotionalState(personStore.personInfo.fuullName)
    const msgyunData=NonServerData.msgyunData(personStore.personInfo.fuullName)
    const searchyunData=NonServerData.searchYunData(personStore.personInfo.fuullName)
    const searchTopData=NonServerData.searchTopData(personStore.personInfo.fuullName)
    const discusYunData=NonServerData.discusYunData(personStore.personInfo.fuullName)
    const discusTopData=NonServerData.discusTopData(personStore.personInfo.fuullName)
    const discusPicData=NonServerData.discusPicData(personStore.personInfo.fuullName)
    const comcationModalData=NonServerData.comcationModalData(personStore.personInfo.fuullName)
    const {cunts,times,perrs,invalidcalls}=NonServerData.comcationEchartsData(personStore.personInfo.fuullName)
    const locusTimeData=NonServerData.locusTimeData(personStore.personInfo.fuullName)
    const locusMapTableData=NonServerData.locusMapTableData(personStore.personInfo.fuullName)
    const comcationTableData=NonServerData.comcationTableData(personStore.personInfo.fuullName)
    const overlocusPicData=NonServerData.overlocusPicData(personStore.personInfo.fuullName)
    const overlocusEchartsData=NonServerData.overlocusEchartsData(personStore.personInfo.fuullName)
    const usualTableData=NonServerData.usualTableData(personStore.personInfo.fuullName)
    const nerPutOrOutTableData=NonServerData.nerPutOrOutTableData(personStore.personInfo.fuullName)
    const stateData=NonServerData.PersonStateData(personStore.personInfo.fuullName)
    if(emotionalState.value>=0 && emotionalState.value<=0.4){
        srcs=pieWaring
    }else if(emotionalState.value>0.4 && emotionalState.value<=0.7){
        srcs=pieLine
    }else {
        srcs=pieheigh
    }
    const {cell1,cell2,cell3}=this.picCell()
    return <div className="person-content">
      <div className="person-content-left">
        <PersonLeft closeComcationTable={this.closeComcationTable}showDiscusModal={this.showDiscusModal} closeDiscusModal={this.closeDiscusModal}/>
      </div>
      <div id="person-content-right">
        <div className="person-title-line">
          <div className="line-left" onClick={() => {
            this.jupBackInfo(this.props)
          }}>
            <span className="person-back"><Icon type="arrow-left"/></span>
            <span className="person-back" style={{marginLeft: '8px'}}>返回</span>
          </div>
          <div className="line-right">
            <HGroup>
              <DatePicker defaultValue={moment(new Date(), dateFormat)} format={dateFormat} id="lintime"/>
            </HGroup>
          </div>
        </div>
        {/*短信*/}
        <div id="personMessage">
          <HGroup style={{marginTop: "15px"}}>
            <span className="cls-bg-info">短信</span>
          </HGroup>
          <HGroup style={{margin: "15px 0px", alignItems: 'center'}}>
            <span className="cls-point"></span> <span className="point-info">词云：</span>
          </HGroup>
          <div style={{width: '100%', height: 'calc(100% - 92px)', display: 'flex'}}>
            <VGroup style={{width: '60%', height: '100%', padding: '35px 50px', border: "1px solid #195596"}}>
              <HGroup className="cls-state">
                <p>
                  <span>{emotionalState.name}：</span>
                  <img src={srcs}/>
                </p>
              </HGroup>
              <div id="echarts-words-yun">
                <PersonWordsYun msgyunData={msgyunData} domId={"echarts-words-yun"}/>
              </div>
            </VGroup>
            <VGroup style={{
              width: '40%',
              height: '100%',
              padding: '0px 30px 0px 0px',
              marginLeft: '30px',
              backgroundColor: '#0f1940'
            }}>
              <div style={{height: '100%', paddingLeft: "30px"}}>
                <HGroup style={{borderBottom: '1px solid #134666', padding: '10px 0px'}}>
                  <span style={{color: '#166c87', fontSize: '16px'}}>高频词top10排名:</span>
                </HGroup>
                <div id="echarts-box">
                  <PersonTopTen heighWords={heighWords} domId={"echarts-box"}/>
                </div>
              </div>
            </VGroup>
          </div>
        </div>
        {/*搜索*/}
        <div id="personSearch">
          <HGroup style={{marginTop: "15px"}}>
            <span className="cls-bg-info">搜索</span>
          </HGroup>
          <HGroup style={{margin: "15px 0px", alignItems: 'center'}}>
            <span className="cls-point"></span> <span className="point-info">人物画像：</span>
          </HGroup>
          <div id="huamPic">
            <HGroup className="cellContent">
              <VGroup className="cellPic">
                <PicCard cell1={cell1}/>
              </VGroup>
              <VGroup className="cellPic" style={{padding: '10px 20px', height: "calc(100%- 60px)"}}
                      verticalAlign="space-between">
                <PicCard cell1={cell2}/>
              </VGroup>
              <VGroup className="cellPic">
                <PicCard cell1={cell3}/>
              </VGroup>
            </HGroup>
          </div>
          <div className="seach-words-yun">
            <HGroup style={{margin: "15px 0px", alignItems: 'center'}}>
              <span className="cls-point"></span> <span className="point-info">词云：</span>
            </HGroup>
            <div style={{width: '100%', height: 'calc(100% - 92px)', display: 'flex'}}>
              <VGroup style={{width: '60%', height: '100%', padding: '35px 50px', border: "1px solid #195596"}}>
                <div id="echarts-search-yun">
                  <PersonWordsYun msgyunData={searchyunData} domId={"echarts-search-yun"}/>
                </div>
              </VGroup>
              <VGroup style={{
                width: '40%',
                height: '100%',
                padding: '0px 30px 0px 0px',
                marginLeft: '30px',
                backgroundColor: '#0f1940'
              }}>
                <div style={{height: '100%', paddingLeft: "30px"}}>
                  <HGroup style={{borderBottom: '1px solid #134666', padding: '10px 0px'}}>
                    <span style={{color: '#166c87', fontSize: '16px'}}>敏感词top10排名:</span>
                  </HGroup>
                  <div id="echarts-box-search">
                    <PersonTopTen heighWords={searchTopData} domId={"echarts-box-search"}/>
                  </div>
                </div>
              </VGroup>
            </div>
          </div>
        </div>
        {/*评论*/}
        <div id="discus-content">
          <HGroup style={{marginTop: "15px"}}>
            <span className="cls-bg-info">评论</span>
          </HGroup>
          <HGroup style={{margin: "15px 0px", alignItems: 'center'}}>
            <span className="cls-point"></span> <span className="point-info">评论关键词：</span>
          </HGroup>
          <div style={{width: '100%', height: 'calc(100% - 92px)', display: 'flex'}}>
            <VGroup style={{width: '60%', height: '100%', padding: '35px 50px', border: "1px solid #195596"}}>
              <div id="echarts-discus-yun">
                <PersonWordsYun msgyunData={discusYunData} domId={"echarts-discus-yun"}/>
              </div>
            </VGroup>
            <VGroup style={{
              width: '40%',
              height: '100%',
              padding: '0px 30px 0px 0px',
              marginLeft: '30px',
              backgroundColor: '#0f1940'
            }}>
              <div style={{height: '100%', paddingLeft: "30px"}}>
                <HGroup style={{borderBottom: '1px solid #134666', padding: '10px 0px'}}>
                  <span style={{color: '#166c87', fontSize: '16px'}}>高频词top10排名:</span>
                </HGroup>
                <div id="echarts-box-discus">
                  <PersonTopTen heighWords={discusTopData} domId={"echarts-box-discus"}/>
                </div>
              </div>
            </VGroup>
          </div>
          {this.state.discusModal && discusPicData.data!=undefined&&
          <DiscusModal closeDiscusModal={this.closeDiscusModal} discusPicData={discusPicData}/>}
        </div>
        {/*通联*/}
        <div id="comcation-content">
          <HGroup style={{marginTop: "15px"}}>
            <span className="cls-bg-info">通联</span>
          </HGroup>
          <HGroup style={{margin: "15px 0px", alignItems: 'center'}} className="cls-discus-info">
            <p>
              <span className="cls-point"></span> <span className="point-info">通联信息表：</span>
            </p>
            <p style={{display: 'flex'}}>
          <span style={{
            display: 'block',
            padding: '3px 6px',
            background: '#c48620',
            borderRadius: '3px',
            marginRight: '8px'
          }}>进入社交网络计算个人结构</span>
              <span
                style={{display: 'block', padding: '3px 6px', background: '#0f8b97', borderRadius: '3px'}} onClick={()=>this.showComcationTable()}>载入通联详单</span>
            </p>
          </HGroup>
          <div style={{width: '100%', height: 'calc(100% - 126px)', paddingLeft: '20px'}}>
            {/*通联信息小模块*/}
            <HGroup className="comcation-modal-list">
              <ComcationModalList comcationModalData={comcationModalData}/>
            </HGroup>
            <div className="comcation-echarts">
              <HGroup className="comcation-modal-echarts" style={{marginBottom: '20px'}}>
                <VGroup style={{marginRight: '27px'}}>
                  <HGroup className="modal-title" horizontalAlign="center">{cunts==undefined?"":cunts.title}</HGroup>
                  <HGroup id="comcationCuntEcharts" style={{height: 'calc(100% - 20px)', width: '100%'}}>
                    {
                      cunts==undefined?"": <ComcationEchartsModal domId={"comcationCuntEcharts"} data={cunts}/>
                    }
                  </HGroup>
                </VGroup>
                <VGroup>
                  <HGroup className="modal-title" horizontalAlign="center">{times==undefined?"":times.title}</HGroup>
                  <HGroup id="comcationtimeEcharts" style={{height: 'calc(100% - 20px)', width: '100%'}}>
                    {
                      times==undefined?"": <ComcationEchartsModal domId={"comcationtimeEcharts"} data={times}/>
                    }
                  </HGroup>
                </VGroup>
              </HGroup>
              <HGroup className="comcation-modal-echarts">
                <VGroup style={{marginRight: '27px'}}>
                  <HGroup className="modal-title" horizontalAlign="center">{perrs==undefined?"":perrs.title}</HGroup>
                  <HGroup id="comcationPeerEcharts" style={{height: 'calc(100% - 20px)', width: '100%'}}>
                    {
                      perrs==undefined?"":<ComcationEchartsModal domId={"comcationPeerEcharts"} data={perrs}/>
                    }
                  </HGroup>
                </VGroup>
                <VGroup>
                  <HGroup className="modal-title" horizontalAlign="center">{invalidcalls==undefined?"":invalidcalls.title}</HGroup>
                  <HGroup id="comcationinvalidcallEcharts" style={{height: 'calc(100% - 20px)', width: '100%'}}>
                    {
                      invalidcalls==undefined?"": <ComcationEchartsModal domId={"comcationinvalidcallEcharts"} data={invalidcalls}/>
                    }
                  </HGroup>
                </VGroup>
              </HGroup>
            </div>
          </div>
          {this.state.comcationTable&&<ComcationTableModal  closeComcationTable={this.closeComcationTable} comcationTableData={comcationTableData}/>}
        </div>
        {/*轨迹*/}
        <div id="locuscontent">
          <HGroup style={{marginTop: "15px"}}>
            <span className="cls-bg-info">轨迹</span>
          </HGroup>
          <HGroup style={{margin: "15px 0px", alignItems: 'center'}}>
            <span className="cls-point"></span> <span className="point-info">个人轨迹：</span>
          </HGroup>
          <div style={{width: '100%', height: 'calc(100% - 120px)'}}>
            <HGroup className="locusTimes">
              {<TimePic locusTimeData={locusTimeData} changeMapTableData={this.changeMapTableData} changeMapData={this.changeMapData}/>}
            </HGroup>
            <HGroup className="locusMapContent">
              {/*地图*/}
              <VGroup id="locusMap">
                <MapBoxGlModal  domId={'locusMap'} MapStyleData={MapStyleData} stateData={stateData} ref={(locusMap)=>{this.locusMap=locusMap;}}/>
              </VGroup>
              <VGroup id="locusTable">
                <LocusMapTable locusMapTableData={locusMapTableData}  ref={(locusTable)=>{this.locusTableData=locusTable;}}/>
              </VGroup>
            </HGroup>
          </div>
        </div>
        <div id="over-locus">
          <HGroup style={{margin: "15px 0px", alignItems: 'center'}}>
            <span className="cls-point"></span> <span className="point-info">超出常规活动范围：</span>
          </HGroup>
          <div style={{width:'100%',height:'calc(100% - 40px)'}}>
            <HGroup style={{height:'20%',marginBottom:'20px'}}>
              <OverlocusPic  overlocusPicData={overlocusPicData} />
            </HGroup>
            <HGroup style={{height:'calc(80% - 20px)'}} id="over-locus-echarts">
              <OverLocusEcharts  domId={"over-locus-echarts"} data={overlocusEchartsData}/>
            </HGroup>
          </div>
        </div>
        <div id="usua-address">
          <HGroup style={{margin: "15px 0px", alignItems: 'center'}}>
            <span className="cls-point"></span> <span className="point-info">常规活动场所</span>
          </HGroup>
          <HGroup style={{height:'calc(100% - 60px)',marginTop:'25px',backgroundColor:'#0f1940',padding:'10px 25px'}}>
            <UsualTableModal usualTableData={usualTableData}/>
          </HGroup>
        </div>
        <div id="nextorday-address">
          <HGroup style={{margin: "15px 0px", alignItems: 'center'}}>
            <span className="cls-point"></span> <span className="point-info">近日异常出入</span>
          </HGroup>
          <HGroup style={{height:'calc(100% - 60px)',marginTop:'25px',backgroundColor:'#0f1940',padding:'10px 25px'}}>
            <NerPOrOutTableModal nerPutOrOutTableData={nerPutOrOutTableData}/>
          </HGroup>
        </div>
        <div style={{height: '40px'}} className="cls-state" id="perosn-backTop">
      <span style={{
        display: "inline-block",
        cursor: 'pointer',
        padding: "8px 20px",
        backgroundColor: '#27447c',
        color: '#ffffff',
        fontSize: '16px',
        borderRadius: '7px',
        textAlign: 'center'
      }} onClick={() => this.scrollTop('person-content-right')}>回到顶部</span>
        </div>
      </div>
    </div>
  }
}
export default Person


