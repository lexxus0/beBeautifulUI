import { ICartItem } from "@/types/types";

export const calculateCartTotal = (items: ICartItem[]): number => {
  if (!items || items.length === 0) return 0;

  const sum = items.reduce((total, item) => {
    const option =
      item.product.priceByVolume.find(
        (opt) => opt.volume === item.selectedVolume
      ) || item.product.priceByVolume[0];

    const price = option ? option.price : 0;

    return total + item.quantity * price;
  }, 0);

  return Math.round(sum * 100) / 100;
};
