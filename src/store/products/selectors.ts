import { RootState } from "../store";

export const selectProducts = (state: RootState) => state.products.products;
export const selectRecentlyViewed = (state: RootState) => state.products.recentlyViewed;
