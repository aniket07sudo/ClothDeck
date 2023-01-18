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
      data-name="Layer 1"
      viewBox="0 0 122.56 122.88"
      fill={color}
      width={width ? width : 24}
      height={height ? height : 24}
    >
      <path
        d="M121.85 87.3A64.31 64.31 0 1136.88.4c2.94-1.37 5.92.91 4.47 4.47a56.29 56.29 0 0075.75 77.4l.49-.27a3.41 3.41 0 014.61 4.61l-.35.69zM92.46 74.67H92a16.11 16.11 0 00-15.8-15.74v-.52a15.08 15.08 0 0011-4.72 15.19 15.19 0 004.72-11h.51a15.12 15.12 0 004.72 11 15.12 15.12 0 0011 4.72v.51a16.13 16.13 0 00-15.69 15.75zm10.09-46.59h-.27a7.94 7.94 0 00-2.49-5.81A7.94 7.94 0 0094 19.78v-.27A7.94 7.94 0 0099.79 17a8 8 0 002.49-5.8h.27A8 8 0 00105 17a8 8 0 005.81 2.49v.27a8 8 0 00-5.81 2.51 7.94 7.94 0 00-2.49 5.81zm-41.5 8h-.41a12.06 12.06 0 00-3.78-8.82A12.06 12.06 0 0048 23.5v-.41a12.07 12.07 0 008.82-3.78 12.09 12.09 0 003.78-8.82h.41a12.08 12.08 0 003.77 8.82 12.09 12.09 0 008.83 3.78v.41a12.09 12.09 0 00-8.83 3.78 12.08 12.08 0 00-3.77 8.82z"
        className="cls-1"
      ></path>
    </svg>
  );
}

export default Icon;