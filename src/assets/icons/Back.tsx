import React from "react";

interface IconProps {
  color:string
}

function Icon({color}:IconProps) {
  

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      // fill="red"
      viewBox="0 0 24 24"
    >
      <path
        stroke={color}
        // stroke="#262D33"
        strokeWidth="1.2"
        d="M11 6.5L5.5 12m0 0l5.5 5.5M5.5 12H20"
      ></path>
    </svg>
  );
}

export default Icon;
