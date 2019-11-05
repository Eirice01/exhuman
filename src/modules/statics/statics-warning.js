import './statics.less'

import React, { Component } from 'react'
import { HGroup, VGroup } from 'v-block.lite/layout'

import TitleLine from '@components/title-line'

import Person from '@assets/images/home/person.png';
import Money from '@assets/images/home/money.png';

function WarnCard({imgURL, label, value}) {
    let fontNum= {
        fontSize: '26px',
        color: '#00e4ff',
    }
    let fontText= {
        fontSize: '14px',
        color: '#fff'
    }
    return (
        <HGroup className="border-blue border-blue-radius" horizontalAlign="center" verticalAlign="center" padding="10px 15px" gap="10px" width="48%">
            <VGroup horizontalAlign="center">
                <img src={imgURL} style={{width:'45px',height:'48px'}}/>
            </VGroup>
            <VGroup horizontalAlign="center" width="100px">
                <VGroup style={fontNum}>{value}</VGroup>
                <VGroup style={fontText}>{label}</VGroup>
            </VGroup>
        </HGroup>
    )
}

export default class StaticsWarning extends Component {
    render() {
        return (
            <VGroup>
                <TitleLine title="自定义异常行为预警数据统计"></TitleLine>
                <HGroup horizontalAlign="space-between" gap="10px">
                    <WarnCard value="42" label="涉贷" imgURL={Money}/>
                    <WarnCard value="14" label="社会边缘人" imgURL={Person}/>
                </HGroup>
            </VGroup>
        )
    }
}
