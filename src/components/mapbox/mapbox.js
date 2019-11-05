import React, { Component } from "react";
import { HGroup,} from 'v-block.lite/layout'
import mapBoxGl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
export default class MapContent extends Component{
  constructor(props){
    super(props)
    this.state={
      modalInfo:props.stateData,
      linData:[],
    }
  }

  changeMyMapData=(data,line)=>{
    let  linData=[];
    const datas=this.props.MapStyleData
    const domId=this.props.domId
    this.setState({modalInfo:data},()=>{
    })
    this.setState({linData:line}, ()=> {
    })
    this.initMap(domId,datas,data,linData);
  }
  changeLineData=()=>{
    const linData=this.state.linData;
    const data=this.props.MapStyleData
    const domId=this.props.domId
    const stateData=this.state.modalInfo
    this.initMap(domId,data,stateData,linData);

  }
  componentDidMount() {
    const linData=this.state.linData;
    const data=this.props.MapStyleData
    const domId=this.props.domId
    const stateData=this.state.modalInfo
    this.initMap(domId,data,stateData,linData);
  }

  initMap(domId,data,stateData,linData){

    const map = new mapBoxGl.Map({
      container: document.getElementById(domId),
      style: data,
      zoom: 13.5,
      center:stateData.centers
    });
    mapBoxGl.accessToken = "";
    if(linData.length==0){
      map.on("load", function() {
        // ["accommodation","bus-station","finance","government","hospital","house","life-service","oil-station","railway-station","school","travel"].map(v => {
        //
        //   if(poiStyle2[v]) map.addLayer(poiStyle2[v])
        // })
      });
    }else {
      map.on("load", function() {
        // ["accommodation","bus-station","finance","government","hospital","house","life-service","oil-station","railway-station","school","travel"].map(v => {
        //
        //   if(poiStyle2[v]) map.addLayer(poiStyle2[v])
        // })
        var coordinates=linData.features[0].geometry.coordinates;
        linData.features[0].geometry.coordinates=[coordinates[0]]
        map.addSource('trace-source',{
          "type":"geojson",
          "data":linData
        })
        map.addLayer({
          "id":"trace",
          "type":"line",
          "source":"trace-source",
          "paint":{
            "line-color":"#e5ab3c",
            "line-opacity":1,
            "line-width":2
          }
        })
        map.jumpTo({'center':coordinates[0],'zoom':13})
        map.setPitch(30)
        var i=0
        var timer=window.setInterval(function () {
          if(i<coordinates.length){
            linData.features[0].geometry.coordinates.push(coordinates[i]);
            map.getSource('trace-source').setData(linData)
            map.panTo(coordinates[i]);
            i++;
          }else {
            window.clearInterval(timer)
          }
        },1000)
      });
    }
    //add markers to map
    stateData.features.forEach(function(marker) {
    var popup= new mapBoxGl.Popup({
        closeButton:false,
        closeClick:false,
        offset:25
      })
// create a DOM element for the marker
      var partBox=document.createElement('div');
      partBox.style.display='flex';
      partBox.style.flexDirection='column';
      partBox.style.justifyContent='center';
      partBox.style.alignItems="center"
      var pEl=document.createElement('p');
      var el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = `url(${require("../../assets/images/"+marker.properties.icon)})`;
      el.style.backgroundSize='100% 100%'
      el.style.width = marker.properties.iconSize[0] + 'px';
      el.style.height = marker.properties.iconSize[1] + 'px';
      pEl.innerHTML=marker.properties.description
      pEl.style.marginTop="5px";
      pEl.style.padding="2px 5px";
      pEl.style.backgroundColor="#015c97"
      pEl.style.borderRadius='5px'
      pEl.style.textAlign='center'
      partBox.appendChild(el)
      partBox.appendChild(pEl)
      partBox.addEventListener('mouseenter',(e) => {
        e.stopPropagation()
        var infoBox=document.createElement('div');
        var el1=document.createElement('p');
        var el2 = document.createElement('p');
        var el3=document.createElement('p');
        el1.innerHTML='开始时间：'+marker.properties.message.startTime;
        el2.innerHTML='结束时间：'+marker.properties.message.endTime
        el3.innerHTML='地址：'+marker.properties.message.address
        infoBox.style.padding='15px 10px';
        infoBox.style.backgroundColor='#033d66';
        infoBox.style.opacity='0.5';
        infoBox.appendChild(el1);
        infoBox.appendChild(el2);
        infoBox.appendChild(el3);
        popup.setLngLat(marker.geometry.coordinates)
        popup.setDOMContent(infoBox)
        popup.addTo(map);
      })
      partBox.addEventListener('mouseleave',(e)=>{
        e.stopPropagation()
        popup.remove()
      })
      new mapBoxGl.Marker(partBox)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);

    });
  }
  render(){
    return(
      <div>
        <HGroup className="btns"><span style={{display:'block',padding:'2px 5px',color:'#4eddc0',borderRadius:'3px',background:'#034e83'}}onClick={()=>this.changeLineData()}>轨迹回放</span></HGroup>
      </div>)
  }
}
