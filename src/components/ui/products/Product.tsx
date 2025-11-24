"use client";
import { useEffect } from "react";
import ProductActions from "@/components/ui/ProductActions/ProductActions";
import ProductDescription from "@/components/ui/ProductDescription/ProductDescription";
import ProductGallery from "@/components/ui/ProductGallery/ProductGallery";
import ProductHeader from "@/components/ui/ProductHeader/ProductHeader";
import BrandPhilosophy from "@/components/ui/BrandPhilosophy/BrandPhilosophy";
import VisitedProduct from "@/app/products/[productId]/VisitedProduct";
import ProductReviews from "@/components/ui/ProductReviews/ProductReviews";
import NavigationPanel from "../NavigationPanel/NavigationPanel";
import { fetchProductById } from "@/store/products/operations";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectIsLoading, selectProductDetails } from "@/store/products/selectors";
import css from "./page.module.scss";

const Product = ({ productId }: { productId: string }) => {
  const dispatch = useAppDispatch();

  const product = useAppSelector(selectProductDetails);
  console.log('product: ', product);
  const loading = useAppSelector(selectIsLoading);

    useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [productId, dispatch]);

  if (loading) return <span>Loading....</span>;
  if (!product) return <span>some problems...</span>;

  return (
    <>
      <NavigationPanel category={product.category} name={product.name} />
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
          productName={product.name || "продукт"}
        />
      </section>
    </>
  );
};

export default Product;
