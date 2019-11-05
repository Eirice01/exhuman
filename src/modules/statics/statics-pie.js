import './statics.less'
import React, { Component } from 'react'
import { VGroup , HGroup } from 'v-block.lite/layout'

import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

import TitleLine from '@components/title-line'
import { NonServerData } from '@store/people-store'

export default class StaticsPie extends Component {
    render() {
        return (
            <VGroup>
                <TitleLine title="解决率统计"></TitleLine>
                <HGroup>
                    <VGroup style={{ width: '50%', height: '200px' }}><div id="staticPie" style={{ width: '100%', height: '100%' }}></div></VGroup>   
                    <VGroup style={{ width: '50%', height: '200px' }}><div id="staticPie2" style={{ width: '100%', height: '100%' }}></div></VGroup>   
                </HGroup>
            </VGroup>
        )
    }
    chartInit(type,domId,data){
        var myChart = echarts.init(document.getElementById(domId));
        myChart.setOption({
            title: {
                text: type,
                subtext: data.reduce((acc, i) => acc + i.value, 0),
                textStyle: {
                    fontSize: 12,
                    color: ['#fff']
                },
                subtextStyle: {
                    color: '#34f6c4',
                    fontSize: 20,
                    fontWeight:'bold',
                    align: 'center'
                },
                itemGap:5,
                x: 'center',
                y: '40%',
            },
            tooltip: {
                trigger:'item',
                formatter:"{b}:{d}%"
            },
            color:['#32b9f1','#00e4a8'],
            series: [{
                name: type,
                type: 'pie',
                radius: ['50%', '30%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                startAngle: 160,
                data: data,
                label: {
                    normal: {
                        show: true,
                        position: 'outside',
                        textStyle: {
                            color: '#fff'
                        },
                        formatter: function (params) {
                            return `${params.data.name}\n{a|${params.data.value}}`
                        },
                        rich: {
                            a: {
                                color: "#34f6c4",
                                fontSize: 18,
                                lineHeight: 18,
                                align:'center',
                                padding:[-5,0,0,0]
                            },
                        }
                    },
                    empahsis: {
                        show: true,
                        textStyle: {
                            fontSize: '26',
                            fontWeight: 'bold',
                        }
                    }
                },
                labelLine: {
                    smooth: false,
                    length: 20,
                    length2: 10
                }
            }]
        });
    }
    componentDidMount() {
        let data = NonServerData.ExtremePeoples();
        let data2 = NonServerData.CommunityData();
        this.chartInit("分局","staticPie",data);
        this.chartInit("民警","staticPie2",data2);
    }
}

