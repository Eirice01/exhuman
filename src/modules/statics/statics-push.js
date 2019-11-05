import React, { Component } from "react";
import { HGroup, VGroup } from "v-block.lite/layout";
import TitleLine from "@components/title-line";
import { NonServerData } from '@store/people-store'
export default class StaticsPush extends Component {
  render() {
  const { fenju , shequ , guankong } = NonServerData.personPushData()
    return (
      <VGroup>
        <TitleLine title="今日推送统计" />

        <VGroup style={{paddingLeft:'10px'}}>
            <HGroup className="pushContainer">
            <IconCard type={"tuisongfenju"} title={"推送分局"} />
            <PushInfo infoData={fenju}></PushInfo>
            </HGroup>
            <HGroup className="pushContainer">
            <IconCard type={"tuisongshequ"} title={"推送民警"} />
            <PushInfo infoData={shequ}></PushInfo>
            </HGroup>
            <HGroup className="pushContainer">
            <IconCard type={"tuisongguankong"} title={"推送管控"} />
            <PushInfo infoData={guankong} isControl={true}></PushInfo>
            </HGroup>
        </VGroup>

      </VGroup>
    );
  }
}
const textConfig = {
  color: "#00e4ff",
  sizeNum: "30px",
  fontFamily: "wanghan"
};
const IconCard = ({ type , title }) => (
  <VGroup className="item" horizontalAlign="center">
    <HGroup horizontalAlign="center" verticalAlign="center">
      <img src={require(`../../assets/images/${type}.png`)} style={{width:"40px",height:"40px"}}/>
    </HGroup>
    <HGroup horizontalAlign="center" verticalAlign="center">
      {title}
    </HGroup>
  </VGroup>
);

const PushInfo = ({infoData,isControl}) => {
  let { color, sizeNum, fontFamily } = textConfig;
  return (
    <div style={{lineHeight:'50px',padding:'0px 20px',marginLeft:'20px'}}>
      <span style={{color:'#aaa'}}>{isControl?'分局推送':'系统推送'}</span>&nbsp;&nbsp;&nbsp;&nbsp;
      <span style={{ color: color, fontSize: sizeNum, fontFamily: fontFamily}}>{infoData.pushNum}</span>
      {
          infoData.dispatchNum
           ?
           <div className="pushInfo-container">
                <span style={{color:'#aaa'}}>{isControl?'民警推送':'技侦下发'}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ color: color, fontSize: sizeNum, fontFamily: fontFamily}}>{infoData.dispatchNum}</span>
           </div>
           :
           null
      }
    </div>
  );
};
