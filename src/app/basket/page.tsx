"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectIsLoggedIn } from "@/store/auth/selectors";
import BasketItemsList from "@/components/ui/BasketItemsList/BasketItemsList";
import { useRouter } from "next/navigation";
import { setFromBasket } from "@/store/orders/slice";
import Link from "next/link";
import { deleteCartItem, updateCartItem } from "@/store/cart/operations";
import { ICartItem, IOrderItem } from "@/types/types";
import {
  initGuestCart,
  removeGuestItem,
  updateGuestItemQuantity,
} from "@/store/cart/slice";
import BasketIcon from "@/components/elements/BasketIcon";
import RecommendedProducts from "@/components/ui/RecommendedProducts/RecommendedProducts";
import BackButton from "@/components/ui/BackButton/BackButton";
import Loader from "@/components/ui/Loader/Loader";
import styles from "./Basket.module.scss";
import { BaseModal } from "@/components/shared/Modal";

const BasketPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const { items, isLoading, isGuest } = useAppSelector((state) => state.cart);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [removedProductName, setRemovedProductName] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(initGuestCart());
    }
  }, [isLoggedIn, dispatch]);

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
    setRemovedProductName(item.product.name);
    setIsModalOpen(true);
    setTimeout(() => setIsModalOpen(false), 1500);

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

  const handleCheckout = () => {
    if (!items || items.length === 0) return;

    const orderItems: IOrderItem[] = items.map((item: ICartItem) => {
      const firstPrice = item.product.priceByVolume[0];
      return {
        product: item.product,
        quantity: item.quantity,
        selectedVolume: firstPrice?.volume || "",
      };
    });
    console.log("orderItems: ", orderItems);

    dispatch(
      setFromBasket({
        items: orderItems,
        amount: total,
      })
    );

    if (isLoggedIn) {
      router.push("/delivery");
    } else {
      router.push("/checkout");
    }
  };
  console.log("itemCart: ", items);

  const isEmpty = !items || items.length === 0;

  return (
    <>
      <BackButton />
      <div className="container">
        <div className={styles.basketPage}>
          {isLoading ? (
            <Loader />
          ) : isEmpty ? (
            <div className="">
              <p className="font-lato text-[28px] leading-[1.32] text-black mb-10 md:font-semibold md:text-[32px] lg:font-normal lg:text-[42px] text-center">
                Порожньо.
                <br className="md:hidden" /> Але не надовго 😉
              </p>
              <p className="font-roboto font-light text-black mb-10 md:text-lg lg:text-2xl text-center">
                Саме зараз чудовий момент, щоб знайти щось, що зробить ваш день
                красивішим.
                <br className="hidden lg:block" /> Краса починається з маленьких
                кроків.
              </p>
              <Link href={"/products"} className={styles.checkoutBtn}>
                Каталог
              </Link>
            </div>
          ) : (
            <>
              <div className={styles.basket}>
                <h1 className={styles.title}>Кошик</h1>
                <BasketItemsList
                  basketItems={items}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                  onRemove={handleRemove}
                />

                <hr className={styles.divider} />
                <div className={styles.total}>
                  <span>Сума замовлення:</span>
                  <span>{total} грн</span>
                </div>
                <button
                  type="button"
                  onClick={handleCheckout}
                  className={styles.checkoutBtn}
                >
                  Оформити замовлення
                  <BasketIcon variant="white" className={styles.iconBasket} />
                </button>
              </div>
              <RecommendedProducts />
            </>
          )}
        </div>
      </div>
      {isModalOpen && (
        <BaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <img
            src="/images/basketDel.webp"
            alt="Товар видалено з кошика"
            className="w-[150px] h-[150px] object-contain mb-4 mx-auto"
          />
          {removedProductName ? (
            <p className="font-open-sans text-lg text-gray-600 text-center leading-snug">
              <span className="block font-bold text-black">
                {removedProductName}
              </span>
              <span className="block text-gray-600">
                видалено з кошика.
              </span>
            </p>
          ) : (
            <p className="font-open-sans text-lg text-gray-600 text-center leading-snug">
              Товар видалено з кошика.
            </p>
          )}
        </BaseModal>
      )}
    </>
  );
};

export default BasketPage;
