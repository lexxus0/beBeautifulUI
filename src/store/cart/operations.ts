import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance, handleError } from "../init";
import { ICartItem } from "@/types/types";
import { clearGuestCart, loadGuestCart, mapCartResponseToItems } from "./utils";
import { RootState } from "../store";

export const fetchCart = createAsyncThunk<
  ICartItem[],
  void,
  { rejectValue: string }
>("cart/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await instance.get("/cart");
    // console.log('cart fetch: ', res.data);
    const items = mapCartResponseToItems(res.data);
    // console.log('items get: ', items);
    return items;
  } catch (e) {
    return rejectWithValue(handleError(e, "Не вдалося завантажити кошик"));
  }
});

export const addCartItem = createAsyncThunk<
  ICartItem[],
  { productId: string; quantity: number; selectedVolume?: string },
  { rejectValue: string }
>("cart/addItem", async ({ productId, quantity }, { rejectWithValue }) => {
  try {
    await instance.post("/cart", { productId, quantity });
    const res = await instance.get("/cart");
    // console.log('cart add: ', res.data);
    const items = mapCartResponseToItems(res.data);
    // console.log('items add: ', items);
    return items;
  } catch (e) {
    return rejectWithValue(handleError(e, "Не вдалося додати в кошик"));
  }
});

export const updateCartItem = createAsyncThunk<
  ICartItem[],
  { productId: string; quantity: number },
  { rejectValue: string }
>("cart/updateItem", async ({ productId, quantity }, { rejectWithValue }) => {
  try {
    await instance.put(`/cart/${productId}`, { quantity });
    const res = await instance.get("/cart");
    // console.log('cart put: ', res.data);

    const items = mapCartResponseToItems(res.data);
    // console.log('items put: ', items);
    return items;
  } catch (e) {
    return rejectWithValue(handleError(e, "Не вдалося оновити товар"));
  }
});

export const deleteCartItem = createAsyncThunk<
  ICartItem[],
  { productId: string },
  { rejectValue: string }
>("cart/deleteItem", async ({ productId }, { rejectWithValue }) => {
  try {
    await instance.delete(`/cart/${productId}`);
    const res = await instance.get("/cart");
    // console.log('cart delete: ', res.data);

    const items = mapCartResponseToItems(res.data);
    // console.log('items del: ', items);
    return items;
  } catch (e) {
    return rejectWithValue(handleError(e, "Не вдалося видалити товар"));
  }
});

// Синхронізувати гостьовий кошик з сервером після логіну
export const syncCartFromGuest = createAsyncThunk<
  ICartItem[],
  void,
  { rejectValue: string; state: RootState }
>("cart/syncGuest", async (_, { rejectWithValue }) => {
  try {
    if (typeof window === "undefined") {
      return [];
    }

    const token = localStorage.getItem("accessToken");

    if (!token) {
      return loadGuestCart();
    }

    const guestItems = loadGuestCart();

    if (!guestItems.length) {
      const res = await instance.get("/cart");
      return mapCartResponseToItems(res.data);
    }

    const itemsForBulk = guestItems.map((item) => ({
      productId: item.product._id,
      quantity: item.quantity,
    }));

    await instance.post("/cart/bulk", { items: itemsForBulk });

    const res = await instance.get("/cart");
    clearGuestCart();
    return mapCartResponseToItems(res.data);
  } catch (e) {
    return rejectWithValue(handleError(e, "Не вдалося синхронізувати кошик"));
  }
});
