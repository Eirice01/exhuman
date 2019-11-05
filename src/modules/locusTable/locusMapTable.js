import React,{ Component } from "react";
import { HGroup} from "v-block.lite/layout";
import {Pagination } from 'antd'
export default class locusMapTable extends Component{
  constructor(props){
    super(props)
    this.state={
      tableData:props.locusMapTableData
    }
  }
  changeData=(data)=>{
    this.setState({tableData:data})
  }
  render(){
    const data=this.state.tableData
    const tableMap = data.map((item,index) => {
      if(index%2 == 0){
        return (
          <HGroup key={index} className="table-cell table-cell-bg">
            <div style={{width:'70px',color:'#24d7f0'}}>{index+1}</div>
            <div style={{width:'100px',color:'#24d7f0'}} className="table-type">{item.type}</div>
            <div style={{width:'150px',color:'#24d7f0'}}>{item.address}</div>
            <div style={{flexGrow:1,color:'#7e5f2e'}}>{item.cuntPic}</div>
          </HGroup>)
      } else {
        return (
          <HGroup key={index} className="table-cell">
            <div style={{width:'70px',color:'#24d7f0'}}>{index+1}</div>
            <div style={{width:'100px',color:'#24d7f0'}} className="table-type">{item.type}</div>
            <div style={{width:'150px',color:'#24d7f0'}}>{item.address}</div>
            <div style={{flexGrow:1,color:'#7e5f2e'}}>{item.cuntPic}</div>
          </HGroup>)
      }
    })
    return(
      <div style={{padding:"10px 20px",height:"100%"}}>
        <div style={{height:'calc(100% - 50px)',marginBottom:'10px',overflowX:"hidden",overflowY:"auto"}}>
          <HGroup className="table-cell">
            <div style={{width:'70px'}}>序号</div>
            <div style={{width:'100px'}}>类别</div>
            <div style={{width:'150px'}}>地点</div>
            <div style={{flexGrow:1}}>次数</div>
          </HGroup>
          {tableMap}
        </div>
        <div className="table-pager-container"><Pagination defaultCurrent={1} total={5} style={{float:'right'}}/></div>
      </div>
    )
  }
}
