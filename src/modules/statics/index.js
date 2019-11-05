import './statics.less'

import React, { Component } from 'react'
import { VGroup } from 'v-block.lite/layout'

import StaticsAll from './statics-all';
import StaticsPie from './statics-pie'
import StaticsPush from './statics-push'
// import StaticsCtrl from './statics-ctrl'
// import StaticsWarning from './statics-warning'

export default class StaticsView extends Component {
  render() {
    return (
      <VGroup verticalAlign="flex-start" gap={20}>
        <StaticsAll></StaticsAll>
        <StaticsPush></StaticsPush>
        <StaticsPie></StaticsPie>
        {/* <StaticsCtrl></StaticsCtrl> */}
        { /* <StaticsWarning></StaticsWarning> */ }
      </VGroup>
    )
  }
}
