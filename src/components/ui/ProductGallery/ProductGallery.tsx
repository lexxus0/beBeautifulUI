"use client";
import { IProduct } from "@/types/types";
import Image from "next/image";
import React from "react";

import css from "@/components/ui/ProductGallery/ProductGallery.module.css";
import ProductRating from "../ProductRating/ProductRating";
import { useViewport } from "@/helpers/hooks/useViewport";

export interface ProductGalleryProps {
  product: IProduct;
}

const ProductGallery = ({ product }: ProductGalleryProps) => {
  const imageUrl: string = "https://picsum.photos/600";
  const { width } = useViewport();

  const isDesktop = width !== null && width >= 744;
  const imageWidth = isDesktop ? 322 : 335;
  const imageHeight = isDesktop ? 461 : 320;

  return (
    <>
      <Image
        src={imageUrl}
        alt={product.name}
        width={imageWidth}
        height={imageHeight}
        className={css.productImage}
      />
      {width !== null && width < 744 ? <ProductRating /> : null}
    </>
  );
};

export default ProductGallery;
