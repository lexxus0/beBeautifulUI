'use client';

import React from 'react';
import clsx from 'clsx';

interface IconProps {
  name: string;
  className?: string;
}

export default function Icon({ name, className }: IconProps) {
  return (
    <svg className={clsx('fill-current', className)}>
      <use xlinkHref={`/icons/sprite.svg#${name}`} />
    </svg>
  );
}
