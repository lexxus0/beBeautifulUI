import { Product } from "@/types/types";
import Image from "next/image";
import React from "react";

export interface ProductGalleryProps {
  product: Product;
}

const ProductGallery = ({ product }: ProductGalleryProps) => {
  console.log(product);
  const imageUrl: string = "https://picsum.photos/600";

  return (
    <Image
      src={imageUrl}
      alt={product.name}
      width={335}
      height={320}
      className="rounded-lg object-cover"
    />
  );
};

export default ProductGallery;
