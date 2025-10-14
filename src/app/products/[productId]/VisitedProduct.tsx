"use client";

import { useEffect } from "react";

export default function VisitedProduct({ productId }: { productId: string }) {
  useEffect(() => {
    if (!productId) return;

    const stored = localStorage.getItem("visitedProducts");
    let visited: string[] = stored ? JSON.parse(stored) : [];

    visited = visited.filter((id) => id !== productId);
    localStorage.setItem("visitedProducts", JSON.stringify(visited));

    return () => {
      const storedAgain = localStorage.getItem('visitedProducts');
      const current: string[] = storedAgain ? JSON.parse(storedAgain) : [];
      
      const updated = [productId, ...current.filter((id) => id !== productId)];
    
      localStorage.setItem(
        "visitedProducts",
        JSON.stringify(updated.slice(0, 10))
      );
    }
  }, [productId]);

  return null;
}
