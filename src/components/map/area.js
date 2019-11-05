import React, { Component, Fragment } from 'react'
import { Spring } from 'react-spring/renderprops'
import hexToRgba from 'hex-to-rgba'

import Legend from './legend'

const box_size = 110;
const backface = {
  nums: 2, ty: 5.5, tp: 0.2, map(fun) {
    const out = [], nums = this.nums;
    for(let i = 0; i < nums; i++) {
      out.push(fun(nums, i, this));
    }
    return out;
  }
};

const init = {
  fill: hexToRgba('#3085ae', 0.1),
  stroke: '#0170dd',// 'rgba(255, 255, 255, 0.3)', //'rgb(30, 104, 138)',
  translate: 'matrix(1 0 0 1 0 0)',
  backfaceFill: "rgba(20, 44, 78, 0.4)", // "#1271ab",
  backfaceStrokeOpacity: 1,
  gradient: 0,
  gradientOpacity: 1,
  strokeWidth: 1,
};

export default class Area extends Component {
  state = { over: false, center: null, overflow: false };

  constructor(props) {
    super(props);
    this._ref = React.createRef();
  }

  get $path() {
    return this._ref ? this._ref.current : null;
  }

  componentDidMount() {
    const { x, y, width, height } = this.$path.getBBox();

    const center  = { x: x + width * 0.5, y: y + height * 0.5, width, height };
    const overflow = width <= box_size ? true : false;
    this.setState({ center, overflow });
  }

  mouseove = ({ target, type }) => {
    const over = type === 'mouseenter' ? true : false;

    this.setState({ over });
  }

  nexts(init) {
    const { over } = this.state;

    return {
      fill: init.fill,
      stroke: over ? 'rgba(255, 255, 255, 0.8)' : init.stroke,
      transform: over ? 'matrix(1.01 0 0 1.01 -4 -15)' : init.translate,
      backfaceFill: over ? "rgba(20, 44, 78, 0.8)" : init.backfaceFill, //'#1b2c3ab0',
      backfaceStrokeOpacity: over ? 0.2 : init.backfaceStrokeOpacity,
      strokeWidth: over ? 2 : init.strokeWidth,
      gradient: over ? 120 : init.gradient,
      gradientOpacity: over ? 0.5 : init.gradientOpacity,
      stdDeviation: over ? 10 : 0,
    }
  }

  render() {
    const { path, svg, id, layer, category, ...rests } = this.props;
    const { over, center, overflow } = this.state;
    const { d, ...legend } = path;

    return  (
      <Fragment>
        { /* map svg area use */ }
        <svg style={{ display: 'none' }} {...svg}>
          <symbol id={path.name}>
            <path className="area-path" d={d}/>
          </symbol>
        </svg>
        { /* :: map svg area :: */ }
        <Spring form={rests} to={this.nexts({ ...init, fill: `url(#${path.name}:fill)` || path.fill })}>
          {({ transform,
              backfaceFill,
              backfaceStrokeOpacity,
              gradient,
              strokeWidth,
              gradientOpacity,
              stdDeviation,
              ...props }) => (
            <div>
              { /* backface */ }
              <svg className="area-svg" {...svg} style={{ zIndex: 5 }} >
                <g transform={transform}>
                  {
                    backface.map((nums, i, item) => (
                     <use key={`${id}:${i}`}
                          xlinkHref={`#${path.name}`} {...props}
                          transform={`matrix(1 0 0 1 0 ${(nums - i) * item.ty})`}
                          fill={backfaceFill}
                          strokeOpacity={(backfaceStrokeOpacity / (nums - 1)) * (i + 1)}/>
                    ))
                  }
                </g>
              </svg>
              { /* surface */ }
              <svg className="area-svg" {...svg} style={{ zIndex: over ? 100 : 25 }}>
                <defs>
                  <linearGradient id={`${path.name}:fill`} x1="0%" y1="0%" x2={(gradient * 0.6) + '%'} y2={gradient + '%'} >
                    <stop offset="0" style={{ stopColor: hexToRgba('ffffff', gradientOpacity) }} />
                    <stop offset="1" style={{ stopColor: hexToRgba(path.fill, 1) }} />
                  </linearGradient>
                </defs>
                <use onMouseEnter={this.mouseove} onMouseLeave={this.mouseove} ref={this._ref}
                     xlinkHref={`#${path.name}`} {...props}
                     strokeWidth={strokeWidth} transform={transform} />
              </svg>
              { /* legent or word */ }
              <svg className="area-svg" {...svg} style={{ zIndex: over ? 120 : 45 }}>
                <g transform={transform}>
                  { center && <Legend data={legend} options={{ overflow, center, category }} owner={layer} /> }
                </g>
              </svg>
            </div>
          )}
        </Spring>
      </Fragment>
    )
  }


  // render() {
  //   const { path, svg, id, layer, category, ...rests } = this.props;
  //   const { over, center, overflow } = this.state;
  //   const { d, ...legend } = path;

  //   const { transform,
  //           backfaceFill,
  //           backfaceStrokeOpacity,
  //           strokeWidth,
  //           stdDeviation,
  //           ...props } =  this.nexts({ ...init, fill: `url(#${path.name}:fill)` || path.fill });

  //   return  (
  //     <Fragment>
  //       { /* map svg area use */ }
  //       <svg style={{ display: 'none' }} {...svg}>
  //         <symbol id={path.name}>
  //           <path className="area-path" d={d}/>
  //         </symbol>
  //       </svg>
  //       { /* :: map svg area :: */ }
  //       <div>
  //         { /* backface */ }
  //         <svg className="area-svg" {...svg} style={{ zIndex: 5 }} >
  //           <g transform={transform} className="effect">
  //             {
  //               backface.map((nums, i, item) => (
  //                 <use key={id} className="effect"
  //                      xlinkHref={`#${path.name}`} {...props}
  //                      transform={`matrix(1 0 0 1 0 ${(nums - i) * item.ty})`}
  //                      fill={backfaceFill}
  //                      strokeOpacity={(backfaceStrokeOpacity / (nums - 1)) * (i + 1)}/>
  //               ))
  //             }
  //           </g>
  //         </svg>
  //         { /* surface */ }
  //         <svg className="area-svg" {...svg} style={{ zIndex: over ? 100 : 25 }}>
  //           <Spring form={rests} to={this.nexts(init)}>
  //           { ({ gradient, gradientOpacity }) => (
  //               <defs>
  //                 <linearGradient className="effect" id={`${path.name}:fill`} x1="0%" y1="0%" x2={(gradient * 0.6) + '%'} y2={gradient + '%'} >
  //                   <stop offset="0" style={{ stopColor: hexToRgba('ffffff', gradientOpacity) }} />
  //                   <stop offset="1" style={{ stopColor: hexToRgba(path.fill, 1) }} />
  //                 </linearGradient>
  //               </defs>
  //           )}
  //           </Spring>
  //           <use transform={transform} className="effect"
  //                onMouseEnter={this.mouseove} onMouseLeave={this.mouseove} ref={this._ref}
  //                xlinkHref={`#${path.name}`} {...props} strokeWidth={strokeWidth}  />
  //         </svg>
  //         { /* legent or word */ }
  //         <svg className="area-svg" {...svg} style={{ zIndex: over ? 120 : 45 }}>
  //           <g transform={transform} className="effect">
  //             { center && <Legend data={legend} options={{ overflow, center, category }} owner={layer} /> }
  //           </g>
  //         </svg>
  //       </div>
  //     </Fragment>
  //   )
  // }

}
