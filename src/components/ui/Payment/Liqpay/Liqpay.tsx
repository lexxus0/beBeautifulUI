"use client";

import React from "react";
import Icon from "@/components/shared/Icon";

import styles from "./Liqpay.module.scss";
import ApplePayIcon from "@/components/elements/ApplePayIcon";

type LigpayProps = {
  onOpen: () => void;
  onClose: () => void;
};

export default function Liqpay({ onOpen, onClose }: LigpayProps) {
  return (
    <div className="py-6 border-[0.4px] border-gray-10 rounded-lg md:px-4 lg:px-6 lg:w-[684px] mx-auto">
      <div className="flex items-center gap-[10px] ml-5 mb-[34px] md:ml-0 md:mb-[42px]">
        <h1 className="font-open-sans font-semibold text-[32px] md:text-[38px] uppercase">
          Liqpay
        </h1>
        <Icon name="icon-double-arrow" className="w-8 h-8" />
      </div>
      <p className="font-lato font-semibold md:font-normal text-2xl md:text-[28px] ml-4 md:ml-0 mb-4">
        Данні про оплату
      </p>
      <p className="font-roboto font-light text-lg md:text-2xl ml-4 md:ml-0 mb-6">
        Оплата замовлення №00111
      </p>
      <div className="py-4 mx-4 md:mx-0 flex items-center justify-between border-t border-dashed mb-6 md:mb-8">
        <p className="font-roboto font-light text-lg md:text-2xl">До сплати</p>
        <p className="font-lato font-medium md:font-normal text-2xl md:text-[28px]">
          1008 грн
        </p>
      </div>
      <button type="button" className={styles.applePay} onClick={onClose}>
        <ApplePayIcon />
        Pay
      </button>
      <div className="w-full py-[10px] border-b border-gray-10 rounded-lg mb-6 md:w-[436px] lg:w-[416px] md:mx-auto">
        <p className="font-open-sans text-lg text-gray-10 text-center">або</p>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:gap-5 lg:gap-6">
        <button type="button" className={styles.cardPay} onClick={onOpen}>
          Картка
          <Icon name="icon-card-pay" className="w-8 h-8 ml-2" />
        </button>
        <button type="button" className={styles.cardPay} onClick={onClose}>
          Рrivat24
          <Icon
            name="icon-privat-pay"
            className="w-7 h-7 fill-transparent stroke-black-10"
          />
        </button>
      </div>
    </div>
  );
}
