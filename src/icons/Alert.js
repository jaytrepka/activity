import React from "react";

export default ({ width = "25", height = "25", color = "#fff", style }) => (
  <svg
    width={width}
    height={height}
    style={style}
    viewBox="0 0 600 600"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="#fff" d="M300 29C150.33 29 29 150.33 29 300s121.33 271 271 271 271-121.33 271-271S449.67 29 300 29zm-42.438 51h84.876v101.81l-17.156 217.06h-50.563l-17.16-217.06V80zm42.44 347.5c27.625 0 50.031 22.778 50.031 50.875s-22.406 50.875-50.031 50.875-50.031-22.778-50.031-50.875 22.406-50.875 50.031-50.875z"/>
  </svg>
);
