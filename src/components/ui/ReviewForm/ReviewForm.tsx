import React, { useState } from "react";
import styles from "./ReviewForm.module.scss";
import Icon from "@/components/shared/Icon";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createReview } from "@/store/reviews/operations";
import { selectReviewsLoading } from "@/store/reviews/selectors";
import { selectIsLoggedIn } from "@/store/auth/selectors";

interface ReviewFormProps {
  productId: string;
  productName?: string;
  onSuccess?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ 
  productId, 
  productName = "продукт",
  onSuccess 
}) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectReviewsLoading);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [error, setError] = useState<string | null>(null);
  // const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isLoggedIn) {
      setError("Будь ласка, увійдіть в систему, щоб залишити відгук");
      return;
    }

    if (rating === 0) {
      setError("Будь ласка, поставте оцінку");
      return;
    }

    if (!message.trim()) {
      setError("Будь ласка, напишіть відгук");
      return;
    }

    try {
      await dispatch(createReview({
        productId,
        rating,
        comment: message.trim()
      })).unwrap();

      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
      setRating(0);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: unknown) {
      console.error("Review creation error:", err);
      
      // Provide more specific error messages
      let errorMessage = "Помилка при створенні відгуку";
      
      const error = err as Error;
      if (error.message?.includes("User must be logged in") || error.message?.includes("must be logged in")) {
        errorMessage = "Будь ласка, увійдіть в систему, щоб залишити відгук";
      } else if (error.message?.includes("Session expired") || error.message?.includes("401") || error.message?.includes("Unauthorized")) {
        errorMessage = "Сесія закінчилася. Будь ласка, увійдіть в систему знову";
        // Optionally redirect to login page or show login modal
        setTimeout(() => {
          window.location.href = '/auth';
        }, 2000);
      } else if (error.message?.includes("400") || error.message?.includes("Bad Request")) {
        errorMessage = "Невірні дані. Перевірте правильність заповнення";
      } else if (error.message?.includes("500") || error.message?.includes("Internal Server Error")) {
        errorMessage = "Помилка сервера. Спробуйте пізніше";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    }
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
      <h2 className={styles.title}>Ваш відгук про {productName}</h2>
      
      {error && <div className={styles.error}>{error}</div>}
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
      {!isLoggedIn && (
        <div className={styles.inputsRow}>
          <input
            className={styles.input}
            type="text"
            placeholder="Ім'я"
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
      )}
      <div className={styles.helperRow}>
        <span>Ви можете залишити відгук або поставити питання</span>
        <div className={styles.helperIcon}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#4CAF50"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 17h.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
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
      <button 
        className={styles.submit} 
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className={styles.loading}>
            <Icon name="icon-loader" width={16} height={16} />
            Відправка...
          </span>
        ) : (
          "Залишити відгук"
        )}
      </button>
    </form>
  );
};

export default ReviewForm;
