import { IProduct } from "./types";

export type IProductVariant = IProduct["priceByVolume"][number];

export interface IGuestCartItemLegacy {
  product: IProduct;
  selectedVolume: number;
  quantity: number;
}

export interface ICartItemRaw {
  productId: string | IProduct;
  quantity: number;

  selectedVariantId?: string;
  selectedVariant?: IProductVariant;

  selectedVolume?: number;
}

export interface ICartRaw {
  _id: string;
  userId: string;
  items: ICartItemRaw[];
  createdAt: string;
  updatedAt: string;
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
  variant: IProductVariant;
  selectedVolume: number;
}

export interface CartState {
  isLoading: boolean;
  error: string | null;
  items: ICartItem[];
  isGuest: boolean;
}

export interface CartItemsListProps {
  basketItems: ICartItem[];
  onIncrement: (item: ICartItem) => void;
  onDecrement: (item: ICartItem) => void;
  onRemove: (item: ICartItem) => void;
}
