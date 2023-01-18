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
      width={width ? width : 50}
      height={height ? height : 51}
      fill="none"
      viewBox="0 0 50 50"
    >
      <path
        stroke={color}
        strokeWidth="1.2"
        d="M33.333 16.666a8.333 8.333 0 00-16.666 0m16.666 6.25a8.333 8.333 0 01-16.666 0m-8.334-6.25h33.334v22.917A4.167 4.167 0 0137.5 43.75h-25a4.167 4.167 0 01-4.167-4.167V16.666z"
      ></path>
    </svg>
  );
}

export default Icon;
