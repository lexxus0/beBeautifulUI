"use client";

import React from "react";
import { BasketItemsListProps } from "@/types/types";
import BasketItem from "@/components/ui/BasketItem/BasketItem";
import styles from "./BasketItemsList.module.scss";

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
          key={`${item.product._id}-${item.selectedVolume}`}
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
