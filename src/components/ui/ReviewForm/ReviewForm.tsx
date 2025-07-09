import React, { useState } from "react";
import styles from "./review-form.module.css";

const ReviewForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would handle sending the review to your backend or API
  };

  const handleSend = () => {
    if (message.trim()) {
      console.log(message);
      setMessage("");
    }
  };

  if (submitted) {
    return <div className={styles.success}>Дякуємо за ваш відгук!</div>;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Ваш відгук про Шампунь Be Beautiful</h2>
      <div className={styles.starsRow}>
        {[1,2,3,4,5].map((star) => (
          <button
            type="button"
            key={star}
            className={styles.starBtn}
            aria-label={`Оцінка ${star}`}
            onClick={() => setRating(star)}
          >
            <img
              src="/star.svg"
              alt="Star"
              className={rating >= star ? styles.starFilled : styles.starEmpty}
            />
          </button>
        ))}
      </div>
      <div className={styles.starsLabel}>Ваша оцінка</div>
      <div className={styles.inputsRow}>
        <input
          className={styles.input}
          type="text"
          placeholder="Ім’я"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className={styles.helperRow}>
        <span>Ви можете залишити відгук або поставити питання</span>
        <img src="/question.svg" alt="Пояснення" className={styles.helperIcon} />
      </div>
      <div className={styles.textareaRow}>
        <textarea
          className={styles.textarea}
          placeholder="Текст повідомлення"
          value={message}
          onChange={e => setMessage(e.target.value)}
          required
        />
        <button type="button" className={styles.sendBtn} tabIndex={-1} aria-label="Надіслати" onClick={handleSend}>
          {/* mingcute_send-line.svg icon as inline SVG */}
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path fill="currentColor" d="M3.05 4.05a.75.75 0 0 1 .82-.17l16 7a.75.75 0 0 1 0 1.34l-16 7A.75.75 0 0 1 3 18.75v-5.5a.75.75 0 0 1 .75-.75h7.19a.25.25 0 0 0 .09-.48l-7.19-3.15A.75.75 0 0 1 3.05 4.05Z"/>
          </svg>
        </button>
      </div>
      <div className={styles.addImageRow}>
        <img src="/fotoload.svg" alt="Додати зображення" className={styles.addImageIcon} />
        <span className={styles.addImageLabel}>додати зображення</span>
      </div>
      <button className={styles.submit} type="submit">
        Залишити відгук
      </button>
    </form>
  );
};

export default ReviewForm; 