import React, { Component} from 'react'
import { HGroup } from 'v-block.lite/layout'
import { NonServerData } from '@store/people-store'
import personStore from "../../store/person-store";
export default class TimePic extends Component{
  constructor(props){
    super(props)
    this.state={
      currentIndex:0
    }

  }

  componentDidMount() {
   this.selectTimePic(0,'11月6日')

  }
  changeTable=(data)=>{
    this.props.changeMapTableData(data)
  }
  changeMapData=(data,lin)=>{
    this.props.changeMapData(data,lin)
  }
  selectTimePic=(index,time)=>{
    const locusMapTableData=NonServerData.locusMapTableData(personStore.personInfo.fuullName)
    const locusMapTableData2=NonServerData.locusMapTableData2(personStore.personInfo.fuullName)
    const locusMapTableData3=NonServerData.locusMapTableData3(personStore.personInfo.fuullName)
    const  data1=NonServerData.PersonStateData(personStore.personInfo.fuullName)
    const  lin1=NonServerData.PersonLine(personStore.personInfo.fuullName)
    const  data2=NonServerData.MapData2(personStore.personInfo.fuullName)
    const  lin2=NonServerData.lin2(personStore.personInfo.fuullName)
    const  data3=NonServerData.MapData3(personStore.personInfo.fuullName)
    const  lin3=NonServerData.lin3(personStore.personInfo.fuullName)
    this.setState({currentIndex:index});
    switch (time){
      case '11月6日':
        this.changeTable(locusMapTableData)
        this.changeMapData(data1,lin1)
        break;
      case '11月7日':
        this.changeTable(locusMapTableData2)
        this.changeMapData(data2,lin2)
        break;
      case '11月8日':
        this.changeTable(locusMapTableData3)
        this.changeMapData(data3,lin3)
        break;
    }
  }
  render(){
    const times=this.props.locusTimeData
    const timePic=times.map((item,index)=>
      <span key={index} className={this.state.currentIndex==index?'selectTime':'normalTime'} onClick={() => {this.selectTimePic(index,item)}}>{item}</span>
    )
    return(
      <HGroup>
        {timePic}
      </HGroup>)
  }
}
