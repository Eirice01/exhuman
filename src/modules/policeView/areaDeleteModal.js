import React,{ Component } from 'react'
import { HGroup,VGroup } from 'v-block.lite/layout'
import { Input , Icon} from 'antd'
import './modalStyle.less'


export default class AreaModal extends Component{
  constructor(props){
    super(props)
    this.state={
      type:'',
    }
  }

  closeModal=()=>{
    if(this.state.type == '0') this.props.deleteDraw()
    this.props.AreaCloseModal()
  }

  changeMyInfo=(type)=>{
    this.setState({type:type},() => {
    })
  }
  okHandler = () => {
    if(this.state.type == '0') this.props.addDrawToArea();
    this.props.AreaCloseModal()
  }
  render(){
    return(
      <div className="areaModal">
      <VGroup style={{border:"14px solid #283667"}} className="area-content">
        <HGroup horizontalAlign='flex-end' style={{height:'calc(100%/3)',padding:'0px 25px'}}>
          <span>
              <Icon type="close-circle" theme="filled" style={{color:"#6cacd8",fontSize:"18px",cursor:"pointer"}}  onClick={this.closeModal}/>
          </span>
        </HGroup>
        <HGroup style={{height:'calc(100%/3)',padding:'0px 25px'}}  horizontalAlign='space-around' className={this.state.type=="0"?'showModal':'hideModal'}>
          <span>命名新编辑区域：</span>
          <span className='areaName'><Input /></span>
        </HGroup>
        <HGroup style={{height:'calc(100%/3)',padding:'0px 25px'}}  horizontalAlign='space-around' className={this.state.type=="1"?'showModal':'hideModal'}>
          <span>确定将该区域从辖区中删除？</span>
        </HGroup>
        <HGroup style={{height:'calc(100%/3)',padding:'0px 25px'}} horizontalAlign='flex-end'>
          <span style={{padding:'2px 16px',background:'#a63b4b',color:'#fff',height:'27px',borderRadius:'5px'}} className={this.state.type=="0"?'showModal':'hideModal'}  onClick={this.okHandler}>
            保存
          </span>
          <span style={{padding:'2px 16px',background:'#a63b4b',color:'#fff',height:'27px',borderRadius:'5px'}} className={this.state.type=="1"?'showModal':'hideModal'}  onClick={this.closeModal}>
            确认
          </span>
        </HGroup>
      </VGroup>
      </div>
    )
  }


}
