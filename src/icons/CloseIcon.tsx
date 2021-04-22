import React, { FC } from "react";

const CloseIcon: FC<{}> = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="white"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M10 10l4 4m0 -4l-4 4" />
    </svg>
  );
};

export default CloseIcon;
