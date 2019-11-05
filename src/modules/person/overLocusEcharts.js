import React, { Component} from 'react'
import './person.less'
import echarts  from 'echarts'



export default class OverLocusEchartsModal extends Component{
  constructor(props){
    super(props)
  }

  componentDidMount() {
    const domId=this.props.domId;
    const data=this.props.data;
    this.initLocusEchartsModal(domId,data);
  }

  initLocusEchartsModal=(domId,data)=>{
    var myCharts = echarts.init(document.getElementById(domId));
    window.onresize=myCharts.resize;

    myCharts.setOption({
      backgroundColor:'#0f1940',
      grid:{
        left:'5%',
        right:'10%',
        top:'20%',
        bottom:'15%',
        containLabel:true
      },
      tooltip:{
        trigger:'axis',
        formatter:`{c}`,
        axisPointer:{
          type:'none'
        }
      },
      legend:{
        show:true,
        x:'1200',
        y:'35',
        icon:'stack',
        itemHeight:10,
        itemWidth:30,
        textStyle:{
          color:'#66708e'
        },
        data:data.legend
      },
      xAxis:[
        {
          type:'category',
          boundaryGap:false,
          axisLabel:{
            color:'#6f7a97'
          },
          axisLine:{
            show:true,
            lineStyle:{
              color:'#234b8b'
            }
          },
          axisTick:{
            show:false,
          },
          splitLine:{
            show:false
          },
          data:data.xAxis
        }],
      yAxis:[
        {
          type:'value',
         min:0,
         max:100,
         axisLabel:{
           formatter:'{value}%',
           textStyle:{
            color:'#a3aec6'
           }
         },
         axisLine:{
          lineStyle:{
            color:'#234b8b'
          }
         },
         axisTick:{
          show:false
         },
         splitLine:{
          show:false
         },
      }],
      series:[
        {
          name:data.name,
          type:'line',
          stack:'总数',
          symbol:'circle',
          symbolSize:8,
          itemStyle:{
            normal:{
              color:'#56a3c3',
              lineStyle:{
                color:'#56a3c3',
                width:3
              }
            }
          },
          areaStyle:{
            normal:{
              color:new echarts.graphic.LinearGradient(0,1,0,0,[{
                color:'#18345a',
                offset:0
              },{
                color:'#18345a',
                offset:1
              }
              ],false)
            }
          },
          data:data.yAxis
        }
      ]

    })
  }
  render(){
    return(<div></div>)
  }
}
