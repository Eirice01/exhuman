import './statics.less'
import React, { Component } from 'react'

import { HGroup, VGroup } from 'v-block.lite/layout'

import TitleLine from '@components/title-line'
import { NonServerData } from '@store/people-store'

const [a, b] = NonServerData.importantsPeoples();

function CtrlCard({ group, person, title}) {

    return (
        <VGroup className="statics-item-bg" verticalAlign="center" gap="10px" width="48%">
            <VGroup horizontalAlign="center" className="statics-item-title text14" height="30px" verticalAlign="center">{title}</VGroup>
            <HGroup horizontalAlign="space-between" verticalAlign="center" >
                {
                  group && (
                    <HGroup horizontalAlign="center" flex="1 1 0" padding="15px 3px">
                        <VGroup className="text14">群体:</VGroup>
                        <VGroup className="text18" horizontalAlign="center" padding="0 0 0 10px" style={{ color: '#00e4ff' }}>{group}</VGroup>
                    </HGroup>
                  )
                }
                { group && <HGroup className="line-bg" height="15px" width="2px" padding="3px 0 0 0"></HGroup> }
                <HGroup horizontalAlign="center" flex="1 1 0" padding="15px 3px">
                    <VGroup className="text14">人数:</VGroup>
                    <VGroup className="text18" horizontalAlign="center" padding="0 0 0 10px" style={{ color: '#00e4ff' }}>{person}</VGroup>
                </HGroup>
            </HGroup>
        </VGroup>
    )
}

export default class StaticsCtrl extends Component {
    render() {
        return (
            <VGroup>
                <TitleLine title="疑似极端人"></TitleLine>
                <VGroup gap={15}>
                  <HGroup horizontalAlign="space-between">
                    <CtrlCard group={a.group} person={a.member} title={a.type}/>
                    <CtrlCard person={b.member} title={b.type}/>
                  </HGroup>
                  {/*
                    <HGroup horizontalAlign="space-between">
                      <CtrlCard group={c.group} person={c.member} title={c.type}/>
                      <CtrlCard group={d.group} person={d.member}  title={d.type}/>
                    </HGroup>
                  */}
                </VGroup>
            </VGroup>
        )
    }
}
