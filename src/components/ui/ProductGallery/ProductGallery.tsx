"use client";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { IProduct } from "@/types/types";

import { useViewport } from "@/helpers/hooks/useViewport";
import { normalizeBackendImageUrl } from "@/helpers/normalizeImage";
import { useReviewData } from "@/helpers/hooks/useReviewData";
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
  const { avgRating, count } = useReviewData(product._id);

  const isMobile = width <= 743;
  const isTablet = width >= 744 && width <= 1439;
  const isDesktop = width >= 1440;

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

  const sizeConfig = useMemo(
    () => ({
      mobile: 24,
      tablet: 24,
      desktop: 32,
    }),
    []
  );

  const layoutConfig = useMemo(
    () => ({
      gap: { mobile: 4, tablet: 4, desktop: 16 },
      marginRight: { mobile: 0, tablet: 16, desktop: 0 },
    }),
    []
  );

  return (
    <div className={css.galleryContainer}>
      <div
        className={css.mainImageWrapper}
        onClick={() => openLightbox(product.imageUrl)}
      >
        {canRenderImage ? (
          <Image
            src={product.imageUrl}
            alt={product.name.en}
            width={imageWidth}
            height={imageHeight}
            className={css.productImage}
            priority
            onError={() => setImgError(true)}
          />
        ) : (
          <Image
            src={imagePlaceholder}
            alt={product.name.en}
            width={imageWidth}
            height={imageHeight}
            className={css.productImage}
            priority
          />
        )}
      </div>

      {isMobile ? (
        <ProductRating
          value={avgRating}
          reviews={count}
          sizeConfig={sizeConfig}
          layoutConfig={layoutConfig}
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
