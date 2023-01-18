import React from "react";

interface IconProps {
    color:string
}

function Icon({color}:IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="21"
      fill="none"
      viewBox="0 0 20 21"
    >
      <path
        stroke={color}
        strokeWidth="1.2"
        d="M5.833 3.833A4.167 4.167 0 001.667 8c0 .938.063 2.077 1.13 3.323C3.865 12.569 10 18 10 18s6.135-5.431 7.203-6.677c1.067-1.246 1.13-2.385 1.13-3.323A4.167 4.167 0 0010 8a4.167 4.167 0 00-4.167-4.167z"
      ></path>
    </svg>
  );
}

export default Icon;
