import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "@/types/types";
import {
  fetchCart,
  addCartItem,
  updateCartItem,
  deleteCartItem,
  syncCartFromGuest,
  clearServerCart,
} from "./operations";
import { handlePending, handleRejected } from "../init";
import { clearGuestCart, loadGuestCart, saveGuestCart } from "./utils";
import { CartState } from "@/types/cart";

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
      state.items = loadGuestCart();
      console.log("🛒 INIT GUEST CART:", state.items);
      state.isGuest = true;
    },
    // додати товар у гостьовий кошик
    addToGuestCart(
      state,
      action: PayloadAction<{
        product: IProduct;
        selectedVolume: number;
        quantity?: number;
      }>
    ) {
      const { product, selectedVolume, quantity = 1 } = action.payload;

      const variant =
        product.priceByVolume.find((v) => v.volume === selectedVolume) ??
        product.priceByVolume[0];

      if (!variant) {
        return;
      }

      const existing = state.items.find(
        (i) => i.product._id === product._id && i.variant._id === variant._id
      );

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({
          product,
          variant,
          quantity,
          selectedVolume: variant.volume,
        });
      }

      state.isGuest = true;
      saveGuestCart(state.items);
    },
    // змінити кількість в гостьовому кошику
    updateGuestItemQuantity(
      state,
      action: PayloadAction<{
        productId: string;
        selectedVolume: number;
        quantity: number;
      }>
    ) {
      const { productId, selectedVolume, quantity } = action.payload;
      const existing = state.items.find(
        (i) =>
          i.product._id === productId && i.variant.volume === selectedVolume
      );
      if (existing) {
        existing.quantity = quantity;
        if (existing.quantity <= 0) {
          state.items = state.items.filter(
            (i) =>
              !(
                i.product._id === productId &&
                i.variant.volume === selectedVolume
              )
          );
        }
        saveGuestCart(state.items);
      }
    },
    // видалити позицію з гостьового
    removeGuestItem(
      state,
      action: PayloadAction<{ productId: string; selectedVolume: number }>
    ) {
      const { productId, selectedVolume } = action.payload;

      state.items = state.items.filter(
        (i) =>
          !(i.product._id === productId && i.variant.volume === selectedVolume)
      );
      saveGuestCart(state.items);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, handlePending)
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isGuest = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, handleRejected)
      .addCase(addCartItem.pending, (state) => {
        state.error = null;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isGuest = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(addCartItem.rejected, handleRejected)
      .addCase(updateCartItem.pending, (state) => {
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isGuest = false;
        state.error = null;

        const { productId, selectedVolume, quantity } = action.meta.arg;

        const item = state.items.find(
          (i) =>
            i.product._id === productId && i.selectedVolume === selectedVolume
        );

        if (item) {
          item.quantity = quantity;

          const newVariant = item.product.priceByVolume.find(
            (v) => v.volume === selectedVolume
          );
          if (newVariant) {
            item.variant = newVariant;
          }
        }
      })
      .addCase(updateCartItem.rejected, handleRejected)
      .addCase(deleteCartItem.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isGuest = false;
        state.error = null;

        const { productId, selectedVolume } = action.meta.arg;

        state.items = state.items.filter(
          (i) =>
            !(
              i.product._id === productId && i.selectedVolume === selectedVolume
            )
        );
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
      })
      .addCase(clearServerCart.fulfilled, (state) => {
        state.items = [];
        state.error = null;
        state.isLoading = false;
        state.isGuest = false;
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
