import { RootState } from "../store";

export const selectCartItems = (state: RootState) => state.cart?.items || [];
export const selectCartLoading = (state: RootState) => state.cart?.isLoading || false;
export const selectCartError = (state: RootState) => state.cart?.error || null;
