"use client";

import StarRating from "@/helpers/StarRating";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchReviews } from "@/store/reviews/operations";
import { selectReviews } from "@/store/reviews/selectors";
import { IReview } from "@/types/types";
import { useEffect } from "react";

export default function Reviews() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchReviews({ limit: 10, currentPage: 1 }));
  }, [dispatch]);

  const reviews = useAppSelector(selectReviews);

  return (
    <div>
      <h2 className="font-lato font-semibold text-3xl text-[#2d2d2d] mb-8 text-left">
        Краса, яку підтверджують наші клієнти
      </h2>
      <div className="flex flex-nowrap gap-16 flex-col">
        {reviews.map((review: IReview) => (
          <div
            key={review.createdAt}
            className="px-6 py-4  bg-gray-200 rounded-lg w-full"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="size-[100px] rounded-3xl bg-[#2d2d2d]"></div>
              <div className="flex flex-col gap-2">
                <h3 className="font-lato font-light text-lg text-[#333]">
                  {review.name}
                </h3>
                <h3 className="font-lato font-light text-lg text-[#333]">
                  {review.location}
                </h3>
                <StarRating rating={review.rating} size={16} color="#FFD700" />
              </div>
            </div>
            <p className="font-roboto italic uppercase font-light text-lg text-[#2d2d2d]">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
