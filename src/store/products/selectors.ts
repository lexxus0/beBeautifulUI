import { RootState } from "../store";

export const selectProducts = (state: RootState) => state.products.products;
