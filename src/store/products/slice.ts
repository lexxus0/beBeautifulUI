import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProducts } from "./operations";
import { IProduct, IProductResponse } from "@/types/types";
import { handlePending, handleRejected } from "../init";

interface ProductState {
  products: IProduct[];
  totalItems: number | null;
  limit: number | null;
  totalPages: number | null;
  currentPage: number | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
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
        state.isLoading = true;
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
        state.isLoading = false;
        handleRejected(state, action);
      });
  },
});

export default productSlice.reducer;
