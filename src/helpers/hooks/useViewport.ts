"use client";
import { useEffect, useState } from "react";

export const useViewport = () => {
  const [width, setWidth] = useState<number>(0); // 🔥 не null, а 0 (SSR-safe)

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return { width };
};
