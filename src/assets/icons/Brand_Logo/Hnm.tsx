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
      fill="transparent"
      viewBox="0 0 192.756 192.756"
    >
      <g fillRule="evenodd" clipRule="evenodd">
        <path fill="transparent" d="M0 0h192.756v192.756H0V0z"></path>
        <path
          fill={color}
          d="M130.424 44.314c6.051-3.026 9.156-2.561 9.234.465.076 3.957-.545 9.233-.934 13.035-2.326 20.64-6.051 37.477-6.361 58.737 10.01-25.916 18.312-43.762 29.098-65.875 3.414-7.061 5.664-5.742 8.457-7.061 10.941-4.889 11.328-1.863 9.854 4.189-5.275 21.959-18.777 91.403-20.871 102.035-.621 3.104-4.035 1.862-4.811.621-4.035-5.354-8.381-5.433-7.916-9.079 2.484-17.69 11.33-62.461 13.58-73.014-11.717 23.897-23.822 53.926-30.027 70.84-1.32 3.57-3.725 3.338-5.199.699-2.174-3.803-6.209-5.664-6.828-10.009-2.174-13.89 2.404-40.426 3.025-57.263-6.285 18.311-16.992 54.004-21.648 70.064-1.939 6.674-8.379 5.51-6.672-.853 7.137-27.08 22.424-74.799 29.018-91.947 1.552-4.11 5.663-3.877 9.001-5.584zm-38.641-3.336c-2.096-.465-8.148 2.793-11.872 3.337-1.163.311-2.25 1.474-2.637 2.404C71.375 60.297 66.1 73.179 61.6 84.816a711.997 711.997 0 00-20.33 4.035c5.509-13.966 11.019-27.854 16.372-41.124 2.638-6.672-4.344-7.293-7.062-.62-3.491 8.613-10.087 24.828-17.38 43.685-5.354 1.319-11.174 2.793-17.07 4.578-4.345 1.163-4.501 2.326-2.639 4.966 1.086 1.396 3.104 1.241 4.113 2.328 2.561 2.637 4.113 5.819 8.689 6.284-4.189 10.863-8.225 21.959-11.793 32.589-2.328 6.75 4.267 8.147 6.75 1.009 4.035-11.406 8.302-22.967 12.726-34.685 3.647-.775 12.415-2.637 20.562-4.5-6.44 17.846-10.63 31.27-12.338 37.865-.309 1.241.311 1.862.543 2.482 2.096 3.104 4.268 3.259 7.061 7.217.699 1.087 3.259 1.629 4.191-1.009a1241.157 1241.157 0 0117.768-50.279c2.406-.621 6.752-1.63 9.389-5.509 4.656-6.984 5.976-5.586 7.217-7.682 1.396-2.715.387-5.121-4.578-4.578 0 0-1.863.156-5.432.544 5.586-14.2 10.554-26.226 13.967-35.46 1.163-3.181 1.32-5.509-.543-5.974z"
        ></path>
        <path
          fill={color}
          d="M86.325 129.153c.807-1.024 1.539-2.081 2.199-3.057 2.94-4.35.078-6.907-2.948-4.346-.432.397-.881.83-1.327 1.28a980.885 980.885 0 01-1.477-4.66c1.387-1.7 2.737-3.445 3.889-5.233 4.863-7.542-4.654-11.871-8.768-6.982-2.171 2.561-1.628 5.121-1.008 7.371.18.676.46 1.642.807 2.814a104.967 104.967 0 00-4.376 4.866c-4.733 5.433-3.417 12.428 1.552 13.967 2.996.929 5.823-.425 8.272-2.585.118.308.231.601.341.879 1.319 3.259 5.432 2.25 3.802-1.707-.262-.665-.59-1.56-.958-2.607zm-6.736-6.837c.402 1.267.835 2.598 1.267 3.872-.541.451-1.09.907-1.643 1.227-1.924 1.113-3.337-.078-.854-3.414.406-.576.822-1.134 1.23-1.685zm1.553-9.501c-.143-.361-.225-.715-.3-.996-1.392-5.2 4.568-3.811 1.553-.388-.428.485-.817.965-1.253 1.384z"
        ></path>
      </g>
    </svg>
  );
}

export default Icon;
