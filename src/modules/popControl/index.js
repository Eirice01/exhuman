
import React,{ Component } from 'react'
import { NonServerData } from '@store/people-store'
import ControlCard from './controlCard'
import InfoList from './infoList'
import { HGroup,VGroup } from 'v-block.lite/layout'
import PoliceView from '../policeView'
import { withRouter } from 'react-router-dom'
import ResultStore from '@store/statu-store'
import { observer } from 'mobx-react'
export default
@withRouter
@observer

class PopControl extends Component {
  constructor(){
    super()
    this.state = { defaultActive:true}

  }

  btnSwitch(status){
    ResultStore.changeShowResult(true);
    this.setState({defaultActive:status})
  }
  goResult(){
    if(this.state.defaultActive){
      this.props.history.push({pathname:'/result/fj'})
    } else {
      this.props.history.push({pathname:'/result/mj'})
    }
  }

  render(){
    const datas =  NonServerData.popControlData()
    return (
      <VGroup style={{height:"calc(100% - 90px)"}}>
        <HGroup height="80px" horizontalAlign="space-between" verticalAlign="center" padding="0px 40px">
          <div className="btn-group">
            <span className={`btn-span btn-fenju ${this.state.defaultActive ? 'btn-span-active' : null}`} onClick={() => {this.btnSwitch(true)}}>分局</span>
            <span className={`btn-span btn-minjing ${this.state.defaultActive ? null : 'btn-span-active'}`}onClick={() => {this.btnSwitch(false)}}>民警</span>
          </div>
          {
            ResultStore.showResult ?
            <div className="results" onClick={() => this.goResult()}>查看反馈结果</div>
              : null
          }
        </HGroup>
        {
          this.state.defaultActive ? (
            <HGroup style={{height:"calc(100% - 90px)"}}>
              <VGroup  width="350px">
                <InfoList></InfoList>
              </VGroup>
              <VGroup style={{width:'calc(100% - 350px)'}}>
                <ControlCard data={datas}/>
              </VGroup>
            </HGroup>
          ) : (<PoliceView ref={(policeView)=>{this.policeView=policeView}}></PoliceView>)
        }
      </VGroup>
    )
  }
}
