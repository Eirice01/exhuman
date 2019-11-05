import React, { Component } from 'react'
import { Spring } from 'react-spring/renderprops'

import Icontouxiang from '@assets/svg-react/icontouxiang.svg'

const init_linker = {
  fill: '#1f9ba7',// '#00fdfc', // #4599a6,
  back: 'rgba(255, 255, 255, 0.9)'
};

const init_lcard = {
  circleFill: '#1f9ba7',
};

function pin(mark, center) {
  if(!mark)
    return center;

  const x = mark && mark.x ?  center.x + mark.x : center.x;
  const y = mark && mark.y ?  center.y + mark.y : center.y;
  return { x, y}
}

function Label({ value, ...rests }) {
  return (
    <Spring from={{ number: 0 }} to={{ number: value }} config={{duration: 1200}}>
      { props => <text {...rests} >{ parseInt(props.number) }人</text> }
    </Spring>
  )
}

function LegendCard({ size, text, name, pos, legend, ...props }) {
  const icon_size = size * 0.7;
  const lorr = legend.x - pos.x < 0;
  const rect = { width: 60, height: size * 1.5 };
  const flat  = lorr ? -rect.width - 10 : 10;
  return (
    <g transform={`translate(${legend.x} ${legend.y})`}>
      <g transform={`translate(${flat}, ${-rect.height * 0.5})`}>
        <rect {...rect} fill="#135367" rx="5" ry="5"/>
        <text className="area-card-text"
              x={rect.width * 0.5 + 4 * (lorr ? -1 : 1) } y={rect.height * 0.5}
              dy={4} fill="white">{ name }</text>
      </g>
      <circle cx={0} cy={0} r={size} fill={init_lcard.circleFill} />
      <Icontouxiang x={-icon_size * 0.5} y={-icon_size} width={icon_size} height={icon_size} fill="#b8faa6"/>
      <Label className="area-card-text" dy={12} fill="white" value={text}/>
    </g>
  )
}

function Linker({ pos, end }) {
  const pass = end.p === "x" ? { x: end.x, y: pos.y  } : { x: pos.x, y: end.y  };
  return (
    <g>
      <path d={`M ${pos.x} ${pos.y} L ${pass.x} ${pass.y} L ${end.x} ${end.y}`}
            fill="none" stroke={init_linker.back} strokeWidth="3.5"/>
      <path d={`M ${pos.x} ${pos.y} L ${pass.x} ${pass.y} L ${end.x} ${end.y}`}
            fill="none" stroke={init_linker.fill} strokeWidth="2"/>
    </g>
  )
}

const init = {
  fill: 'white',
  stroke: 'white',
  strokeWidth: 2,
}

export default class Legend extends Component {
  state = { over: false };

  owner = null;

  constructor(props) {
    super(props);
    this.owner = props.owner;
  }

  mouseover = ({ type }) => {
    const over = type === 'mouseenter' ? true : false;

    this.setState({ over });
  }

  renderLegend(pos, { name, legend }) {
    const over = this.state.over;

    return (
      <g data-text={name}>
        <Linker pos={pos} end={legend}/>
        <circle cx={pos.x} cy={pos.y} r={ over ? 5 : 3 } {...init} />
        <LegendCard size="20" text={this.value} {...{ name, pos, legend }}/>
      </g>
    )
  }

  // renderLegend(pos, { name, legend }) {
  //   this.owner.addLegend({ pos, name, legend });
  //   return null;
  // }

  shouldComponentUpdate(next, derv) {
    return next.options.overflow !== this.props.options.overflow
        || derv.over !== this.state.over
        || next.options.category !== this.props.options.category;
  }

  get value() {
    const { owner: { dataFunction }, data: { name } } = this.props;
    return typeof dataFunction === 'function' ? dataFunction(name) : '';
  }

  renderText(pinned, data, size = 20) {
    const icon_size = size * 0.7
    const gap = 5;
    return (
      <g transform={`translate(${pinned.x} ${pinned.y})`}>
        <g transform={`translate(-20 ${-icon_size * 2.5})`}>
          <Icontouxiang width={icon_size} height={icon_size} fill="#b8faa6"/>
          <Label className="area-card-text" style={{textAnchor: "start"}} dx={icon_size + gap} dy={icon_size} fill="white" value={this.value}/>
        </g>
        <text className="area-text" x={0} y={0} fill="azure">{ data.name }</text>
      </g>
    )
  }

  render() {
    const { data: path, options } = this.props;
    const { mark, legend } = path;
    const { overflow , center } = options;
    const pinned = pin(mark, center);

    return overflow || (legend && legend.x && legend.y)
         ? this.renderLegend(pinned, path)
         : this.renderText(pinned, path)
  }
}
