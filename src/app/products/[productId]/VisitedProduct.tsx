"use client";

import { useEffect } from "react";

export default function VisitedProduct({ productId }: { productId: string }) {
  useEffect(() => {
    if (!productId) return;

    const stored = localStorage.getItem("visitedProducts");
    const visited: string[] = stored ? JSON.parse(stored) : [];

    // новий масив: спочатку новий id, потім решта без дубліката
    const updated = [productId, ...visited.filter((id) => id !== productId)];

    // максимум 10
    localStorage.setItem(
      "visitedProducts",
      JSON.stringify(updated.slice(0, 10))
    );
  }, [productId]);

  return null;
}
