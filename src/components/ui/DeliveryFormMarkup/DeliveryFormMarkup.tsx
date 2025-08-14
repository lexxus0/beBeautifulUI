"use client";

import { useState } from "react";
import Icon from "@/components/shared/Icon";
import PaymentSelect from "../PaymentSelect/PaymentSelect";
import BasketIcon from "@/components/elements/BasketIcon";
import styles from "./DeliveryFormMarkup.module.scss";
import Link from "next/link";

export default function DeliveryFormMarkup() {
  const [deliveryType, setDeliveryType] = useState<"warehouse" | "address">(
    "warehouse"
  );
  const [showComment, setShowComment] = useState(false);
  const [showCert, setShowCert] = useState(false);
  const [comment, setComment] = useState("");
  const [certificate, setCertificate] = useState("");

  return (
    <div className="pt-[10px] pb-18 md:w-[436px] md:pt-[6px] md:pb-20 lg:w-full lg:pt-9 lg:pb-[100px] mx-auto lg:mr-0">
      <form
        className="lg:flex lg:gap-[134px] justify-end"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="lg:w-[526px]">
          {/* МІСТО */}
          <div>
            <label htmlFor="city" className="font-roboto font-light text-base">
              Місто
            </label>
            <div className="relative">
              <input
                id="city"
                name="city"
                type="text"
                placeholder="Пошук міста"
                className={styles.input}
                autoComplete="address-level2"
              />
              <Icon
                name="icon-search"
                className="w-[18px] h-[18px] absolute top-[14px] left-2 fill-transparent stroke-black-10"
              />
            </div>
          </div>

          <div className="border border-black-10 rounded-md p-1 mb-6 md:p-2 md:mb-10 lg:mb-15">
            <div className="bg-black-10 rounded-lg p-2 font-lato font-bold text-white text-center md:p-4 md:font-normal md:text-lg">
              Нова пошта
            </div>
          </div>

          {/* ТАБИ: ВІДДІЛЕННЯ / АДРЕСНА ДОСТАВКА */}
          <div className="pt-10 relative md:pt-0">
            <div className="w-[26px] h-[26px] absolute top-[3px] right-[3px] bg-[#326017] rounded-[50px] flex items-center justify-center">
              <Icon name="icon-answer" className="w-2 h-4 stroke-white" />
            </div>
            <div className={styles.subTabs}>
              <label className={styles.subTabLabel}>
                <input
                  type="radio"
                  name="deliveryType"
                  value="warehouse"
                  checked={deliveryType === "warehouse"}
                  onChange={() => setDeliveryType("warehouse")}
                />
                <span>Відділення</span>
              </label>

              <label className={styles.subTabLabel}>
                <input
                  type="radio"
                  name="deliveryType"
                  value="address"
                  checked={deliveryType === "address"}
                  onChange={() => setDeliveryType("address")}
                />
                <span>Адресна доставка</span>
              </label>
            </div>
          </div>

          {/* ВІДДІЛЕННЯ */}
          {deliveryType === "warehouse" && (
            <div>
              <label
                htmlFor="warehouse"
                className="font-poppins font-normal text-base text-gray-10"
              >
                Відділення
              </label>
              <div className="relative">
                <input
                  id="warehouse"
                  name="warehouse"
                  type="text"
                  placeholder="Відділення"
                  className={`${styles.input} ${styles.depart}`}
                  autoComplete="off"
                />
                <Icon
                  name="icon-search"
                  className="w-[18px] h-[18px] absolute top-[12px] left-2 fill-transparent stroke-black-10"
                />
              </div>
            </div>
          )}

          {/* АДРЕСНА ДОСТАВКА */}
          {deliveryType === "address" && (
            <div className={"styles.blockGroup"}>
              <label
                htmlFor="street"
                className="font-poppins font-normal text-base text-gray-10"
              >
                Вулиця
              </label>
              <div className="relative">
                <input
                  id="street"
                  name="street"
                  type="text"
                  placeholder="Вулиця"
                  className={`${styles.input} ${styles.street}`}
                  autoComplete="address-line1"
                />
                <Icon
                  name="icon-search"
                  className="w-[18px] h-[18px] absolute top-[12px] left-2 fill-transparent stroke-black-10"
                />
              </div>
              <div className="flex gap-3">
                <div className={"styles.col"}>
                  <label
                    htmlFor="house"
                    className="font-roboto font-light text-base text-gray-10"
                  >
                    Будинок <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="house"
                    name="house"
                    type="text"
                    placeholder="Будинок"
                    className={`${styles.input} ${styles.house}`}
                    autoComplete="address-line2"
                  />
                </div>
                <div className={"styles.col"}>
                  <label
                    htmlFor="apartment"
                    className="font-roboto font-light text-base text-gray-10"
                  >
                    Квартира <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="apartment"
                    name="apartment"
                    type="text"
                    placeholder="Квартира"
                    className={`${styles.input} ${styles.house}`}
                    autoComplete="address-line3"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="lg:w-[526px]">
          {/* ВАРІАНТ ОПЛАТИ */}
          <PaymentSelect placeholder="Варіант оплати" />

          {/* ДОДАТКОВІ ПОЛЯ */}
          <div className="mb-6 flex flex-col gap-[18px] lg:gap-[26px] lg:mb-8">
            <button
              type="button"
              className={styles.btnPlus}
              onClick={() => setShowComment((v) => !v)}
              aria-expanded={showComment}
              aria-controls="order-comment"
            >
              <Icon
                name={showComment ? "icon-minus" : "icon-plus"}
                className="w-6 h-6 mr-4 lg:w-7 lg:h-7"
              />{" "}
              Додати коментар до замовлення
            </button>
            {showComment && (
              <div id="order-comment">
                <textarea
                  name="orderComment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  placeholder="Ваш коментар…"
                  className="w-full rounded-xl border px-4 py-3 outline-none"
                />
              </div>
            )}

            <button
              type="button"
              className={styles.btnPlus}
              onClick={() => setShowCert((v) => !v)}
              aria-expanded={showCert}
              aria-controls="gift-certificate"
            >
              <Icon
                name={showCert ? "icon-minus" : "icon-plus"}
                className="w-6 h-6 mr-4 lg:w-7 lg:h-7"
              />{" "}
              Я маю сертифікат
            </button>
            {showCert && (
              <div id="gift-certificate">
                <input
                  name="giftCertificate"
                  value={certificate}
                  onChange={(e) => setCertificate(e.target.value)}
                  placeholder="Номер/код сертифіката"
                  className="w-full rounded-xl border px-4 py-3 outline-none"
                  required
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 mb-10 lg:mb-[70px]">
            <label className="flex gap-3 items-center">
              <input type="checkbox" name="noCall" />
              <p className={styles.checkText}>
                Мені можна не телефонувати для підтвердження замовлення.
              </p>
            </label>
            <label className="flex gap-3 items-center">
              <input type="checkbox" name="saveCard" />
              <p className={styles.checkText}>
                Зберегти картку для майбутніх покупок.
              </p>
            </label>
          </div>

          <Link href='/payment' className={styles.submit}>
            Оформити замовлення
            <BasketIcon variant="white" className="w-[18px] h-[18px] ml-4" />
          </Link>
        </div>
      </form>
    </div>
  );
}
