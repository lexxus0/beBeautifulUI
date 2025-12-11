"use client";

import { memo, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { convertDayToString } from "@/helpers/covertDateToString";
import { BiLike, BiDislike } from "react-icons/bi";
import defaultImage from "../../../../public/images/def.jpg";
import StarRating from "@/helpers/StarRating";

import styles from "./Reviews.module.scss";
import Icon from "@/components/shared/Icon";
import { IUIReview, ILocalReaction } from "@/types/reviews";
import { selectIsLoggedIn } from "@/store/auth/selectors";
import toast from "react-hot-toast";
import {
  reactToProductReview,
  reactToWebReview,
} from "@/store/reviews/operations";

interface ReviewsProps {
  showTitle?: boolean;
  reviews?: IUIReview[];
}

function Reviews({ showTitle = false, reviews }: ReviewsProps) {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const currentUserId = useAppSelector((s) => s.auth.user?._id);

  const [expandedReviews, setExpandedReviews] = useState<
    Record<string, boolean>
  >({});
  const [localReactions, setLocalReactions] = useState<
    Record<string, ILocalReaction>
  >({});

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const CHARACTER_LIMIT = 50;

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const getUserReaction = (review: IUIReview) => {
    return {
      liked: review.likedBy?.includes(currentUserId ?? "") ?? false,
      disliked: review.dislikedBy?.includes(currentUserId ?? "") ?? false,
    };
  };

  const toggleExpand = (id: string) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const applyOptimisticReaction = (
    review: IUIReview,
    type: "like" | "dislike"
  ) => {
    const userId = currentUserId ?? "";

    setLocalReactions((prev) => {
      const base = prev[review._id] ?? {
        likes: review.likes,
        dislikes: review.dislikes,
        likedBy: [...(review.likedBy ?? [])],
        dislikedBy: [...(review.dislikedBy ?? [])],
      };

      const updated: ILocalReaction = { ...base };

      if (type === "like") {
        if (!updated.likedBy?.includes(userId)) {
          updated.likedBy = [...(updated.likedBy ?? []), userId];
          updated.likes!++;
        }

        if (updated.dislikedBy?.includes(userId)) {
          updated.dislikedBy = updated.dislikedBy.filter((id) => id !== userId);
          updated.dislikes!--;
        }
      }

      if (type === "dislike") {
        if (!updated.dislikedBy?.includes(userId)) {
          updated.dislikedBy = [...(updated.dislikedBy ?? []), userId];
          updated.dislikes!++;
        }

        if (updated.likedBy?.includes(userId)) {
          updated.likedBy = updated.likedBy.filter((id) => id !== userId);
          updated.likes!--;
        }
      }

      return {
        ...prev,
        [review._id]: updated,
      };
    });
  };

  const rollbackOptimistic = (id: string) => {
    setLocalReactions((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const handleReaction = (merged: IUIReview, type: "like" | "dislike") => {
    if (!isLoggedIn) {
      toast.error("Увійдіть, щоб поставити оцінку");
      return;
    }

    if (merged.isMine || merged.userId === currentUserId) {
      toast.error("Ви не можете реагувати на власний відгук");
      return;
    }

    applyOptimisticReaction(merged, type);

    const thunk = merged.productId ? reactToProductReview : reactToWebReview;

    dispatch(thunk({ id: merged._id, type }))
      .unwrap()
      .catch(() => rollbackOptimistic(merged._id));
  };

  return (
    <div className="flex flex-col items-center">
      {showTitle && (
        <h2 className="w-[270px] font-lato text-2xl mb-1 md:w-[660px] md:text-[42px] md:mb-8 lg:w-full lg:mb-10 text-center">
          Краса, яку підтверджують наші клієнти
        </h2>
      )}

      {/* NAV BUTTONS */}
      <div className="flex md:gap-20 lg:gap-14 mb-6 md:mb-10 lg:mb-12">
        <button
          type="button"
          ref={prevRef}
          disabled={isBeginning}
          className={styles.navBtn}
        >
          <Icon
            name="icon-right-maxlong-arrow"
            className="w-[168px] md:w-[180px] h-10 rotate-180"
          />
        </button>

        <button ref={nextRef} disabled={isEnd} className={styles.navBtn}>
          <Icon
            name="icon-right-maxlong-arrow"
            className="w-[168px] md:w-[180px] h-10"
          />
        </button>
      </div>

      {/* SLIDER */}
      <div className="w-full mx-auto">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            const nav = swiper.params.navigation as {
              prevEl: HTMLElement | null;
              nextEl: HTMLElement | null;
            };
            nav.prevEl = prevRef.current;
            nav.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();

            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 20 },
            744: { slidesPerView: 1, spaceBetween: 30 },
            1440: { slidesPerView: 2, spaceBetween: 40 },
          }}
        >
          {reviews?.map((review: IUIReview) => {
            const reaction = localReactions[review._id] || {};
            const merged: IUIReview = { ...review, ...reaction };
            const { liked, disliked } = getUserReaction(merged);
            const isLong = (merged.comment?.length ?? 0) > CHARACTER_LIMIT;
            const visibleComment =
              expandedReviews[review._id] || !isLong
                ? merged.comment
                : merged.comment?.slice(0, CHARACTER_LIMIT) + "...";

            return (
              <SwiperSlide key={review._id} className="!flex !justify-center">
                <div
                  className="w-full max-w-[275px] h-[400px] sm:max-w-[295px] md:max-w-[664px] md:h-[434px] lg:max-w-[616px] pt-[66px] px-4 pb-6 bg-gray rounded-4xl relative
              "
                >
                  <p className="absolute right-4 top-6 font-lato text-lg lg:font-bold">
                    {convertDayToString(merged.createdAt)}
                  </p>
                  <div className="flex items-center gap-4 mb-6 mt-5">
                    <Image
                      src={defaultImage}
                      alt="Reviewer avatar"
                      width={100}
                      height={100}
                      className="rounded-3xl"
                    />
                    <div className="flex flex-col gap-[10px] font-light text-lg text-black-10">
                      <p>{merged.name}</p>
                      <p>{merged.location}</p>
                      <StarRating
                        rating={merged.rating}
                        size={12}
                        color="#FFD700"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="font-roboto italic uppercase font-light text-lg md:text-xl lg:text-2xl text-black-10 self-start mb-3">
                      {visibleComment}
                    </p>

                    {isLong && (
                      <button
                        onClick={() => toggleExpand(review._id)}
                        className="font-lato text-lg lg:text-2xl ml-auto mt-3"
                      >
                        {expandedReviews[review._id]
                          ? "Сховати"
                          : "Дивитись більше"}
                      </button>
                    )}

                    <div className="absolute bottom-6 right-4 flex flex-col gap-2">
                      <p className="font-lato text-lg">
                        Вам допоміг цей відгук?
                      </p>

                      <div className="flex gap-3 ml-auto">
                        <button
                          disabled={liked}
                          className={`transition ${
                            liked ? "text-green-600 font-bold" : ""
                          }`}
                          onClick={() => handleReaction(merged, "like")}
                        >
                          <BiLike />
                        </button>
                        <p>{merged.likes}</p>

                        <button
                          disabled={disliked}
                          className={`transition ${
                            disliked ? "text-red-600 font-bold" : ""
                          }`}
                          onClick={() => handleReaction(merged, "dislike")}
                        >
                          <BiDislike />
                        </button>
                        <p>{merged.dislikes}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default memo(Reviews);
