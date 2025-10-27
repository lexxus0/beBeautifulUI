import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { instance, handleError } from "../init";
import { ICartItem, ICartItemInCart } from "@/types/types";

// Fetch cart
export const fetchCart = createAsyncThunk<
  ICartItem[],
  void,
  { rejectValue: string }
>("cart/fetchCart", async (_, thunkAPI) => {
  try {
    const res = await instance.get("/cart");
    const itemsFromCart: ICartItemInCart[] = res.data.items ?? [];
    if (itemsFromCart.length === 0) return [];

    const items: ICartItem[] = itemsFromCart.map((item) => {
      const product = item.productId;

      return {
        productId: product._id,
        quantity: item.quantity,
        price: product.priceByVolume?.[0]?.price || product.price || 0,
        titleEn: product.name,
        titleUk: product.name,
        volume:
          product.priceByVolume?.[0]?.volume ||
          product.volumeOptions?.[0] ||
          "",
        image: product.imageUrl || "/images/placeholder/placeholder-tab.png",
      };
    });

    return items;
  } catch (e: unknown) {
    return thunkAPI.rejectWithValue(handleError(e, "Failed to fetch cart"));
  }
});

// Update cart
export const updateCart = createAsyncThunk<
  void,
  { productId: string; quantity: number },
  { rejectValue: string }
>("cart/updateCart", async ({ productId, quantity }, thunkAPI) => {
  try {
    await instance.post("/cart", { productId, quantity });
    toast.success("Товар додано до кошика", { position: "top-right" });
  } catch (e: unknown) {
    toast.error("Не вдалося оновити кошик", { position: "top-right" });
    return thunkAPI.rejectWithValue(handleError(e, "Failed to update cart"));
  }
});

// Remove from cart
export const removeFromCart = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("cart/removeFromCart", async (productId, thunkAPI) => {
  try {
    await instance.delete(`/cart/${productId}`);
    toast.success("Товар видалено з кошика", { position: "top-right" });
  } catch (e: unknown) {
    toast.error("Не вдалося видалити товар з кошика", {
      position: "top-right",
    });
    return thunkAPI.rejectWithValue(
      handleError(e, "Failed to remove item from cart")
    );
  }
});
