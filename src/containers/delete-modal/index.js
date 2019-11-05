import React from 'react'
import './deleteModal.less'
import { HGroup,VGroup } from 'v-block.lite/layout'
import { Icon } from 'antd'
import deleteStore from '@store/delete-store.js'
import { observer } from 'mobx-react'

function DeleteModal(props) {
    const closeModal = () => {
        deleteStore.showDeleteModal(false)
    }
    const changeIsDelete = () => {
        deleteStore.showDeleteModal(false)
        props.batchDelete();
    }
    return (<>
        {
            deleteStore.deleteModal ? (
                <div className="delete-modal">
                    <div className="delete-modal-mask"></div>
                    <VGroup className="delete-modal-wrap">
                        <HGroup horizontalAlign="flex-end" style={{padding:"10px"}}>
                            <Icon type="close-circle" theme="filled" style={{color:"#6cacd8",fontSize:"18px",cursor:"pointer"}} onClick={closeModal}/>
                        </HGroup>
                        <p className="delete-modal-content">确定将所选人从列表中删除?</p>
                        <HGroup style={{padding:"10px 30px"}} horizontalAlign="flex-end">
                            <HGroup gap={10}>
                                <div className="modal-btn modal-btn-yes" onClick={changeIsDelete}>确定</div>
                                <div className="modal-btn" onClick={closeModal}>取消</div>
                            </HGroup>
                        </HGroup>
                    </VGroup>
                </div>
            ) : null
        }
    </>)
        
}

export default observer(DeleteModal);