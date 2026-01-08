import { ICartItem } from "@/types/cart";

export const calculateCartTotal = (items: ICartItem[]): number => {
  if (!items || items.length === 0) return 0;

  const sum = items.reduce((total, item) => {
    const price = item.variant.price;

    return total + item.quantity * price;
  }, 0);

  return Math.round(sum * 100) / 100;
};
