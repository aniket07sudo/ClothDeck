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
        d="M8 22l10-10L8 2 6.225 3.775 14.45 12l-8.225 8.225L8 22z"
      ></path>
    </svg>
  );
}

export default Icon;
