"use client";

import { useEffect } from "react";

export default function VisitedProduct({ productId }: { productId: string }) {
  useEffect(() => {
    if (!productId) return;

    const stored = localStorage.getItem("visitedProducts");
    const visited: string[] = stored ? JSON.parse(stored) : [];

    if (!visited.includes(productId)) {
      visited.push(productId);
      localStorage.setItem("visitedProducts", JSON.stringify(visited));
    }
  }, [productId]);

  return null;
}
