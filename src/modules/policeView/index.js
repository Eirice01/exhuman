import React,{ Component } from 'react'
import { HGroup,VGroup } from 'v-block.lite/layout'
import { Input , Icon , Select } from 'antd'
import PoliceTable from './policeTable'
import PoliceInfoCard from './policeInfoCard'
import MultiSelect from '@components/multi-select'
import './policeView.less'
import { NonServerData } from '@store/people-store'
import ResultStore from '@store/statu-store'
import PersonStore from '@store/person-store'
import mapBoxGl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import districtGeoJson from '@services/district-geojson.json'
import PoliceTools from '../../components/policeTools/policeToolsModal'
import AreaModal from './areaDeleteModal'
const { Search } = Input;
const { Option } = Select;
const tableData = NonServerData.policeTableData();
const districtData = NonServerData.districtData();
const defaultSelect = districtData[0].value;
const defaultCenter = districtData[0].center;


import MapboxDraw from '@mapbox/mapbox-gl-draw'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
// import {bbox} from '@turf/turf/index'
import DrawRectangle from 'mapbox-gl-draw-rectangle-mode';
import { DragCircleMode } from 'mapbox-gl-draw-circle';
import policeImg from "../../assets/map-img/民警.png";
import poiStyle2 from '@services/mapBoxSyle/StylePoi.json'
export default class PoliceView extends Component {
    constructor(){
        super()
        this.state = {
          showFlag:true ,
          showTable:true ,
          tableData:tableData,
          center:defaultCenter ,
          map:null ,
          oldZoom:7.9,
          showAreaModl:false,
          isOrther:'',
          selectPolice:null,
          drawObj:null,
          drawAreaData:null,
          mapLoad:true,
          policeInfo:null
        }
        this.changeShowFlag = this.changeShowFlag.bind(this)
    }
    changeShowFlag(){
        this.setState({showFlag:!this.state.showFlag},() => {
            this.state.map.resize();
        })
    }

