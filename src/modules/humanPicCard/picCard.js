import React, { Component} from 'react'
import { HGroup, VGroup } from 'v-block.lite/layout'

export default class PicCard extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const cellData=this.props.cell1;
    const picList=cellData.map((item,index)=>(
      <VGroup className="pice-info-card" key={index}>
        <HGroup style={{borderBottom:'1px solid #134666',paddingBottom:"3px"}}>
          <span style={{display:"block",backgroundColor:item.bgColor,padding:"1px 7px",borderRadius:"5px"}}>{item.number}</span>
          <span style={{textIndent:"5px",fontSize:"16px",color:"#1a83a3"}}>{item.name}</span>
        </HGroup>
        <HGroup>
          <p style={{margin:"3px 0px"}}>{item.value}</p>
        </HGroup>
      </VGroup>
    ))
    return <>{picList}</>
  }
}
