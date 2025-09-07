import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchReviews, reactToReview } from "./operations";
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
      })
      .addCase(reactToReview.fulfilled, (state, action) => {
        const { id, type } = action.payload;
        const review = state.reviews.find((r) => r._id === id);
        if (review) {
          if (type === "like") {
            if (review.hasDisliked) {
              review.dislikes -= 1;
              review.hasDisliked = false;
            }

            review.likes += 1;
            review.hasLiked = true;
          } else if (type === "dislike") {
            if (review.hasLiked) {
              review.likes -= 1;
              review.hasLiked = false;
            }

            review.dislikes += 1;
            review.hasDisliked = true;
          }
        }
      });
  },
});

export default productSlice.reducer;
