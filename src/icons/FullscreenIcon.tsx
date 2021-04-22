import React, { FC } from "react";

const FullscreenIcon: FC<{ isMaximum: boolean }> = ({ isMaximum }) => {
  if (isMaximum) {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="white"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M15 19v-2a2 2 0 0 1 2 -2h2" />
        <path d="M15 5v2a2 2 0 0 0 2 2h2" />
        <path d="M5 15h2a2 2 0 0 1 2 2v2" />
        <path d="M5 9h2a2 2 0 0 0 2 -2v-2" />
      </svg>
    );
  } else {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="white"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
        <path d="M4 16v2a2 2 0 0 0 2 2h2" />
        <path d="M16 4h2a2 2 0 0 1 2 2v2" />
        <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
      </svg>
    );
  }
};

export default FullscreenIcon;
