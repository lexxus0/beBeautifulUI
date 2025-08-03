import React, { useState } from "react";
import styles from "./review-form.module.css";
import Icon from "@/components/shared/Icon";

const ReviewForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  // const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);
    formData.append("rating", rating.toString());
    // if (image) {
    //   formData.append("image", image);
    // }

    // Відправка на бекенд
    await fetch("/api/review", {
      method: "POST",
      body: formData,
    });
  };

  const handleSend = () => {
    if (message.trim()) {
      console.log(message);
      setMessage("");
    }
  };

  // const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setImage(file);
  //     // Якщо потрібно одразу завантажити на бекенд — тут можна викликати upload
  //   }
  // };

  if (submitted) {
    return <div className={styles.success}>Дякуємо за ваш відгук!</div>;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Ваш відгук про Шампунь Be Beautiful</h2>
      <div className={styles.starsRoWrapper}>
        <div className={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              className={styles.starBtn}
              aria-label={`Оцінка ${star}`}
              onClick={() => setRating(star)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={rating >= star ? "#C48E28" : "none"}
                stroke="#C48E28"
                strokeWidth="2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </button>
          ))}
        </div>
        <div className={styles.starsLabel}>Ваша оцінка</div>
      </div>
      <div className={styles.inputsRow}>
        <input
          className={styles.input}
          type="text"
          placeholder="Ім’я"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className={styles.helperRow}>
        <span>Ви можете залишити відгук або поставити питання</span>
        <img
          src="/question.svg"
          alt="Пояснення"
          className={styles.helperIcon}
        />
      </div>
      <div className={styles.textareaRow}>
        <textarea
          className={styles.textarea}
          placeholder="Текст повідомлення"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button
          type="button"
          className={styles.sendBtn}
          tabIndex={-1}
          aria-label="Надіслати"
          onClick={handleSend}
        >
          <Icon name="icon-send" width={14} height={14} />
        </button>
      </div>
      {/* <label className={styles.addImageRow} style={{ cursor: "pointer" }}>
        <img src="/fotoload.svg" alt="Додати зображення" className={styles.addImageIcon} />
        <span className={styles.addImageLabel}>додати зображення</span>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleAddImage}
        />
      </label> */}
      <button className={styles.submit} type="submit">
        Залишити відгук
      </button>
    </form>
  );
};

export default ReviewForm;
