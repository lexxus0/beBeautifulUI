"use client";
import React from "react";

import styles from "./DetailsOrder.module.scss";
import { IOrder, IOrderItem } from "@/types/types";
import Link from "next/link";
import Image from "next/image";

interface IDetailsOrderProps {
  order: IOrder;
}

export default function DetailsOrder({ order }: IDetailsOrderProps) {
  return (
    <div className="container px-0 pt-[10px] pb-10 md:pb-15 lg:pt-[34px]">
      <h2 className="font-lato font-semibold text-black text-2xl mb-7 md:text-[32px] md:mb-15 lg:mb-[50px]">
        Детальна інформація про замовлення
      </h2>
      <div className="lg:px-[220px]">
        <p className={styles.text}>Деталі замовлення</p>
        <ul className={styles.listOrder}>
          <li>
            <p className={styles.textOrder}>№ Замовлення:</p>
            <span className={styles.spanOrder}>{order?.orderNumber}</span>
          </li>
          <li>
            <p className={styles.textOrder}>Дата оформлення:</p>
            <span className={styles.spanOrder}>{order?.date}</span>
          </li>
          {/* <li>
            <p className={styles.textOrder}>Статус:</p>
            <span className={styles.spanOrder}>{order?.status}</span>
          </li> */}
          <li>
            <p className={styles.textOrder}>Спосіб доставки:</p>
            <span className={styles.spanOrder}>{order?.delivery.deliveryMethod}</span>
          </li>
          {/* <li>
            <p className={styles.textOrder}>Номер ТТН:</p>
            <span className={styles.spanOrder}>{order?.ttn}</span>
          </li> */}
          {/* <li>
            <p className={styles.textOrder}>Спосіб оплати:</p>
            <span className={styles.spanOrder}>{order?.paymentType}</span>
          </li> */}
          <li>
            <p className={styles.textOrder}>Загальна сума:</p>
            <span className={styles.spanOrder}>{order?.totalAmount}</span>
          </li>
        </ul>
        <p className={styles.text}>Адреса доставки:</p>
        <ul className={styles.address}>
          <li>
            <p className={styles.addressText}>Місто:</p>
            <span className={styles.addressSpan}>{order?.delivery.city}</span>
          </li>
          <li>
            <p className={styles.addressText}>Відділення:</p>
            <span className={styles.addressSpan}>{order?.delivery.warehouse}</span>
          </li>
        </ul>
        <p className={styles.text}>Склад замовлення:</p>
        <ul className="flex flex-col gap-5 mb-9">
          {order?.items.map(
            (item: IOrderItem) => (
              <li
                key={item.product._id}
                className="flex gap-4 items-center md:gap-6"
              >
                <Image
                  src={item.product.imageUrl}
                  alt={item.product.description}
                  width={124}
                  height={172}
                  className="h-[172px] mr-[14px] md:hidden"
                />
                <Image
                  src={item.product.imageUrl}
                  alt={item.product.description}
                  width={86}
                  height={80}
                  className="hidden md:block md:mr-10"
                />
                <div className="flex flex-col gap-y-2 md:flex-row md:items-center md:w-full md:justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
                      <p className="font-lato font-bold text-black text-lg">
                        {item.product.name}
                      </p>
                      <div className="flex gap-2">
                        <p className="font-light text-sm md:text-lg">
                          {item.product.name}
                        </p>
                        <p className="font-light text-sm md:text-lg">
                          {item.selectedVolume}
                        </p>
                      </div>
                    </div>
                    <p className="font-light text-xs md:text-lg">
                      {item.product.features.map((feature, index) => (
                        <span key={index}>
                          {feature}
                          {index < item.product.features.length - 1 && (
                            <span className="mx-1 text-black">|</span>
                          )}
                        </span>
                      ))}
                    </p>
                  </div>
                  <p className="font-lato font-bold text-base">
                    {item.quantity} шт
                  </p>
                </div>
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

        <div className="flex flex-col pt-8 gap-6 md:flex-row md:gap-5 md:pt-10 lg:pt-15 lg:gap-6 relative">
          <div className="w-screen h-px bg-gray-10 absolute left-1/2 -translate-x-1/2 top-0"></div>{" "}
          <button type="button" onClick={() => {}} className={styles.btnOrder}>
            Повторити замовлення
          </button>
          <Link href="/products" className={styles.linkCatalog}>
            Перейти до каталогу
          </Link>
        </div>
      </div>
    </div>
  );
}
