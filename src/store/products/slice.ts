import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProductById, fetchProducts, fetchProductsByIds } from "./operations";
import { IProduct, IProductResponse } from "@/types/types";
import { handlePending, handleRejected } from "../init";

interface ProductState {
  products: IProduct[];
  productDetails: IProduct | null;
  recentlyViewed: IProduct[];
  totalItems: number | null;
  limit: number | null;
  totalPages: number | null;
  currentPage: number | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  productDetails: null,
  recentlyViewed: [],
  totalItems: null,
  limit: null,
  totalPages: null,
  currentPage: null,
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        handlePending(state);
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<IProductResponse>) => {
          state.isLoading = false;
          state.products = action.payload.data;
          state.totalItems = action.payload?.pagination.total ?? 0;
          state.limit = action.payload?.pagination.perPage;
          state.totalPages = action.payload?.pagination.totalPages;
          state.currentPage = action.payload?.pagination.page;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        handleRejected(state, action);
      })
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
      
        // нормалізуємо продукт, щоб не було undefined
        state.productDetails = action.payload;
        console.log('action.payload: ', action.payload);
      })
      
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unknown error";
      })
      .addCase(fetchProductsByIds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductsByIds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recentlyViewed = action.payload;
      })
      .addCase(fetchProductsByIds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export default productSlice.reducer;
