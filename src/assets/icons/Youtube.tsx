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
        d="M18.54 4.337l1.46.15a3.38 3.38 0 013 3.41v8.2a3.38 3.38 0 01-3 3.41l-1.4.15c-4.368.45-8.771.45-13.14 0L4 19.508a3.38 3.38 0 01-3-3.41v-8.2a3.38 3.38 0 013-3.41l1.4-.15c4.369-.45 8.772-.45 13.14 0zm-7.43 10.88l3.89-2.6h.06a.74.74 0 000-1.24l-3.89-2.6a.75.75 0 00-1.17.62v5.2a.75.75 0 001.11.62z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Icon;