    //地图显示民警所辖区域
    changeAreaLayer=(data)=>{
      const map = this.state.map;
      let features = [];
      if(data.length !== 0) {
        data.forEach(v=>{
            features.push({
            "type": "Feature",
            "properties":{
                name:v.value
            },
            "geometry": {
              "type": "Polygon",
              "coordinates": v.area
            }
          })
        })
        map.getSource('area-source').setData({
            "type":"FeatureCollection",
            "features":features
        });
      } else{
        map.getSource('area-source').setData({
            "type":"FeatureCollection",
            "features":[]
        });
      }
    }
    //地图清除民警所辖区域
    clearAreaLayer=()=>{
        this.state.map.getSource('area-source').setData({
            "type":"FeatureCollection",
            "features":[]
        });
    }
    //地图打点民警所辖区域内极端人
    showExhumanPoints = (data) => {
        const map = this.state.map;
        let features = [];
        if(data.length !== 0) {
          data.forEach(v=>{
              features.push({
              "type": "Feature",
              "properties":{
                "name":v.name
              },
              "geometry": {
                "type": "Point",
                "coordinates": v.coordinate
              }
            })
          })
          map.getSource('points-source').setData({
              "type":"FeatureCollection",
              "features":features
          });

        } else {
            map.getSource('points-source').setData({
                "type":"FeatureCollection",
                "features":[]
            });
        }
    }
    //清除地图打点民警所辖区域内极端人
    clearExhumanPoints = () => {
        this.state.map.getSource('points-source').setData({
            "type":"FeatureCollection",
            "features":[]
        });
    }
    changeShowTable(status,data){
        console.log(data)

        let center = [];
        if(data){
            center = data.coordinate;
            this.setState({selectPolice:data.name})
        }

        ResultStore.changeShowResult(status);
        let oldZoom = this.state.oldZoom;
        this.setState({showTable:status})
        if(status){
            this.setState({
                policeInfo:null
            })
            if(oldZoom > 9){
                this.state.map.setLayoutProperty("police-icon","visibility","visible");
            }
            this.state.map.setZoom(oldZoom);
        } else {
            this.setState({
                policeInfo:{
                    name:data.name,
                    tel:data.tel,
                    region:data.region
                }
            })
            this.state.map.setLayoutProperty("police-icon","visibility","none");
            this.state.map.setZoom(12);
            this.state.map.setCenter(center);
        }
    }
    //模态框关闭
   AreaCloseModal=()=>{
     this.setState({showAreaModl:false},() => {
     })
   }
   //获取模态框编辑类型
   getAreaModalType=(type)=>{

      switch (type){
        case "0":
          this.setState({showAreaModl:true},() => {
            this.areaModal.changeMyInfo(type)
          })
        break
        case "1":
          this.setState({showAreaModl:true},() => {
            this.areaModal.changeMyInfo(type)
          })
          break
      }
   }
   updateArea = async (e) => {
        const map = this.state.map;
        const draw = this.state.drawObj;
        var data = draw.getAll();
        var drawFeature = data.features[0];

        // var answer = document.getElementById('calculated-area');
        if (data.features.length > 0) {

            // var userPolygon = e.features[0];
            // var polygonBoundingBox = bbox(userPolygon);
            // var southWest = [polygonBoundingBox[0], polygonBoundingBox[1]];
            // var northEast = [polygonBoundingBox[2], polygonBoundingBox[3]];
            // var northEastPointPixel = map.project(northEast);
            // var southWestPointPixel = map.project(southWest);
            //features 所画区域内含有的points-layer层元素数组
            // var features = map.queryRenderedFeatures([southWestPointPixel, northEastPointPixel], { layers: ['points-layer'] });

            var sourceData = map.getSource('area-source')._data;
            sourceData.features.push(drawFeature);
            await this.setState({drawAreaData:sourceData})
            this.areaTool.Toolsecect("0")
        } else {
        //     answer.innerHTML = '';
        //     if (e.type !== 'draw.delete') alert("Use the draw tools to draw a polygon!");
        }
   }
   addDrawToArea = () => {
        const map = this.state.map;
        let data = this.state.drawAreaData;
        console.log(data)
        map.getSource('area-source').setData(data);
        this.state.drawObj.deleteAll();
        this.setState({drawAreaData:null});
   }
   deleteDraw = () => {
      this.state.drawObj.deleteAll();
   }
   changeModes = type => {
        const draw = this.state.drawObj;
        draw.deleteAll();
        if(type =='polygon'){
            draw.changeMode('draw_polygon');
        }
        if(type =='circle'){
            console.log('circle')
            draw.changeMode('drag_circle');
        }
        if(type =='rectangle'){
            draw.changeMode('draw_rectangle');
        }
        if(type =='trash'){
            // draw.changeMode('simple_select');
            // draw.changeMode('direct_select');
            draw.deleteAll()
        }
  }
   async initMapBox(){
        const _this = this;
        mapBoxGl.accessToken = "";
        const mapStyleJSON = PersonStore.mapStyleJSON.data;
        const map = new mapBoxGl.Map({
            container: document.getElementById("policeMap"),
            style: mapStyleJSON,
            minZoom:7.9,
            zoom: 7.9,
            pitchWithRotate:false,
            maxBounds:[[114.592052,34.632853],[122.853771,37.961183]],
            center:this.state.center
        });

        const modes = MapboxDraw.modes;
        modes.draw_rectangle = DrawRectangle;
        modes.drag_circle = DragCircleMode;
        const draw = new MapboxDraw({
            displayControlsDefault: false,
            userProperties: true,
            modes: modes
        });
        await this.setState({drawObj:draw});
        map.addControl(draw);


        map.on('draw.create', this.updateArea);
        // map.on('draw.delete', this.updateArea);
        // map.on('draw.update', this.updateArea);


        map.on("load", function() {
            map.loadImage(policeImg,function(error,image){
                if(error) throw error;
                map.addImage('police-icon',image);
                let iconData = {
                    "type":"FeatureCollection",
                    "features":[]
                }
                tableData.forEach(v => {
                    iconData.features.push({
                        "type":"Feature",
                        "properties":{
                            "name":v.name,
                            "tel":v.tel,
                            "area":v.area
                        },
                        "geometry":{
                            "type":"Point",
                            "coordinates":v.coordinate
                        }
                    })
                })
                map.addSource("policeIcon-source",{type:'geojson',data:iconData})
                map.addLayer({
                    'id':"police-icon",
                    "type":"symbol",
                    "source":"policeIcon-source",
                    "layout":{
                        "icon-image":'police-icon',
                        "icon-size":0.8,
                        "visibility":"none"
                    }
                })
            })

            //济南各区多边形范围
            map.addSource('district-source',{
                "type":"geojson",
                "data":{
                    "type":"FeatureCollection",
                    "features":districtGeoJson
                }
            })
            map.addLayer({
                "id":"districe-boundary",
                "type":"fill",
                "source":"district-source",
                "layout":{},
                "paint":{
                    "fill-color":['get','area-color'],
                    "fill-opacity": {
                        stops: [[7, 0.6], [10, 0.2], [12, 0]]
                      },
                    "fill-outline-color":"#f00"
                }
            })

           //民警辖区自定义范围
           map.addSource('area-source',{
            "type":"geojson",
            "data":{
                "type":"FeatureCollection",
                "features":[]
                }
            })
            map.addLayer({
                "id":"area-boundary",
                "type":"fill",
                "source":"area-source",
                "paint":{
                    "fill-color":'#F00',
                    "fill-opacity":{
                        stops: [[11,0],[11.5,0.2], [12, 0.5]]
                      }
                }
            })
            //民警辖区极端人打点
            map.addSource('points-source',{
                "type":"geojson",
                "data":{
                    "type":"FeatureCollection",
                    "features":[]
                }
            })
            map.addLayer({
                "id":"points-layer",
                "type":"circle",
                "source":"points-source",
                "paint":{
                    "circle-radius":6,
                    "circle-color":"#dece43",
                    "circle-opacity":{
                        stops: [[11,0],[11.5,0.5], [12, 0.8]]
                      },
                }
            });


            ["accommodation","bus-station","finance","government","hospital","house","life-service","oil-station","railway-station","school","travel"].map(v => {
                /* let layerStyle = {
                    ...poiStyle,
                    id:v,
                    "source-layer":v
                }
                map.addLayer(layerStyle) */
                if(poiStyle2[v]) map.addLayer(poiStyle2[v])
            })
            _this.setState({mapLoad:false})
        });
        const popup = new mapBoxGl.Popup({
            closeButton:false,
            closeClick:false,
            offset:25
        })

       await  _this.setState({
            map
        })
        map.on("mouseenter","police-icon",(e) => {
            map.getCanvas().style.cursor = 'pointer';
            var coordinates = e.features[0].geometry.coordinates.slice();
            var name = e.features[0].properties.name;
            var tel = e.features[0].properties.tel;
            var area = e.features[0].properties.area;

            while(Math.abs(e.lngLat.lng - coordinates[0]) > 180){
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            var infoBox=document.createElement('div');
            var el1=document.createElement('div');
            var el2 = document.createElement('div');
            var el3=document.createElement('div');
            el1.innerHTML='姓名：'+ name;
            el2.innerHTML='联系电话:' + tel;
            el3.innerHTML='管辖区域：'+ area;

            infoBox.style.backgroundColor='#033d66';
            infoBox.style.opacity='0.5';
            infoBox.appendChild(el1);
            infoBox.appendChild(el2);
            infoBox.appendChild(el3);

            popup.setLngLat(coordinates)
                .setDOMContent(infoBox)
                .addTo(map);
        })
        map.on("mouseleave","police-icon",(e) => {
            map.getCanvas().style.cursor = '';
            popup.remove()
        })

        map.on("mouseenter","points-layer",(e) => {
            map.getCanvas().style.cursor = 'pointer';
            var coordinates = e.features[0].geometry.coordinates.slice();
            var name = e.features[0].properties.name;

            popup.setLngLat(coordinates)
                .setHTML(name)
                .addTo(map);
        })
        map.on("mouseleave","points-layer",(e) => {
            map.getCanvas().style.cursor = '';
            popup.remove()
        })

        map.on('click','area-boundary',(e) => {
            console.log(e.features[0])
        })
        map.on("zoom",function(e){
            console.log(`zoom:${map.getZoom()}`)
        })
        map.on('click',function(e){
            console.log(e)
        })
    }

    districtChange = async (value,option) => {
        let type = option.key;
        const map = this.state.map;
        let center = option.props.data;
        await this.setState({center});
        let newTableData = NonServerData.policeTableData(type);

        await this.setState({tableData:newTableData});

        let iconData = {
            "type":"FeatureCollection",
            "features":[]
        }
        newTableData.forEach(v => {
            iconData.features.push({
                "type":"Feature",
                "properties":{
                    "name":v.name,
                    "tel":v.tel,
                    "area":v.area
                },
                "geometry":{
                    "type":"Point",
                    "coordinates":v.coordinate
                }
            })
        })
        map.getSource("policeIcon-source").setData(iconData);
        if(value === "全部"){
            map.setLayoutProperty("police-icon","visibility","none");
            map.getSource('district-source').setData({
                "type":"FeatureCollection",
                "features":districtGeoJson
            });
            map.jumpTo({center,"zoom":7.9});
            this.setState({oldZoom:7.9})
        } else {
            map.setLayoutProperty("police-icon","visibility","visible");
            let newDistrictGeoJson = districtGeoJson.filter(item => item.pId == type);

            map.getSource('district-source').setData({
                "type":"FeatureCollection",
                "features":newDistrictGeoJson
            });
            map.jumpTo({center,"zoom":9.5});
            this.setState({oldZoom:9.5})
        }


    }
    componentDidMount(){
        this.initMapBox();
    }
    render(){
      const ShowBox = this.state.showFlag ? (<Icon type="right"/>) : (<Icon type="left"/>);

      return (
            <VGroup height="100%" padding="20px">
                {
                    this.state.mapLoad && (
                        <HGroup horizontalAlign="center" verticalAlign="center" className="map_load">
                            <div style={{fontSize:"16px",color:"#fff"}}>正在加载地图...</div>
                        </HGroup>
                    )
                }
                <HGroup horizontalAlign="flex-end" className="policeInfo-group">
                        {
                            this.state.policeInfo ? <HGroup gap={20} style={{flex:1}}><span>民警姓名: {this.state.policeInfo.name}</span><span>联系电话: {this.state.policeInfo.tel}</span><span>所属县区: {this.state.policeInfo.region}</span></ HGroup>
                                : null
                        }
                    <Search className="searchInput" placeholder="请输入区域名称" onSearch={() => console.log("区域名")} enterButton style={{width:"400px"}}/>
                </HGroup>
                <HGroup style={{height:"calc(100% - 37px)",marginTop:"5px",position: "relative"}} overflow="hidden">
                    <div className="selectBox">

                            <Select defaultValue={defaultSelect} style={{ width: 200, display:`${this.state.showTable ? 'block' : 'none'}` }} onChange={this.districtChange}>
                                {
                                    districtData.map(item => <Option value={item.value} key={item.id} data={item.center}>{item.value}</Option>)
                                }
                            </Select>
                            {
                                !this.state.showTable &&  <MultiSelect selectPolice={this.state.selectPolice} changeAreaLayer={this.changeAreaLayer} clearAreaLayer={this.clearAreaLayer}/>
                            }

                    </div>
                    <div id="tools-content">
                      {!this.state.showTable&& <PoliceTools  changeModes={this.changeModes} getAreaModalType={this.getAreaModalType} ref={(areaTool)=>{this.areaTool=areaTool}}/>}
                    </div>
                    <div className={`${this.state.showFlag ? 'policeMap' : 'full-policeMap'}`} id="policeMap">
                    </div>
                    <div className={`rightSider${this.state.showFlag ? '' : ' hideSider'}`}>
                        <div className="siderBar" onClick={this.changeShowFlag}>{ShowBox}</div>
                        {
                           this.state.showTable ?
                            <PoliceTable changeShowTable={this.changeShowTable.bind(this)} data={this.state.tableData}/> :
                            <PoliceInfoCard currentPolice={this.state.selectPolice} showExhumanPoints={this.showExhumanPoints} clearExhumanPoints={this.clearExhumanPoints} changeShowTable={this.changeShowTable.bind(this)}/>
                        }

                    </div>
                </HGroup>

              { this.state.showAreaModl &&<AreaModal deleteDraw={this.deleteDraw} addDrawToArea={this.addDrawToArea} AreaCloseModal={this.AreaCloseModal} ref={(areaModal)=>{this.areaModal=areaModal}}/>}
            </VGroup>
        )
    }
}
