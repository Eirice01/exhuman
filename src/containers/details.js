import './details.less'

import React from 'react'
import { VGroup } from 'v-block.lite/layout'

import DetailsView from '../modules/details'

export default function Details() {
  return (
    <VGroup className="details" width="22%" horizontalAlign="center" verticalAlign="flex-start">
      <DetailsView></DetailsView>
    </VGroup>
  )
}
