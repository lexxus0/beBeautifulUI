"use client";
import React, { useRef } from "react";
import Icon from "@/components/shared/Icon";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import styles from "./WantToKnowMore.module.scss";

type Tip = {
  id: number;
  title: string;
  body: string;
};

const tips: Tip[] = [
  {
    id: 1,
    title: "Регулярний догляд",
    body: "Очищуйте шкіру тіла під час душу м’яким гелем або милом без агресивних компонентів, а після — наносіть зволожуючий крем.",
  },
  {
    id: 2,
    title: "Ексфоліація",
    body: "Раз на тиждень використовуй ніжний скраб або рукавицю для видалення мертвих клітин і покращення текстури шкіри.",
  },
  {
    id: 3,
    title: "Захист від сонця",
    body: "Не забувай про SPF на відкритих ділянках тіла, особливо влітку або при довгому перебуванні на вулиці.",
  },
  {
    id: 4,
    title: "Зволоження",
    body: "Пий достатньо води і використай зволожуючі засоби з гліцерином або гіалуроновою кислотою для підтримки бар’єру шкіри.",
  },
  {
    id: 5,
    title: "Харчування шкіри",
    body: "Для сухої шкіри вибирай більш жирні креми з оліями; для нормальної — легкі лосьйони. Нанось засіб одразу після душу.",
  },
];

export default function WantToKnowMore(): React.ReactElement {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div
      className={styles.wantToKnowMorecontainer}
      aria-labelledby="want-to-know-more-title"
    >
      <div className={styles.header}>
        <div>
          <h2 id="want-to-know-more-title" className={styles.title}>
            Хочеш знати більше?
          </h2>
          <p className={styles.subtitle}>
            Занурся глибше у світ догляду, формул та краси.{" "}
          </p>
        </div>
        <div className={styles.controls}>
          <button
            type="button"
            aria-label="previous"
            className={styles.navButton}
            ref={prevRef}
          >
            <Icon name="icon-long-arrow" className="w-[112px] md:w-22 h-10" />
          </button>

          <button
            type="button"
            aria-label="next"
            ref={nextRef}
            className={styles.navButton}
          >
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
        {tips.map((tip) => (
          <SwiperSlide key={tip.id}>
            <Link href={`/blog/${tip.id}`} className={styles.item}>
              <div className={styles.cardInner}>
                <h3 className={styles.itemTitle}>{tip.title}</h3>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.blogRow}>
        <Link href="/blog" className={styles.blogLink}>
          Наш Блог
        </Link>
        <p className={styles.blogText}>
          Ми пишемо про те, що важливо: склад, ритм життя, ритуали.
        </p>
      </div>
      <div className="w-screen h-px bg-[#e0e0e0] absolute left-1/2 -translate-x-1/2 bottom-0 lg:-bottom-0"></div>
    </div>
  );
}
