import React, { Component } from 'react';
import { Menu, Input,Icon } from 'antd';
import { HGroup,VGroup } from 'v-block.lite/layout'

import KeyWords from './keyword'

const renderMenuItem = item => (
    <Menu.Item key={item.id}>
			<span className="nav-text">{item.title}</span>
    </Menu.Item>
);

class LeftPerson extends React.Component {

	batchDelete = () => {
		console.log("批量删除")
  };

  render() {
    const { items, dkeys } = this.props;
    const menus = items.map((t, id) => ({ id, title: t.title }));
    return (
      <VGroup className="left-person" width="124px" horizontalAlign="center">
				<Menu defaultSelectedKeys={dkeys || []} style={{width:'inherit'}}>
						{Array.isArray(menus) && menus.map( item => renderMenuItem(item) )}
				</Menu>
      </VGroup>
    );
  }
}

const { Search } = Input;

export default class Content extends Component{
  state = { showLeftPerson: true };

	render(){
    const { items, datas, dkeys, makeFun } = this.props.providers || { items: [], datas: [] };
      // console.log(datas)
		return (
      <HGroup className="content" horizontalAlign="space-between" verticalAlign="stretch" flex>
				<LeftPerson items={items} dkeys={dkeys}/>
				<VGroup className="right-content" horizontalAlign="stretch" flex>
					<HGroup horizontalAlign="space-between" height="45px" padding="5px 0px 0px 20px">
						<Search className="searchInput" placeholder="请输入姓名/关键词" onSearch={value => console.log(value)} enterButton />
						<HGroup width="100px" horizontalAlign="center" verticalAlign="center" className="batchDelete">
							<Icon type="delete" style={{fontSize:'18px',paddingRight:'10px'}}/>
							<span onClick={this.batchDelete} style={{verticalAlign: 'text-bottom'}}>批量删除</span>
						</HGroup>
					</HGroup>
					<KeyWords items={datas} makeFun={makeFun}/>
				</VGroup>
      </HGroup>
		)
	}
}


