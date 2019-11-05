
import React, { Component} from 'react'
import {Avatar,Badge} from 'antd';
import { HGroup,VGroup } from 'v-block.lite/layout'
import { classnames } from 'v-block.lite/common'
import { withRouter } from 'react-router-dom'
import  personStore from '../../store/person-store'


let lastSelected = null;
@withRouter

class InfoCard extends Component{
  constructor(props){
    super(props)
    this.state = { info:props.info, selected:false}
  }
  selectedFn = () => {
    if(lastSelected === this){
      if(this.state.selected){
        lastSelected.setState({selected:false});
      }else{
        return lastSelected.setState({selected:true});
      }
    }
    this.setState({selected:true}, () => {
      if(lastSelected) {
        lastSelected.setState({selected:false});
      }
      lastSelected = this;
    })
  }
  //点击个人卡片跳转个人详情页面
  jupPersonInfo=(name,tel,percent,props,fuullName)=>{
    let infoData={
      fuullName:fuullName,
      name:name,
      tel:tel,
      percent:percent
    }
    personStore.getPersonInfo(infoData)
    props.history.push({pathname:'/person'})
  }
  componentWillUnmount=()=>{
    this.setState=(state,callback)=>{
      return;
    }
  }
  renderView() {
    const { info,selected} = this.state;
    const  keysWord=info.sensitiveWords.map((item,index)=>
      info.sensitiveWords.length-1==index?
      <span key={index}>
        {item}
      </span>
      : <span key={index}>
        {item +'、'}
      </span>
    )
    const Behavior =info.AbnormalBehavior.map((item,index)=>
      info.AbnormalBehavior.length-1==index?
        <span key={index}>
        {item}
      </span>
        : <span key={index}>
        {item +'、'}
      </span>
    )
    const tags=info.tags.map((item,index)=>
      <span  className="findCard" key={index} color="orange">{item}</span>
    )
    return (
      <VGroup className={classnames('detech-keywords', selected ? 'keyword_active' : null)} verticalAlign="flex-start" onMouseEnter={this.selectedFn} onMouseLeave={this.selectedFn} onClick={() => {this.jupPersonInfo(info.name,info.tel,info.percent,this.props,info.fuullName)}} width="380px" height={selected ? 'auto' : '230px'}>
        <HGroup className="detech-header" height="80px" padding="10px">
          <div style={{marginTop:'15px',marginLeft:"8px"}}>
             <Badge count={info.warning}><Avatar icon="user" size="large"/></Badge>
          </div>
          <div className="detech-pop">
            <span>姓名：{info.name}</span>
            <span>电话：{info.tel}</span>
          </div>
          <span>
               <b style={{fontSize:'25px',lineHeight:'36px',color:'#43f5c5',padding:'50px 0px 0px 10px'}}>{info.percent}</b>
          </span>
        </HGroup>
        <HGroup className={classnames( selected ? 'keyWords-select' : 'keyWords')}>
         <span style={{display:"inline-block",width:'80px'}}>敏感词组:</span>
          <div className={classnames( selected ? 'words-list' : 'words-list-ellipsis')}>
            {keysWord}
          </div>
        </HGroup>
        <hr className="hrLineStyle" />
        <HGroup padding="8px 8px 8px 20px">
          <div className={classnames( selected ? 'tag-select' : 'tag')}>
            <span style={{marginRight:'5px'}}>标签类型:</span>
            {tags}
          </div>
        </HGroup>
        <HGroup padding="8px 8px 8px 20px">
          <div className={classnames( selected ? 'behavior-select' : 'behavior')}>
            <span style={{marginRight:'5px'}}>异常行为:</span>
            {Behavior}
          </div>
        </HGroup>
      </VGroup>
    )
  }

  render(){

    const { makeFun } = this.props;

    return makeFun ? (
      this.renderView()

    ) : this.renderView()
    // return this.renderView()
  }
}

export default class findCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cols:4,
      containerHeight:window.screen.height - 80 + 'px'
    };
  }

  renderCell(rdx, items, cols) {
    const cells = [];
    const nums = rdx * cols;
    const width=cols*395+'px';
    for(let i = 0; i  < cols; i++) {
      const key = nums + i;

      if(key > items.length - 1) break;

      const item = items[key];

      cells.push(<InfoCard info={item} key={i} makeFun={this.props.makeFun}/>)}
    return (
        <HGroup height="265px" width={width} key={rdx} padding="5px 0px 0px 20px" verticalAlign="center" className="row-find-card">
          { cells }
        </HGroup>
    )
  }

  renderRows(items, cols) {
    const rows = [];
    const deve = Math.max(Math.floor(items.length / cols), 1);
    const nums = items.length > cols && items.length % cols !== 0 ? deve + 1 : deve;

    for(let i = 0; i < nums; i++) {
      rows.push(this.renderCell(i, items, cols));
    }

    return rows;
  }

  render() {
    const { data } = this.props;
    return (

      <div className="keyWordBox" style={{height:"calc(100% - 42px)"}}>
        { this.renderRows(data || [], this.state.cols) }
      </div>
    )
  }
}
