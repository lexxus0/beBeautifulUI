import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

// BASE SELECTORS

export const selectProductsState = (state: RootState) => state.products;

export const selectProductsById = (state: RootState) =>
  state.products.productsById;

export const selectProductsListIds = (state: RootState) =>
  state.products.productsListIds;

export const selectProductsByCategoryIds = (state: RootState) =>
  state.products.productsByCategoryIds;

export const selectRecentlyViewedIds = (state: RootState) =>
  state.products.recentlyViewedIds;

export const selectPagination = (state: RootState) => ({
  total: state.products.totalItems || 0,
  totalPages: state.products.totalPages || 1,
  currentPage: state.products.currentPage || 1,
  perPage: state.products.limit || 12,
});

export const selectIsLoadingProduct = (state: RootState) =>
  state.products.isLoadingProduct;

export const selectIsLoadingRecently = (state: RootState) =>
  state.products.isLoadingRecently;

export const selectIsLoadingHome = (state: RootState) =>
  state.products.isLoadingHome;

export const selectProductsError = (state: RootState) => state.products.error;

// SELECTORS (DERIVED DATA)

export const selectProductsList = createSelector(
  [selectProductsById, selectProductsListIds],
  (productsById, ids) =>
    (ids || []).map((id: string) => productsById[id]).filter(Boolean)
);

export const selectRecentlyViewed = createSelector(
  [selectProductsById, selectRecentlyViewedIds],
  (productsById, ids) =>
    ids.map((id: string) => productsById[id]).filter(Boolean)
);

export const makeSelectProductById = (productId: string) =>
  createSelector([selectProductsById], (products) => products[productId]);

export const makeSelectProductsByCategory = (category: string) =>
  createSelector(
    [selectProductsById, selectProductsByCategoryIds],
    (productsById, categoryMap) => {
      const ids = categoryMap[category] || [];
      return ids.map((id: string) => productsById[id]).filter(Boolean);
    }
  );
