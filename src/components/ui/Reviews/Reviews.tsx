"use client";

import StarRating from "@/helpers/StarRating";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchReviews } from "@/store/reviews/operations";
import { selectReviews } from "@/store/reviews/selectors";
import { IReview } from "@/types/types";
import { useEffect, useState } from "react";
import defaultImage from "/public/images/def.jpg";
import Image from "next/image";
import { convertDayToString } from "@/helpers/covertDateToString";
import { BiLike, BiDislike } from "react-icons/bi";

export default function Reviews() {
  const dispatch = useAppDispatch();
  const [expandedReviews, setExpandedReviews] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    dispatch(fetchReviews({ limit: 10, currentPage: 1 }));
  }, [dispatch]);

  const reviews = useAppSelector(selectReviews);

  const CHARACTER_LIMIT = 50;

  const toggleExpand = (id: string) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div>
      <h2 className="font-lato font-semibold text-3xl text-[#2d2d2d] mb-8 text-left">
        Краса, яку підтверджують наші клієнти
      </h2>
      <div className="flex flex-nowrap gap-16 flex-col">
        {reviews.map((review: IReview) => {
          const isExpanded = expandedReviews[review.createdAt];
          const isLong = review.comment.length > CHARACTER_LIMIT;
          const visibleComment =
            isExpanded || !isLong
              ? review.comment
              : review.comment.slice(0, CHARACTER_LIMIT) + "...";

          return (
            <div
              key={review.createdAt}
              className="px-6 py-4 bg-gray-200 rounded-2xl w-full relative"
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
                    onClick={() => toggleExpand(review.createdAt)}
                    className="text-sm ml-auto "
                  >
                    {isExpanded ? "Сховати" : "Дивитись більше"}
                  </button>
                )}

                <p className="ml-auto mt-2">Вам допоміг цей відгук?</p>

                <div className="flex gap-1.5 ml-auto">
                  <button>
                    <BiLike />
                  </button>
                  <p>1</p>
                  <button>
                    <BiDislike />
                  </button>
                  <p>0</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
