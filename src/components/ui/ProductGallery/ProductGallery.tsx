"use client";
import { IProduct } from "@/types/types";
import Image from "next/image";
import React, { useMemo, useState } from "react";

import { useViewport } from "@/helpers/hooks/useViewport";
import { normalizeBackendImageUrl } from "@/helpers/normalizeImage";
import ProductRating from "../ProductRating/ProductRating";
import css from "@/components/ui/ProductGallery/ProductGallery.module.scss";

export interface ProductGalleryProps {
  product: IProduct;
}

const ProductGallery = ({ product }: ProductGalleryProps) => {
  const [imgError, setImgError] = useState(false);
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

  const imageSrc = useMemo(() => {
    return normalizeBackendImageUrl(product.imageUrl);
  }, [product.imageUrl]);

  const canRenderImage = !!imageSrc && !imgError;

  const imageWidth = isDesktop ? 526 : isTablet ? 322 : 335;
  const imageHeight = isDesktop ? 679 : isTablet ? 461 : 320;
  const imagePlaceholder = isDesktop
    ? "/images/placeholder/placeholder-desk.png"
    : isTablet
    ? "/images/placeholder/placeholder-tab.png"
    : "/images/placeholder/placeholder-tab.png";

  return (
    <div className={css.galleryContainer}>
      <div
        className={css.mainImageWrapper}
        onClick={() => openLightbox(product.imageUrl)}
      >
        {canRenderImage ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={imageWidth}
            height={imageHeight}
            className={css.productImage}
            priority
            onError={() => setImgError(true)}
          />
        ) : (
          <Image
            src={imagePlaceholder}
            alt={product.name}
            width={imageWidth}
            height={imageHeight}
            className={css.productImage}
            priority
          />
        )}
      </div>

      {width !== null && width < 744 ? (
        <ProductRating
          productId={product._id}
          value={3.3}
          sizeConfig={{
            mobile: 24,
            tablet: 24,
            desktop: 32,
          }}
          layoutConfig={{
            gap: { mobile: 4, tablet: 4, desktop: 16 },
          }}
        />
      ) : null}

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
