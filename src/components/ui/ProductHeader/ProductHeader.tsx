"use client";
import { IProduct } from "@/types/types";
import ProductRating from "../ProductRating/ProductRating";
import { useViewport } from "@/helpers/hooks/useViewport";
import css from "@/components/ui/ProductHeader/ProductHeader.module.scss";

export interface ProductHeaderProps {
  product: IProduct;
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
  const { width } = useViewport();

  return (
    <div className={css.headercontainer}>
      <div className={css.categoryContainer}>
        <h3 className={css.name}>{product.name}</h3>
        <div className={css.rate}>
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
        </div>
        {width !== null && width > 743 ? (
          <div className={css.stars}>
            <ProductRating
              productId={product._id}
              value={
                product.reviews?.length
                  ? product.reviews.reduce((sum, r) => sum + r.rating, 0) /
                    product.reviews.length
                  : 0
              }
              reviews={product.reviews?.length || 0}
              sizeConfig={{
                mobile: 24,
                tablet: 24,
                desktop: 32,
              }}
              layoutConfig={{
                gap: { mobile: 4, tablet: 4, desktop: 16 },
                marginRight: { mobile: 0, tablet: 16, desktop: 0 },
              }}
            />
          </div>
        ) : null}
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

export default ProductHeader;
