"use client";
import { IProduct } from "@/types/types";
import ProductRating from "../ProductRating/ProductRating";
import { useViewport } from "@/helpers/hooks/useViewport";
import css from "@/components/ui/ProductHeader/ProductHeader.module.scss";
import { memo, useMemo } from "react";
import { useReviewData } from "@/helpers/hooks/useReviewData";

export interface ProductHeaderProps {
  product: IProduct;
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
  const { width } = useViewport();
  const { avgRating, count } = useReviewData(product._id);

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

  const isTablet = width !== null && width > 743;

  if (width === null) return null;

  return (
    <div className={css.headercontainer}>
      <div className={css.categoryContainer}>
        <h3 className={css.name}>{product.name.en}</h3>
        {/* <div className={css.rate}>
          <div className={css.inStockContainer}>
            <div
              className={`w-2 h-2 rounded-full ${
                product.inStock ? "bg-[#8db078]" : "bg-[#AF1818]"
              }`}
            />
            <p className={css.inStock}>
              {product.inStock ? "У наявності" : "Немає в наявності"}
            </p>
          </div>
        </div> */}
        {isTablet && (
          <div className={css.stars}>
            <ProductRating
              value={avgRating}
              reviews={count}
              sizeConfig={sizeConfig}
              layoutConfig={layoutConfig}
            />
          </div>
        )}

        <p className={css.features}>
          {product.features && product.features.length > 0
            ? product.features.join(" | ")
            : ""}
        </p>
      </div>

      <p className={css.volumeOption}>
        {product.volumeOptions && product.volumeOptions.length > 0
          ? product.volumeOptions.join(" / ")
          : product.stockQuantity + " мл"}
      </p>
    </div>
  );
};

export default memo(ProductHeader);
