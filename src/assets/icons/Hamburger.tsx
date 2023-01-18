import React from "react";

interface IconProps {
    color:string
  }

function Icon({color}:IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="none"
      viewBox="0 0 30 30"
    >
      <path
        stroke={color}
        strokeWidth="1.2"
        d="M5 8.75h20M5 15h20M5 21.25h20"
      ></path>
    </svg>
  );
}

export default Icon;
