"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/shared/Icon";
import OrdersList from "./OrdersList/OrdersList";
// import { IOrder } from "@/types/orders";
// import ordersData from "./orders.json";

import styles from "./MyOrders.module.scss";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectOrders } from "@/store/orders/selectors";
import { fetchAllOrders } from "@/store/orders/operations";

export default function MyOrders() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const orders = useAppSelector(selectOrders);

  // const [orders, setOrders] = useState<IOrder[] | null>(null);

  const handleOrderDetails = (id: string) => {
    router.push(`/orders/${id}`);
  };

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

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
      {orders === null ? (
        <>
          <p className="font-lato font-bold text-base leading-relaxed text-black mb-6 md:text-lg lg:font-semibold lg:text-2xl lg:mb-[50px] text-center">
            Слідкуйте за статусом ваших замовлень у зручному форматі
          </p>
          <p className="font-lato font-semibold text-2xl leading-relaxed text-black mb-4 md:text-[32px] lg:font-normal lg:text-[42px] lg:mb-10 text-center">
            Ви ще не зробили жодного замовлення
          </p>
          <p className="font-roboto font-light text-xs leading-relaxed text-black mb-14 md:text-base md:mb-10 lg:font-normal lg:text-xl lg:mb-15 text-center">
            Перейдіть у каталог та відкрийте для себе beauty-засоби, які дійсно
            працюють
          </p>
          <Link href="/products" className={styles.linkCatalog}>
            Каталог
          </Link>
        </>
      ) : (
        <OrdersList orders={orders} onOrderDetails={handleOrderDetails} />
      )}
    </div>
  );
}
