import "./details.less";

import React, { Component } from "react";
import { VGroup } from "v-block.lite/layout";
// import { Link } from "react-router-dom";

import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";

import TitleLine from "@components/title-line";
// import { Table } from "antd";

// import Red from "@assets/images/home/red.png";
// import Blue from "@assets/images/home/blue.png";
// import Orange from "@assets/images/home/orange.png";
// import Green from "@assets/images/home/green.png";

// const colors = [Red, Blue, Orange, Green];

export default class DetailsView extends Component {
  render() {
    return (
      <VGroup
        verticalAlign="flex-start"
        style={{ width: "100%", paddingRight: "20px" }}
        flex
      >
        <TitleLine title="推送各局人数统计" />
        {/* <Table rowKey={(text, record, index) => text.name} className="details-table" dataSource={dataSource} columns={columns} height="100%"/> */}
        <VGroup style={{ width: "100%", height: "calc(100% - 100px)" }}>
          <div id="staticBar" style={{ width: "100%", height: "100%" }} />
        </VGroup>
      </VGroup>
    );
  }
  chartInit() {
    var myChart = echarts.init(document.getElementById("staticBar"));
    myChart.setOption({
      width: "80%",
      grid: {
        left: "10%",
        top: "2%",
        right: "10%",
        bottom: "8%",
        containLabel: true
      },
      xAxis: {
        type: "value",
        splitLine: { show: false },
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel:{show:false}
      },
      yAxis: {
        offset: "27",
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: {
          textStyle: {
            color: "#fff",
            fontSize: "14"
          }
        },
        data: nameData
      },
      series: [
        {
          barWidth: 10,
          z: 10,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: "#f05f1c"
              },
              {
                offset: 0.7,
                color: "#e9ea07"
              }
            ]),
            barBorderRadius: [10, 10, 10, 10]
          },
          type: "bar",
          data: valueData
        },
        {
          type: "bar",
          barGap: "-100%",
          barWidth: 10,
          animation: false,
          z: -1,
          itemStyle: {
            color: "transparent",
            barBorderRadius: [10, 10, 10, 10]
          },
          label: {
            normal: {
              show: true,
              position: "right",
              fontSize: 16,
              color: "#fff",
              formatter: function(param) {
                for (let i = 0; i < dataSource.length; i++) {
                  if (param.name == dataSource[i].name) {
                    return dataSource[i].value + "人";
                  }
                }
              }
            },
            itemStyle: {
              color: "#fff",
              fontSize: "14"
            }
          },
          data: backGroundData
        }
      ]
    });
  }

  componentDidMount() {
    this.chartInit();
  }
}

/*const dataSource = [ {
  name: "钢城区分局",
  value: 17
},
{
  name: "市中区分局",
  value: 16
},
{
  name: "历下区分局",
  value: 15
},
{
  name: "平阴县公安局",
  value: 14
},
{
  name: "鲍山分局",
  value: 13
},
{
  name: "槐荫区分局",
  value: 12
},
{
  name: "南部山区分局",
  value: 11
},
{
  name: "济阳区分局",
  value: 10
},
{
  name: "历城区分局",
  value: 9
},
{
  name: "章丘区分局",
  value: 8
},
{
  name: "高新分局",
  value: 7
},
{
  name: "商河县局",
  value: 6
},
{
  name: "天桥区分局",
  value: 5
},
{
  name: "长清区分局",
  value: 4
},
{
  name: "雪野旅游区分局",
  value: 3
},
{
  name: "莱芜高新区分局",
  value: 2
},
{
  name: "莱芜区分局",
  value: 1
}
];*/
const dataSource = [
  {
    name: "历城区分局",
    value: 55
  },
  {
    name: "市中区分局",
    value: 52
  },
  {
    name: "章丘区分局",
    value: 42
  },
  {
    name: "历下区分局",
    value: 35
  },
  {
    name: "济阳区分局",
    value: 31
  },
  {
    name: "商河县分局",
    value: 27
  },
  {
    name: "天桥区分局",
    value: 23
  },
  {
  name: "钢城区分局",
  value: 22
},
  {
    name: "长清区分局",
    value: 19
  },
  {
    name: "莱芜区分局",
    value: 12
  },
  {
    name: "槐荫区分局",
    value: 11
  },
  {
    name: "平阴县公安局",
    value: 9
  }
];
var backGroundData = [],
  nameData = [],
  valueData = [],
  maxValue = 0,
  len = dataSource.length;

for (var i = 0; i < len; i++) {
  if (dataSource[i].value > maxValue) {
    maxValue = dataSource[i].value;
  }
}

for (var j = 0; j < len; j++) {
  backGroundData.push(maxValue * 1.1);
  nameData.push(dataSource[j].name);
  valueData.push(dataSource[j].value);
}
backGroundData = backGroundData.reverse();
nameData = nameData.reverse();
valueData = valueData.reverse();
/* const columns = [
  {
    title: "序号",
    render: (text, record, index) => `${index + 1}`,
    key: "1"
  },
  {
    title: "姓名",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "异常纬度",
    dataIndex: "tag",
    key: "tag",
    render: (text, record, index) => (
      <span className="tag-name">
        {text.map(t => (
          <Link key={t} to="/find/userinfo">
            <span>
              <img src={colors[t - 1]} />
            </span>
          </Link>
        ))}
      </span>
    )
  }
];
 */
