"use client";

import React, { useEffect } from "react";
import { selectIsLoggedIn, selectUser } from "@/store/auth/selectors";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import Icon from "@/components/shared/Icon";
import OrderItem from "./OrderItem/OrderItem";

import styles from "./MyOrders.module.scss";

export default function MyOrders() {
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/auth");
    }
  }, [user, isLoading, router]);

  if (!user) {
    return null; // або  <Loader />
  }

  return (
    <div className="container pt-[10px] pb-15 md:pb-[42px] lg:pt-[34px] lg:b-15">
      <div className="flex flex-col items-start gap-4 mb-10 md:mb-[62px] md:flex-row md:items-center md:justify-between">
        <h2 className="font-lato font-semibold text-2xl lg:text-[32px] text-[#49454f]">
          Мої замовлення
        </h2>
        <div className="relative w-full md:w-[207px] lg:w-[306px]">
          <input
            type="text"
            name="search"
            className={styles.input}
            placeholder="Пошук"
          />
          <Icon name="icon-search" className={styles.iconSearch} />
        </div>
      </div>
      <p className={styles.text}>
        Слідкуйте за статусом ваших замовлень у зручному форматі
      </p>
      <OrderItem />
    </div>
  );
}
