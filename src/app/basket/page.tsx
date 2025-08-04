"use client";

import styles from "./Basket.module.scss";
import BasketItem from "@/components/ui/BasketItem/BasketItem";
import { BasketItemType } from "@/types/types";
import Link from "next/link";
import rawData from "./basket.json";
import { useState, useMemo } from "react";
import BasketIcon from "@/components/elements/BasketIcon";

const BasketPage = () => {
  const [basketItems, setBasketItems] = useState<BasketItemType[]>(rawData);

  const handleIncrement = (id: number) => {
    setBasketItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id: number) => {
    setBasketItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id: number) => {
    setBasketItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = useMemo(
    () =>
      basketItems.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [basketItems]
  );

  return (
    <div className="container">
      <div className={styles.basket}>
        <h1 className={styles.title}>Кошик</h1>
        <div className={styles.items}>
          {basketItems.map((item) => (
            <BasketItem
              key={item.id}
              item={item}
              onIncrement={() => handleIncrement(item.id)}
              onDecrement={() => handleDecrement(item.id)}
              onRemove={() => handleRemove(item.id)}
            />
          ))}
        </div>
        <hr className={styles.divider} />
        <div className={styles.total}>
          <span>Загальна сума:</span>
          <span>{total} ₴</span>
        </div>
        <Link href="/checkout" className={styles.checkoutBtn}>
          Оформити замовлення <BasketIcon variant="white" className={styles.iconBasket} />
        </Link>
      </div>
    </div>
  );
};

export default BasketPage;
