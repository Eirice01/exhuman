import React, { Component } from "react";
import echarts  from 'echarts'
import 'echarts-wordcloud'
class PersonWordsYun extends Component{

  constructor(props){
    super(props)
    this.state = {
    }
  }



  componentDidMount() {
    const data=this.props.msgyunData.data
    const domId=this.props.domId
    this.initWordsYun(domId,data);
  }
  render(){
    return(
      <div></div>
    )
  }

  initWordsYun(domId,data){
    var myChartYun = echarts.init(document.getElementById(domId));
    window.onresize=myChartYun.resize;
    myChartYun.setOption({
      backgroundColor:'#030e38',
      // tooltip:{
      //   pointFormat:'{series.name}:<b>{point.percentage:.1f}%</b>'
      // },
      series:[
        {
          type:'wordCloud',
          gridSize:1,
          sizeRange:[12,55],
          rotationRange:[-45,0,45,90],
          textStyle:{
            normal:{
              color:function () {
                return 'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')'
              }
            }
          },
          left:'center',
          top:'center',
          right:null,
          bottom:null,
          width:'100%',
          height:'100%',
          data:data
        }
      ]

    })
  }
}
export default PersonWordsYun
