import React from "react";
// import css from "@/components/ui/ProductRating/ProductRating.module.css";
import ReviewSummary from "../ReviewSummary/ReviewSummary";
import { StarGradient } from "@/components/elements/StarGradient";

export interface ProductRatingProps {
  productId: string;
  value: number;
  max?: number;
  reviews?: number;
}

const ProductRating: React.FC<ProductRatingProps> = ({ productId, value, max = 5, reviews = 0 }) => {
  const fullStars = Math.floor(value);
  const remainder = value % 1;
  const hasHalfStar = remainder >= 0.25 && remainder < 0.75;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);
  return (
    <div className="star-assessment">
      <ReviewSummary 
        productId={productId} 
        showCount={true}
        size={16}
      />
      <div className="px-1 md:px-4 w-full flex items-center justify-between">
      <div className="flex items-center gap-1">
        {/* Повні зірки */}
        {[...Array(fullStars)].map((_, i) => (
          <div
            key={`filled-${i}`}
            className="relative w-[10px] h-[10px] md:w-[14px] md:h-[14px] flex-shrink-0"
          >
            <StarGradient
              type="filled"
              id={`filled-${i}`}
              className="absolute inset-0"
            />
          </div>
        ))}

        {/* Напівзірка */}
        {hasHalfStar && (
          <div className="relative w-[10px] h-[10px] md:w-[14px] md:h-[14px] flex-shrink-0">
            <StarGradient
              type="empty"
              id="empty"
              className="absolute inset-0"
            />
            <div className="absolute inset-0 overflow-hidden">
              <StarGradient
                type="half"
                id="half"
                className="absolute inset-0"
              />
            </div>
          </div>
        )}

        {/* Порожні зірки */}
        {[...Array(emptyStars)].map((_, i) => (
          <div
            key={`empty-${i}`}
            className="relative w-[10px] h-[10px] md:w-[14px] md:h-[14px] flex-shrink-0"
          >
            <StarGradient
              type="empty"
              id={`empty-${i}`}
              className="absolute inset-0"
            />
          </div>
        ))}
      </div>

      <p className="font-roboto  font-light text-xs lg:text-sm text-black-10 ">({reviews} відгуків)</p>
      </div>
    </div>
  );
};

export default ProductRating;
