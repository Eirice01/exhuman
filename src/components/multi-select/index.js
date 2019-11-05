import './multiSelect.less'
import React,{ useState , useEffect } from 'react'
import { HGroup,VGroup } from 'v-block.lite/layout'
import { NonServerData } from '@store/people-store'



function MultiSelect (props) {

    const list = NonServerData.myAreaData(props.selectPolice);

    const [selectList,setSelectList] = useState(list)
    const [arrow,setArrow] = useState(true)

    useEffect(() => {
        props.changeAreaLayer(list);
        return() => {
            props.clearAreaLayer();
        }
    },[])
    const selectChange = (index) => {
        let newList = JSON.parse(JSON.stringify(selectList));
        newList[index]['select'] = !newList[index]['select']
        setSelectList(newList)
        let newData = [];
        newList.forEach(v => {
            if( v.select ) newData.push(v);
        })
        props.changeAreaLayer(newData)
    }
    return (
        <div className="multi-select">
            我的辖区:
            <span className="multi-select-arrow"  onClick={() => setArrow(!arrow)}>{arrow ? '∧' : '∨'}</span>
            {
                list &&
                <VGroup className={`${arrow ? '' : 'multi-select-dropdown-hidden '}multi-select-dropdown`}>
                    <Option list={selectList} selectChange={selectChange}/>
                </VGroup>
            }
        </div>
    )
}

function Option(props){
    const changeCheck = (data,index) => {
        props.selectChange(index)
    }
    return (
        <>
            {
                props.list.map((item,index) => (
                    <HGroup key={item.id} className="select-option" verticalAlign="center" onClick={() => changeCheck(item,index)}>
                        <span className="checkbox-span">{item.select?'√':null}</span><span>{item.value}</span>
                    </HGroup>
                ))
            }
        </>
    )
}
export default MultiSelect;
