import React from "react";

import styles from "./OrderItem.module.scss";

export default function OrderItem() {
  return (
    <>
      <div className="flex flex-col lg:gap-[74px] gap-10 lg:py-5 lg:mx-auto lg:w-[856px]">
        <ul className={styles.listOrder}>
          <li className={styles.itemOrder}>
            <p className={styles.textOrder}>№ Замовлення:</p>
            <span className={styles.spanOrder}>#SB00001</span>
          </li>
          <li className={styles.itemOrder}>
            <p className={styles.textOrder}>Статус</p>
            <span className={styles.spanOrder}>Доставлено</span>
          </li>
          <li className={styles.itemOrder}>
            <p className={styles.textOrder}>Оплата</p>
            <span className={styles.spanOrder}>Сплачено</span>
          </li>
          <li className={styles.itemOrder}>
            <p className={styles.textOrder}>Дата</p>
            <span className={styles.spanOrder}>21.07.2025</span>
          </li>
          <li className={styles.itemOrder}>
            <p className={styles.textOrder}>Тип доставки</p>
            <span className={styles.spanOrder}>Нова пошта</span>
          </li>
          <li className={styles.itemOrder}>
            <p className={styles.textOrder}>Сума</p>
            <span className={styles.spanOrder}>778 грн</span>
          </li>
        </ul>
        <div>
          <p className="font-lato font-semibold text-xl pt-[2px] border-b border-b-[#e4e4e4] mb-5 md:font-bold md:text-lg">
            Товари:
          </p>
          <ul className="flex flex-col gap-5 md:w-[500px]">
            <li className="flex gap-4 items-center md:gap-6">
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
            </li>
          </ul>
        </div>
        <div className="flex flex-col pt-8 gap-6 md:flex-row md:gap-5 md:pt-10 lg:pt-15 lg:gap-6 relative">
          <div className="w-screen h-px bg-gray-10 absolute left-1/2 -translate-x-1/2 top-0"></div>{" "}
          <button type="button" onClick={() => {}} className={styles.btnOrder}>
            Повторити замовлення
          </button>
          <button
            type="button"
            onClick={() => {}}
            className={styles.btnDetails}
          >
            Детальніше
          </button>
        </div>
      </div>
    </>
  );
}
