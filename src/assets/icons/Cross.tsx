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
      height={height ? height : 21}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke={color}
        strokeWidth="1.2"
        d="M14.714 5.286L10 10m0 0l-4.714 4.714M10 10l4.714 4.714M10 10L5.286 5.286"
      ></path>
    </svg>
  );
}

export default Icon;
