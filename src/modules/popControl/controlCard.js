import './control.less'
import React, { Component} from 'react'
import {Avatar,Badge,Icon} from 'antd';
import { HGroup,VGroup } from 'v-block.lite/layout'
class CardCell extends Component {
    showDetailCard(index){
      let el = document.querySelector(`#detailCard${index}`)
      el.classList.add('keyword-container-active')
    }
    hideDetailCard(index){
      let el = document.querySelector(`#detailCard${index}`)
      el.classList.remove('keyword-container-active')
    }
    render(){
        const { name ,count , tools , localtion , nearplace } = this.props.cardCellData;
        const info = this.props.info;
        const places = nearplace.map((item,index)=> (<p key={index} className="nearplaces"><span>{index+1}.&nbsp;&nbsp;</span>{item}</p>))
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
         <span key={index} className="span-tag">{item}</span>
        )
        return (
            <VGroup className='control_active' verticalAlign="flex-start" width="300px" height='auto'>
            <HGroup className="detech-header tools-container" height="80px" padding="15px 15px 5px 15px">
              <div>
                  <p>
                      <span className="icon-span icon-span1">
                        <Icon type="tool" theme="filled" rotate="270"/>
                      </span>
                      <span className="tools-tit">可疑工具</span>
                  </p>
                  <p className="tools-content">{tools}</p>
              </div>
              <div style={{marginLeft:"8px"}}>
                 <Badge count={count} className="badge-avatar"><Avatar icon="user" size="large" onMouseEnter={this.showDetailCard.bind(this,this.props.index)}  style={{cursor:"pointer"}}/></Badge>
                 <p style={{textAlign:'center',margin:'0px',fontSize:'12px',color:'#aaa',lineHeight:'20px'}}>{name}</p>
              </div>
            </HGroup>
            <HGroup className="detech-header tools-container"  padding="0 15px 15px 15px">
              <div>
                  <p>
                      <span className="icon-span icon-span2">
                        <Icon type="environment" theme="filled" />
                      </span>
                      <span className="tools-tit">最后位置</span>
                  </p>
                  <p className="tools-content">{localtion}</p>
              </div>
            </HGroup>
            <HGroup className="detech-header tools-container"  padding="0 15px 5px 15px">
              <div style={{width:'100%'}}>
                  <p>
                      <span className="icon-span icon-span3">
                        <Icon type="home" theme="filled" />
                      </span>
                      <span className="tools-tit">最近出现场所</span>
                  </p>
                  <div className="place-container">
                    {places}
                  </div>
              </div>
            </HGroup>
            <div id={`detailCard${this.props.index}`} className={`keyword-container`} onMouseLeave={this.hideDetailCard.bind(this,this.props.index)}>
                <VGroup className='control-keyword_active' verticalAlign="flex-start" width="250px" height='100%'>
                    <HGroup className="control-header" height="40px" padding="10px" verticalAlign="center" horizontalAlign="space-between">
                        <span>电话：{info.tel}</span>
                        <span>
                            <b style={{fontSize:'25px',lineHeight:'36px',color:'#43f5c5',padding:'30px 0px 0px 10px'}}>{info.percent}</b>
                        </span>
                    </HGroup>
                    <HGroup className='container-keyWords-select infoGroup'>
                        <span style={{display:"inline-block",width:'115px',fontSize:'12px'}}>敏感词组:</span>
                        <div className='container-words-list'>
                            {keysWord}
                        </div>
                    </HGroup>
                    <HGroup className="infoGroup">
                        <div className='container-tag-select'>
                            <span style={{marginRight:'5px'}}>标签类型:</span>
                            {tags}
                        </div>
                    </HGroup>
                    <HGroup className="infoGroup">
                        <div className='container-behavior-select'>
                            <span style={{marginRight:'5px'}}>异常行为:</span>
                            {Behavior}
                        </div>
                    </HGroup>
                </VGroup>
            </div>
          </VGroup>
        )
    }
}
class InfoCard extends Component{
  constructor(props){
    super(props)
    this.state = { info:props.info,key:props.index}
  }
  componentWillUnmount=()=>{
    this.setState=(state,callback)=>{
      return;
    }
  }
  renderView() {
    const { info,key} = this.state;
    const cardCellData = {
        name:info.name,
        count:info.count,
        tools:info.tools,
        localtion:info.localtion,
        nearplace:info.nearplace
    }
    return (
        <CardCell cardCellData={cardCellData} info={info} index={key}></CardCell>
    )
  }

  render(){
    return this.renderView();
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
    const width=cols*335+'px';
    for(let i = 0; i  < cols; i++) {
      const key = nums + i;

      if(key > items.length - 1) break;

      const item = items[key];

      cells.push(<InfoCard info={item} key={item.id} index={item.id} makeFun={this.props.makeFun}/>);
    }
    return (
      <HGroup height="265px" width={width} key={rdx} padding="5px 0px 0px 20px" verticalAlign="center" className="row-control-card">
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

      <div className="keyWordBox">
        { this.renderRows(data || [], this.state.cols) }
      </div>
    )
  }
}
