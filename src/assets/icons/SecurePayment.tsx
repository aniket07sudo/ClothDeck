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
      width={width ? width : 50}
      height={height ? height : 50}
      fill="none"
      viewBox="0 0 50 50"
    >
      <path
        stroke={color}
        strokeWidth="1.2"
        d="M8.933 5.167c0-.22.18-.4.4-.4h31.334c.22 0 .4.18.4.4v27.69a.4.4 0 01-.148.311l-15.667 12.73a.4.4 0 01-.504 0L9.08 33.167a.4.4 0 01-.148-.31V5.167z"
      ></path>
      <path
        stroke={color}
        strokeWidth="1.2"
        d="M16.667 20.834l6.25 6.25 11.458-10.417"
      ></path>
    </svg>
  );
}

export default Icon;
