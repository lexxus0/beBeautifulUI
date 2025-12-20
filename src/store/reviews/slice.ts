import { createSlice } from "@reduxjs/toolkit";
import { IUIReview } from "@/types/reviews";
import {
  createReview,
  updateReview,
  deleteReview,
  fetchWebReviews,
  fetchProductReviews,
  reactToWebReview,
  reactToProductReview,
} from "./operations";
import { handlePending, handleRejected } from "../init";

interface ReviewState {
  webReviews: IUIReview[];
  productReviews: Record<string, IUIReview[]>;
  isLoading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  webReviews: [],
  productReviews: {},
  isLoading: false,
  error: null,
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWebReviews.pending, handlePending)
      .addCase(fetchWebReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.webReviews = action.payload;
      })
      .addCase(fetchWebReviews.rejected, handleRejected)
      .addCase(fetchProductReviews.pending, handlePending)
      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        const { productId, reviews } = action.payload;
        state.productReviews[productId] = reviews;
      })
      .addCase(fetchProductReviews.rejected, handleRejected)
      .addCase(reactToWebReview.fulfilled, (state, action) => {
        const updated = action.payload;
        const idx = state.webReviews.findIndex((r) => r._id === updated._id);
        if (idx !== -1) {
          state.webReviews[idx] = updated;
        }
      })
      .addCase(reactToProductReview.fulfilled, (state, action) => {
        const updated = action.payload;

        if (!updated.productId) return;

        const list = state.productReviews[updated.productId];
        if (!list) return;

        const idx = list.findIndex((r) => r._id === updated._id);
        if (idx !== -1) {
          list[idx] = updated;
        }
      })
      .addCase(createReview.pending, handlePending)
      .addCase(createReview.fulfilled, (state, action) => {
        state.isLoading = false;
        const review = action.payload;

        if (review.productId) {
          if (!state.productReviews[review.productId]) {
            state.productReviews[review.productId] = [];
          }
          state.productReviews[review.productId].unshift(review);
        }
      })
      .addCase(createReview.rejected, handleRejected)
      .addCase(updateReview.pending, handlePending)
      .addCase(updateReview.fulfilled, (state, action) => {
        state.isLoading = false;
        const updated = action.payload;

        if (updated.productId) {
          const arr = state.productReviews[updated.productId];
          if (arr) {
            const idx = arr.findIndex((r) => r._id === updated._id);
            if (idx !== -1) arr[idx] = updated;
          }
        }
        state.error = null;
      })
      .addCase(updateReview.rejected, handleRejected)
      .addCase(deleteReview.pending, handlePending)
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.isLoading = false;
        const id = action.payload.id;

        // Видаляємо з web reviews
        state.webReviews = state.webReviews.filter((r) => r._id !== id);

        // Видаляємо з product reviews
        Object.keys(state.productReviews).forEach((productId) => {
          state.productReviews[productId] = state.productReviews[
            productId
          ].filter((r) => r._id !== id);
        });
        state.error = null;
      })
      .addCase(deleteReview.rejected, handleRejected);
  },
});

export default reviewsSlice.reducer;
