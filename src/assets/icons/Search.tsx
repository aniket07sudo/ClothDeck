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
      viewBox="0 0 20 21"
    >
      <path
        stroke={color}
        strokeWidth="1.2"
        d="M13.333 13.834l2.5 2.5"
      ></path>
      <circle
        cx="9.583"
        cy="10.083"
        r="4.817"
        stroke={color}
        strokeWidth="1.2"
      ></circle>
    </svg>
  );
}



export default Icon;
