import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance, handleError } from "../init";
import { ICartItem } from "@/types/cart";
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
  { productId: string; quantity: number; selectedVolume?: number },
  { rejectValue: string }
// >("cart/addItem", async ({ productId, quantity, selectedVolume }, { rejectWithValue }) => {
>("cart/addItem", async ({ productId, quantity }, { rejectWithValue }) => {
  try {
    // await instance.post("/cart", { productId, quantity, selectedVolume });
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
  { productId: string; selectedVolume: number, quantity: number },
  { rejectValue: string }
// >("cart/updateItem", async ({ productId, quantity, selectedVolume }, { rejectWithValue }) => {
>("cart/updateItem", async ({ productId, quantity }, { rejectWithValue }) => {
  try {
    // await instance.put(`/cart/${productId}`, { quantity, selectedVolume });
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
  { productId: string; selectedVolume: number },
  { rejectValue: string }
// >("cart/deleteItem", async ({ productId, selectedVolume }, { rejectWithValue }) => {
>("cart/deleteItem", async ({ productId }, { rejectWithValue }) => {
  try {
    // await instance.delete(`/cart/${productId}`, { data: { selectedVolume } });
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
>("cart/syncGuest", async (_, { rejectWithValue, getState }) => {
  try {

    const {auth} = getState();

    if (!auth.isLoggedIn) {
      return loadGuestCart();
    }

    const guestItems = loadGuestCart();

    if (guestItems.length === 0) {
      const res = await instance.get("/cart");
      return mapCartResponseToItems(res.data);
    }

    const itemsForBulk = guestItems.map((item) => ({
      productId: item.product._id,
      selectedVolume: item.selectedVolume,
      quantity: item.quantity,
    }));

    await instance.post("/cart/bulk", { items: itemsForBulk });

    const finalRes = await instance.get("/cart");
    clearGuestCart();
    console.log('finalRes.data: ', finalRes.data);
    return mapCartResponseToItems(finalRes.data);
  } catch (e) {
    return rejectWithValue(handleError(e, "Не вдалося синхронізувати кошик"));
  }
});
