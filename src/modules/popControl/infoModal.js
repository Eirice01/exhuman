import React,{ Component } from "react";
import { HGroup, VGroup } from "v-block.lite/layout";
import { Icon , Tabs , Input , Pagination } from 'antd'
import { NonServerData } from '@store/people-store'

const { TabPane } = Tabs;
const { Search } = Input;

class InfoModal extends Component {
    constructor(props){
        super(props)
    }
    render(){
        const { pushMore , dispatchMore} = NonServerData.controlMoreInfoData();
        return (
            <div className="infoModal-container">
                <VGroup width="100%" height="100%" padding="20px">
                    <HGroup horizontalAlign="space-between">
                        <div style={{color:"#b0c6f5",lineHeight:'20px'}}>
                            <Icon type="sound" theme="filled" style={{fontSize:'20px'}}/>
                            <span style={{paddingLeft:'5px',verticalAlign:'top'}}>公告详情</span>
                        </div>
                        <Icon type="close-circle" theme="filled" style={{color:"#6cacd8",fontSize:"18px",cursor:"pointer"}} onClick={() => this.props.closeModal()}/>
                    </HGroup>
                    <Tabs defaultActiveKey="1" style={{color:"#ebebeb"}}>
                        <TabPane tab="系统推送" key="1">
                            <Search className="searchInput" placeholder="请输入关键词" onSearch={value => console.log(value)} enterButton/>
                            <InfoTable infos={pushMore} />
                            <div className="table-pager-container"><Pagination defaultCurrent={1} total={10} /></div>
                        </TabPane>
                        <TabPane tab="技侦下发" key="2">
                            <Search className="searchInput" placeholder="请输入关键词" onSearch={value => console.log(value)} enterButton/>
                            <InfoTable infos={dispatchMore} />
                            <div className="table-pager-container"><Pagination defaultCurrent={1} total={10} /></div>
                        </TabPane>
                    </Tabs>
                </VGroup>
            </div>
        )
    }
}

const InfoTable = (props) => {
    const tableUI = props.infos.map((item,index) => {
        if(index%2 == 0){
            return (
                <HGroup key={index} className="table-cell table-cell-bg">
                    <div style={{width:'100px'}}>{index+1}</div>
                    <div style={{width:'250px'}}>{item.time}</div>
                    <div style={{width:'350px'}}>{item.info}</div>
                </HGroup>)
        } else {
            return (
                <HGroup key={index} className="table-cell">
                    <div style={{width:'100px'}}>{index+1}</div>
                    <div style={{width:'250px'}}>{item.time}</div>
                    <div style={{width:'350px'}}>{item.info}</div>
                </HGroup>)
        }
    })
    return (
        <VGroup padding="10px 0px">
           {tableUI} 
        </VGroup>
    )
}
export default InfoModal;