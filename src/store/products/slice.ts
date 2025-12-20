import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchProductById,
  fetchProducts,
  fetchProductsByIds,
  fetchProductsHome,
} from "./operations";
import { IProduct, IProductResponse } from "@/types/types";

interface ProductState {
  productsListIds: string[];
  productsById: Record<string, IProduct>;
  productsByCategoryIds: Record<string, string[]>;
  recentlyViewedIds: string[];
  totalItems: number | null;
  limit: number | null;
  totalPages: number | null;
  currentPage: number | null;
  isLoadingProduct: boolean;
  isLoadingHome: boolean;
  isLoadingRecently: boolean;
  error: string | null;
}

const initialState: ProductState = {
  productsListIds: [],
  productsById: {},
  productsByCategoryIds: {},
  recentlyViewedIds: [],
  totalItems: null,
  limit: null,
  totalPages: null,
  currentPage: null,
  isLoadingProduct: false,
  isLoadingHome: false,
  isLoadingRecently: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoadingProduct = true;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<IProductResponse>) => {
          state.isLoadingProduct = false;

          // зберігаємо всі товари в глобальний кеш
          Object.assign(state.productsById, action.payload.productsById);

          state.productsListIds = action.payload.productsListIds;
          state.totalItems = action.payload?.pagination.total ?? 0;
          state.limit = action.payload?.pagination.perPage ?? null;
          state.totalPages = action.payload?.pagination.totalPages ?? null;
          state.currentPage = action.payload?.pagination.page ?? 1;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoadingProduct = false;
        state.error = action.payload ?? "Unknown error";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.isLoadingProduct = true;
        state.error = null;
      })

      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoadingProduct = false;

        const { product, productId } = action.payload;
        state.productsById[productId] = product;
      })

      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoadingProduct = false;
        state.error = action.payload ?? "Unknown error";
      })
      .addCase(fetchProductsByIds.pending, (state) => {
        state.isLoadingRecently = true;
        state.error = null;
      })
      .addCase(fetchProductsByIds.fulfilled, (state, action) => {
        state.isLoadingRecently = false;

        Object.assign(state.productsById, action.payload.productsById);

        state.recentlyViewedIds = action.payload.recentlyViewedIds;
      })
      .addCase(fetchProductsByIds.rejected, (state, action) => {
        state.isLoadingRecently = false;
        state.error = action.payload ?? "Unknown error";
      })
      .addCase(fetchProductsHome.pending, (state) => {
        state.isLoadingHome = true;
        state.error = null;
      })
      .addCase(
        fetchProductsHome.fulfilled,
        (
          state,
          action: PayloadAction<{
            productsById: Record<string, IProduct>;
            productsByCategoryIds: Record<string, string[]>;
          }>
        ) => {
          state.isLoadingHome = false;

          Object.assign(state.productsById, action.payload.productsById);

          state.productsByCategoryIds = action.payload.productsByCategoryIds;
        }
      )
      .addCase(fetchProductsHome.rejected, (state, action) => {
        state.isLoadingHome = false;
        state.error = action.payload ?? action.error.message ?? "Unknown error";
      });
  },
});

export default productSlice.reducer;
