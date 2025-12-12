import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchProductById,
  fetchProducts,
  fetchProductsByIds,
  fetchProductsHome,
} from "./operations";
import { IProduct, IProductResponse } from "@/types/types";

interface ProductState {
  products: IProduct[];
  productDetails: IProduct | null;
  productsByCategory: Record<string, IProduct[]>;
  recentlyViewed: IProduct[];
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
  products: [],
  productDetails: null,
  productsByCategory: {},
  recentlyViewed: [],
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
          state.products = action.payload.data;
          state.totalItems = action.payload?.pagination.total ?? 0;
          state.limit = action.payload?.pagination.perPage;
          state.totalPages = action.payload?.pagination.totalPages;
          state.currentPage = action.payload?.pagination.page;
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

        if (state.productDetails?._id === action.payload._id) {
          return;
        }
        state.productDetails = action.payload;
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
        state.recentlyViewed = action.payload;
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
          action: PayloadAction<{ data: Record<string, IProduct[]> }>
        ) => {
          state.isLoadingHome = false;
          state.productsByCategory = action.payload.data;
        }
      )
      .addCase(fetchProductsHome.rejected, (state, action) => {
        state.isLoadingHome = false;
        state.error = action.payload ?? action.error.message ?? "Unknown error";
      });
  },
});

export default productSlice.reducer;
