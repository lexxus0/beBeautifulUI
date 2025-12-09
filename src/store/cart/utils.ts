import { IProduct } from "@/types/types";
import { ICartItem, ICartItemRaw, ICartRaw } from "@/types/cart";

type CartApiResponse = ICartRaw | { items: ICartItemRaw[] } | ICartItemRaw[] | null;

const GUEST_CART_KEY = "guestCart";

// =========  Guest Cart =========

export const loadGuestCart = (): ICartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(GUEST_CART_KEY);
    return raw ? (JSON.parse(raw) as ICartItem[]) : [];
  } catch {
    return [];
  }
};

export const saveGuestCart = (items: ICartItem[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
};

export const clearGuestCart = () => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(GUEST_CART_KEY);
  } catch {
    // ignore
  }
};


// =========  Normalize Cart =========

const extractRawItems = (data: CartApiResponse): ICartItemRaw[] => {
    if (!data) return [];
    if (Array.isArray(data)) return data as ICartItemRaw[];
    if ("items" in data && Array.isArray(data.items)) return data.items as ICartItemRaw[];
    return [];
  };

export const mapCartResponseToItems = (data: CartApiResponse): ICartItem[] => {
    const rawItems = extractRawItems(data);

  return rawItems
    .map((item) => {
      const { productId, quantity } = item;

      // Випадок з populate: productId = об'єкт продукту
      if (productId && typeof productId === "object") {
        const product = productId as IProduct;

        const defaultVolume = product.priceByVolume[0]?.volume || "";

        return {
          product,
          quantity,
          selectedVolume: defaultVolume,
        };
      }
      return null;
    })
    .filter((i): i is ICartItem => i !== null);
};


