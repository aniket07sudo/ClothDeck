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
        d="M58.621 30.03h-3.477c-.346-.846-.711-1.518-2.652-1.518-1.345 0-1.921.557-1.921 1.114 0 .615.48 1.114 1.96 1.441l3.15.846c2.057.557 3.056 2.19 3.056 3.9 0 .96-.212 2.113-1.115 3.074-.672.711-1.71 1.653-5.13 1.653-4.688 0-6.244-2.96-6.244-4.765h3.65c.365 1.306 1.25 1.806 3.036 1.806 1.23 0 2.287-.442 2.287-1.384 0-.903-.769-1.23-1.749-1.498l-2.479-.673c-1.19-.365-2.19-.653-2.9-1.249-1.845-1.575-1.71-4.4.287-5.86 1.115-.807 2.248-1.23 4.074-1.23 2.133 0 3.343.615 4.304 1.268.826.538 1.844 1.96 1.863 3.075zM0 20c.038.115 7.263 20.367 7.263 20.367h4.323l6.648-16.85h41.31L59.85 20H15.064L9.549 33.968 4.592 20H0zm35.718 13.085l5.4 7.282h3.381v-14.41h-3.881v7.838l-4.88-7.82H32.01v14.392h3.728v-7.282h-.02zm24.268 6.532a.77.77 0 00-.769-.768.77.77 0 00-.768.768.77.77 0 00.768.769c.423 0 .788-.346.769-.769.019 0 .019 0 0 0zm-.077 0a.68.68 0 01-.673.673.68.68 0 01-.672-.673.68.68 0 01.672-.672c.365-.02.673.269.673.672 0-.019 0-.019 0 0zm-.327-.173a.275.275 0 00-.269-.269H58.91v.807h.173v-.269h.134l.173.27h.211l-.192-.289a.217.217 0 00.173-.25zm-.173.02a.124.124 0 01-.115.115H59.102v-.23h.173a.13.13 0 01.153.076c-.019.02 0 .02-.019.039zm-44.25.903h4.15l.77-2.248h5.475l.788 2.248h4.074l-5.227-14.391h-4.4l-5.63 14.39zm6.072-4.861l1.614-4.785 1.576 4.785h-3.19z"
      ></path>
    </svg>
  );
}

export default Icon;
