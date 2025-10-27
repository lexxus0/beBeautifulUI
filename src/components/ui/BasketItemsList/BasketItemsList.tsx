"use client";

import React from "react";
import BasketItem from "@/components/ui/BasketItem/BasketItem";
import styles from "./BasketItemsList.module.scss";
import { ICartItem } from "@/types/types";

interface BasketItemsListProps {
  basketItems: ICartItem[];
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  onRemove: (productId: string) => void;
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
          key={item.productId}
          item={item}
          onIncrement={() => onIncrement(item.productId)}
          onDecrement={() => onDecrement(item.productId)}
          onRemove={() => onRemove(item.productId)}
        />
      ))}
    </div>
  );
};

export default BasketItemsList;
