"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import OrdersList from "./OrdersList/OrdersList";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectIsLoadingOrder, selectOrders } from "@/store/orders/selectors";
import { fetchAllOrders } from "@/store/orders/operations";
import Loader from "../Loader/Loader";
import styles from "./MyOrders.module.scss";

export default function MyOrders() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const orders = useAppSelector(selectOrders);
  const isLoading = useAppSelector(selectIsLoadingOrder);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  const handleOrderDetails = (id: string) => {
    router.push(`/orders/${id}`);
  };

  return (
    <div className="container pt-5 pb-15 md:pt-[30px] md:pb-[42px] lg:pt-[50px] lg:pb-15">
      <h2 className="font-lato font-semibold text-2xl mb-5 md:text-[28px] md:mb-[22px] lg:text-[32px] text-[#49454f] text-center">
        Мої замовлення
      </h2>
      {orders.length === 0 || !orders ? (
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
