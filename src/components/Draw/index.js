import React from "react";
import { SketchField, Tools } from 'react-sketch';

export default ({ height, width }) => (
  <SketchField
    width={width} 
    height={height}
    tool={Tools.Pencil} 
    lineColor='black'
    lineWidth={3}
  />
);