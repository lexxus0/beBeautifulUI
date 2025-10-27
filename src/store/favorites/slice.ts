import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "@/types/types";

interface FavoritesState {
  items: IProduct[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<IProduct>) => {
      const exists = state.items.find((p) => p._id === action.payload._id);
      if (exists) {
        state.items = state.items.filter((p) => p._id !== action.payload._id);
      } else {
        state.items.push(action.payload);
      }
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
