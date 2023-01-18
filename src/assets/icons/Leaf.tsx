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
      width={width ? width : 50}
      height={height ? height : 50}
      fill="none"
      viewBox="0 0 50 50"
    >
      <g clipPath="url(#clip0_348_1667)">
        <path
          stroke={color}
          strokeWidth="1.2"
          d="M31.63 40.037c-5.221 5.22-13.414 5.656-19.13 1.306a14.72 14.72 0 01-2.801-2.8c-4.35-5.717-3.914-13.91 1.306-19.13 5.695-5.695 27.99-7.366 27.99-7.366s-1.67 22.295-7.366 27.99z"
        ></path>
        <path
          fill={color}
          d="M9.699 38.541a14.728 14.728 0 002.8 2.801c3.126-5.926 9.376-13.217 17.71-21.55-10.834 6.195-16.667 13.541-20.51 18.75z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_348_1667">
          <path fill="#fff" d="M0 0H50V50H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default Icon;
