import React from "react";
import ReviewSummary from "../ReviewSummary/ReviewSummary";
import { StarGradient } from "@/components/elements/StarGradient";
import { useViewport } from "@/helpers/hooks/useViewport";

export interface ResponsiveConfig {
  mobile: number;
  tablet: number;
  desktop: number;
}

export interface ProductRatingProps {
  productId: string;
  value: number;
  max?: number;
  reviews?: number;
  size?: number;
  sizeConfig?: ResponsiveConfig; 
  layoutConfig?: {
    gap?: number | ResponsiveConfig;
    marginRight?: number | ResponsiveConfig;
  };
}

// Допоміжна функція для адаптивних значень
const getResponsiveValue = (
  config: number | ResponsiveConfig | undefined,
  width: number | null,
  fallback: number
) => {
  if (!config) return fallback;
  if (typeof config === "number") return config;

  if (width !== null && width < 744) return config.mobile;
  if (width !== null && width < 1440) return config.tablet;
  return config.desktop;
};

const ProductRating: React.FC<ProductRatingProps> = ({ productId, value, max = 5, reviews = 0, size, sizeConfig, layoutConfig }) => {
  const { width } = useViewport();

  let starSize = 14;
// якщо задано size → він головний
if (size) {
  starSize = size;
} else if (sizeConfig) {
  starSize = getResponsiveValue(sizeConfig, width, 14);
} else {
  // default fallback
  if (width !== null && width < 744) {
    starSize = 10;
  }
  else  {
    starSize = 14
  }
}

const gap = getResponsiveValue(layoutConfig?.gap, width, 4);
const marginRight = getResponsiveValue(layoutConfig?.marginRight, width, 0);

  const fullStars = Math.floor(value);
  const remainder = value % 1;
  const hasHalfStar = remainder >= 0.25 && remainder < 0.75;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="star-assessment">
      <ReviewSummary 
        productId={productId} 
        showCount={true}
        size={starSize}
      />
      <div className="w-full flex items-center" style={{ gap: `${gap}px`, marginRight: `${marginRight}px` }}>
      <div className="flex items-center">
        {/* Повні зірки */}
        {[...Array(fullStars)].map((_, i) => (
          <div
            key={`filled-${i}`}
            className="relative flex-shrink-0"
            style={{ width: starSize, height: starSize }}
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
          <div className="relative flex-shrink-0" style={{ width: starSize, height: starSize }}>
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
            className="relative flex-shrink-0"
            style={{ width: starSize, height: starSize }}
          >
            <StarGradient
              type="empty"
              id={`empty-${i}`}
              className="absolute inset-0"
            />
          </div>
        ))}
      </div>

      <p className="font-roboto font-light text-xs lg:text-sm text-black-10 ">({reviews} відгуків)</p>
      </div>
    </div>
  );
};

export default ProductRating;
