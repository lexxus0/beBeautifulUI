"use client";

import { useEffect, memo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProductById } from "@/store/products/operations";
import {
  makeSelectProductById,
  selectIsLoadingProduct,
} from "@/store/products/selectors";
import Product from "./Product";

function ProductWrapperComponent({ productId }: { productId: string }) {
  const dispatch = useAppDispatch();

  const selectProduct = makeSelectProductById(productId);

  const product = useAppSelector(selectProduct);
  const loading = useAppSelector(selectIsLoadingProduct);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [productId, dispatch]);

  if (loading && !product) return <span>Loading...</span>;
  if (!product) return <span>No product found</span>;

  return <Product product={product} productId={productId} />;
}

export default memo(ProductWrapperComponent);
