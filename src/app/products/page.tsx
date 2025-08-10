"use client";
import Loader from '@/components/ui/Loader/Loader';
import ProductsList from "@/components/ui/products/ProductsList";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts } from "@/store/products/operations";
import { selectProducts, loadingProducts } from "@/store/products/selectors";
import { useEffect } from "react";

export default function Products() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts({ limit: 8, currentPage: 1 }));
  }, [dispatch]);
  const products = useAppSelector(selectProducts);
  const isLoading = useAppSelector(loadingProducts);
  return (
    <div className="container">
      {
        isLoading ? 
          <Loader/> 
          :
          <ProductsList products={products} />
        }
    </div>
  );
}
