"use client";
import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectRecentlyViewed } from "@/store/products/selectors";
import { fetchProductsByIds } from "@/store/products/operations";
import { IProduct } from "@/types/types";
import Icon from "@/components/shared/Icon";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from './RecentlyViewed.module.scss'


export default function RecentlyViewed() {
  const dispatch = useAppDispatch();
  const recentlyViewed = useAppSelector(selectRecentlyViewed);

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("visitedProducts");
    // console.log("stored: ", stored);
    const ids: string[] = stored ? JSON.parse(stored) : [];
    // console.log("ids: ", ids);

    if (ids.length) {
    //   console.log("Завантажуємо продукти з id:", ids);
      dispatch(fetchProductsByIds(ids));
    }
  }, [dispatch]);

  if (!recentlyViewed.length) return null;

  return (
    <div className="py-15 lg:pt-17">
      <div className="flex flex-col gap-4 items-center md:flex-row md:justify-between mb-8 md:mb-10">
        <h3 className="font-lato font-semibold text-black text-2xl md:font-normal md:text-[28px] lg:text-[42px] mb-4 md:mb-0">Ви нещодавно переглядали</h3>
        <div className="flex gap-8">
          <button
            ref={prevRef}
            type="button"
            className={styles.navButton}
          >
            <Icon name="icon-long-arrow" className="w-[112px] md:w-22 h-10" />
          </button>
          <button
            ref={nextRef}
            type="button"
            className={styles.navButton}
          >
            <Icon name="icon-long-arrow" className="w-[112px] md:w-22 h-10 rotate-180" />
          </button>
        </div>
      </div>
      <Swiper
        modules={[Navigation]}
        navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            const nav = swiper.params.navigation as {
              prevEl: HTMLElement | null;
              nextEl: HTMLElement | null;
            };
            nav.prevEl = prevRef.current;
            nav.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
        breakpoints={{
          320: { slidesPerView: 2,  spaceBetween: 20 }, // мобілка
          744: { slidesPerView: 3,  spaceBetween: 20 }, // планшет
          1440: { slidesPerView: 4,  spaceBetween: 40 }, // десктоп
        }}
      >
        {recentlyViewed.map((product: IProduct) => (
          <SwiperSlide key={product._id}>
            <div className="flex flex-col items-center">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="mb-2 w-[130px] h-[130px] sm:w-[158px] sm:h-[158px] md:w-[208px] md:h-[208px] lg:w-[306px] lg:h-[306px] border border-black object-cover"
              />
              <div className="flex flex-col items-center">
              <p className="font-lato font-bold text-lg lg:font-semibold lg:text-2xl text-center mb-[2px] text-black">{product.name}</p>
              <p className="font-roboto font-light text-sm lg:text-lg mb-2 capitalize text-black">{product.category}</p>
              <p className="font-lat text-lg lg:font-semibold lg:text-xl text-black">{product.priceByVolume[0].price} грн</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
