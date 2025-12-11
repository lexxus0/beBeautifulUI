"use client";

import { useEffect, useState } from "react";

export const useBreakpoint = () => {
  const [bp, setBp] = useState<"mobile" | "tablet" | "desktop">("mobile");

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      if (w < 743) setBp("mobile");
      else if (w < 1439) setBp("tablet");
      else setBp("desktop");
    };

    onResize();
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  return bp;
};
