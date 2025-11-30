import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

//  RAW selectors

export const selectWebReviews = (state: RootState) => state.reviews.webReviews;

export const selectProductReviews = (state: RootState, productId: string) =>
  state.reviews.productReviews[productId] || [];

//  MEMOIZED selectors (фабрики)

export const makeSelectWebReviews = () =>
  createSelector(
    [(state: RootState) => state.reviews.webReviews],
    (list) => list
  );

export const makeSelectProductReviews = () =>
  createSelector(
    [
      (state: RootState) => state.reviews.productReviews,
      (_: RootState, productId: string) => productId,
    ],
    (reviewsById, productId) => reviewsById[productId] || []
  );

/** Universal "any reviews" selector — returns product or web reviews */
export const makeSelectAnyReviews = () =>
  createSelector(
    [
      (state: RootState) => state.reviews.webReviews,
      (state: RootState) => state.reviews.productReviews,
      (_: RootState, productId?: string) => productId,
    ],
    (web, byProduct, productId) => {
      if (productId) {
        return byProduct[productId] || [];
      }
      return web;
    }
  );

//  OTHER

export const selectReviewsLoading = (state: RootState) =>
  state.reviews.isLoading;

export const selectReviewsError = (state: RootState) => state.reviews.error;
