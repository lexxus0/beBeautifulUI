"use client";

import React, { useState } from 'react';
import Image from 'next/image';
// import { useReviews } from '@/hooks/useReviews';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectIsLoggedIn } from '@/store/auth/selectors';
// import StarRating from '@/helpers/StarRating';
import styles from '../ui/ReviewForm/review-form.module.css';
import { createReview } from '@/store/reviews/operations';

interface ReviewFormProps {
  productId: string;
  mode?: 'create' | 'edit';
  initialValue?: { rating: number; comment: string };
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function ReviewForm({ 
  productId, 
  mode = 'create', 
  initialValue,
  onSuccess,
  onCancel 
}: ReviewFormProps) {
  const dispatch = useAppDispatch();
  // const { addReview } = useReviews(productId);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  // const currentUserId = useAppSelector(s => s.auth.user?._id);
  
  const [rating, setRating] = useState(initialValue?.rating || 0);
  const [comment, setComment] = useState(initialValue?.comment || '');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      setError("Будь ласка, увійдіть в систему, щоб залишити відгук");
      return;
    }
    
    if (rating === 0) {
      setError("Будь ласка, оберіть рейтинг");
      return;
    }
    
    if (!comment.trim()) {
      setError("Будь ласка, напишіть відгук");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      await dispatch(
        createReview({ productId, rating, comment: comment.trim() })
      ).unwrap();
      
      onSuccess?.();
    } catch (error: unknown) {
      console.error('Failed to submit review:', error);
      setError((error as Error)?.message || "Помилка при відправці відгуку");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>
        {mode === 'create' ? 'Ваш відгук про продукт' : 'Редагувати відгук'}
      </h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

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

      <div className={styles.helperRow}>
        <span>Ви можете залишити відгук або поставити питання</span>
        <Image
          src="/question.svg"
          alt="Пояснення"
          width={16}
          height={16}
          className={styles.helperIcon}
        />
      </div>

      <div className={styles.textareaRow}>
        <textarea
          className={styles.textarea}
          placeholder="Текст повідомлення"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          maxLength={1000}
        />
      </div>

      <div className="flex gap-4">
        <button 
          className={styles.submit} 
          type="submit"
          disabled={isSubmitting || rating === 0 || !comment.trim()}
        >
          {isSubmitting ? "Відправляємо..." : (mode === 'create' ? "Залишити відгук" : "Оновити відгук")}
        </button>
        
        {onCancel && (
          <button 
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Скасувати
          </button>
        )}
      </div>
    </form>
  );
}
