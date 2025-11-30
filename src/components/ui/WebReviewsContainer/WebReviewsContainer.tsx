"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchWebReviews } from "@/store/reviews/operations";
import { selectWebReviews } from "@/store/reviews/selectors";
import Reviews from "../Reviews/Reviews";

export default function WebReviewsContainer() {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(selectWebReviews);

  useEffect(() => {
    dispatch(fetchWebReviews());
  }, [dispatch]);

  return (
    <div className="container pt-6 pb-20 md:pt-10">
      <Reviews reviews={reviews} showTitle />
    </div>
  );
}
