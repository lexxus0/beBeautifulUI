"use client";
import * as React from "react";
import { BasketIconProps } from "@/types/types";

export default function BasketIcon({ variant = "black", ...props }: BasketIconProps) {
  const uniqueId = React.useId();

  const patternId = `pattern_${uniqueId}`;
  const clipPathId = `clip_${uniqueId}`;
  const paint0Id = `paint0_${uniqueId}`;
  const paint1Id = `paint1_${uniqueId}`;

  const isWhite = variant === "white";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
      {...props}
    >
      <g clipPath={`url(#${clipPathId})`}>
        <path
          fill={isWhite ? "#fff" : "#000"}
          stroke="currentColor"
          strokeWidth="0.4"
          d="m24.966 10.77.057.097H30.5a1.3 1.3 0 0 1 1.3 1.3v.937a40.25 40.25 0 0 1-3.991 17.475l-.26.526a1.25 1.25 0 0 1-1.125.695H5.578a1.27 1.27 0 0 1-1.128-.698A40.25 40.25 0 0 1 .2 13.101v-.934a1.3 1.3 0 0 1 1.3-1.3h5.477l.057-.098L13.018.793l1.489.89-5.328 8.88-.182.304h14.006l-.182-.304-5.33-8.88 1.49-.891z"
        />
        <path
          fill={`url(#${patternId})`}
          d="M12 17.05h9a.95.95 0 0 1 .95.95v6A3.95 3.95 0 0 1 18 27.95h-3A3.95 3.95 0 0 1 11.05 24v-6a.95.95 0 0 1 .95-.95"
        />
        <path
          stroke={`url(#${paint0Id})`}
          strokeWidth="0.1"
          d="M12 17.05h9a.95.95 0 0 1 .95.95v6A3.95 3.95 0 0 1 18 27.95h-3A3.95 3.95 0 0 1 11.05 24v-6a.95.95 0 0 1 .95-.95Z"
        />
        <path stroke={`url(#${paint1Id})`} d="M0 13.722h32" />
      </g>
      <defs>
        <linearGradient
          id={paint1Id}
          x1="0"
          x2="32"
          y1="14.722"
          y2="14.722"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="0.024" stopColor={isWhite ? "#000" : "#fff"} />
          <stop offset="0.515" stopColor={isWhite ? "#000" : "#fff"} />
          <stop offset="0.971" stopColor={isWhite ? "#000" : "#fff"} />
          <stop offset="1" />
        </linearGradient>
        <clipPath id={clipPathId}>
          <path fill="#" d="M0 0h32v32H0z" />
        </clipPath>
        <pattern
          id={patternId}
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
        </pattern>
      </defs>
    </svg>
  );
}