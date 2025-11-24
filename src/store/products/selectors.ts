import { RootState } from "../store";

export const selectProducts = (state: RootState) => state.products.products;
export const selectRecentlyViewed = (state: RootState) => state.products.recentlyViewed;
export const selectProductDetails = (state: RootState) => state.products.productDetails;
export const selectIsLoading = (state: RootState) => state.products.isLoading;
