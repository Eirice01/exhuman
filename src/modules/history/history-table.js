import '@assets/font/main.less'
import './history.less'


import React, { Component } from 'react'
import { HGroup, VGroup } from 'v-block.lite/layout'

import { NonServerData } from '@store/people-store'

import { DatePicker, Pagination } from 'antd';
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';


function RowTitle({ data }) {
  return (
    <HGroup horizontalAlign="space-around" width="100%" height="40px">
      <HGroup horizontalAlign="center" verticalAlign="center" width="40px">序号</HGroup>
      {data.map((k,i) => (<HGroup key={i} width={k.width}  horizontalAlign="center" verticalAlign="center">{k.type}</HGroup>))}
    </HGroup>
  )
}
function RowList({ colData, title, index }) {
  return (
    <HGroup horizontalAlign="space-around" width="100%" height="40px" className={`row ${(index % 2) == 1 ? 'bg' : ''}`}>
           <HGroup horizontalAlign="center" verticalAlign="center" width="40px">{index}</HGroup>
           {title.map((i,index) => (<HGroup key={index} width={i.width} horizontalAlign="center" verticalAlign="center">{colData[i.rowKey]}</HGroup>))}
    </HGroup>
  )
}


export default class StaticsAll extends Component {
    constructor(props) {
      super(props);
      this.state = {
        column: this.tableColumn(),
        tableList: this.tableData(),
      };
    }
    render() {
        return (
          <VGroup horizontalAlign="center" className="history-table" gap={20}>
            <HGroup className="history-title" width="100%" verticalAlign="center" horizontalAlign="space-between" >
              <HGroup verticalAlign="center" gap={5}>
                <HGroup width="3px" className="titile-line" height="20px"></HGroup>
                <HGroup>疑似极端人推送历史记录</HGroup>
              </HGroup>
              <HGroup><DatePicker defaultValue={moment(new Date(), dateFormat)} format={dateFormat} /></HGroup>
            </HGroup>
            <VGroup className="table" width="100%" gap={20} >
              <VGroup>
                <RowTitle data={this.state.column}></RowTitle>
                {this.state.tableList.map((k,i) => (<RowList key={i} colData={k} title={this.state.column} index={i+1}/>))}
              </VGroup>
              <HGroup horizontalAlign="flex-end">
                <Pagination defaultCurrent={1} total={500} pageSize={15} onChange={this.onChange}/>
              </HGroup>
            </VGroup>
          </VGroup>
        )
    }
    componentDidMount() {
     
    }
    tableColumn(){
      const col = NonServerData.HistoryTableTitle();
      return col;
    }
    tableData(){
      const list = NonServerData.ExtremHistory();
      return list;
    }
    onChange(page, pageSize){
      console.log(page,pageSize);
      
    }
}
