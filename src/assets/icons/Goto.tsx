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
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke={color}
        strokeWidth="1.2"
        d="M10.833 5.417L15.417 10m0 0l-4.584 4.584M15.417 10H3.333"
      ></path>
    </svg>
  );
}

export default Icon;
