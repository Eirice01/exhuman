import React from 'react'
import { HGroup } from 'v-block.lite/layout'


function PoliceTable(props){
    const tableUI = props.data.map((item,index) => {
        if(index%2 == 0){
            return (
                <HGroup key={index} className="table-cell table-cell-bg">
                    <div style={{width:'70px'}}>{index+1}</div>
                    <div style={{width:'100px'}} className="table-name" onClick={() => props.changeShowTable(false,item)}>{item.name}({item.exhumans})</div>
                    <div style={{width:'100px'}}>{item.tel}</div>
                    <div style={{width:'100px'}}>{item.region}</div>
                    <div style={{flexGrow:1}}>{item.area}</div>
                </HGroup>)
        } else {
            return (
                <HGroup key={index} className="table-cell">
                    <div style={{width:'70px'}}>{index+1}</div>
                    <div style={{width:'100px'}} className="table-name" onClick={() => props.changeShowTable(false,item)}>{item.name}({item.exhumans})</div>
                    <div style={{width:'100px'}}>{item.tel}</div>
                    <div style={{width:'100px'}}>{item.region}</div>
                    <div style={{flexGrow:1}}>{item.area}</div>
                </HGroup>)
        }
    })
    return (
        <div style={{padding:"10px 20px",height:"100%",overflowX:"hidden",overflowY:"auto"}}>
            <HGroup className="table-cell">
                <div style={{width:'70px'}}>序号</div>
                <div style={{width:'100px'}}>区域民警</div>
                <div style={{width:'100px'}}>联系电话</div>
                <div style={{width:'100px'}}>所属县区</div>
                <div style={{flexGrow:1}}>管辖区域</div>
            </HGroup>
           {tableUI} 
        </div>
    )
}

export default PoliceTable;