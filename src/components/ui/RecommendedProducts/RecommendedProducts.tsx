"use client";

import ProductItem from "@/components/ui/products/ProductItem";
import styles from "./RecommendedProducts.module.scss";
import { IProduct } from "@/types/types";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts } from "@/store/products/operations";
import { selectProductsById, selectProductsList } from "@/store/products/selectors";
// import { useSelector } from "react-redux";
// import { selectProducts } from "@/store/products/selectors";

const RecommendedProducts = () => {
  const dispatch = useAppDispatch();
  // const products = useSelector(selectProducts);
  const productsById = useAppSelector(selectProductsById);
  const productsList = useAppSelector(selectProductsList);

  useEffect(() => {
    dispatch(fetchProducts({ limit: 3, currentPage: 1, category: "hair" }));
  }, [dispatch]);

  const recommended = productsList
  .map((id: string) => productsById[id])
  .filter(Boolean)
  .slice(0, 3);

  return (
    <section className={styles.recommended}>
      <h2 className={styles.title}>Рекомендовані товари</h2>
      <div className={styles.grid}>
        {recommended.map((product: IProduct) => (
          <ProductItem
            key={product._id}
            item={product}
            // productId={product._id}
          />
        ))}
      </div>
    </section>
  );
};

export default RecommendedProducts;
