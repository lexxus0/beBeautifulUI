"use client";

import { useState, useMemo } from "react";
import styles from "./Checkout.module.scss";
import ContactInfoForm from "@/components/ui/ContactInfoForm/ContactInfoForm";
import LoginForm from "@/components/ui/Auth/LoginForm/LoginForm";
import CheckoutTabs from "@/components/ui/CheckoutTabs/CheckoutTabs";
import BackButton from "@/components/ui/BackButton/BackButton";
import BasketItemsList from "@/components/ui/BasketItemsList/BasketItemsList";
import { BasketItemType } from "@/types/types";
import rawData from "@/app/basket/basket.json";

const CheckoutPage = () => {
  const [activeTab, setActiveTab] = useState<"new" | "existing">("new");
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
    <>
      <BackButton />
      <div className="container">
        <div className={styles.checkout}>
          <CheckoutTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className={styles.formWrapper}>
            {activeTab === "new" ? <ContactInfoForm /> : <LoginForm />}
          </div>
        </div>

        <div className={styles.basketWrapper}>
          <h2 className={styles.basketTitle}>Ваше замовлення</h2>
          <hr className={styles.divider} />

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
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
