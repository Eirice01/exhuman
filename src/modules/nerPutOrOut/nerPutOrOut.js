import React,{ Component } from "react";
import { HGroup} from "v-block.lite/layout";
import {Pagination } from 'antd'
export default class NerPutorOutTableModal extends Component{
  constructor(props){
    super(props)
  }

  render(){
    const data=this.props.nerPutOrOutTableData;
    const tableMap = data.map((item,index) => {
      if(index%2 == 0){
        return (
          <HGroup key={index} className="table-cell table-cell-bg">
            <div style={{width:'70px',color:'#24d7f0'}}>{index+1}</div>
            <div style={{width:'250px',color:'#24d7f0'}} className="table-type">{item.poiName}</div>
            <div style={{flexGrow:1,color:'#24d7f0'}}>{item.address}</div>
          </HGroup>)
      } else {
        return (
          <HGroup key={index} className="table-cell">
            <div style={{width:'70px',color:'#24d7f0'}}>{index+1}</div>
            <div style={{width:'250px',color:'#24d7f0'}} className="table-type">{item.poiName}</div>
            <div style={{flexGrow:1,color:'#24d7f0'}}>{item.address}</div>
          </HGroup>)
      }
    })
    return(
      <div style={{padding:"10px 20px",height:"100%",width:'100%'}}>
        <div style={{height:'calc(100% - 50px)',marginBottom:'10px',overflowX:"hidden",overflowY:"auto",width:'100%'}}>
          <HGroup className="table-cell">
            <div style={{width:'70px'}}>序号</div>
            <div style={{width:'250px'}}>出现场所</div>
            <div style={{flexGrow:1,}}>地址</div>
          </HGroup>
          {tableMap}
        </div>
        <div className="table-pager-container"><Pagination defaultCurrent={1} total={5} style={{float:'right'}}/></div>
      </div>
    )
  }
}
