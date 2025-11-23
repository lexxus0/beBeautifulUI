"use client";

import { useState, useMemo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { selectIsLoggedIn } from "@/store/auth/selectors";
import { ICartItem } from "@/types/types";
import { changeCartQuantity } from "@/helpers/changeCartQuantity";
import { calculateCartTotal } from "@/helpers/calculateCartTotal";
import ContactInfoForm from "@/components/ui/ContactInfoForm/ContactInfoForm";
import LoginForm from "@/components/ui/Auth/LoginForm/LoginForm";
import CheckoutTabs from "@/components/ui/CheckoutTabs/CheckoutTabs";
import BackButton from "@/components/ui/BackButton/BackButton";
import BasketItemsList from "@/components/ui/BasketItemsList/BasketItemsList";
import styles from "./Checkout.module.scss";

const CheckoutPage = () => {
  const [activeTab, setActiveTab] = useState<"new" | "existing">("new");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const { items, isGuest } = useAppSelector((state) => state.cart);

  useEffect(() => {
    if (!items || items.length === 0) {
      router.push("/basket");
    }
  }, [items, router]);

  const handleIncrement = (item: ICartItem) => {
    changeCartQuantity({
      item,
      type: "inc",
      dispatch,
      isLoggedIn,
      isGuest,
    });
  };
  const handleDecrement = (item: ICartItem) => {
    changeCartQuantity({
      item,
      type: "dec",
      dispatch,
      isLoggedIn,
      isGuest,
    });
  };

  const handleRemove = (item: ICartItem) => {
    changeCartQuantity({
      item,
      type: "remove",
      dispatch,
      isLoggedIn,
      isGuest,
    });
  };

  const total = useMemo(() => calculateCartTotal(items), [items]);

  const isEmpty = !items || items.length === 0;

  return (
    <>
      <BackButton />
      <div className="container">
        <div className={styles.checkout}>
          <CheckoutTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className={styles.formWrapper}>
            {activeTab === "new" ? <ContactInfoForm /> : <LoginForm redirectTo="/delivery"/>}
          </div>
        </div>

        {!isEmpty && (
          <div className={styles.basketWrapper}>
            <h2 className={styles.basketTitle}>Ваше замовлення</h2>
            <hr className={styles.divider} />

            <BasketItemsList
              basketItems={items}
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
        )}
      </div>
    </>
  );
};

export default CheckoutPage;
