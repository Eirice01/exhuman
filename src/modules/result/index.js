import React, { Component} from 'react'
import { Icon , DatePicker , Select , Input } from 'antd'
import moment from 'moment';
import { HGroup,VGroup } from 'v-block.lite/layout'
import TableView from './tableView'
import './result.less'
import deleteStore from '@store/delete-store'
import { observer } from 'mobx-react'
import DeleteModal from '@containers/delete-modal'
import { NonServerData } from '@store/people-store'

const { Search } = Input;
const { Option } = Select;
const dateFormat = "YYYY-MM-DD"
const fenjus = [
  {
    id:1,
    value:"钢城区分局"
  },
  {
    id:2,
    value:"市中区分局"
  },
  {
    id:3,
    value:"历下区分局"
  },
  {
    id:4,
    value:"槐荫区分局"
  },
  {
    id:5,
    value:"济阳区分局"
  },
  {
    id:6,
    value:"历城区分局"
  },
  {
    id:7,
    value:"章丘区分局"
  },
  {
    id:8,
    value:"商河县分局"
  },
  {
    id:9,
    value:"天桥区分局"
  },
  {
    id:10,
    value:"长清区分局"
  },
  {
    id:11,
    value:"莱芜区分局"
  },
  {
    id:12,
    value:"平阴县公安局"
  }
]
const tableViewRef = React.createRef();

export default
@observer
class Result extends Component{
  constructor(props){
    super(props)
    let tableData;
    this.props.match.params.type == "fj" ? tableData = NonServerData.resultData().result1 : tableData = NonServerData.resultData().result2;
    this.state = {
      type:this.props.match.params.type,
      data:tableData
    }
  }
  gobackFn = () => {
    this.props.history.goBack()
  }
  showDeleteModal = () => {
    let checkList = tableViewRef.current.checkList;
    if(!checkList.length) return;
    deleteStore.showDeleteModal(true);
  }
  batchDelete= () => {
    let checkList;
    if(deleteStore.singleDelete){
      checkList = [deleteStore.singleDeleteId];
      deleteStore.setSingleDelete(false);
      deleteStore.setSingleDeleteId(null);
    } else {
      checkList = tableViewRef.current.checkList;
    }
    if(!checkList.length) return;
    let data = JSON.parse(JSON.stringify(this.state.data))
    for(let i = 0; i < data.length; i++){
      for(let j = 0;j < checkList.length;j++){
        data[i]['idNum'] == checkList[j] && data.splice(i,1)
      }
    }
    this.setState({data:data})
  }
  render(){
    return(
      <VGroup id="result">
        <HGroup height="50px" verticalAlign="center">
          <div className="line-left" onClick={this.gobackFn}>
            <span className="result-back"><Icon  type="arrow-left"/></span>
            <span className="result-back" style={{marginLeft:'8px'}}>返回</span>
          </div>
        </HGroup>

        <VGroup className="search-container">
          <HGroup horizontalAlign="space-between" verticalAlign="center" height="50px">
            {
              this.state.type == 'fj' ? (
                <HGroup gap={20}>
              <DatePicker defaultValue={moment(new Date(), dateFormat)} allowClear={false}/>
              <HGroup gap={10} verticalAlign="center">
                <span className="search-tit">推送来源:</span>
                <Select defaultValue="all" style={{ width: 120 }} >
                  <Option value="all">全部</Option>
                  <Option value="xtts">系统推送</Option>
                  <Option value="jzxf">技侦下发 </Option>
                </Select>
              </HGroup>

              <HGroup gap={10} verticalAlign="center">
                <span className="search-tit">分局:</span>
                <Select defaultValue="all" style={{ width: 120 }} >
                  <Option value="all">全部</Option>
                  {
                    fenjus.map(item => <Option value={item.id} key={item.id}>{item.value}</Option>)
                  }
                </Select>
              </HGroup>

              <HGroup gap={10} verticalAlign="center">
                <span className="search-tit">是否反馈:</span>
                <Select defaultValue="all" style={{ width: 120 }} >
                  <Option value="all">全部</Option>
                  <Option value="yes">是</Option>
                  <Option value="no">否 </Option>
                </Select>
              </HGroup>

              <HGroup gap={10} verticalAlign="center">
                <span className="search-tit">是否重点人:</span>
                <Select defaultValue="all" style={{ width: 120 }} >
                  <Option value="all">全部</Option>
                  <Option value="yes">是</Option>
                  <Option value="no">否 </Option>
                </Select>
              </HGroup>

            </HGroup>
              ) : (
                <Select defaultValue="all" style={{ width: 200 }} >
                  <Option value="all">全部</Option>
                  <Option value="0">已反馈</Option>
                  <Option value="1">待处理</Option>
                  <Option value="2">重点管控小组 </Option>
                </Select>
              )
            }
            <HGroup verticalAlign="center" gap={20}>
                <span className="batch-delete" onClick={this.showDeleteModal}>批量删除</span>
                <Search className="searchInput" placeholder="请输入姓名/身份证号" onSearch={() => console.log("区域名")} enterButton style={{width:"400px"}}/>
            </HGroup>
          </HGroup>
        </VGroup>
        <VGroup className="table-content"  horizontalAlign="center">
                <TableView type={this.state.type} data={this.state.data} ref={tableViewRef}/>
        </VGroup>
        {/* 删除提示框 */}
        <DeleteModal batchDelete={this.batchDelete}/>
      </VGroup>
    )
  }
}
