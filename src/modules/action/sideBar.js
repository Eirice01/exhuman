import React from 'react';
import { Menu } from 'antd';
import { VGroup } from 'v-block.lite/layout'

import { NonServerData } from '@store/people-store'

const renderMenuItem = item => (
    <Menu.Item key={item.id}>
			<span className="nav-text">{item.title}</span>
    </Menu.Item>
);

export default class Sider extends React.Component {

  render() {
    const { active } = this.props;
    const dkeys = active ? active : ['1'];
    const menus = NonServerData.ExtremePeoples().map((t, id) => ({ id, title: t.label }));

    return (
      <VGroup className="side-menu" horizontalAlign="center">
				<Menu defaultSelectedKeys={dkeys} style={{height:'100%'}}>
					{Array.isArray(menus) && menus.map( item => renderMenuItem(item) )}
				</Menu>
      </VGroup>
    );
  }
}
