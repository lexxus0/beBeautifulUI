"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./History.module.scss";
import historyData from "./historyParagraphs.json";

const History: React.FC = () => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const paragraphs: string[] = historyData.paragraphs;

  return (
    <section className="container">
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
                const isSecondParagraph = index === 1;
                let content = p.trim().replace(/\.*$/, "");

                if (isSecondParagraph) {
                  if (!showAll) content += "...";
                  else content += ".";
                }

                if (!showAll && index > 1) return null;

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
    </section>
  );
};

export default History;
