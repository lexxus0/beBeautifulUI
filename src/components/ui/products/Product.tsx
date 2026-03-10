"use client";
import { memo } from "react";
import ProductActions from "@/components/ui/ProductActions/ProductActions";
import ProductDescription from "@/components/ui/ProductDescription/ProductDescription";
import ProductGallery from "@/components/ui/ProductGallery/ProductGallery";
import ProductHeader from "@/components/ui/ProductHeader/ProductHeader";
import BrandPhilosophy from "@/components/ui/BrandPhilosophy/BrandPhilosophy";
import VisitedProduct from "@/app/products/[productId]/VisitedProduct";
import ProductReviews from "@/components/ui/ProductReviews/ProductReviews";
import NavigationPanel from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { IProduct } from "@/types/types";
import RecommendedProducts from "../RecommendedProducts/RecommendedProducts";
import css from "./page.module.scss";

interface ProductProps {
  product: IProduct;
  productId: string;
}

const Product = ({ product, productId }: ProductProps) => {
  return (
    <>
      <NavigationPanel category={product.category} name={product.name?.ua} />
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
        <RecommendedProducts
          category={product.category}
          title="Товари цієї ж серії"
          classNameTitle="text-black text-[24px] font-lato font-semibold text-center leading-[28.8px]
          md:text-[28px] md:font-normal md:text-left
          lg:text-[32px] lg:font-semibold lg:mb-6"
          classNameWrap="relative pt-10 pb-10 lg:pt-15 lf:pb-15"
          borderShow={true}
        />
        <ProductReviews productId={productId} productName={product.name?.ua} />
      </section>
    </>
  );
};

export default memo(Product);
