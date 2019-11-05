import './style.less'

import React, { Component } from 'react'
import { block } from 'v-block.lite/common'
import Area from './area'

// const init_legend = {
//   fill: 'transparent',
//   stroke: 'white',
//   strokeWidth: 2,
// }

@block.box_model
class Index extends Component {
  state = { legends: {}, rect: null };
  legends = {};

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    if(this.ref.current) {
      let track = null;
      window.onresize = () => {
        if(track) {
          track = clearTimeout(track);
        }
        track = setTimeout(this.resize , 150);
      }

      this.setState({ rect: this.ref.current.getBoundingClientRect() });
    }
  }

  addLegend({ name, pos, legend }) {
    this.legends[name] = { name, pos, legend };
    if(this._debounce_) {
      clearTimeout(this._debounce_);
    }

    this._debounce_ = setTimeout(() => this.setState({ legends: this.legends }), 120);
  }

  renderAreas(paths, props) {
    return paths.map((path, i) => <Area key={`aaa${i}`} id={i} path={path} {...props}/>)
  }

  // renderLegends() {
  //   const legends = this.state.legends;
  //   const { svg } = this.props.provider;

  //   return Object.keys(legends).map(name => {
  //     const { pos, legend } = legends[name];
  //     return (
  //       <svg className="area-legend" {...svg} key={name} data-text={name}>
  //         <path d={`M ${pos.x} ${pos.y} L ${legend.x} ${legend.y}`} stroke="red"/>
  //         <circle cx={pos.x} cy={pos.y} r="3" {...init_legend} />
  //         <text className="area-text" {...legend} fill="red">{ name }</text>
  //       </svg>
  //     )
  //   });
  // }

  fitForBox(target, box) {
    const padding = 50;

    const horv = target.width > target.height ? true : false;
    const scale = horv ? (box.width - padding) / target.width : (box.height - padding) / target.height;

    const measured = { width: target.width * scale, height: target.height * scale }

    return {
      ...target,
      width: measured.width, height: measured.height,
      viewBox: `${(measured.width - box.width) * 0.5} ${(measured.height - box.height) * 0.5} ${target.width} ${target.height}`
    }
  }

  dataFunction = mid => {
    const { dataFunction } = this.props;
    return typeof dataFunction === 'function' ? dataFunction(mid) : null;
  }

  resize = () => {
    if(this.ref && this.ref.current)
      this.setState({ rect: this.ref.current.getBoundingClientRect() });
  }

  shouldComponentUpdate(next, state) {
    return state.rect !== this.state.rect
        || next.category !== this.props.category;
  }

  render() {
    const { provider, category } = this.props;
    const { rect } = this.state;

    const { svg, paths } = provider || {};
    const style = { width: svg.width, height: svg.height };

    return (
      <div className="svg-group" style={{ ...style, width: '100%', height: '100%' }} ref={this.ref} >
        { rect && this.renderAreas(paths, { svg: this.fitForBox(svg, rect), layer: this, category }) }
        { /* this.renderLegends() */ }
      </div>
    )
  }
}

export default Index
