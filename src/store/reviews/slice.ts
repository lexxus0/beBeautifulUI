import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchReviews } from "./operations";
import { IReview, IReviewResponse } from "@/types/types";
import { handlePending, handleRejected } from "../init";

interface ReviewState {
  reviews: IReview[];
  totalItems: number | null;
  limit: number | null;
  totalPages: number | null;
  currentPage: number | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  reviews: [],
  totalItems: null,
  limit: null,
  totalPages: null,
  currentPage: null,
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        handlePending(state);
      })
      .addCase(
        fetchReviews.fulfilled,
        (state, action: PayloadAction<IReviewResponse>) => {
          state.isLoading = false;
          state.reviews = action.payload.data;
          state.totalItems = action.payload.pagination.total;
          state.limit = action.payload.pagination.perPage;
          state.totalPages = action.payload.pagination.totalPages;
          state.currentPage = action.payload.pagination.page;
        }
      )
      .addCase(fetchReviews.rejected, (state, action) => {
        handleRejected(state, action);
      });
  },
});

export default productSlice.reducer;
