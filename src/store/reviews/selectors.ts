import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectReviews = (state: RootState) => state.reviews?.reviews || [];
export const selectReviewsLoading = (state: RootState) => state.reviews?.isLoading || false;
export const selectReviewsError = (state: RootState) => state.reviews?.error || null;

// Memoized selector for pagination to prevent unnecessary rerenders
export const selectReviewsPagination = createSelector(
  [
    (state: RootState) => state.reviews?.totalItems || null,
    (state: RootState) => state.reviews?.limit || null,
    (state: RootState) => state.reviews?.totalPages || null,
    (state: RootState) => state.reviews?.currentPage || null,
  ],
  (totalItems, limit, totalPages, currentPage) => ({
    totalItems,
    limit,
    totalPages,
    currentPage,
  })
);

// Memoized selector for review summary to prevent unnecessary rerenders
export const selectReviewSummary = (productId: string) => createSelector(
  [
    (state: RootState) => state.reviews?.summaries || {},
  ],
  (summaries) => {
    const result = summaries[productId] || { avg: 0, count: 0 };
    return result;
  }
);

// Memoized selector for product reviews to prevent unnecessary rerenders
export const selectProductReviews = (productId: string) => createSelector(
  [
    (state: RootState) => state.reviews?.productReviews || {},
  ],
  (productReviews) => {
    const result = productReviews[productId] || [];
    return result;
  }
);