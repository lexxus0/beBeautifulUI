import React from "react";
import BasketItem from "@/components/ui/BasketItem/BasketItem";
import styles from "./BasketItemsList.module.scss";
import { BasketItemType } from "@/types/types";

interface BasketItemsListProps {
  basketItems: BasketItemType[];
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onRemove: (id: number) => void;
}

const BasketItemsList: React.FC<BasketItemsListProps> = ({
  basketItems,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  return (
    <div className={styles.items}>
      {basketItems.map((item) => (
        <BasketItem
          key={item.id}
          item={item}
          onIncrement={() => onIncrement(item.id)}
          onDecrement={() => onDecrement(item.id)}
          onRemove={() => onRemove(item.id)}
        />
      ))}
    </div>
  );
};

export default BasketItemsList;
