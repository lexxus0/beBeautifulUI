"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IProduct } from "@/types/types";

type ProductImageProps = {
    product: IProduct;
    className: string;
}

export default function ProductImage({ product, className }: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(product.imageUrl || "");
  const [fallbackSrc, setFallbackSrc] = useState(
    "/images/placeholder/placeholder-mob.png"
  );

  useEffect(() => {
    const width = window.innerWidth;
    if (width >= 1440)
      setFallbackSrc("/images/placeholder/placeholder-desk.png");
    else if (width >= 744)
      setFallbackSrc("/images/placeholder/placeholder-tab.png");
    else setFallbackSrc("/images/placeholder/placeholder-mob.png");
  }, []);

  return (
    <div className={className}>
      <Image
        src={imgSrc || fallbackSrc}
        alt={product.name?.ua || "product"}
        fill
        className="object-cover"
        onError={() => setImgSrc(fallbackSrc)}
      />
    </div>
  );
}
