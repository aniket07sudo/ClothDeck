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
        fill={color}
        // fill="#FFE83B"
        d="M10 3l2.028 4.709 5.105.473-3.852 3.384 1.127 5.002L10 13.95l-4.408 2.618 1.127-5.002-3.852-3.384 5.105-.473L10 3z"
      ></path>
    </svg>
  );
}

export default Icon;
