"use client";

import React from "react";
import clsx from "clsx";

interface IconProps {
  name: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function Icon({ width, height, name, className }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      className={clsx("fill-current", className)}
    >
      <use xlinkHref={`/icons/sprite.svg#${name}`} />
    </svg>
  );
}
