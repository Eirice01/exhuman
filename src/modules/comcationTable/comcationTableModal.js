import React,{ Component } from "react";
import { HGroup} from "v-block.lite/layout";
import {Pagination,Icon } from 'antd'
export default class  comcationTableModal extends Component{
  constructor(props){
   super(props)
  }
  render(){
    const data=this.props.comcationTableData
    const tableMap = data.map((item,index) => {
      if(index%2 == 0){
        return (
          <HGroup key={index} className="table-cell table-cell-bg">
            <div style={{width:'70px',color:'#24d7f0'}}>{index+1}</div>
            <div style={{width:'250px',color:'#24d7f0'}} className="table-type" id="td-info">
              <img src={require(`../../assets/images/person/${item.img}`)} alt={item.type} className="type-info" style={{height:'25px',width:'23px'}}/>
              <span className="infos">{item.type}</span>
            </div>
            <div style={{width:'250px',color:'#24d7f0'}}>{item.CalledNum}</div>
            <div style={{flexGrow:1,color:'#7e5f2e'}}>{item.cationTime}</div>
          </HGroup>)
      } else {
        return (
          <HGroup key={index} className="table-cell">
            <div style={{width:'70px',color:'#24d7f0'}}>{index+1}</div>
            <div style={{width:'250px',color:'#24d7f0'}} className="table-type" id="td-info">
              <img src={require(`../../assets/images/person/${item.img}`)} alt={item.type} style={{height:'25px',width:'23px'}} className="type-info"/>
              <span className="infos">{item.type}</span>
            </div>
            <div style={{width:'250px',color:'#24d7f0'}}>{item.CalledNum}</div>
            <div style={{flexGrow:1,color:'#7e5f2e'}}>{item.cationTime}</div>
          </HGroup>)
      }
    })
    return(
      <div style={{padding:"10px 20px"}} className="comcation-table-modal">
        <HGroup style={{borderBottom:'1px solid #0b3f62',padding:'10px 0px'}} className="cls-discus">
          <span style={{color:'#20bcd8',fontSize:'16px',display:'block'}}>通联详单:</span>
          <span style={{display:'block'}}>
                  <Icon type="close-circle" theme="filled" style={{color:"#6cacd8",fontSize:"18px",cursor:"pointer"}} onClick={()=>this.props.closeComcationTable()}/>
                </span>
        </HGroup>
        <div style={{height:'calc(100% - 100px)',marginBottom:'10px',overflowX:"hidden",overflowY:"auto"}}>
          <HGroup className="table-cell">
            <div style={{width:'70px'}}>序号</div>
            <div style={{width:'250px'}}>类型</div>
            <div style={{width:'250px'}}>对方号码</div>
            <div style={{flexGrow:1}}>通话时长(/分钟)</div>
          </HGroup>
          {tableMap}
        </div>
        <div className="table-pager-container"><Pagination defaultCurrent={1} total={5} style={{float:'right'}}/></div>
      </div>
    )
  }
}
