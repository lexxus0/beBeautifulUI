import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchReviews, reactToReview, createReview, updateReview, deleteReview, fetchReviewSummary } from "./operations";
import { IReview, IReviewResponse } from "@/types/types";
import { handlePending, handleRejected } from "../init";

interface ReviewState {
  reviews: IReview[];
  productReviews: Record<string, IReview[]>; // Store reviews by productId
  totalItems: number | null;
  limit: number | null;
  totalPages: number | null;
  currentPage: number | null;
  isLoading: boolean;
  error: string | null;
  summaries: Record<string, { avg: number; count: number }>;
}

const initialState: ReviewState = {
  reviews: [],
  productReviews: {},
  totalItems: null,
  limit: null,
  totalPages: null,
  currentPage: null,
  isLoading: false,
  error: null,
  summaries: {},
};

const productSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setProductReviews: (state, action: PayloadAction<{ productId: string; reviews: IReview[] }>) => {
      const { productId, reviews } = action.payload;
      state.productReviews[productId] = reviews;
    },
  },
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
      })
      // New reducers for backend integration
      .addCase(createReview.pending, (state) => {
        handlePending(state);
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews.unshift(action.payload);
        state.error = null;
        
        // Add to product-specific reviews
        const review = action.payload;
        const productId = review.productId;
        if (productId) {
          if (!state.productReviews[productId]) {
            state.productReviews[productId] = [];
          }
          state.productReviews[productId].unshift(review);
        }
      })
      .addCase(createReview.rejected, (state, action) => {
        handleRejected(state, action);
      })
      .addCase(updateReview.pending, (state) => {
        handlePending(state);
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.reviews.findIndex(r => r._id === action.payload._id);
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateReview.rejected, (state, action) => {
        handleRejected(state, action);
      })
      .addCase(deleteReview.pending, (state) => {
        handlePending(state);
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = state.reviews.filter(r => r._id !== action.payload.id);
        state.error = null;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        handleRejected(state, action);
      })
      .addCase(fetchReviewSummary.pending, () => {
        // Don't set loading for summary as it's not critical
      })
      .addCase(fetchReviewSummary.fulfilled, (state, action) => {
        const { productId, summary } = action.payload;
        state.summaries[productId] = summary;
      })
      .addCase(fetchReviewSummary.rejected, () => {
        // Don't set error for summary as it's not critical
      });
  },
});

export const { setProductReviews } = productSlice.actions;
export default productSlice.reducer;
