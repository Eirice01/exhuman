import './style.less'

import React, { Component, useState } from 'react'
import { observer } from 'mobx-react'
import { HGroup, VGroup } from 'v-block.lite/layout'
import { classnames } from 'v-block.lite/common'

import Map from '@components/map'
import { instance } from './store'
import { NonServerData } from '@store/people-store'

const AreaPeoples = NonServerData.AreasPeoples();


const categories = ['极端行为人', '在控重点人', '自定义异常行为人'];

function Tab({ label, selected, onClick }) {
  return <button className={classnames('category-btn', selected ? 'select' : null)} onClick={onClick}>{label}</button>
}

// eslint-disable-next-line no-unused-vars
function Category({ init, onChange }) {
  const [select, setSelect] = useState(init || categories[0]);

  return (
    <HGroup horizontalAlign="flex-start" width="100%" padding="0 0 0 20px" gap={5}>
     { categories.map(c => <Tab key={c} label={c} onClick={() => (onChange(c), setSelect(c))} selected={select === c}/>) }
    </HGroup>
  )
}

const store = instance();

export default @observer class MapView extends Component {

  constructor() {
    super();
    this.state = { category: categories[0] }
  }

  componentDidMount() {
    store.getMapData();
  }

  dataFunction(mid) {
    return AreaPeoples[mid];
  }

  categoryChange = category => {
    if(category === this.state.category)
      return;
    this.setState({ category });
  }

  render() {
    const { category } = this.state;
    const mapdata = store.mapdata;

    return (
      <VGroup className="map-view" horizontalAlign="center" verticalAlign="center" gap="10" flex>
        { /* <Category init={category} onChange={this.categoryChange}/> */ }
        { mapdata && <Map provider={mapdata} dataFunction={this.dataFunction} category={category}/> }
      </VGroup>
    )
  }
}
