"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProductReviews } from "@/store/reviews/operations";
import { selectProductReviews, selectReviewsLoading } from "@/store/reviews/selectors";
import { selectIsLoggedIn } from "@/store/auth/selectors";
import Reviews from "../Reviews/Reviews";
import ReviewForm from "../ReviewForm/ReviewForm";
import Loader from "../Loader/Loader";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import styles from "./ProductReviews.module.scss";
import { useHasMounted } from "@/helpers/hooks/useHasMounted";

interface ProductReviewsProps {
  productId: string;
  productName: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId, productName }) => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const reviews = useAppSelector(selectProductReviews(productId));
  const isLoading = useAppSelector(selectReviewsLoading);
  const hasMounted = useHasMounted();
  
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    if (!hasMounted) return;
    
    // Fetch product-specific reviews
    dispatch(fetchProductReviews({ 
      productId,
      limit: 10
    })).catch((error) => {
      console.warn("Failed to fetch product reviews:", error);
      // Don't show error to user if it's just a server issue
      // The component will show "no reviews" message instead
      setApiError(null);
    });
    
    // Skip review summary for now since the endpoint doesn't exist
    // dispatch(fetchReviewSummary({ productId }));
  }, [dispatch, productId, hasMounted]);

  const handleReviewSuccess = () => {
    setShowReviewForm(false);
    // Refresh product-specific reviews after successful submission
    dispatch(fetchProductReviews({ 
      productId,
      limit: 10
    })).catch((error) => {
      console.warn("Failed to refresh product reviews:", error);
      // Don't show error to user, the review was still created successfully
    });
    // dispatch(fetchReviewSummary({ productId }));
  };

  const handleShowReviewForm = () => {
    if (!isLoggedIn) {
      // Redirect to login or show login modal
      alert("Будь ласка, увійдіть в систему, щоб залишити відгук");
      return;
    }
    setShowReviewForm(true);
  };

  const handleChatWithConsultant = () => {
    // Implement chat functionality
    console.log("Opening chat with consultant");
  };

  return (
    <ErrorBoundary>
      <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Відгуки про {productName}
        </h2>
        
        <div className={styles.actions}>
          <button 
            className={styles.chatButton}
            onClick={handleChatWithConsultant}
          >
            Чат з консультантом
          </button>
          <button 
            className={styles.reviewButton}
            onClick={handleShowReviewForm}
          >
            Залишити відгук
          </button>
        </div>
      </div>

      {showReviewForm && (
        <div className={styles.reviewFormContainer}>
          <ReviewForm 
            productId={productId}
            productName={productName}
            onSuccess={handleReviewSuccess}
          />
        </div>
      )}

      {!showReviewForm && (
        <div className={styles.reviewsContainer}>
          {isLoading ? (
            <div className={styles.loading}>
              <Loader />
              Завантаження відгуків...
            </div>
          ) : apiError ? (
            <div className={styles.error}>
              {apiError}
            </div>
          ) : reviews.length === 0 ? (
            <div className={styles.noReviews}>
              <p className={styles.noReviewsText}>
                Ще немає відгуків... поки що!
              </p>
              <p className={styles.encouragementText}>
                Будьте першими, хто поділиться своїм враженням. 
                Ваша думка важлива для нас і для інших покупців
              </p>
            </div>
          ) : (
            <Reviews reviews={reviews} />
          )}
        </div>
      )}
      </div>
    </ErrorBoundary>
  );
};

export default ProductReviews;
