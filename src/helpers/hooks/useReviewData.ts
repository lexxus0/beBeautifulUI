import { useMemo } from "react";
import { useAppSelector } from "@/store/hooks";
import { makeSelectAnyReviews } from "@/store/reviews/selectors";
import { IUIReview } from "@/types/reviews";

export const useReviewData = (productId: string) => {
  const selectAny = useMemo(makeSelectAnyReviews, []);
  const reviews = useAppSelector((state) => selectAny(state, productId));

  const avgRating = useMemo(() => {
    if (!reviews.length) return 0;
    return (
      reviews.reduce((s: number, r: IUIReview) => s + r.rating, 0) /
      reviews.length
    );
  }, [reviews]);

  return {
    reviews,
    avgRating,
    count: reviews.length,
  };
};
