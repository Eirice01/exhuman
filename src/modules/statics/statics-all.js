import '@assets/font/main.less'
import './statics.less'

import React, { Component } from 'react'
import { HGroup, VGroup } from 'v-block.lite/layout'

import { NonServerData } from '@store/people-store'

const { importants, extremes1,extremes2 } = NonServerData.PeoplesStatics();

function NumberCard({ value, label, textConfig}) {
  let { color, sizeNum, sizeText, fontFamily} = textConfig;
  return (
    <VGroup className="item" horizontalAlign="center">
      <HGroup horizontalAlign="center" verticalAlign="center" style={{ color: color, fontSize: sizeNum, fontFamily: fontFamily}}>{value}</HGroup>
      <HGroup horizontalAlign="center" verticalAlign="center" style={{fontSize: sizeText}}>{label}</HGroup>
    </VGroup>
  )
}

const textConfig1={
  color: '#00e4ff',
  sizeNum: '34px',
  sizeText: '16px',
  fontFamily: 'wanghan'
}
const textConfig2={
  color: '#34f6c4',
  sizeNum: '26px',
  sizeText: '12px',
  fontFamily: 'wanghan'
}

export default class StaticsAll extends Component {
    render() {
        return (
          <VGroup horizontalAlign="center" gap={20} width={406}>
            <NumberCard value={extremes1 +extremes2 + importants } label="今日异常人数" textConfig={textConfig1}/>
            <HGroup horizontalAlign="space-between" gap="40px" verticalAlign="center">
              <NumberCard value={extremes2} label="今日发现人数" textConfig={textConfig2}/>
              <HGroup className="line-bg-blue" width="2px" height="30px"></HGroup>
              <NumberCard value={extremes1} label="今日推送人数" textConfig={textConfig2}/>
              <HGroup className="line-bg-blue" width="2px" height="30px"></HGroup>
              <NumberCard value={importants} label="今日管控人数" textConfig={textConfig2}/>
            </HGroup>
          </VGroup>
        )
    }
}
