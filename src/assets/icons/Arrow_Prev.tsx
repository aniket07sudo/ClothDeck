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
      width={width ? width : 24}
      height={height ? height : 24}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        d="M16 22L6 12 16 2l1.775 1.775L9.55 12l8.225 8.225L16 22z"
      ></path>
    </svg>
  );
}

export default Icon;
