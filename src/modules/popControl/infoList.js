import React, { Component } from "react";
import { HGroup, VGroup } from "v-block.lite/layout";
import { Icon } from 'antd'
import { NonServerData } from '@store/people-store'
import InfoModal from './infoModal'
export default class InfoList extends Component {
  constructor(){
      super();
      this.state = {
          infoModal:false
      }
      this.closeModal = this.closeModal.bind(this)
  }
  stopAnimation(e){
    e.target.parentNode.style.animationPlayState = "paused";
  }
  startAnimation(e){
    e.target.parentNode.style.animationPlayState = "running";
  }
  renderList(data){
    let lists = [];
    for(let i = 0; i  < data.length; i++) {
        lists.push(<p key={i} className="info-list" onMouseEnter={this.stopAnimation} onMouseLeave={this.startAnimation}>{data[i]}</p>);
    }
    return lists;
  }
  closeModal(){
      this.setState({infoModal:false})
  }
  render() {
    const {pushInfo,dispatchInfo} =  NonServerData.controlInfoData();
    return (
      <HGroup padding="0px 20px 20px 20px" height="100%" width="100%">
        {
            this.state.infoModal &&
             <InfoModal closeModal={this.closeModal}/>
        }
        <VGroup height="100%" width="100%" className="info-list-container">
          <VGroup height="60%">
            <VGroup  width="100%">
                <HGroup horizontalAlign="space-between" width="100%">
                    <div style={{color:"#27e3fc",lineHeight:'20px'}}>
                        <Icon type="sound" theme="filled" style={{fontSize:'20px'}}/>
                        <span style={{paddingLeft:'5px',verticalAlign:'top'}}>系统推送</span>
                    </div>
                    <span className="showMore" onClick={() => {this.setState({infoModal:true})}}>查看更多</span>
                </HGroup>
                
            </VGroup>
            <div style={{height:"calc(100% - 62px)",marginTop:"20px",marginBottom:"20px",overflow:"hidden",position:"relative"}}>
                <div className="infoBox">
                    {this.renderList(pushInfo)}
                </div>
            </div>
          </VGroup>
          <VGroup height="40%">
            <VGroup  width="100%">
                <HGroup horizontalAlign="space-between" width="100%">
                    <div style={{color:"#27e3fc",lineHeight:'20px'}}>
                        <Icon type="sound" theme="filled" style={{fontSize:'20px'}}/>
                        <span style={{paddingLeft:'5px',verticalAlign:'top'}}>技侦下发</span>
                    </div>
                    <span className="showMore"></span>
                </HGroup>
            </VGroup>
            <div style={{height:"calc(100% - 62px)",marginTop:"20px",marginBottom:"20px",overflow:"hidden",position:"relative"}}>
                <div className="infoBox">
                    {this.renderList(dispatchInfo)}
                </div>
            </div>
          </VGroup>
        </VGroup>
      </HGroup>
    );
  }
}