import React,{ useState  , useEffect , useMemo , useImperativeHandle } from 'react'
import { HGroup,VGroup } from 'v-block.lite/layout'
import { Icon , Checkbox , Input , Pagination } from 'antd'
import deleteStore from '@store/delete-store'

const TableView =  (props,ref) => {
    const [tableData,setTableData] = useState(props.data);
    const [editModal,setEditModal] = useState(false);
    const [editObj,setEditObj] = useState(null);
    const [addToKeyPerson,setAddToKeyPerson] = useState(false)
    useEffect(()=> {
        let data = JSON.parse(JSON.stringify(props.data))
        setTableData(data)
    },[props.data])
    useImperativeHandle(ref,() => ({
        checkList:checkList
    }))
    function checkAll(e){
        let flag = e.target.checked;
        let data = JSON.parse(JSON.stringify(tableData));
        if(flag){
            data.map(item => {
                item.checked = true;
            })
        } else {
            data.map(item => {
                item.checked = false;
            })
        }
        setTableData(data)
    }
    function tdCheck(e,index){
        let flag = e.target.checked;
        let data = JSON.parse(JSON.stringify(tableData));
        data[index]['checked'] = flag;
        setTableData(data)
    }
    function singleDelete(item){
        deleteStore.showDeleteModal(true);
        deleteStore.setSingleDelete(true);
        deleteStore.setSingleDeleteId(item.idNum);
    }
    function eidtInfo(item){
        setEditModal(true)
        let editInfo = {
            name:item.name,
            idNum:item.idNum,
            address:item.address,
            time:item.time,
            source:item.source,
            responsible:item.responsible,
            info:item.info,
            keyPerson:item.keyPerson
        }
        setEditObj(editInfo);
    }
    function addToKey(index){
        let data = JSON.parse(JSON.stringify(tableData));
        data[index]["keyPerson"] = true;
        setTableData(data);
        setAddToKeyPerson(true);
    }
    const checkList = useMemo(() => {
        let checkList = [];
        tableData.map(item => {
            item.checked && checkList.push(item.idNum);
        })
        return checkList;
    },[tableData])
    return (
        <>
            {/* 修改模态框 */}
            { editModal && (
                <div className="edit-modal">
                    <VGroup className="edit-modal-wrap">
                        <HGroup horizontalAlign="flex-end" style={{padding:"5px"}}>
                            <Icon type="close-circle" theme="filled" style={{color:"#6cacd8",fontSize:"18px",cursor:"pointer"}} onClick={()=>setEditModal(false)}/>
                        </HGroup>
                        <VGroup className="edit-modal-content" verticalAlign="center">
                            <HGroup className="edit-item" verticalAlign="center" gap={20}><span className="edit-label">疑似极端人姓名:</span><Input defaultValue={editObj.name} size="small" style={{width:280}}/></HGroup>
                            <HGroup className="edit-item" verticalAlign="center" gap={20}><span className="edit-label">身份证号:</span><Input defaultValue={editObj.idNum} size="small" style={{width:280}}/></HGroup>
                            <HGroup className="edit-item" verticalAlign="center" gap={20}><span className="edit-label">家庭住址:</span><Input defaultValue={editObj.address} size="small" style={{width:280}}/></HGroup>
                            <HGroup className="edit-item" verticalAlign="center" gap={20}><span className="edit-label">推送时间:</span><Input defaultValue={editObj.time} size="small" style={{width:280}}/></HGroup>
                            <HGroup className="edit-item" verticalAlign="center" gap={20}><span className="edit-label">{props.type == 'fj' ? '推送来源' : '推送民警'}:</span><Input defaultValue={editObj.source} size="small" style={{width:280}}/></HGroup>
                            <HGroup className="edit-item" verticalAlign="center" gap={20}><span className="edit-label">{props.type == 'fj' ? '负责分局' : '民警联系方式'}:</span><Input defaultValue={editObj.responsible} size="small" style={{width:280}}/></HGroup>
                            <HGroup className="edit-item" verticalAlign="center" gap={20}><span className="edit-label">反馈信息:</span><Input defaultValue={editObj.info} size="small" style={{width:280}}/></HGroup>
                        </VGroup>
                        <HGroup style={{padding:"10px 30px"}} horizontalAlign="flex-end">
                            <HGroup gap={10}>
                                <div className="modal-btn modal-btn-yes" onClick={()=>setEditModal(false)}>确定</div>
                                <div className="modal-btn" onClick={()=>setEditModal(false)}>取消</div>
                            </HGroup>
                        </HGroup>
                    </VGroup>
                </div>
            )}
            {/* 添加重点人提示框 */}
            { addToKeyPerson && (
                <div className="addToKeyPerson-modal">
                    <VGroup className="addToKeyPerson-modal-wrap">
                        <HGroup horizontalAlign="flex-end" style={{padding:"5px"}}>
                            <Icon type="close-circle" theme="filled" style={{color:"#6cacd8",fontSize:"18px",cursor:"pointer"}} onClick={()=>setAddToKeyPerson(false)}/>
                        </HGroup>
                        <p className="addToKeyPerson-modal-content">已将该人添加至重点管控小组</p>
                        <HGroup style={{padding:"10px 30px"}} horizontalAlign="flex-end">
                            <HGroup gap={10}>
                                <div className="modal-btn modal-btn-yes" onClick={()=>setAddToKeyPerson(false)}>确定</div>
                            </HGroup>
                        </HGroup>
                    </VGroup>
                </div>
            )}
            <VGroup className="table-box">
                <HGroup>
                    <div className="table-item td-index" style={{fontWeight:"bolder"}}><Checkbox onChange={checkAll}/><span style={{display:"inline-block",width:"120px",textAlign:"center"}}>序号</span></div>
                    <div className="table-item td-name" style={{fontWeight:"bolder"}}>疑似极端人姓名</div>
                    <div className="table-item td-id" style={{fontWeight:"bolder"}}>身份证号</div>
                    <div className="table-item td-adress" style={{fontWeight:"bolder"}}>家庭住址</div>
                    <div className="table-item td-time" style={{fontWeight:"bolder"}}>推送时间</div>
                    <div className="table-item td-source" style={{fontWeight:"bolder"}}>{props.type == 'fj' ? '推送来源' : '推送民警'}</div>
                    <div className="table-item td-tel" style={{fontWeight:"bolder"}}>{props.type == 'fj' ? '负责分局' : '民警联系方式'}</div>
                    <div className="table-item td-info" style={{fontWeight:"bolder"}}>反馈信息</div>
                    <div className="table-item td-keyperson" style={{fontWeight:"bolder"}}>添加重点人</div>
                    <div className="table-item td-operation" style={{fontWeight:"bolder"}}>操作</div>
                </HGroup>
                {
                  tableData.map((item,index) => 
                    <HGroup key={item.idNum} style={{background:`${index %2 ==0 ? '#0c1d3b': 'none' }`}}>
                        <div className="table-item td-index"><Checkbox checked={item.checked} onChange={(e) => tdCheck(e,index)}/><span style={{display:"inline-block",width:"120px",textAlign:"center"}}>{index+1}</span></div>
                        <div className="table-item td-name">{item.name}</div>
                        <div className="table-item td-id">{item.idNum}</div>
                        <div className="table-item td-adress">{item.address}</div>
                        <div className="table-item td-time">{item.time}</div>
                        <div className="table-item td-source">{item.source}</div>
                        <div className="table-item td-tel">{item.responsible}</div>
                        <div className="table-item td-info">{item.info}</div>
                        <div className="table-item td-keyperson">{
                            item.keyPerson ? <Icon type="check" style={{color:"#4b8346",fontSize:"16px"}}/> : <Icon type="plus" onClick={addToKey.bind(this,index)} style={{color:"#1f6c9a",cursor:"pointer",fontSize:"16px"}}/>
                        }</div>
                        <HGroup className="table-item td-operation" gap={10} horizontalAlign="center" style={{fontSize:"16px"}}>
                            <Icon type="edit" title="编辑" style={{color:"#3893a5",cursor:"pointer"}} onClick={eidtInfo.bind(this,item)}/>
                            <Icon type="delete" title="删除" style={{color:"#966e3b",cursor:"pointer"}} onClick={singleDelete.bind(this,item)}/>
                        </HGroup>
                    </HGroup>
                )  
                }
            </VGroup>
            <HGroup className="page-box" height="40px" width="100%" verticalAlign="center" horizontalAlign="flex-end" padding="0px 20px">
                <Pagination defaultCurrent={1} total={10} />
            </HGroup>
        </>
    )
}
export default React.forwardRef(TableView);