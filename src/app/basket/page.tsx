"use client";

import { useEffect, useMemo } from "react";
import styles from "./Basket.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCart, updateCart, removeFromCart } from "@/store/cart/operations";
import BasketItemsList from "@/components/ui/BasketItemsList/BasketItemsList";
import Link from "next/link";
import BasketIcon from "@/components/elements/BasketIcon";
import RecommendedProducts from "@/components/ui/RecommendedProducts/RecommendedProducts";
import BackButton from "@/components/ui/BackButton/BackButton";
import { selectCartItems, selectCartLoading } from "@/store/cart/selector";
import { selectIsLoggedIn } from "@/store/auth/selectors";
import { BasketItemType, ICartItem } from "@/types/types";

const BasketPage = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems) as ICartItem[];
  const isLoading = useAppSelector(selectCartLoading);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const basketItems: BasketItemType[] = useMemo(() => {
    return cartItems.map((item, index) => ({
      id: index,
      image: item.image,
      titleEn: item.titleEn,
      titleUk: item.titleUk,
      volume: item.volume,
      quantity: item.quantity,
      price: item.price,
    }));
  }, [cartItems]);

  const handleIncrement = (id: number) => {
    const item = basketItems[id];
    if (item) {
      dispatch(updateCart({ productId: item.id.toString(), quantity: item.quantity + 1 }));
    }
  };

  const handleDecrement = (id: number) => {
    const item = basketItems[id];
    if (item && item.quantity > 1) {
      dispatch(updateCart({ productId: item.id.toString(), quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (id: number) => {
    const item = basketItems[id];
    if (item) {
      dispatch(removeFromCart(item.id.toString()));
    }
  };

  const total = useMemo(
    () =>
      basketItems.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [basketItems]
  );

  if (isLoading) return <p>Завантаження кошика...</p>;

  return (
    <>
      <BackButton />
      <div className="container">
        <div className={styles.basketPage}>
          <div className={styles.basket}>
            <h1 className={styles.title}>Кошик</h1>

            {basketItems.length === 0 ? (
              <p>Ваш кошик порожній</p>
            ) : (
              <BasketItemsList
                basketItems={basketItems}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                onRemove={handleRemove}
              />
            )}

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
