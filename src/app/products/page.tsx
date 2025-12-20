"use client";

import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProductsHome } from "@/store/products/operations";
import ProductsList from "@/components/ui/products/ProductsList";
import BackButton from "@/components/ui/BackButton/BackButton";
import Filter from "@/components/ui/products/Filter/Filter";
import Loader from "@/components/ui/Loader/Loader";
import { categoryNames } from "@/constants/categoryNames";
import { IPriceByVolume, IProduct } from "@/types/types";
import { selectIsLoadingHome, selectProductsByCategoryIds, selectProductsById } from "@/store/products/selectors";
// import { mockProducts } from "./mockProducts";

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const productsById = useAppSelector(selectProductsById);
  const productsByCategoryIds = useAppSelector(selectProductsByCategoryIds);
  const isLoadingHome = useAppSelector(selectIsLoadingHome);


  useEffect(() => {
    dispatch(fetchProductsHome());
  }, [dispatch]);

  const selectedCategory = searchParams.get("category") || "";
  const selectedVolume = searchParams.get("volume") || "";
  const keyword = searchParams.get("keyword")?.trim().toLowerCase() || "";

  const filteredProducts = useMemo(() => {
    const result: Record<string, IProduct[]> = {};

    if (!productsByCategoryIds) return result;

    Object.entries(productsByCategoryIds as Record<string, string[]>).forEach(
      ([category, ids]) => {
        let filtered = ids
        .map((id) => productsById[id])
        .filter(Boolean); // convert ids to products

        if (selectedCategory && category !== selectedCategory) return;

        if (keyword) {
          filtered = filtered.filter((p) =>
            p.name.ua.toLowerCase().includes(keyword)
          );
        }

        if (selectedVolume) {
          const volumeNum = Number(selectedVolume.replace(/[^\d]/g, ""));
          filtered = filtered.filter((p) =>
            p.priceByVolume.some((v: IPriceByVolume) => v.volume === volumeNum)
          );
        }

        if (filtered.length > 0) {
          result[category] = filtered;
        }
      }
    );

    return result;
  }, [productsByCategoryIds, productsById, selectedCategory, selectedVolume, keyword]);
  console.log('filteredProducts: ', filteredProducts);


  if (isLoadingHome) return <Loader />;

  return (
    <>
      <BackButton href="/">Головна</BackButton>

      <div className="container">
        <Filter />

        {Object.keys(filteredProducts).length === 0 && (
          <p className="text-center text-xl my-20">Нічого не знайдено...</p>
        )}

        {Object.keys(filteredProducts).map((category) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              {categoryNames[category] || category}
            </h2>
            <ProductsList products={filteredProducts[category]} />
            {/* <ProductsList products={mockProducts} /> */}
          </div>
        ))}
      </div>
    </>
  );
}
