import { IProduct } from "@/types/types";
import {
  ICartItem,
  ICartItemRaw,
  ICartRaw,
  IGuestCartItemLegacy,
  IProductVariant,
} from "@/types/cart";

type CartApiResponse =
  | ICartRaw
  | { items: ICartItemRaw[] }
  | ICartItemRaw[]
  | null;

const GUEST_CART_KEY = "guestCart";

type GuestStoredItem = ICartItem | IGuestCartItemLegacy;

// =========  Guest Cart =========

export const loadGuestCart = (): ICartItem[] => {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(GUEST_CART_KEY);
    if (!raw) return [];

    const parsedUnknown = JSON.parse(raw) as unknown;

    if (!Array.isArray(parsedUnknown)) {
      return [];
    }

    const parsed = parsedUnknown as GuestStoredItem[];

    return parsed
      .map<ICartItem | null>((item) => {
        if (
          item &&
          "product" in item &&
          "variant" in item &&
          typeof item === "object"
        ) {
          const product = item.product as IProduct;
          const variant = item.variant as IProductVariant;
          const quantity = Number(item.quantity ?? 1);
          const selectedVolume: number =
            typeof item.selectedVolume === "number"
              ? item.selectedVolume
              : variant.volume;

          return {
            product,
            variant,
            quantity,
            selectedVolume,
          } as ICartItem;
        }

        if (
          item &&
          "product" in item &&
          "selectedVolume" in item &&
          !("variant" in item)
        ) {
          const legacy = item as IGuestCartItemLegacy;
          const product = legacy.product as IProduct;
          const quantity = Number(legacy.quantity ?? 1);
          const selectedVolume = legacy.selectedVolume;

          const variant =
            product.priceByVolume.find((v) => v.volume === selectedVolume) ??
            product.priceByVolume[0];

          if (!variant) return null;

          return {
            product,
            variant,
            quantity,
            selectedVolume: variant.volume,
          };
        }

        return null;
      })
      .filter((item: ICartItem | null): item is ICartItem => item !== null);
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
  if ("items" in data && Array.isArray(data.items))
    return data.items as ICartItemRaw[];
  return [];
};

export const mapCartResponseToItems = (data: CartApiResponse): ICartItem[] => {
  const rawItems = extractRawItems(data);

  return rawItems
    .map((item) => {
      const {
        productId,
        quantity,
        selectedVariant,
        selectedVariantId,
        selectedVolume,
      } = item;

      if (!productId || typeof productId !== "object") return null;

      const product = productId as IProduct;

      let variant: IProductVariant | undefined = selectedVariant;

      // 1) Нормальний випадок: бек вже поклав selectedVariant
      if (!variant && selectedVariantId) {
        variant = product.priceByVolume.find(
          (v) => v._id === selectedVariantId
        );
      }

      // 2) Фолбек для старих/гостьових даних по volume
      if (!variant && selectedVolume !== undefined) {
        variant = product.priceByVolume.find(
          (v) => v.volume === selectedVolume
        );
      }

      // 3) Самий крайній фолбек – перший варіант
      if (!variant) {
        variant = product.priceByVolume[0];
      }

      if (!variant) return null;

      return {
        product,
        quantity,
        variant,
        selectedVolume:
          typeof selectedVolume === "number" ? selectedVolume : variant.volume,
      };
    })
    .filter((i): i is ICartItem => i !== null);
};
