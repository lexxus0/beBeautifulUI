"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./History.module.css";
import historyData from "./historyParagraphs.json"


const History: React.FC = () => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const paragraphs: string[] = historyData.paragraphs;
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
