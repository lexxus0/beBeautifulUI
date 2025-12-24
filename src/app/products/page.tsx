"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts } from "@/store/products/operations";
import ProductsList from "@/components/ui/products/ProductsList";
import BackButton from "@/components/ui/BackButton/BackButton";
import Filter from "@/components/ui/products/Filter/Filter";
import Loader from "@/components/ui/Loader/Loader";
import {
  selectIsLoadingProduct,
  selectProductsList,
  selectPagination,
} from "@/store/products/selectors";

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const products = useAppSelector(selectProductsList);
  const pagination = useAppSelector(selectPagination);
  const totalPages = pagination?.totalPages || 1;
  const isLoading = useAppSelector(selectIsLoadingProduct);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const category = searchParams.get("category") || "";
  const volume = searchParams.get("volume") || "";
  const keyword = searchParams.get("keyword")?.trim() || "";

  useEffect(() => {
    setCurrentPage(1);
  }, [category, volume, keyword]);

  useEffect(() => {
    dispatch(
      fetchProducts({
        limit: currentPage * ITEMS_PER_PAGE,
        currentPage: 1,
        category,
        volumeOptions: volume,
        keyword,
      })
    );
  }, [dispatch, currentPage, category, volume, keyword]);

  const hasMore = totalPages > currentPage;

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <>
      <BackButton href="/">Головна</BackButton>

      <div className="container pb-20">
        <Filter />

        {isLoading && currentPage === 1 ? (
          <div className="flex justify-center my-20">
            <Loader />
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-xl my-20">
            Нічого не знайдено... Спробуйте змінити параметри фільтрації
          </p>
        ) : (
          <div className="mb-12">
            <ProductsList products={products} />
          </div>
        )}

        {isLoading && currentPage > 1 && (
          <div className="flex justify-center my-10">
            <Loader />
          </div>
        )}

        {!isLoading && hasMore && (
          <div className="flex justify-end mt-10 w-full">
            <button
              onClick={handleLoadMore}
              className="flex items-center justify-center bg-transparent !font-open-sans tracking-wider text-black-10 transition-all duration-300 w-[155px] h-[39px] 
      !text-[16px] !font-normal !leading-[1.2] border-b-[0.8px] border-solid border-gray-80 md:w-[189px] md:h-[44px] md:!text-[20px] hover:border-b-[1.8px] hover:border-b-[#403e3e] hover:shadow-[0_4px_2px_-2px_rgba(0,0,0,0.24)] active:scale-95"
            >
              Дивитись більше
            </button>
          </div>
        )}
      </div>
    </>
  );
}
