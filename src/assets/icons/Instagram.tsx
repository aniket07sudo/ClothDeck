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
      fill={color}
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M16 3H8a5 5 0 00-5 5v8a5 5 0 005 5h8a5 5 0 005-5V8a5 5 0 00-5-5zm3.25 13A3.26 3.26 0 0116 19.25H8A3.26 3.26 0 014.75 16V8A3.26 3.26 0 018 4.75h8A3.26 3.26 0 0119.25 8v8zm-2.5-7.75a1 1 0 100-2 1 1 0 000 2zM12 7.5a4.5 4.5 0 104.5 4.5A4.49 4.49 0 0012 7.5zM9.25 12a2.75 2.75 0 105.5 0 2.75 2.75 0 00-5.5 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Icon;
