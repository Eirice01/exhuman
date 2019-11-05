import React,{ Component , useEffect } from 'react'
import { Icon , Badge , Avatar} from 'antd'
import { HGroup,VGroup } from 'v-block.lite/layout'
import { classnames } from 'v-block.lite/common'
import { withRouter } from 'react-router-dom'
import { NonServerData } from '@store/people-store'
import  personStore from '../../store/person-store'
export default (props) => {
    const data = NonServerData.policeInfoCardData(props.currentPolice);
    useEffect(()=>{
      props.showExhumanPoints(data);
      return () => {
        props.clearExhumanPoints();
      }
    },[])
    const cardList = data.map((item,index) => <InfoCard info={item} key={index}/>)
    return (
        <VGroup height="100%" padding="10px">
            <HGroup>
                <div style={{cursor:"pointer",color:"#27e3fc"}} onClick={() => props.changeShowTable(true)}><Icon type="rollback"/><span style={{paddingLeft:"5px"}}>返回</span></div>
            </HGroup>
            <HGroup style={{height:"calc(100% - 26px)",flexWrap:"wrap"}} padding="5px 0px 0px 0px" gap={5} overflow="auto">
                {cardList}
            </HGroup>
        </VGroup>
    )
}

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
      <VGroup className={classnames('detech-keywords', selected ? 'keyword_active' : null)} verticalAlign="flex-start" onMouseEnter={this.selectedFn} onMouseLeave={() => this.setState({selected:false})} onClick={() => {this.jupPersonInfo(info.name,info.tel,info.percent,this.props,info.fuullName)}} width="290px" height={selected ? '330px' : '230px'}>
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
    return  this.renderView()
  }
}