"use client";

import { useState, useMemo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { selectIsLoggedIn } from "@/store/auth/selectors";
import { deleteCartItem, updateCartItem } from "@/store/cart/operations";
import { removeGuestItem, updateGuestItemQuantity } from "@/store/cart/slice";
import { ICartItem } from "@/types/types";
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
    if (isLoggedIn && !isGuest) {
      dispatch(
        updateCartItem({
          productId: item.product._id,
          quantity: item.quantity + 1,
        })
      );
    } else {
      dispatch(
        updateGuestItemQuantity({
          productId: item.product._id,
          selectedVolume: item.selectedVolume,
          quantity: item.quantity + 1,
        })
      );
    }
  };

  const handleDecrement = (item: ICartItem) => {
    if (item.quantity > 1) {
      if (isLoggedIn && !isGuest) {
        dispatch(
          updateCartItem({
            productId: item.product._id,
            quantity: item.quantity - 1,
          })
        );
      } else {
        dispatch(
          updateGuestItemQuantity({
            productId: item.product._id,
            selectedVolume: item.selectedVolume,
            quantity: item.quantity - 1,
          })
        );
      }
    }
  };

  const handleRemove = (item: ICartItem) => {
    if (isLoggedIn && !isGuest) {
      dispatch(deleteCartItem({ productId: item.product._id }));
    } else {
      dispatch(
        removeGuestItem({
          productId: item.product._id,
          selectedVolume: item.selectedVolume,
        })
      );
    }
  };

  const total = useMemo(() => {
    if (!items || items.length === 0) return 0;
    const sum = items.reduce((sum: number, item: ICartItem) => {
      const option =
        item.product.priceByVolume.find(
          (opt) => opt.volume === item.selectedVolume
        ) || item.product.priceByVolume[0];
      const price = option ? option.price : 0;
      return sum + item.quantity * price;
    }, 0);

    return Math.round(sum * 100) / 100;
  }, [items]);

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
