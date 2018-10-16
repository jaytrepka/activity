import React from "react";
import { SketchField, Tools } from 'react-sketch';
import Eraser from '../../icons/Eraser';

import "./style.css";
class Draw extends React.Component {
  render() {
    const { height, width } = this.props;
    return (
      <div className="draw-wrapper">
        <SketchField
          width={width} 
          height={height}
          tool={Tools.Pencil} 
          lineColor='black'
          lineWidth={3}
          ref="container"
        />
        <div className="eraser" onClick={() => this.refs.container.clear()}>
          <Eraser />
        </div>
      </div>
    )
  }
}

export default Draw;