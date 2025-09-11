"use client";

import React, { useState, useMemo } from "react";
import styles from "./Basket.module.scss";
import { BasketItemType } from "@/types/types";
import Link from "next/link";
import rawData from "./basket.json";
import BasketIcon from "@/components/elements/BasketIcon";
import RecommendedProducts from "@/components/ui/RecommendedProducts/RecommendedProducts";
import BackButton from "@/components/ui/BackButton/BackButton";
import { useAppSelector } from "@/store/hooks";
import { selectIsLoggedIn } from "@/store/auth/selectors";
import BasketItemsList from "@/components/ui/BasketItemsList/BasketItemsList"; // Імпортуємо компонент

const BasketPage = () => {
  const [basketItems, setBasketItems] = useState<BasketItemType[]>(rawData);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

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
    <>
      <BackButton />
      <div className="container">
        <div className={styles.basketPage}>
          <div className={styles.basket}>
            <h1 className={styles.title}>Кошик</h1>

            <BasketItemsList
              basketItems={basketItems}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onRemove={handleRemove}
            />

            <hr className={styles.divider} />
            <div className={styles.total}>
              <span>Загальна сума:</span>
              <span>{total} грн</span>
            </div>
            <Link
              href={isLoggedIn ? "/delivery" : "/checkout"}
              className={styles.checkoutBtn}
            >
              Оформити замовлення
              <BasketIcon variant="white" className={styles.iconBasket} />
            </Link>
          </div>
          <RecommendedProducts />
        </div>
      </div>
    </>
  );
};

export default BasketPage;
