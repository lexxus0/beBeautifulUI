import React from "react";
import { CartItemsListProps } from "@/types/cart";
import BasketItem from "@/components/ui/BasketItem/BasketItem";
import styles from "./BasketItemsList.module.scss";

const BasketItemsList: React.FC<CartItemsListProps> = ({
  basketItems,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  return (
    <div className={styles.items}>
      {basketItems.map((item) => (
        <BasketItem
          key={`${item.variant._id}-${item.variant.volume}`}
          item={item}
          onIncrement={() => onIncrement(item)}
          onDecrement={() => onDecrement(item)}
          onRemove={() => onRemove(item)}
        />
      ))}
    </div>
  );
};

export default BasketItemsList;
