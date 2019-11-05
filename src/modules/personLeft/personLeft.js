import React, { Component} from 'react'
import { HGroup, VGroup } from 'v-block.lite/layout'
import { NonServerData } from '@store/people-store'
import personStore from "../../store/person-store";
import {Avatar} from 'antd';
export default class PersonLeft extends Component{
  constructor(props){
    super(props)
  }

  scrollToAnchor=(name)=>{
    this.props.closeComcationTable()
    if(name=='discus-content'){
      this.props.showDiscusModal()
    }else {
      this.props.closeDiscusModal()
    }
    let anchorElement='';
    anchorElement=document.getElementById(name)
    if(anchorElement){anchorElement.scrollIntoView({block:'start',behavior:'smooth'})}
  }
  getText = (data,operator) => {
    let text = data.join(operator);
    if(text.length == operator) text = text.substr(0,text.length-1);
    return text;
  }
  render(){
    const {name,tel,percent,fuullName}=personStore.personInfo
    const info= NonServerData.personInfo(fuullName)
    const tags=info.tags.map((item,index)=>
      <span key={index} className="span-tags" style={{backgroundColor:item.bg,borderColor:item.borColor,color:item.color}}>{item.title}</span>
    )
    //敏感词组
    const sensitiveWords=info.sensitiveWords.map((item,index)=>
      info.sensitiveWords.length-1==index?
        <span key={index} style={{fontSize:'12px'}}>
            {item}
        </span>
        : <span key={index}>
            {item +'、'}
        </span>
    )
    //搜索敏感词
    const searchWords=info.search.map((item,index)=>
      info.search.length-1==index?
        <span key={index} style={{color:'#8a2b49',fontSize:'12px'}}>
            {item}
        </span>
        : <span key={index} style={{color:'#8a2b49',fontSize:'12px'}}>
            {item +'、'}
        </span>
    )
    //评论敏感词
    const discus=info.discus.map((item,index)=>
      info.discus.length-1==index?
        <span key={index} style={{color:'#8a2b49',fontSize:'12px'}}>
            {item}
        </span>
        : <span key={index} style={{color:'#8a2b49',fontSize:'12px'}}>
            {item +'、'}
        </span>
    )
    //轨迹出入敏感地带
    const locusAddress=info.locusAddress.map((item,index)=>
      info.locusAddress.length-1==index?
        <span key={index} style={{color:'#1db1c2',fontSize:'12px'}}>
            {item}
        </span>
        : <span key={index} style={{color:'#1db1c2',fontSize:'12px'}}>
            {item +'；'}
        </span>
    )
    //出入特定场所
    const specialAddress=info.specialAddress.map((item,index)=>
      info.specialAddress.length-1==index?
        <span key={index} style={{color:'#1db1c2',fontSize:'12px'}}>
            {item}
        </span>
        : <span key={index} style={{color:'#1db1c2',fontSize:'12px'}}>
            {item +'、'}
        </span>
    )
    return(
      <div style={{width:'100%',height:'100%'}}>
        <div>
          <HGroup className="cls-header">
            <div className="header-icon">
              <span className="cle-inco">
                <span style={{display: 'inline-block', position: 'relative'}}>
                  <Avatar size={40} icon="user" style={{backgroundColor: '#112b4b', color: '#1a7492'}}/>
                  <span className="cls-count">{info.warning}</span>
                </span>
               <span className="cls-name">
                 <p style={{marginBottom: '4px', fontSize: '12px', fontWeight: '700'}}>{name}</p>
                 <p className="cls-next">下发分局</p>
               </span>
              </span>
              <span className="cls-person-count">{percent}</span>
            </div>
          </HGroup>
          <HGroup>
            <p style={{color: '#abb5cc', fontSize: '10px'}}><span>电话：</span>{tel}</p>
          </HGroup>
          <HGroup>
            <p style={{color: '#abb5cc', fontSize: '10px'}}><span>家庭住址：</span>{info.address}</p>
          </HGroup>
          <HGroup>
            <p style={{color: '#abb5cc', fontSize: '10px'}}><span>敏感词组：</span>{sensitiveWords}</p>
          </HGroup>
          <HGroup style={{borderBottom: '1px solid #222b4f', paddingBottom: '5px'}}>
            <p><span style={{color: '#abb5cc', fontSize: '10px'}}>标签类型：</span>{tags}</p>
          </HGroup>
        </div>
        {/*短信开始*/}
        <div>
          <HGroup className="cls-message  cls-list">
            <p>
              <span className="cls-img" style={{marginRight: '23px'}}><img src={require("../../assets/images/person/短信.png")}
                                                                           alt=""/></span>
              <span style={{color: '#b5b9c3', fontSize: '16px'}}>短信</span>
            </p>
          </HGroup>
          <VGroup className="cls-more">
            <li className="cls-info-more">
              <span style={{color: '#828ba5'}}>传播敏感词：</span>
              <a className="cls-btn" onClick={() => this.scrollToAnchor('personMessage')}>查看详情</a>
            </li>
            <li>
              <span style={{color: '#1ca1b5', fontSize: '12px'}}>{this.getText(info.message,'；')}</span>
            </li>
          </VGroup>
          <HGroup className="cls-line-tr"></HGroup>
        </div>

        {/*短信结束*/}

        {/*搜索开始*/}
        <div>
          <HGroup className="cls-search  cls-list">
            <p>
              <span className="cls-img"><img src={require("../../assets/images/person/搜索.png")} alt=""/></span>
              <span style={{color: '#b5b9c3', fontSize: '16px'}}>搜索</span>
            </p>
          </HGroup>
          <VGroup className="cls-more">
            <li className="cls-info-more">
              <span style={{color: '#828ba5'}}>搜索敏感词：</span>
              <a className="cls-btn" onClick={() => this.scrollToAnchor('personSearch')}>查看详情</a>
            </li>
            <li>
              {searchWords}
            </li>
          </VGroup>
          <HGroup className="cls-line-tr"></HGroup>
        </div>
        {/*搜索结束*/}

        {/*评论开始*/}
        <div>
          <HGroup className="cls-discus  cls-list">
            <p>
              <span className="cls-img"><img src={require("../../assets/images/person/评论.png")} alt=""/></span>
              <span style={{color: '#b5b9c3', fontSize: '16px'}}>评论</span>
            </p>
          </HGroup>
          <VGroup className="cls-more">
            <li>
              <span style={{color: '#828ba5'}}>偏激度：</span>
              <span style={{color: '#4ee2ef', fontSize: '20px', fontWeight: '700'}}>{info.discusCunt}</span>
            </li>
            <li className="cls-info-more">
              <span style={{color: '#828ba5'}}>评论敏感词：</span>
              <a className="cls-btn" onClick={() => this.scrollToAnchor('discus-content')}>查看详情</a>
            </li>
            <li>
              {discus}
            </li>
          </VGroup>
          <HGroup className="cls-line-tr"></HGroup>
        </div>
        {/*评论结束*/}
        {/*通联开始*/}
        <div>
          <HGroup className="cls-com-cation  cls-list">
            <p>
              <span className="cls-img"><img src={require("../../assets/images/person/通联.png")} alt=""/></span>
              <span style={{color: '#b5b9c3', fontSize: '16px'}}>通联</span>
            </p>
          </HGroup>
          <VGroup className="cls-more">
            <li className="cls-info-more">
              <span style={{color: '#828ba5'}}>通联异常值统计：</span>
              <a className="cls-btn" onClick={() => this.scrollToAnchor('comcation-content')}>查看详情</a>
            </li>
            <li>
              <span style={{color: '#8a2b49'}}>{info.cation}</span>
            </li>
          </VGroup>
          <HGroup className="cls-line-tr"></HGroup>
        </div>
        {/*通联结束*/}
        {/*轨迹开始*/}
        <div>
          <HGroup className="cls-locus  cls-list">
            <p>
              <span className="cls-img"><img src={require("../../assets/images/person/轨迹-4.png")} alt=""/></span>
              <span style={{color: '#b5b9c3', fontSize: '16px'}}>轨迹</span>
            </p>
          </HGroup>
          <VGroup className="cls-more">
            <li className="cls-info-more">
              <span style={{color: '#828ba5'}}>出入敏感地：</span>
              <a className="cls-btn" onClick={() => this.scrollToAnchor('locuscontent')}>查看详情</a>
            </li>
            <li>
              {locusAddress}
            </li>
            <li className="cls-info-more">
              <span style={{color: '#828ba5'}}>消失：</span>
            </li>
            <li>
              <span style={{color: '#1db1c2', fontSize: '12px'}}>{info.locusDisper}</span>
            </li>
            <li className="cls-info-more">
              <span style={{color: '#8a2b49', fontSize: '12px'}}>超出常规活动范围：{info.abover}</span>
              <a className="cls-btn" onClick={() => this.scrollToAnchor('over-locus')}>查看详情</a>
            </li>
            <li className="cls-info-more">
              <span style={{color: '#828ba5'}}>出入特定场所：</span>
            </li>
            <li>
              {specialAddress}
            </li>
          </VGroup>
        </div>
      </div>
    )
  }
}
