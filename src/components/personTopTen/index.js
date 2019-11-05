import React, { Component } from "react";
import echarts  from 'echarts'
class heightWords extends Component{
  constructor(props){
    super(props)
    this.state = {
      // info:props.heighWords
    }
  }

  render(){
    return(
      <div></div>
    )
  }
  componentDidMount() {
    const {value, label}=this.props.heighWords
    const domId=this.props.domId
    this.initEcharts(domId,value,label);
  }
  //折线图实例化方法
  initEcharts=(domId,value,lable)=>{
    // var g_cellBar0_y = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAoCAYAAAAhf6DEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAA6SURBVEhLY2x8/vY/A4mg3zwcTDOBSTLBqGYSwahmEsGoZhLBqGYSwahmEsGoZhLBqGYSwZDUzMAAAJldBMF2UASmAAAAAElFTkSuQmCC';
    var g_cellBarImg0_y=new Image();
    g_cellBarImg0_y.src=require('../../assets/images/person/bar.png');
    var myChart = echarts.init(document.getElementById(domId));
    window.onresize=myChart.resize;
    myChart.setOption({
      backgroundColor:'#0f1940',
      tooltip:{
        trigger:'axis',
        formatter:`{c}`,
        axisPointer:{
          type:'none'
        }
      },
      //图标位置
      grid:{
        left:'30%'
      },
      xAxis:{
        show:false
      },
      yAxis:[
        {
          show:true,
          data:lable,
          inverse:true,
          axisLine:{
            show:false
          },
          splitLine:{
            show:false
          },
          axisTick:{
            show:false
          },
          axisLabel:{
            interval:0,
            color:"#ffffff",
            formatter:(param,index)=>{
              switch (index){
                case  0:
                  return [`{lg1|${index+1}} `+`{title|${param}}`]
                case  1:
                  return [`{lg2|${index+1}} `+`{title|${param}}`]
                case  2:
                  return [`{lg3|${index+1}} `+`{title|${param}}`]

                default:
                  return [`{lg|${index+1}} `+`{title|${param}}`]
              }

            },
            rich:{
              lg1:{
                backgroundColor:"#a12b28",
                color:"#fff",
                borderRadius:5,
                padding:4,
                align:'center',
                width:20,
                height:20
              },
              lg2:{
                backgroundColor:"#ae5734",
                color:"#fff",
                borderRadius:5,
                padding:4,
                align:'center',
                width:20,
                height:20
              },
              lg3:{
                backgroundColor:"#c78a28",
                color:"#fff",
                borderRadius:5,
                padding:4,
                align:'center',
                width:20,
                height:20
              },
              lg:{
                backgroundColor:"#2d6db6",
                color:"#fff",
                borderRadius:5,
                padding:4,
                align:'center',
                width:20,
                height:20
              },
              title:{
                color:'#fff',
                width:70
              }
            }
          }
        }],
       series:[
         {
           name:'条',
           type:'bar',
           stack:'b',
           yAxisIndex:0,
           data:value,
           lable:{
             normal:{
               show:false,
               position:"right",
               distance:5,
               formatter:function (param) {
                 return param.value+'%'
               },
               textStyle:{
                 color:'#ffffff',
                 fontSize:12
               }
             }
           },
           barWidth:20,
           itemStyle:{
             color:{
               image:g_cellBarImg0_y,
               repeat:'repeat'
             },
           },
           z:2
         },
         {
           name:'外框',
           type:'bar',
           yAxisIndex:0,
           barGap:'-100%',
           data:[100,100,100,100,100,100,100,100,100,100,],
           barWidth:20,
           itemStyle:{
             normal:{
               show:false,
               position:'right',
               distance:3,
                color:'#11284d'
             }
           },
          z:1
         }
       ]
    });
  }

}
export default heightWords
