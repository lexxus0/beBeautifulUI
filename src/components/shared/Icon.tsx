"use client";

import React from "react";
import clsx from "clsx";

interface IconProps {
  name: string;
  width?: number;
  height?: number;
  className?: string;
  title?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}

export default function Icon({
  width,
  height,
  name,
  className,
  title,
  onClick,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : "presentation"}
      // focusable="false"
      className={clsx("fill-current stroke-current", className)}
      onClick={onClick}
    >
      <use href={`/icons/sprite.svg#${name}`} />
    </svg>
  );
}
