import './mapbox.less'

import React, { PureComponent } from 'react'
import { HGroup, VGroup } from 'v-block.lite/layout'

import MapView from '@modules/map-view'

// eslint-disable-next-line no-unused-vars
class FilterGroup extends PureComponent {
  render() {
    return (
      <HGroup className="filter-group" verticalAlign="center" gap="10px">
        <span>极端行为人</span>
        <span>在控重点人</span>
        <span>自定义异常行为人</span>
      </HGroup>
    )
  }
}

export default function MapBox() {

  return (
    <VGroup className="mapbox" horizontalAlign="stretch" verticalAlign="center" flex>
      <MapView flex/>
    </VGroup>
  )
}
