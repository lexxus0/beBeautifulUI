import React from "react";
import { IOrderItem, IOrder} from "@/types/types";

import styles from "./OrderItem.module.scss";

interface IOrderItemProps {
  order: IOrder;
  onDetailsClick: (id: string) => void;
}

export default function OrderItem({ order, onDetailsClick }: IOrderItemProps) {
  return (
    <>
      <div className="flex flex-col lg:gap-[74px] gap-10 lg:py-5 lg:mx-auto lg:w-[856px]">
        <ul className={styles.listOrder}>
          <li>
            <p className={styles.textOrder}>№ Замовлення:</p>
            <span className={styles.spanOrder}>{order.orderNumber}</span>
          </li>
          {/* <li>
            <p className={styles.textOrder}>Статус:</p>
            <span className={styles.spanOrder}>{order.status}</span>
          </li> */}
          {/* <li>
            <p className={styles.textOrder}>Оплата:</p>
            <span className={styles.spanOrder}>{order.paymentType}</span> */}
          {/* </li> */}
          <li>
            <p className={styles.textOrder}>Дата:</p>
            <span className={styles.spanOrder}>{order.date}</span>
          </li>
          <li>
            <p className={styles.textOrder}>Тип доставки:</p>
            <span className={styles.spanOrder}>{order.delivery.deliveryMethod}</span>
          </li>
          <li>
            <p className={styles.textOrder}>Сума:</p>
            <span className={styles.spanOrder}>{order.totalAmount}</span>
          </li>
        </ul>
        <div>
          <p className="font-lato font-semibold text-xl pt-1 border-b border-b-[#e4e4e4] mb-5 md:font-bold md:text-lg">
            Товари:
          </p>
          <ul className="flex flex-col gap-5 md:w-[500px]">
            {order.items.map(
              (
                item: IOrderItem,
                idx: number
              ) => (
                <li
                  key={item.product._id}
                  className="flex gap-4 items-center md:gap-6"
                >
                  <p className="font-lato font-black text-lg">
                    {(idx + 1).toString().padStart(2, "0")}
                  </p>
                  <div className="flex flex-col gap-1 md:flex-row md:gap-9">
                    <p className="w-[100px] font-lato text-black text-lg">
                      {item.product.name}
                    </p>
                    <div className="flex gap-2">
                      <p className="font-light text-lg">{item.product.name}</p>
                      <p className="font-light text-lg">
                        {item.selectedVolume}
                      </p>
                    </div>
                  </div>
                  <p className="ml-auto font-lato text-lg">
                    {item.quantity} шт
                  </p>
                </li>
              )
            )}
            {/* <li className="flex gap-4 items-center md:gap-6">
              <p className="font-lato font-black text-lg">01</p>
              <div className="flex flex-col gap-1 md:flex-row md:gap-9">
                <p className="font-lato font-black text-lg">Shampoo</p>
                <p className="font-light text-lg">Шампунь 300 мл</p>
              </div>
              <p className="ml-auto font-lato text-lg">1 шт</p>
            </li>
            <li className="flex gap-4 items-center md:gap-6">
              <p className="font-lato font-black text-lg">02</p>
              <div className="flex flex-col gap-1 md:flex-row md:gap-9">
                <p className="font-lato font-black text-lg">Hair mask</p>
                <p className="font-light text-lg">Маска для волосся 300 мл</p>
              </div>
              <p className="ml-auto font-lato text-lg">1 шт</p>
            </li> */}
          </ul>
        </div>
        <div className="flex flex-col pt-8 gap-6 md:flex-row md:gap-5 md:pt-10 lg:pt-15 lg:gap-6 relative">
          <button type="button" onClick={() => {}} className={styles.btnOrder}>
            Повторити замовлення
          </button>
          <button
            type="button"
            onClick={() => onDetailsClick(order._id)}
            className={styles.btnDetails}
          >
            Детальніше
          </button>
          <div className="w-screen h-px bg-gray-10 absolute left-1/2 -translate-x-1/2 -bottom-10 lg:-bottom-16"></div>
        </div>
      </div>
    </>
  );
}
