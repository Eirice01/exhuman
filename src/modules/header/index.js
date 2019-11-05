import './header.less'

import React, { Component, useState } from 'react'
import { HGroup } from 'v-block.lite/layout'
import { Link  } from 'react-router-dom';
import { classnames } from 'v-block.lite/common'
import {Icon} from 'antd'
import User from '@assets/images/home/user.png';


function MenuItem({ label, selected, onClick }) {
    const classname = classnames('item', selected ? 'active' : null);
    return (
      <Link className={classname} to={label.path} onClick={onClick}>
        <HGroup>
          {label.name}
        </HGroup>
      </Link>
    )
}

// const MenuListArr = ['首页','极端行为人发现', '在控重点人管控', '特定异常行为预警'];

const MenuListArr = [
    {path:'/',name:'首页'},
    {path:'/find',name:'极端行为发现'},
    {path:'/control', name:'极端人行为管控'},
];

// const MenuPerson=[
//
// ]
function MenuListView({ init, onChange }) {
    const [select, setSelect] = useState(init || MenuListArr[0]);
    return (
        <HGroup className="header-menu" horizontalAlign="flex-start" width="100%" padding="0 0 0 20px" gap={5} flex>
        { MenuListArr.map(c => <MenuItem key={c.path} label={c} onClick={() => (onChange(c), setSelect(c))} selected={select === c}/>) }
        </HGroup>
    )
}

const tens = value => value < 10 ? `0${value}` : value

function DatetimeFormat(t) {

  const [yy, mm, dd, hh, min, sec] = [
    t.getFullYear(),
    t.getMonth() + 1,
    t.getDate(),
    t.getHours(),
    t.getMinutes(),
    t.getSeconds()
  ];

  return `${yy}-${tens(mm)}-${tens(dd)} ${tens(hh)}:${tens(min)}:${tens(sec)}`
}

const HeaderUser = ({ title }) => {
  const [time, setTime] = useState(new Date());

  setTimeout(() => setTime(new Date()), 500);
  const loginOut = () => {
      window.location.href="http://12.23.8.207";
  }
  return (
    <HGroup className="header-user" verticalAlign="center" padding="5px 15px">
        <HGroup className="item">在线人数 ( 1 )</HGroup>
        <HGroup className="item" verticalAlign="center" horizontalAlign="center" gap="5px">
            <img className="person" src={User}/>
            <span className="name">admin</span>
        </HGroup>
        <HGroup className="item"><span>{DatetimeFormat(time)}</span></HGroup>
      <HGroup className="item" title="退出"><Icon type="export" style={{color:'skyblue',fontWeight:'700',fontSize:'16px'}} onClick={loginOut }/></HGroup>
    </HGroup>
  )
};


export default class DetailsView extends Component {

    constructor() {
      super();
      let CurrentMenu='';
      let href = window.location.href;
      let path = href.split('#')[1];
      if(path=='/'){
        CurrentMenu = MenuListArr[0];
      }else if(path=='/find'){
        CurrentMenu = MenuListArr[1];
      }else {
        CurrentMenu = MenuListArr[2];
      }
        this.state = { activeMenu: CurrentMenu}
    }
    shouldComponentUpdate(next, state) {
        return state.activeMenu !== this.state.activeMenu;
    }
    render() {
        const { activeMenu } = this.state;
        return (
            <HGroup className="header-container" verticalAlign="center" horizontalAlign="space-between" height="90px" padding="0 0 15px 0" flex>
                <HGroup className="title" padding="0 0 0 40px" width="370px">极端人行为预测管控系统</HGroup>
                <MenuListView init={activeMenu} onChange={this.menuChange}/>
                <HeaderUser width="370px"></HeaderUser>
            </HGroup>
        )
    }
    menuChange = activeMenu => {
        if(activeMenu === this.state.activeMenu)
            return;
        this.setState({ activeMenu });
    }
}
