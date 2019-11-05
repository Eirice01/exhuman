import React, { Component} from 'react'
import './person.less'
import { HGroup,VGroup} from 'v-block.lite/layout'

export default class comcationModalList extends Component{
  constructor(props){
    super(props)
  }
  render(){
   const {cunt,times,peer,invalidcall,contentcall}=this.props.comcationModalData
    return(
      <HGroup style={{width:'100%'}}>
        <VGroup className="comcationPic">
          <div className="cls-com-title">{cunt.info}</div>
          <div className="cls-modal-infos">
            <span className="cls-erro">{cunt.unusualNumber}<a className="cls-erro-pi">次</a></span>
            <span className="cls-lins">/</span>
            <span className="cls-usual">{cunt.consult}<a className="cls-usual-pi">次</a></span>
          </div>
        </VGroup>
        <VGroup className="comcationPic">
          <div className="cls-com-title">{times.info}</div>
          <div className="cls-modal-infos">
            <span className="cls-erro">{times.unusualNumber}<a className="cls-erro-pi">分钟</a></span>
            <span className="cls-lins">/</span>
            <span className="cls-usual">{times.consult}<a className="cls-usual-pi">分钟</a></span>
          </div>
        </VGroup>
        <VGroup className="comcationPic">
          <div className="cls-com-title">{peer.info}</div>
          <div className="cls-modal-infos">
            <span className="cls-erro">{peer.unusualNumber}<a className="cls-erro-pi">人</a></span>
            <span className="cls-lins">/</span>
            <span className="cls-usual">{peer.consult}<a className="cls-usual-pi">人</a></span>
          </div>
        </VGroup>
        <VGroup className="comcationPic">
          <div className="cls-com-title">{invalidcall.info}</div>
          <div className="cls-modal-infos">
            <span className="cls-erro">{invalidcall.unusualNumber}<a className="cls-erro-pi">次</a></span>
            <span className="cls-lins">/</span>
            <span className="cls-usual">{invalidcall.consult}<a className="cls-usual-pi">次</a></span>
          </div>
        </VGroup>
        <VGroup className="comcationPic" style={{marginRight:'0px'}}>
          <div className="cls-com-title">{contentcall.info}</div>
          <div className="cls-modal-infos" style={{width:'220px'}}>
            <div style={{width:'50%'}}>
              <span className="cls-erro">{contentcall.titme1}</span>
              <span className="cls-erro">{contentcall.titme2}</span>
            </div>
            <span className="cls-lins">/</span>
            <span className="cls-usual" >{contentcall.consult}</span>
          </div>
        </VGroup>
      </HGroup>
    )
  }


}
