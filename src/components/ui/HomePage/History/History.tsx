"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./History.module.scss";
import historyData from "./historyParagraphs.json";

const History: React.FC = () => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const paragraphs: string[] = historyData.paragraphs;

  return (
    <section className="container relative">
      <div className={styles.history}>
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
              {paragraphs.map((p: string, index: number) => {
                if (!showAll && index > 1) return null;
                let content = p;

                if (index === 1) {
                  if (!showAll) content = content.replace(/\.*$/, "...");
                  else content = content.replace(/\.*$/, ".");
                }

                return <p key={index}>{content}</p>;
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
      </div>
      <div className="w-screen h-px bg-[#e0e0e0] absolute left-1/2 -translate-x-1/2 bottom-0 lg:-bottom-0"></div>
    </section>
  );
};

export default History;
