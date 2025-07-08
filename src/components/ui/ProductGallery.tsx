import { Product } from "@/types/types";
import React from "react";

export interface ProductGalleryProps {
  images: [string];
}

const ProductGallery = (images: ProductGalleryProps) => {
  console.log(images);

  return (
    <img src={images} alt="Product photo">
      ProductGallery
    </img>
  );
};

export default ProductGallery;
