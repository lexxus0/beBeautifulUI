import { IProduct } from "./types";

export interface ICartItemRaw {
    productId: string | IProduct;
    selectedVolume: number;
    quantity: number;
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
    selectedVolume: number;
    quantity: number;
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

