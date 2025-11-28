"use client";

import { useEffect, memo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProductById } from "@/store/products/operations";
import {
  selectISsLoadingProduct,
  selectProductDetails,
} from "@/store/products/selectors";
import Product from "./Product";

function ProductWrapperComponent({ productId }: { productId: string }) {
  const dispatch = useAppDispatch();

  const product = useAppSelector(selectProductDetails);
  const loading = useAppSelector(selectISsLoadingProduct);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [productId, dispatch]);

  if (loading && !product) return <span>Loading...</span>;
  if (!product) return <span>No product found</span>;

  return <Product product={product} productId={productId} />;
}

export default memo(ProductWrapperComponent);
