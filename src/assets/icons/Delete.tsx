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
      viewBox="0 0 48 48"
    >
      <path
        fill="none"
        stroke={color}
        strokeMiterlimit="10"
        strokeWidth="3"
        d="M29.5 11.5V11c0-3-2.5-5.5-5.5-5.5S18.5 8 18.5 11v.5"
      ></path>
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="3"
        d="M7.5 11.5L40.5 11.5"
      ></path>
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="3"
        d="M36.5 27L38 11.5"
      ></path>
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="3"
        d="M10.7 18.6l2 20.3c.2 2.1 1.9 3.6 4 3.6h14.7c2.1 0 3.8-1.6 4-3.6l.5-4.8"
      ></path>
    </svg>
  );
}

export default Icon;
