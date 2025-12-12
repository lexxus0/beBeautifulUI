"use client";
import { memo } from "react";
import ProductActions from "@/components/ui/ProductActions/ProductActions";
import ProductDescription from "@/components/ui/ProductDescription/ProductDescription";
import ProductGallery from "@/components/ui/ProductGallery/ProductGallery";
import ProductHeader from "@/components/ui/ProductHeader/ProductHeader";
import BrandPhilosophy from "@/components/ui/BrandPhilosophy/BrandPhilosophy";
import VisitedProduct from "@/app/products/[productId]/VisitedProduct";
import ProductReviews from "@/components/ui/ProductReviews/ProductReviews";
import NavigationPanel from "@/components/ui/NavigationPanel/NavigationPanel";
import { IProduct } from "@/types/types";
import css from "./page.module.scss";

interface ProductProps {
  product: IProduct;
  productId: string;
}

const Product = ({ product, productId }: ProductProps) => {
  return (
    <>
      <NavigationPanel category={product.category} name={product.name.en} />
      <section className="container">
        <VisitedProduct productId={productId} />
        <div className={css.productContainer}>
          <div className={css.header}>
            <ProductHeader product={product} />
          </div>
          <div className={css.gallery}>
            <ProductGallery product={product} />
          </div>
          <div className={css.description}>
            <ProductDescription product={product} />
          </div>
          <div className={css.actions}>
            <ProductActions product={product} />
          </div>
        </div>

        <div className={css.fullWidthWrapper}>
          <BrandPhilosophy dynamicText="Цей шампунь — як свіже «доброго ранку» собі. І як щоденне нагадування: ти — варта найкращого." />
        </div>

        <ProductReviews
          productId={productId}
          productName={product.name.en}
        />
      </section>
    </>
  );
};

export default memo(Product);
