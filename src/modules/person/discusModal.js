
import React, { Component} from 'react'
import './person.less'
import { HGroup, VGroup } from 'v-block.lite/layout'
import { Icon} from 'antd';
import pieWaring from '../../assets/images/person/pieWaring.png'
import pieLine from '../../assets/images/person/pieLine.png'
import pieheigh from '../../assets/images/person/pieheigh.png'
export default class discusModal extends Component{
  constructor(props){
    super(props)
  }
  picCell(){
    var picWords=[];
    picWords=this.props.discusPicData.data;
    for(let i=0;i<picWords.length;i++){
      if(i==0){
        picWords[i].bgColor="#a32f4c"
      }else if(i==1){
        picWords[i].bgColor="#8e4b36"
      }else if(i==2){
        picWords[i].bgColor="#a2732c"
      }else {
        picWords[i].bgColor="#275c9e"
      }
    }
    let cell1=[];
    let cell2=[];
    let cell3=[];
    cell1=picWords.slice(0,4)
    cell2=picWords.slice(8,10)
    cell3=picWords.slice(4,8)
    return this.setState.cellData={
      cell1:cell1,
      cell2:cell2,
      cell3:cell3
    }
  }
  render(){
    const {mianWord}=this.props.discusPicData
    const {cell1,cell2,cell3}=this.picCell()
    return(
      <div className="discus-content-show" >
        <HGroup style={{borderBottom:'1px solid #0b3f62',padding:'10px 0px'}} className="cls-discus">
          <span style={{color:'#20bcd8',fontSize:'16px',display:'block'}}>评论关键词详情:</span>
          <span style={{display:'block'}}>
                  <Icon type="close-circle" theme="filled" style={{color:"#6cacd8",fontSize:"18px",cursor:"pointer"}} onClick={() => this.props.closeDiscusModal()}/>
                </span>
        </HGroup>
        <HGroup  className="cls-discus-meun">
             <span style={{display:'block',margin:'0 auto'}}>{mianWord}</span>
        </HGroup>
        <HGroup   className="cellContent">
          <VGroup className="cellPic">
            <PicCard cell1={cell1}/>
          </VGroup>
          <VGroup className="cellPic" style={{padding:'10px 20px',height:"calc(100%- 60px)"}} verticalAlign="space-between">
            <PicCard cell1={cell2}/>
          </VGroup>
          <VGroup className="cellPic">
            <PicCard cell1={cell3}/>
          </VGroup>
        </HGroup>
      </div>
    )
  }
}
class PicCard extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const cellData=this.props.cell1;
    const picList=cellData.map((item,index)=>{
      let srcs=item.emotionalState>0&&item.emotionalState<=0.4?pieWaring:''
      ||item.emotionalState>0.4&&item.emotionalState<=0.7?pieLine:''
      ||item.emotionalState>0.7?pieheigh:''
      return (
        <VGroup className="pice-info-card" key={index}>
          <HGroup style={{borderBottom:'1px solid #134666',paddingBottom:"3px"}} className="cls-discus-info">
            <p style={{display:'flex'}}>
              <span style={{display:"block",backgroundColor:item.bgColor,padding:"1px 7px",borderRadius:"5px"}}>{item.number}</span>
              <span style={{textIndent:"5px",fontSize:"16px",color:"#1a83a3"}}>{item.name}</span>
            </p>
            <span className="discus-state">
            <img src={srcs} />
          </span>
          </HGroup>
          <HGroup>
            <p style={{margin:"3px 0px"}}>{item.value}</p>
          </HGroup>
        </VGroup>
      )
      }
    )
    return <>{picList}</>
  }

}
