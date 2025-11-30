"use client";

import React, { useState, useEffect, memo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProductReviews } from "@/store/reviews/operations";
import {
  makeSelectProductReviews,
  selectReviewsLoading,
} from "@/store/reviews/selectors";
import { selectIsLoggedIn } from "@/store/auth/selectors";
import Reviews from "../Reviews/Reviews";
import ReviewForm from "../ReviewForm/ReviewForm";
import Loader from "../Loader/Loader";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { useHasMounted } from "@/helpers/hooks/useHasMounted";
import styles from "./ProductReviews.module.scss";
import toast from "react-hot-toast";
import { IUIReview } from "@/types/reviews";

interface ProductReviewsProps {
  productId: string;
  productName: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({
  productId,
  productName,
}) => {
  const dispatch = useAppDispatch();
  const hasMounted = useHasMounted();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const selectReviewsForProduct = React.useMemo(makeSelectProductReviews, []);

  const reviews = useAppSelector((state) =>
    selectReviewsForProduct(state, productId)
  );
  const currentUserId = useAppSelector((s) => s.auth.user?._id);

  const isLoading = useAppSelector(selectReviewsLoading);

  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    if (!hasMounted) return;

    dispatch(
      fetchProductReviews({
        productId,
      })
    );
  }, [dispatch, productId, hasMounted]);

  const handleReviewSuccess = () => {
    setShowReviewForm(false);
    dispatch(
      fetchProductReviews({
        productId,
      })
    );
  };

  const hasMyReview = reviews.some(
    (r: IUIReview) => r.userId === currentUserId
  );

  const handleShowReviewForm = () => {
    if (!isLoggedIn) {
      toast.error("Будь ласка, увійдіть в систему, щоб залишити відгук", {
        duration: 2000,
      });
      return;
    }

    if (hasMyReview) {
      toast.error("Ви вже залишили відгук до цього продукту");
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
            Відгуки про <br className="md:hidden" /> {productName}
          </h2>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.chatButton}
              onClick={handleChatWithConsultant}
            >
              Чат з консультантом
            </button>
            <button
              type="button"
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
            ) : reviews.length === 0 ? (
              <div className={styles.noReviews}>
                <p className={styles.noReviewsText}>
                  Ще немає відгуків... поки що!
                </p>
                <p className={styles.encouragementText}>
                  Будьте першими, хто поділиться своїм враженням. Ваша думка
                  важлива для нас і для інших покупців
                </p>
              </div>
            ) : (
              <Reviews reviews={reviews} />
            )}
          </div>
        )}
        <div className="w-screen h-px bg-[#e0e0e0] absolute left-1/2 -translate-x-1/2 bottom-0 lg:-bottom-0"></div>
      </div>
    </ErrorBoundary>
  );
};

export default memo(ProductReviews);
