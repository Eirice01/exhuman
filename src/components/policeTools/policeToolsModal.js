import React,{ Component } from 'react'
import { HGroup,VGroup } from 'v-block.lite/layout'
import {Icon} from 'antd'
export default class ToolsModal extends Component{
  constructor(props){
     super(props)
    this.state={
       selectNum:''
    }
  }
  Toolsecect=(type)=>{
    this.props.getAreaModalType(type)
    this.setState({selectNum:type})
  }
  render(){
    return(
       <HGroup style={{border:'1px solid #1e5c83',height:'100%',position:'relative',background:'#132345'}}>
         <VGroup style={{width:'60%',borderRight:'1px solid #1e5c83',flexDirection:'initial'}}>
           <HGroup style={{height:'100%'}}  horizontalAlign='space-around' verticalAlign='center' >
               {/*<span   title="编辑" style={{display:"inline-block",textAlign:'center'}} className={this.state.selectNum=='0'?'tool-icon-selcet':'tool-icon'} onClick={()=>this.Toolsecect('0')}>*/}
             {/*<Icon type="edit" theme="filled"/>*/}
           {/*</span>*/}
             <span  title="删除" style={{display:"inline-block",textAlign:'center'}} className={this.state.selectNum=='1'?'tool-icon-selcet':'tool-icon'} onClick={()=>this.Toolsecect('1')}>
              <Icon type="delete" theme="filled"/>
           </span>
           </HGroup>
         </VGroup>
         <VGroup style={{width:'40%'}} >
           <HGroup style={{height:'100%'}} horizontalAlign='center' verticalAlign='center'>
             <span style={{textAlign:'center'}} className={this.state.selectNum=='2'?'tool-icon-selcet':'tool-icon'} onClick={()=>this.Toolsecect('2')} title="工具">
              <Icon type="tool"  theme="filled"/>
           </span>
           </HGroup>
         </VGroup>
         <HGroup className={this.state.selectNum=='2'?'more-tool':'more-tool-hide'} horizontalAlign='space-around' verticalAlign='center'>
             <span style={{display:'inline-block',width:'50%',textAlign:'center',height:'100%'}} onClick={() => this.props.changeModes("circle")}>
               <img src={require("../../assets/images/circle-inco.png")} style={{width:'25px',height:'25px'}} title="圆形"/>
             </span>
             <span style={{display:'inline-block',width:'50%',textAlign:'center',height:'100%'}} onClick={() => this.props.changeModes("polygon")}>
                <img src={require("../../assets/images/mors.png")} style={{width:'25px',height:'25px'}} title="多边形"/>
             </span>
         </HGroup>
       </HGroup>
    )
  }
}
