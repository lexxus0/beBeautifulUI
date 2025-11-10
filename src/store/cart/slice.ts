import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartState, IProduct } from "@/types/types";
import {
  fetchCart,
  addCartItem,
  updateCartItem,
  deleteCartItem,
  syncCartFromGuest,
} from "./operations";
import { handlePending, handleRejected } from "../init";
import { clearGuestCart, loadGuestCart, saveGuestCart } from "./utils";

const initialState: CartState = {
  items: [],
  isGuest: true,
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    clearCartState(state) {
      state.items = [];
      state.error = null;
      state.isLoading = false;
      state.isGuest = false;
    },
    // завантажити гостьовий кошик з localStorage при старті / коли не залогінені
    initGuestCart(state) {
      const items = loadGuestCart();
      state.items = items;
      state.isGuest = true;
    },
    // додати товар у гостьовий кошик
    addToGuestCart(
      state,
      action: PayloadAction<{
        product: IProduct;
        selectedVolume: string;
        quantity?: number;
      }>
    ) {
      const { product, selectedVolume, quantity = 1 } = action.payload;
      const existing = state.items.find(
        (i) =>
          i.product._id === product._id && i.selectedVolume === selectedVolume
      );

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ product, selectedVolume, quantity });
      }

      state.isGuest = true;
      saveGuestCart(state.items);
    },
    // змінити кількість в гостьовому кошику
    updateGuestItemQuantity(
      state,
      action: PayloadAction<{
        productId: string;
        selectedVolume: string;
        quantity: number;
      }>
    ) {
      const { productId, selectedVolume, quantity } = action.payload;
      const item = state.items.find(
        (i) =>
          i.product._id === productId && i.selectedVolume === selectedVolume
      );
      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter(
            (i) =>
              i.product._id === productId && i.selectedVolume === selectedVolume
          );
        }
        saveGuestCart(state.items);
      }
    },
    // видалити позицію з гостьового
    removeGuestItem(
      state,
      action: PayloadAction<{ productId: string; selectedVolume: string }>
    ) {
      const { productId, selectedVolume } = action.payload;

      state.items = state.items.filter(
        (i) =>
          !(i.product._id === productId && i.selectedVolume === selectedVolume)
      );
      saveGuestCart(state.items);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, handlePending)
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
        state.isGuest = false;
      })
      .addCase(fetchCart.rejected, handleRejected)
      .addCase(addCartItem.pending, (state) => {
        state.error = null;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isGuest = false;

        const { productId, selectedVolume } = action.meta.arg;
        const serverItems = action.payload;

        state.items = serverItems.map((item) => {
          // 1) якщо цей продукт уже був в state — зберігаємо його selectedVolume
          const existing = state.items.find(
            (i) => i.product._id === item.product._id
          );
          if (existing) {
            return {
              ...item,
              selectedVolume: existing.selectedVolume,
            };
          }
          // 2) якщо це новий продукт і це якраз той, що ми тільки що додали з selectedVolume
          if (selectedVolume && item.product._id === productId) {
            return {
              ...item,
              selectedVolume,
            };
          }
          // 3) інакше залишаємо те, що виставив mapCartResponseToItems (defaultVolume)
          return item;
        });
      })
      .addCase(addCartItem.rejected, handleRejected)
      .addCase(updateCartItem.pending, (state) => {
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.isGuest = false;
      })
      .addCase(updateCartItem.rejected, handleRejected)
      .addCase(deleteCartItem.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.isGuest = false;
      })
      .addCase(deleteCartItem.rejected, handleRejected)
      // синк після логіну
      .addCase(syncCartFromGuest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(syncCartFromGuest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
        state.isGuest = false;
        clearGuestCart();
      })
      .addCase(syncCartFromGuest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Не вдалося синхронізувати кошик";
      });
  },
});

export const {
  clearCartState,
  initGuestCart,
  addToGuestCart,
  updateGuestItemQuantity,
  removeGuestItem,
} = cartSlice.actions;

export default cartSlice.reducer;
