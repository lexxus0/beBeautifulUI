"use client";
import React, { useRef, useState, useEffect } from "react";
import styles from "./WantToKnowMore.module.scss";
import Icon from "@/components/shared/Icon";
import Link from "next/link";

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
  const containerRef = useRef<HTMLUListElement | null>(null);
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const itemsPerPage = 2;
  // max starting index for visible window of `itemsPerPage` items
  const maxStartIndex = Math.max(0, tips.length - itemsPerPage);
  const [startIndex, setStartIndex] = useState(0);

  const toggleFlip = (id: number) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // index here is the start index of the visible window (0..maxStartIndex)
  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    // width of a single item (we show `itemsPerPage` items per viewport)
    const itemWidth = container.clientWidth / itemsPerPage;
    const clamped = Math.max(0, Math.min(index, maxStartIndex));
    const left = clamped * itemWidth;
    container.scrollTo({ left, behavior: "smooth" });
    setStartIndex(clamped);
  };

  const handlePrev = () => scrollToIndex(startIndex - 1);
  const handleNext = () => scrollToIndex(startIndex + 1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      const itemWidth = container.clientWidth / itemsPerPage;
      const idx = Math.round(container.scrollLeft / itemWidth);
      // keep idx within allowed start range
      setStartIndex(Math.max(0, Math.min(idx, maxStartIndex)));
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [itemsPerPage, maxStartIndex]);

  return (
    <section
      className={styles.wantToKnowMorecontainer}
      aria-labelledby="want-to-know-more-title"
    >
      <div className={styles.header}>
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
          className={styles.arrow}
          onClick={handlePrev}
          disabled={startIndex <= 0}
        >
          <Icon
            name="icon-arrow-right"
            width={48}
            height={10}
            className={styles.leftIcon}
          />
        </button>

        <button
          type="button"
          aria-label="next"
          className={styles.arrow}
          onClick={handleNext}
          disabled={startIndex >= maxStartIndex}
        >
          <Icon
            name="icon-arrow-right"
            width={48}
            height={10}
            className={styles.rightIcon}
          />
        </button>
      </div>

      <ul className={styles.list} ref={containerRef}>
        {tips.map((tip) => (
          <li
            key={tip.id}
            className={`${styles.item} ${
              flipped[tip.id] ? styles.isFlipped : ""
            }`}
            onClick={() => toggleFlip(tip.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") toggleFlip(tip.id);
            }}
          >
            <div className={styles.cardInner}>
              <h3 className={styles.itemTitle}>{tip.title}</h3>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.blogRow}>
        <Link href="/blog" className={styles.blogLink}>
          Наш Блог
        </Link>
        <p className={styles.blogText}>
          Ми пишемо про те, що важливо: склад, ритм життя, ритуали.
        </p>
      </div>
    </section>
  );
}
