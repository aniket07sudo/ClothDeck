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
        d="M5.673 7.698c-.385.06-.756 1.47-1.5 2.206-.546.53-1.226.497-1.587 1.153-.137.245-.093.663-.248 1.065-.304.804-1.375.875-1.375 1.75-.004.946.893 1.127 1.67 1.797.605.54.665.912 1.398 1.174.627.212 1.559-.481 2.398-.232.69.204 1.35.352 1.505 1.056.137.648-.009 1.654-.845 1.538-.281-.031-1.503-.44-3.004-.282-1.81.205-3.877.792-4.079 2.8-.111 1.121 1.284 2.444 2.632 2.175.932-.182.49-1.275.999-1.805.665-.68 4.434 2.373 7.939 2.373 1.475 0 2.572-.37 3.662-1.506.102-.086.226-.272.383-.283.149.01.408.156.493.219 2.823 2.255 4.956 6.779 15.328 6.832 1.459.008 3.121.7 4.478 1.931 1.21 1.113 1.918 2.843 2.605 4.6 1.038 2.634 2.899 5.197 5.72 8.05.153.153 2.475 1.948 2.66 2.082.03.018.2.424.142.65-.069 1.71-.32 6.683 3.41 6.908.911.046.672-.591.672-1.03-.002-.866-.161-1.726.299-2.613.628-1.22-1.333-1.781-1.275-4.418.04-1.966-1.62-1.63-2.463-3.129-.486-.868-.918-1.328-.886-2.39.189-5.973-1.279-9.898-2.011-10.862-.57-.728-1.043-1.017-.52-1.354 3.11-2.044 3.817-3.945 3.817-3.945 1.655-3.868 3.143-7.4 5.194-8.955.414-.32 1.474-1.108 2.124-1.417 1.915-.898 2.923-1.441 3.479-1.98.88-.852 1.575-2.63.732-3.708-1.05-1.33-2.864-.275-3.664.197-5.72 3.375-6.564 9.33-8.545 12.75-1.581 2.733-4.151 4.74-6.45 4.904-1.723.127-3.58-.22-5.43-1.026-4.497-1.961-6.958-4.493-7.538-4.94-1.209-.927-10.59-10.083-18.19-10.457 0 0-.943-1.878-1.18-1.91-.556-.07-1.125 1.123-1.533 1.261-.383.127-1.028-1.292-1.416-1.229z"
      ></path>
    </svg>
  );
}

export default Icon;
