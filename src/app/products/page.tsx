"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts } from "@/store/products/operations";
import { selectProducts } from "@/store/products/selectors";
import ProductsList from "@/components/ui/products/ProductsList";
import BackButton from "@/components/ui/BackButton/BackButton";
import Filter from "@/components/ui/products/Filter/Filter";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);

  const searchParams = useSearchParams();
  const category = searchParams.get("category") || undefined;
  const volume = searchParams.get("volume") || undefined;
  const keyword = searchParams.get("keyword") || undefined;

  useEffect(() => {
    dispatch(
      fetchProducts({
        limit: 8,
        currentPage: 1,
        category,
        volumeOptions: volume,
        keyword,
      })
    );
  }, [dispatch, category, volume, keyword]);

  return (
    <>
      <BackButton href="/">Головна</BackButton>
      <div className="container">
        <Filter />
        <ProductsList products={products} />
      </div>
    </>
  );
}
