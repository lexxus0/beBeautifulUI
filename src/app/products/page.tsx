"use client";
import BackButton from "@/components/ui/BackButton/BackButton";
import ProductsList from "@/components/ui/products/ProductsList";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts } from "@/store/products/operations";
import { selectProducts } from "@/store/products/selectors";
import { useEffect } from "react";

export default function Products() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts({ limit: 8, currentPage: 1 }));
  }, [dispatch]);
  const products = useAppSelector(selectProducts);
  return (
    <>
      <BackButton href="/">Головна</BackButton>
      <div className="container">
        <ProductsList products={products} />
      </div>
    </>
  );
}
