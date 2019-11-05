
import './history.less'

import React, { Component } from 'react'
import { VGroup } from 'v-block.lite/layout'

import HistoryTable from './history-table'


export default class StaticsView extends Component {
  render() {
    return (
      <VGroup verticalAlign="flex-start" flex padding="40px 55px">
        <HistoryTable></HistoryTable>
      </VGroup>
    )
  }
}