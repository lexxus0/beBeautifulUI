"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { fetchReviewSummary } from "@/store/reviews/operations";
import { selectReviewSummary } from "@/store/reviews/selectors";
import StarRating from "@/helpers/StarRating";
import styles from "./ReviewSummary.module.scss";
import { useHasMounted } from "@/helpers/hooks/useHasMounted";

interface ReviewSummaryProps {
  productId: string;
  showCount?: boolean;
  size?: number;
  className?: string;
}

const ReviewSummary: React.FC<ReviewSummaryProps> = ({ 
  productId, 
  showCount = true, 
  size = 16,
  className = ""
}) => {
  const dispatch = useAppDispatch();
  const reviewSummary = useAppSelector(selectReviewSummary(productId));
  const hasMounted = useHasMounted();

  useEffect(() => {
    if (!hasMounted) return;
    
    // Skip fetching review summary since the API endpoint doesn't exist yet
    // dispatch(fetchReviewSummary({ productId }));
  }, [dispatch, productId, hasMounted]);

  if (reviewSummary.count === 0) {
    return (
      <div className={`${styles.container} ${className}`}>
        {/* <span className={styles.noReviews}>Ще немає відгуків</span> */}
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${className}`}>
      <StarRating 
        rating={reviewSummary.avg} 
        size={size} 
        color="#FFD700" 
      />
      {showCount && (
        <span className={styles.count}>
          ({reviewSummary.count} відгук{reviewSummary.count === 1 ? '' : reviewSummary.count < 5 ? 'и' : 'ів'})
        </span>
      )}
    </div>
  );
};

export default ReviewSummary;
