import React from "react";

interface IconProps {
    color:string,
    width:number,
    height:number
  }

function Icon({color,width,height}:IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : 20}
      height={height ? height : 21}
      fill="none"
      viewBox="0 0 20 21"
    >
      <path
        stroke={color}
        strokeWidth="1.2"
        d="M2.5 14.667l7.5-7.5 7.5 7.5"
      ></path>
    </svg>
  );
}

export default Icon;
