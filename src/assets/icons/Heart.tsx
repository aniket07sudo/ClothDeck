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
      width={width ? width : 24}
      height={height ? height : 24}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        // stroke="#262D33"
        stroke={color}
        strokeWidth="1.2"
        d="M7 4a5 5 0 00-5 5c0 1.126.075 2.493 1.357 3.987C4.637 14.482 12 21 12 21s7.362-6.518 8.643-8.013C21.924 11.493 22 10.126 22 9a5 5 0 00-10 0 5 5 0 00-5-5z"
      ></path>
    </svg>
  );
}

export default Icon;
