import React, { Component} from 'react'
export default class MapBoxInfoModal extends Component{
  constructor(props){
    super(props)
  }
  render(){
    const infolist=this.props.infos.map((item,index)=>
       <div key={index}>
        <p>{item.startTime}</p>
        <p>{item.endTime}</p>
        <p>{item.address}</p>
      </div>
    )
    return(
    <div id="modal-info">
      {infolist}
    </div>
    )
  }
}
