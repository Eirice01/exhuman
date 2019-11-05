import './detect.less'

import React, { Component } from 'react'
import { HGroup } from 'v-block.lite/layout'

// import SideBar from './sideBar'
import Content from './content'

import { NonServerData } from '@store/people-store'

export default class StaticsView extends Component {

  render() {
    const _finds  = this.props.match.path === '/find' ? true : false;
    const items = NonServerData.targetPeoples();
    const datas = _finds ? NonServerData.DrugPeoples() : NonServerData.abnormalPeoples();

    return (
      <HGroup className="main" verticalAlign="stretch" flex>

        {/*<SideBar active={_finds ? null : ['7']} />*/}
        <Content providers={{ items, datas, dkeys: _finds ? null : ['1'], makeFun: !_finds }} />
      </HGroup>
    )
  }
}
