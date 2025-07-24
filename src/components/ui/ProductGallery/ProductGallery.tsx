import { Product } from "@/types/types";
import Image from "next/image";
import React from "react";
import Icon from "../../elements/Icons";

import css from "@/components/ui/ProductGallery/ProductGallery.module.css";

export interface ProductGalleryProps {
  product: Product;
}

const ProductGallery = ({ product }: ProductGalleryProps) => {
  const imageUrl: string = "https://picsum.photos/600";
  const starArray = Array(5).fill(null, 0);

  return (
    <div>
      <Image
        src={imageUrl}
        alt={product.name}
        width={335}
        height={320}
        className="rounded-lg object-cover"
      />
      <div className={css.starAssessment}>
        {starArray.map((_, index) => {
          return (
            <Icon
              key={index}
              name="icon-star"
              width={24}
              height={24}
              useGradient
            />
          );
        })}
        <p className={css.fidbackQuantity}>(0 відгуків)</p>
      </div>
    </div>
  );
};

export default ProductGallery;
