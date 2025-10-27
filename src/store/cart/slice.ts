import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCart, updateCart, removeFromCart } from "./operations";
import { ICartItem } from "@/types/types";
import { handlePending, handleRejected } from "../init";

interface CartState {
  items: ICartItem[];
  isLoading: boolean;
  error: string | null;
  updateLoading: boolean;
  updateError: string | null;
  removeLoading: boolean;
  removeError: string | null;
}

const initialState: CartState = {
  items: [],
  isLoading: false,
  error: null,
  updateLoading: false,
  updateError: null,
  removeLoading: false,
  removeError: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.productId === action.payload);
      if (item) item.quantity += 1;
    },
    decrementItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.productId === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.productId !== action.payload);
    },
  },
  extraReducers: (builder) => {
    // Fetch cart
    builder
      .addCase(fetchCart.pending, (state) => {
        handlePending(state);
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<ICartItem[]>) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        handleRejected(state, action as PayloadAction<string | undefined>);
      });

    // Update cart
    builder
      .addCase(updateCart.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateCart.fulfilled, (state) => {
        state.updateLoading = false;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload ?? "Не вдалося оновити кошик";
      });

    // Remove item
    builder
      .addCase(removeFromCart.pending, (state) => {
        state.removeLoading = true;
        state.removeError = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.removeLoading = false;
        state.items = state.items.filter((i) => i.productId !== action.meta.arg);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.removeLoading = false;
        state.removeError = action.payload ?? "Не вдалося видалити товар з кошика";
      });
  },
});

export const { incrementItem, decrementItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
