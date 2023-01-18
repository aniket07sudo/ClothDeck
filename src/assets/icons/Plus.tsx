import React from "react";

interface IconProps {
    color:string,
    width?:number,
    height?:number
}

function Icon({color,width,height}:IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : 20}
      height={height ? height : 20}
      fill={color}
      viewBox="0 0 20 20"
    >
      <path
        stroke={color}
        strokeWidth="1.2"
        d="M10 3.333v13.333M16.667 10H3.333"
      ></path>
    </svg>
  );
}

export default Icon;
