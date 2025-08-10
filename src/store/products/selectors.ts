import { RootState } from "../store";

export const selectProducts = (state: RootState) => state.products.products;
export const loadingProducts = (state: RootState) => state.products.isLoading;
