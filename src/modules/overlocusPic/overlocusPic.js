import React, { Component} from 'react'
import { HGroup, VGroup } from 'v-block.lite/layout'
import url1 from '../../assets/images/person/活动面积.png'
import url2 from '../../assets/images/person/活动网格数.png'
export default class OverlocusPic extends Component{
  constructor(props){
    super(props)

  }
  render(){
    const  datas=this.props.overlocusPicData;
    const overPic=datas.map((item,index)=>
    {
      let url=item.type=="mj"?url1:url2;
      return (
        <HGroup key={index} style={{width:'49%',height:'100%',borderTop:'2px solid #275c9e',padding:'10px 35px',background:'#0f1940'}}>
          <VGroup style={{width:'40%',height:'100%',textAlign:'center'}}>
          <span style={{display:'block',marginTop:'10px'}}>
            <img src={url}/>
          </span>
            <span style={{display:'block',marginTop:'8px'}}>
            {item.title}
          </span>
          </VGroup>
          <VGroup style={{width:'60%',height:'100%'}} className="over-pic-info">
           <span className="over-unusual">
             异常值 <span className="over-number">{item.unusualCunt}<a style={{color:'#1db1c2',fontSize:'12px'}}>{item.dw}</a></span>
           </span>
            <span className="over-num-line">/</span>
            <span className="over-usual">
            参考值 <span style={{fontSize:'18px',margin:'0px 10px',fontWeight:'700'}}>{item.ckCunt}<a style={{ color: '#387fd7',fontSize:'12px'}}>{item.dw}</a></span>
           </span>
          </VGroup>
        </HGroup>
      )
    }

    )
    return(
      <HGroup style={{width:'100%',height:'100%'}} className="over-pic-content">
        {overPic}
      </HGroup>
    )
  }

}
