"use client";

import { useState } from "react";
import styles from "./EmptyReviewSection.module.css";
import Modal from "../Modal/modal";
import ReviewForm from "../ReviewForm/ReviewForm";

export default function EmptyReviewSection() {
  const [openReview, setOpenReview] = useState(false);

  return (
    <section className={styles.wrapper}>
      <div className={styles.headerBlock}>
        <h2 className={styles.title}>Відгуки про Шампунь Be Beautiful</h2>
        <div className={styles.buttons}>
          <button
            className={`${styles.button} ${styles.grayButton}`}
            onClick={() => alert("тут буде Відкрито чат з консультантом")}
          >
            Чат з консультантом
          </button>
          <button
            className={`${styles.button} ${styles.btnGradient}`}
            onClick={() => setOpenReview(true)}
          >
            Залишити відгук
          </button>
        </div>
      </div>

      <div className={styles.emptyTextBlock}>
        <h3 className={styles.emptyTitle}>Ще немає відгуків… поки що!</h3>
        <p className={styles.emptyDescription}>
          Будьте першими, хто поділиться своїм враженням <br />
          Ваша думка важлива для нас і для інших покупців
        </p>
      </div>

      <Modal isOpen={openReview} onClose={() => setOpenReview(false)}>
        <ReviewForm />
      </Modal>
    </section>
  );
}
