"use client";

import { useState } from "react";
import Icon from "@/components/shared/Icon";

import clsx from "clsx";
import styles from "./RatingInput.module.css";

interface StarsRatingProps {
  rating: number;
  onChange: (value: number) => void;
}

const RatingInput = ({ rating, onChange }: StarsRatingProps) => {
  const [hover, setHover] = useState(0);

  return (
    <div className={styles.starsRow}>
      {[1, 2, 3, 4, 5].map((star) => {
        return (
          <button
            type="button"
            key={star}
            className={clsx(
              styles.starBtn,
              star <= (hover || rating) ? styles.on : styles.off
            )}
            aria-label={`Оцінка ${star}`}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(rating)}
          >
            <Icon
              name="icon-star"
              className={clsx(
                "w-5 h-5 md:w-[30px] md:h-[30px] lg:w-[46px] lg:h-[46px] text-[#C48E28]",
                rating >= star ? "fill-[#C48E28]" : "fill-transparent"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

export default RatingInput;
