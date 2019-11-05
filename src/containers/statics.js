import './statics.less'

import React from 'react'
import { VGroup } from 'v-block.lite/layout'

import StaticsView from '../modules/statics'

export default function Statics() {
  return (
    <VGroup className="statics" width="22%" horizontalAlign="center" verticalAlign="flex-start">
      <StaticsView></StaticsView>
    </VGroup>
  )
}
