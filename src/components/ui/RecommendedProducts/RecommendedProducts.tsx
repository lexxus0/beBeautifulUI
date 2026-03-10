"use client";

import styles from "./RecommendedProducts.module.scss";
import { IProduct } from "@/types/types";
import { useEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts } from "@/store/products/operations";
import { selectProductsList } from "@/store/products/selectors";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Icon from "@/components/shared/Icon";
import { RecentlyViewedItem } from "../RecentlyViewedItem/RecentlyViewedItem";

type RecommendedProductsProps = {
  category?: string;
  title?: string;
  limit?: number;
  page?: number;
  classNameWrap?: string;
  classNameTitle?: string;
  borderShow?: boolean;

  /** якщо передати — виключимо цей товар зі списку (для "схожих товарів") */
  excludeProductId?: string;

  /** якщо true — не рендерити секцію, коли список пустий */
  hideIfEmpty?: boolean;
};

const RecommendedProducts = ({
  category = "hair",
  title = "Рекомендовані товари",
  limit = 10,
  page = 1,
  classNameWrap,
  classNameTitle,
  excludeProductId,
  hideIfEmpty = true,
  borderShow = false,
}: RecommendedProductsProps) => {
  const dispatch = useAppDispatch();
  const productsList = useAppSelector(selectProductsList);
  console.log("productsList: ", productsList);

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    dispatch(fetchProducts({ limit: limit, currentPage: page, category }));
  }, [dispatch, category, limit, page]);

  const productToRender = useMemo(() => {
    const base = (productsList || []) as IProduct[];

    return base
      .filter((product: IProduct) =>
        excludeProductId ? product._id !== excludeProductId : true
      )
      .slice(0, limit);
  }, [productsList, excludeProductId, limit]);

  if (hideIfEmpty && productToRender.length === 0) {
    return null;
  }

  return (
    <div className={classNameWrap}>
      <div className="flex flex-col gap-4 items-center md:flex-row md:justify-between mb-4 md:mb-10">
        <h2 className={classNameTitle}>{title}</h2>
        <div className="flex gap-8">
          <button ref={prevRef} type="button" className={styles.navButton}>
            <Icon name="icon-long-arrow" className="w-[112px] md:w-22 h-10" />
          </button>
          <button ref={nextRef} type="button" className={styles.navButton}>
            <Icon
              name="icon-long-arrow"
              className="w-[112px] md:w-22 h-10 rotate-180"
            />
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
          320: { slidesPerView: 2, spaceBetween: 20 }, // мобілка
          744: { slidesPerView: 3, spaceBetween: 20 }, // планшет
          1440: { slidesPerView: 4, spaceBetween: 40 }, // десктоп
        }}
      >
        {productToRender.map((product: IProduct) => (
          <SwiperSlide key={product._id}>
            <RecentlyViewedItem product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
      {borderShow && (
        <div className="w-screen h-px bg-[#e0e0e0] absolute left-1/2 -translate-x-1/2 bottom-0 lg:-bottom-0"></div>
      )}{" "}
    </div>
  );
};

export default RecommendedProducts;
