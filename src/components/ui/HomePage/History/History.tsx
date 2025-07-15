"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./History.module.css";

const paragraphs: string[] = [
  "Засновано у 2018 році жінкою-хіміком, яка перетворила знання на догляд. Бренд народився на перетині науки, краси та внутрішнього вибору: дбати про себе - свідомо, точно, глибоко.",
  "Кожен засіб створено вручну в лабораторії з сертифікованих активів із Франції, Німеччини, Швейцарії, США та Ізраїлю.",
  "У виробництві застосовуються стандарти GMP та ISO 22716, а формули тестуються на фокус-групах та в лабораторних умовах.",
  "Кожен актив має паспорт якості, кожна партія проходить контроль стабільності.",
  "Science Be Beautiful - це бренд, що обирає точність замість гучності. Результат замість обіцянок. Турботу, яка працює - для шкіри, дому та відчуття зв'язку з собою.",
  "Це формули, створені жінкою - для жінки. Формули, в яких працює кожна молекула. І кожне рішення - про любов.",
];

const History: React.FC = () => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const visibleParagraphs = showAll ? paragraphs : paragraphs.slice(0, 2);

  return (
    <section className={`container ${styles.history}`}>
      <h2>
        Історія, що надихає.
        <br />
        Формули з любов’ю. І наукою.
      </h2>
      <div className={styles.wrapContent}>
        <Image
          src="/images/history.png"
          alt="Science Be Beautiful"
          width={800}
          height={500}
          className={styles.image}
        />
        <div className={styles.historyTextWrap}>
          <h3>
            Science Be Beautiful<span className={styles.hyphen}> — </span>
            <span className={styles.afterHyphen}>
              створено з формули та досвіду
            </span>
          </h3>
          <div className={styles.text}>
            {visibleParagraphs.map((p: string, index: number) => {
              const isLastVisible = index === visibleParagraphs.length - 1;
              const shouldAddDots = !showAll && isLastVisible;
              return (
                <p key={index}>
                  {p}
                  {shouldAddDots && <span className={styles.dots}>...</span>}
                </p>
              );
            })}
          </div>
          <button
            onClick={() => setShowAll((prev: boolean) => !prev)}
            className={styles.toggleBtn}
          >
            {showAll ? "Сховати" : "Дивитись більше"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default History;
