"use client";

import StarRating from "@/helpers/StarRating";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchReviews, reactToReview } from "@/store/reviews/operations";
import { selectReviews } from "@/store/reviews/selectors";
import { IReview } from "@/types/types";
import { useEffect, useState } from "react";
import defaultImage from "../../../../public/images/def.jpg";
import Image from "next/image";
import { convertDayToString } from "@/helpers/covertDateToString";
import { BiLike, BiDislike } from "react-icons/bi";
import { selectIsLoggedIn } from "@/store/auth/selectors";

interface ReviewsProps {
  productId?: string;
  showTitle?: boolean;
  reviews?: IReview[];
}

export default function Reviews({ productId, showTitle = false, reviews: propReviews }: ReviewsProps) {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [expandedReviews, setExpandedReviews] = useState<{
    [key: string]: boolean;
  }>({});

  const storeReviews = useAppSelector(selectReviews);
  
  // Use prop reviews if provided, otherwise use store reviews
  const reviews = propReviews || storeReviews;

  useEffect(() => {
    // Only fetch from store if no reviews are provided as props
    if (!propReviews) {
      if (productId) {
        dispatch(fetchReviews({ 
          productId, 
          limit: 10, 
          currentPage: 1 
        }));
      } else {
        dispatch(fetchReviews({ limit: 10, currentPage: 1 }));
      }
    }
  }, [dispatch, productId, propReviews]);

  const CHARACTER_LIMIT = 50;

  const toggleExpand = (id: string) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="container mb-20">
      {showTitle && (
        <h2 className="font-lato font-semibold text-3xl text-[#2d2d2d] mb-8 text-left md:text-center md:text-[40px] md:font-normal">
          Краса, яку підтверджують наші клієнти
        </h2>
      )}
      <div className="flex flex-nowrap gap-16 flex-col lg:flex-row lg:flex-wrap">
        {reviews.map((review: IReview) => {
          const handleReaction = (type: "like" | "dislike") => {
            const isAlreadyReacted =
              (type === "like" && review.hasLiked) ||
              (type === "dislike" && review.hasDisliked);

            if (isAlreadyReacted) return;

            dispatch(reactToReview({ id: review._id, type }));
          };

          const isExpanded = expandedReviews[review._id];
          const isLong = (review.comment?.length || 0) > CHARACTER_LIMIT;
          const visibleComment =
            isExpanded || !isLong
              ? review.comment || ""
              : (review.comment || "").slice(0, CHARACTER_LIMIT) + "...";

          return (
            <div
              key={review._id}
              className="px-6 py-4 bg-gray-200 rounded-2xl w-full relative lg:w-[616px]"
            >
              <p className="absolute right-5">
                {convertDayToString(review.createdAt)}
              </p>
              <div className="flex items-center gap-4 mb-6 mt-5">
                <div className="size-[100px] rounded-3xl">
                  <Image
                    src={defaultImage}
                    alt="Reviewer profile picture"
                    width={100}
                    height={100}
                    className="rounded-3xl"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-lato font-light text-lg text-[#333]">
                    {review.name}
                  </h3>
                  <h3 className="font-lato font-light text-lg text-[#333]">
                    {review.location}
                  </h3>
                  <StarRating
                    rating={review.rating}
                    size={16}
                    color="#FFD700"
                  />
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="font-roboto italic uppercase font-light text-lg text-[#2d2d2d] self-start">
                  {visibleComment}
                </p>

                {isLong && (
                  <button
                    onClick={() => toggleExpand(review._id)}
                    className="text-sm ml-auto mt-3"
                  >
                    {isExpanded ? "Сховати" : "Дивитись більше"}
                  </button>
                )}

                <p className="ml-auto mt-2">Вам допоміг цей відгук?</p>

                <div className="flex gap-1.5 ml-auto">
                  <button
                    disabled={!isLoggedIn || review.hasLiked}
                    className={`transition ${
                      review.hasLiked ? "text-green-600 font-bold" : ""
                    }`}
                    onClick={() => handleReaction("like")}
                  >
                    <BiLike />
                  </button>
                  <p>{review.likes}</p>

                  <button
                    disabled={!isLoggedIn || review.hasDisliked}
                    className={`transition ${
                      review.hasDisliked ? "text-red-600 font-bold" : ""
                    }`}
                    onClick={() => handleReaction("dislike")}
                  >
                    <BiDislike />
                  </button>
                  <p>{review.dislikes}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
