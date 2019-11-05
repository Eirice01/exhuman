import React, { Component, Fragment } from 'react'
import { Icon } from 'antd';
import { HGroup,VGroup } from 'v-block.lite/layout'
import { classnames } from 'v-block.lite/common'
import { Link } from 'react-router-dom';

let lastSelected = null;
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
   componentWillUnmount=()=>{
      this.setState=(state,callback)=>{
        return;
    }
   }
  renderView() {
    const { info,selected} = this.state;
    return (
      <VGroup className={classnames('detech-keywords', selected ? 'keyword_active' : null)} verticalAlign="flex-start" onClick={this.selectedFn} width="380px" height={selected ? '310px' : '265px'}>
				<HGroup className="detech-header" height="105px">
					<Icon type="github" style={{ fontSize:'57px',color:'#08c',padding:'34px 0 0 42px'}}/>
					{
            info.notPercent !== true && (
              <Fragment>
                <b style={{fontSize:'30px',lineHeight:'42px',padding:'42px 0px 0px 15px'}}>{info.label}</b>
                <b style={{fontSize:'25px',lineHeight:'36px',color:'#43f5c5',padding:'50px 0px 0px 10px'}}>{info.percent}</b>
              </Fragment>
            )
          }
					<Icon type="heart" title="收藏" style={{ position:'absolute',padding:'20px 0px 0px 325px',fontSize:'28px',color:'#f5a623'}}/>
					<p style={{width: 66}}>取消收藏</p>
				</HGroup>
				<hr className="hrLineStyle" />
				<HGroup className="keyWordInfo" height="30px" horizontalAlign="space-between" padding="8px 8px 8px 20px">
					<span>姓名：{info.name}</span>
					<span>职业：{info.career}</span>
				</HGroup>
				<HGroup className="keyWordInfo" height="30px" horizontalAlign="flex-start" padding="8px 8px 8px 20px">
					<span>电话：{info.tel}</span>
				</HGroup>
				<HGroup className="keyWordInfo" height="30px" horizontalAlign="flex-start" padding="8px 8px 8px 20px">
					<span>身份证号：{info.idCard}</span>
				</HGroup>
				<HGroup className="keyWordInfo" height="60px" horizontalAlign="flex-start" padding="8px 8px 8px 20px">
					<p>
						异常类型：{
						info.aberrant.length &&
						info.aberrant.map((k,i) => (<span className="imageTag" title={k.label} key={i}><img src={k.value} /></span>))
					}
					</p>
				</HGroup>
				<HGroup className={selected ? 'show' : 'hide'} height="30px" horizontalAlign="flex-start" padding="8px 8px 8px 20px">
					<span>异常行为：{info.AbnormalBehavior}</span>
				</HGroup>
        <HGroup className={'detailInfo'}>
          <HGroup className="keyWordInfo" height="30px" horizontalAlign="space-between" padding="8px 8px 8px 20px">
            <span>姓名：{info.name}</span>
            <span>职业：{info.career}</span>
          </HGroup>
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


export default class KeyWords extends Component {

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
		for(let i = 0; i  < cols; i++) {
      const key = nums + i;

      if(key > items.length - 1) break;

      const item = items[key];

			cells.push(<InfoCard info={item} key={i} makeFun={this.props.makeFun}/>);
		}
		return (
			<HGroup height="265px" key={rdx} padding="5px 0px 0px 20px">
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
    const { items } = this.props;
		const {containerHeight} = this.state;
		return (
			<VGroup className="keyWordBox" gap={10} height={containerHeight} verticalAlign="flex-start">
				{ this.renderRows(items || [], this.state.cols) }
			</VGroup>
		)
	}
}
