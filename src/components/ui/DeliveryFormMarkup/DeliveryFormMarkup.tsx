"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  DeliveryFormValues,
  schemaDelivery,
} from "@/validation/deliveryValidation";
import Image from "next/image";
import Icon from "@/components/shared/Icon";
import PaymentSelect, { PaymentChoice } from "../PaymentSelect/PaymentSelect";
import BaseSelect from "@/components/elements/BaseSelect";
import styles from "./DeliveryFormMarkup.module.scss";

type City = {
  CityID: string;
  Description: string;
};

type Warehouse = {
  SiteKey: string;
  Description: string;
};

export default function DeliveryFormMarkup() {
  const router = useRouter();
  const [cities, setCities] = useState<City[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  console.log("selectedCity: ", selectedCity);
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>("");
  const [showComment, setShowComment] = useState(false);
  const [showCert, setShowCert] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DeliveryFormValues>({
    resolver: yupResolver(schemaDelivery) as Resolver<DeliveryFormValues>,
    defaultValues: {
      city: "",
      deliveryType: "warehouse",
      warehouse: "",
      street: "",
      house: "",
      apartment: "",
      orderComment: "",
      giftCertificate: "",
      // noCall: false,
      saveCard: false,
    },
    mode: "onTouched",
  });

  const deliveryType = watch("deliveryType");

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch(
          "https://be-beautiful-backend.onrender.com/api/np/cities"
        );
        const json = await res.json();
        console.log("city: ", json);
        setCities(json.data);
      } catch (err) {
        console.error("❌ error fetching cities:", err);
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    // console.log("🌀 useEffect triggered with:", selectedCity);
    if (!selectedCity) {
      setWarehouses([]);
      return;
    }

    const fetchWarehouses = async () => {
      try {
        console.log("🚀 Fetching warehouses for city:", selectedCity);
        const res = await fetch(
          `https://be-beautiful-backend.onrender.com/api/np/warehouses/${selectedCity}`
        );
        const json = await res.json();
        console.log("warehouses: ", json.data);
        setWarehouses(json.data);
      } catch (err) {
        console.error("❌ error fetching warehouses:", err);
      }
    };
    fetchWarehouses();
  }, [selectedCity]);

  // --- SYNC city & warehouse with react-hook-form ---
  useEffect(() => {
    if (selectedCity) {
      const found = cities.find((c) => c.CityID === selectedCity);
      setValue("city", found ? found.Description : "");
    } else {
      setValue("city", "");
    }
  }, [selectedCity, cities, setValue]);

  useEffect(() => {
    setValue("warehouse", selectedWarehouse || "");
  }, [selectedWarehouse, setValue]);

  const onSubmit = () => {
    // Remove sensitive delivery data logging for security
    console.log("Delivery form submitted successfully");
    router.push("/payment");
  };

  return (
    <div className="pb-16 md:w-[436px] md:pt-[6px] md:pb-20 lg:w-full lg:pt-9 lg:pb-10 mx-auto lg:mr-0">
      <form
        className="lg:flex lg:gap-[134px] justify-end lg:relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="lg:w-[526px]">
          {/* МІСТО */}
          <BaseSelect
            label="Місто"
            placeholder="Пошук міста"
            options={cities.map((c) => ({
              value: c.CityID,
              label: c.Description,
            }))}
            value={selectedCity}
            onSelect={setSelectedCity}
            iconLeft="icon-search"
            iconRight="icon-arrow-down"
            searchable
            className="font-roboto font-light text-base"
          />

          <div className="border border-black-10 rounded-md p-1 mb-6 md:p-2 md:mb-10 lg:mb-15">
            <div className="bg-black-10 rounded-lg p-2 font-lato text-base text-white text-center md:p-4 md:text-lg">
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
                  value="warehouse"
                  {...register("deliveryType")}
                />
                <span>Відділення</span>
              </label>

              <label className={styles.subTabLabel}>
                <input
                  type="radio"
                  value="address"
                  {...register("deliveryType")}
                />
                <span>Адресна доставка</span>
              </label>
              {errors.deliveryType && (
                <p className="mt-1 text-sm text-rose-600">
                  Оберіть тип доставки
                </p>
              )}
            </div>
          </div>

          {/* ВІДДІЛЕННЯ */}
          {deliveryType === "warehouse" && (
            <BaseSelect
              label="Відділення"
              placeholder="Відділення"
              options={warehouses.map((w) => ({
                value: w.SiteKey,
                label: w.Description,
              }))}
              value={selectedWarehouse}
              onSelect={setSelectedWarehouse}
              iconLeft="icon-search"
              iconRight="icon-arrow-down"
              searchable
              className="font-roboto font-light text-base"
            />
          )}

          {/* АДРЕСНА ДОСТАВКА */}
          {deliveryType === "address" && (
            <div>
              <label
                htmlFor="street"
                className="font-roboto font-light text-sm text-gray-10 md:text-base"
              >
                Вулиця
              </label>
              <div className="relative mb-8">
                <input
                  id="street"
                  type="text"
                  placeholder="Вулиця"
                  autoComplete="address-line1"
                  {...register("street")}
                  className={styles.input}
                  aria-invalid={!!errors.street}
                />
                <Icon
                  name="icon-search"
                  className="w-[18px] h-[18px] absolute top-[14px] left-3 fill-transparent stroke-black-10"
                />
                {errors.street && (
                  <p className="mt-1 text-sm text-rose-600">
                    {errors.street.message}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <div className="mb-8 md:mb-12 lg:mb-0">
                  <label
                    htmlFor="house"
                    className="font-roboto font-light text-sm md:text-base text-gray-10"
                  >
                    Будинок <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="house"
                    type="text"
                    placeholder="Будинок"
                    autoComplete="address-line2"
                    {...register("house")}
                    className={`${styles.input} ${styles.house}`}
                    aria-invalid={!!errors.house}
                  />
                  {errors.house && (
                    <p className="mt-1 text-sm text-rose-600">
                      {errors.house.message}
                    </p>
                  )}
                </div>
                <div className="mb-8 md:mb-12 lg:mb-0">
                  <label
                    htmlFor="apartment"
                    className="font-roboto font-light text-sm md:text-base text-gray-10"
                  >
                    Квартира <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="apartment"
                    type="text"
                    placeholder="Квартира"
                    autoComplete="address-line3"
                    {...register("apartment")}
                    className={`${styles.input} ${styles.house}`}
                    aria-invalid={!!errors.apartment}
                  />
                  {errors.apartment && (
                    <p className="mt-1 text-sm text-rose-600">
                      {errors.apartment.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="lg:w-[526px]">
          {/* ВАРІАНТ ОПЛАТИ */}
          <Controller
            name="payment"
            control={control}
            render={({ field, fieldState }) => (
              <PaymentSelect
                value={field.value as PaymentChoice | undefined}
                onChange={field.onChange}
                placeholder="Варіант оплати"
                error={fieldState.error?.message}
              />
            )}
          />

          {/* ДОДАТКОВІ ПОЛЯ */}
          <div className="mb-6 flex flex-col gap-[18px] lg:gap-[26px] lg:mb-11">
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
                  rows={1}
                  placeholder="Ваш коментар…"
                  {...register("orderComment")}
                  className={`${styles.input} ${styles.house}`}
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
                <p className="font-roboto font-light text-sm mb-4">
                  Маєте сертифікат? Введіть його тут і отримайте знижку чи
                  подарунок! <br /> Щоб підтвердити — натисніть «Застосувати
                  промокод».
                </p>
                <div className="mb-4">
                  <label
                    htmlFor="certificate"
                    className="font-roboto font-light text-sm md:text-base text-gray-10"
                  >
                    Номер сертифіката
                  </label>
                  <input
                    {...register("giftCertificate")}
                    id="certificate"
                    placeholder="Номер сертифіката"
                    className={`${styles.input} ${styles.house}`}
                  />
                </div>
                <button className={`${styles.submit} ${styles.certifictBtn}`}>
                  Застосувати код
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 mb-10 mb:mb-12 lg:mb-[70px] pl-1 lg:pl-[6px]">
            {/* <label className={styles.cb}>
              <input
                type="checkbox"
                id="noCall"
                {...register("noCall")}
                className={styles.cbNative}
              />
              <span className={styles.cbBox} />
              <span>
                Мені можна не телефонувати для підтвердження замовлення.
              </span>
            </label> */}
            <label className={styles.cb}>
              <input
                type="checkbox"
                id="saveCard"
                {...register("saveCard")}
                className={styles.cbNative}
              />
              <span className={styles.cbBox} />
              <span>Зберегти картку для майбутніх покупок.</span>
            </label>
          </div>
          {showCert ? (
            <div className="lg:h-[186px] lg:mb-41">
              <div className="lg:absolute lg:left-27">
                <div className="py-3 md:py-4 flex items-center justify-between border-t border-t-[#8d8d8d] mb-10 md:mb-12 lg:w-[1186px]">
                  <Image
                    src="/images/logo-orders-mob.png"
                    alt="logo"
                    width={54}
                    height={82}
                    className="lg:hidden"
                  />
                  <Image
                    src="/images/logo-orders-desktop.png"
                    alt="logo"
                    width={151}
                    height={146}
                    className="hidden lg:block"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="font-roboto font-light text-sm md:text-lg lg:text-[22px] text-gray-80 text-end">
                      Сума замовлення:
                      <span className="ml-[10px]">1008 грн</span>
                    </p>
                    <p className="font-roboto font-light text-sm md:text-lg lg:text-[22px] text-[#af1818] text-end">
                      Сертифікат:<span className="ml-[10px]">-500 грн</span>
                    </p>
                    <p className="font-lato font-bold lg:font-semibold text-sm md:text-lg lg:text-2xl text-end">
                      Загальна сума до сплати:
                      <span className="ml-[10px]">508 грн</span>
                    </p>
                  </div>
                </div>
                <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:w-[526px]">
                  <button
                    disabled={isSubmitting}
                    className={`${styles.submit} w-full`}
                  >
                    Оформити замовлення
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button disabled={isSubmitting} className={styles.submit}>
              Оформити замовлення
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
