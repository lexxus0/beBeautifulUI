"use client";
import { Product } from "@/types/types";
import Image from "next/image";
import React from "react";

import css from "@/components/ui/ProductGallery/ProductGallery.module.css";
import ProductRating from "../ProductRating/ProductRating";
import { useViewport } from "@/helpers/hooks/useViewport";

export interface ProductGalleryProps {
  product: Product;
}

const ProductGallery = ({ product }: ProductGalleryProps) => {
  const imageUrl: string = "https://picsum.photos/600";
  const { width } = useViewport();

  return (
    <div>
      <Image
        src={imageUrl}
        alt={product.name}
        width={335}
        height={320}
        className="rounded-lg object-cover"
      />
      {width !== null && width < 744 ? <ProductRating /> : null}
    </div>
  );
};

export default ProductGallery;
