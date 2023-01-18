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
      width={width ? width : 60}
      height={height ? height : 60}
      fill="none"
      viewBox="0 0 60 60"
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M29.237 26.508l6.61 4.274 10.55-4.14C49.959 25.439 54.535 24.103 60 22.5c-13.474 1.203-23.644 2.404-30.763 4.008zm-5.084 4.542l-5.848-1.604c-3.305.936-6.483 2.405-9.406 4.276C5.974 35.59 3.687 37.729 2.16 40h9.916c.763-1.203 2.034-2.539 3.686-3.874 2.415-2.137 5.212-3.74 8.39-5.076zm6.992 2.537l-4.958-1.737c-1.145.535-2.542 1.203-4.196 2.405-2.288 1.603-4.322 3.607-6.101 5.745h9.28c1.27-2.138 3.304-4.275 5.975-6.413zM19.83 22.5H0l19.83 5.61c8.772 2.805 16.907 6.012 24.408 9.351L19.831 22.5z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Icon;
