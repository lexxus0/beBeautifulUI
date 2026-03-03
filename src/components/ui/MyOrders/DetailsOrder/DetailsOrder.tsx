"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IOrderResponse } from "@/types/orders";
import Link from "next/link";
import Image from "next/image";
import { formatISOToDMY } from "@/helpers/covertDateToString";
import { useRepeatOrder } from "@/helpers/hooks/useRepeatOrder";
import { BaseModal } from "@/components/shared/Modal";
import styles from "./DetailsOrder.module.scss";

interface IDetailsOrderProps {
  order: IOrderResponse;
}

export default function DetailsOrder({ order }: IDetailsOrderProps) {
  const router = useRouter();
  const { repeatOrder } = useRepeatOrder();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isModalOpen) return;

    const timer = setTimeout(() => {
      setIsModalOpen(false);
      router.push("/basket");
    }, 1500);

    return () => clearTimeout(timer);
  }, [isModalOpen, router]);

  const handleRepeat = async () => {
    const ok = await repeatOrder(order);
    if (ok) {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="container px-0 pt-5 pb-10 md:pt-[50px] lg:pb-15 lg:pt-5">
      <h2 className="font-lato font-semibold text-black text-2xl mb-7 md:text-[32px] md:mb-10 lg:mb-15">
        Детальна інформація про замовлення
      </h2>
      <div className="lg:px-[220px]">
        <p className={styles.text}>Деталі замовлення</p>
        <ul className={styles.listOrder}>
          <li>
            <p className={styles.textOrder}>№ Замовлення:</p>
            <span className={styles.spanOrder}>5425253</span>
          </li>
          <li>
            <p className={styles.textOrder}>Дата оформлення:</p>
            <span className={styles.spanOrder}>
              {formatISOToDMY(order.createdAt)}
            </span>
          </li>
          {/* <li>
            <p className={styles.textOrder}>Статус:</p>
            <span className={styles.spanOrder}>{order?.status}</span>
          </li> */}
          <li>
            <p className={styles.textOrder}>Спосіб доставки:</p>
            <span className={styles.spanOrder}>{order?.deliveryMethod}</span>
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
            <span className={styles.spanOrder}>{order?.totalAmount} грн</span>
          </li>
        </ul>
        <p className={styles.text}>Адреса доставки:</p>
        <ul className={styles.address}>
          <li>
            <p className={styles.addressText}>Місто:</p>
            <span className={styles.addressSpan}>{order?.city}</span>
          </li>
          {order.deliveryType === "branch" && (
            <li>
              <p className={styles.addressText}>Відділення:</p>
              <span className={styles.addressSpan}>{order?.branchNumber}</span>
            </li>
          )}
          {order.deliveryType === "address" && (
            <li>
              <p className={styles.addressText}>Адреса:</p>
              <span className={styles.addressSpan}>
                {order?.street} {order?.house}, кв. {order?.apartment}
              </span>
            </li>
          )}
        </ul>
        <p className={styles.text}>Склад замовлення:</p>
        <ul className="flex flex-col gap-5 mb-9">
          {order.items.map((item, idx) => {
            const src =
              item.product?.imageUrl ??
              "/images/placeholder/placeholder-mob.png";
            const alt = item.product?.name?.ua ?? "Товар";
            const features = item.product?.features.ua ?? [];
            return (
              <li
                key={`${item.product?._id}-${idx}`}
                className="flex gap-4 items-center md:gap-6"
              >
                <Image
                  src={src}
                  alt={alt}
                  width={124}
                  height={172}
                  className="h-[172px] mr-[14px] md:hidden"
                />
                <Image
                  src={src}
                  alt={alt}
                  width={86}
                  height={80}
                  className="hidden md:block md:mr-[8px]"
                />
                <div className="flex flex-col gap-2 md:grid md:grid-cols-[1fr_40px] md:items-center md:w-full md:justify-between lg:gap-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center lg:gap-6">
                      <p className="font-lato font-bold text-black text-lg">
                        {item.product?.name?.en}
                      </p>
                      <div className="flex flex-col gap-1 md:flex-row md:gap-2">
                        <p className="font-light text-sm md:text-lg">
                          {item.product?.name?.ua}
                        </p>
                        <p className="font-light text-sm md:text-lg">
                          {item.selectedVolume} мл
                        </p>
                      </div>
                    </div>
                    <p className="font-light text-xs md:text-lg flex flex-wrap">
                      {features.map((feature: string, index: number) => (
                        <span key={index}>
                          {feature}
                          {index < features.length - 1 && (
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
            );
          })}
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
          <button
            type="button"
            onClick={handleRepeat}
            className={styles.btnOrder}
          >
            Повторити замовлення
          </button>
          <Link href="/products" className={styles.linkCatalog}>
            Перейти до каталогу
          </Link>
        </div>
      </div>
      {isModalOpen && (
        <BaseModal
          isOpen
          onClose={() => {
            setIsModalOpen(false);
            router.push("/basket");
          }}
        >
          <div className="relative w-[150px] h-[150px] object-contain mb-4 mx-auto">
            <Image
              src="/gif/cart.gif"
              alt="Товар додано до кошика"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <p className="font-roboto font-light text-xl italic uppercase text-center text-[#808080] mb-4">
            Товар додано до кошика.
          </p>
        </BaseModal>
      )}
    </div>
  );
}
