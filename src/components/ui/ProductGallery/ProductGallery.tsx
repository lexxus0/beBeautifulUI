"use client";
import { IProduct } from "@/types/types";
import Image from "next/image";
import React, { useState } from "react";

import css from "@/components/ui/ProductGallery/ProductGallery.module.css";
import ProductRatingInput from "../ProductRatingInput/ProductRatingInput";
import { useViewport } from "@/helpers/hooks/useViewport";

export interface ProductGalleryProps {
  product: IProduct;
}

const ProductGallery = ({ product }: ProductGalleryProps) => {
  const imageUrl: string[] = [
    "https://picsum.photos/600",
    "https://picsum.photos/601",
    "https://picsum.photos/602",
    // "https://picsum.photos/603",
  ];

  const [mainImage, setMainImage] = useState(imageUrl[0]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");

  const { width } = useViewport();

  const isTablet = width !== null && width >= 744;
  const isDesktop = width !== null && width >= 1440;

  const openLightbox = (image: string) => {
    setLightboxImage(image);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setLightboxImage("");
  };

  const imageWidth = isDesktop ? 526 : isTablet ? 322 : 335;
  const imageHeight = isDesktop ? 679 : isTablet ? 461 : 320;

  return (
    <div className={css.galleryContainer}>
      <div
        className={css.mainImageWrapper}
        onClick={() => openLightbox(mainImage)}
      >
        <Image
          src={mainImage}
          alt={product.name}
          width={imageWidth}
          height={imageHeight}
          className={css.productImage}
          priority
        />
      </div>

      {isTablet && (
        <div className={css.thumbnailContainer}>
          {[...Array(isDesktop ? 4 : 3)].map((_, index) => {
            const image = imageUrl[index];
            return (
              <div
                key={index}
                className={`${css.thumbnail} ${
                  isDesktop ? css.thumbnailLarge : css.thumbnailSmall
                } ${!image ? css.placeholder : ""}`}
                onClick={() => image && setMainImage(image)}
              >
                {image && (
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    width={isDesktop ? 120 : 94}
                    height={isDesktop ? 160 : 124}
                    className={css.thumbnailImage}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {width !== null && width < 744 ? <ProductRatingInput /> : null}

      {isLightboxOpen && (
        <div className={css.lightboxBackdrop} onClick={closeLightbox}>
          <div className={css.lightbox}>
            <Image
              src={lightboxImage}
              alt="Lightbox"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
