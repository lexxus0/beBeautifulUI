import styles from "./EmptyReviewSection.module.css";
import LeaveReviewButton from "../LeaveReviewButton/LeaveReviewButton";

export default function EmptyReviewSection() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.headerBlock}>
        <h2 className={styles.title}>Відгуки про Шампунь Be Beautiful</h2>
        <div className={styles.buttons}>
          <LeaveReviewButton
            className={`${styles.button} ${styles.grayButton}`}
          />
          <button className={`${styles.button} ${styles.btnGradient}`}>
            Чат з консультантом
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
    </section>
  );
}
