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
        d="M13.333 7.167a3.333 3.333 0 00-6.666 0m6.666 2.5a3.333 3.333 0 11-6.666 0m-3.334-2.5h13.334v9.166C16.667 17.255 15.92 18 15 18H5c-.92 0-1.667-.746-1.667-1.666V7.167z"
      ></path>
    </svg>
  );
}

export default Icon;
