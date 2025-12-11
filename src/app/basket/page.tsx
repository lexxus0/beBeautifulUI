"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectIsLoggedIn } from "@/store/auth/selectors";
import { useRouter } from "next/navigation";
import { setFromBasket } from "@/store/orders/slice";
import Link from "next/link";
import { ICartItem, IOrderItem } from "@/types/types";
import {
  initGuestCart,
} from "@/store/cart/slice";
import { changeCartQuantity } from "@/helpers/changeCartQuantity";
import { calculateCartTotal } from "@/helpers/calculateCartTotal";
import BasketItemsList from "@/components/ui/BasketItemsList/BasketItemsList";
import RecommendedProducts from "@/components/ui/RecommendedProducts/RecommendedProducts";
import BackButton from "@/components/ui/BackButton/BackButton";
import Loader from "@/components/ui/Loader/Loader";
import { BaseModal } from "@/components/shared/Modal";
import styles from "./Basket.module.scss";

const BasketPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const { items, isLoading, isGuest } = useAppSelector((state) => state.cart);
  // console.log('items: ', items);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [removedProductName, setRemovedProductName] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(initGuestCart());
    }
  }, [isLoggedIn, dispatch]);

  const showRemoveModal = (item: ICartItem) => {
    setRemovedProductName(item.product.name);
    setIsModalOpen(true);
    setTimeout(() => setIsModalOpen(false), 1500);
  };

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
      onRemove: showRemoveModal,   // показати модалку, якщо товар видалився
    });
  };

  const handleRemove = (item: ICartItem) => {
    changeCartQuantity({
      item,
      type: "remove",
      dispatch,
      isLoggedIn,
      isGuest,
      onRemove: showRemoveModal,   // показати модалку завжди
    });
  };


  const total = useMemo(() => calculateCartTotal(items), [items]);

  const handleCheckout = () => {
    if (!items || items.length === 0) return;

    const orderItems: IOrderItem[] = items.map((item: ICartItem) => ({
        product: item.product,
        quantity: item.quantity,
        selectedVolume: item?.selectedVolume,
    }));
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
  // console.log("itemCart: ", items);

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
