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
      width={width ? width : 14}
      height={height ? height : 14}
      fill="none"
      viewBox="0 0 14 14"
    >
      <path
        stroke={color}
        strokeWidth="1.2"
        d="M1.75 4.083L7 9.333l5.25-5.25"
      ></path>
    </svg>
  );
}

export default Icon;
