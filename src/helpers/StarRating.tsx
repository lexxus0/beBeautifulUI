import React from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
  size?: number;
  color?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = 20,
  color = "#FFD700",
}) => {
  const clampedRating = Math.max(1, Math.min(rating, 5));
  const fullStars = Math.floor(clampedRating);
  const hasHalfStar = clampedRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const stars = [
    ...Array(fullStars).fill(<FaStar size={size} color={color} />),
    ...(hasHalfStar
      ? [<FaStarHalfAlt key="half-star" size={size} color={color} />]
      : []),
    ...Array(emptyStars).fill(<FaRegStar size={size} color={color} />),
  ];

  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {stars.map((star, i) => (
        <span key={i}>{star}</span>
      ))}
    </div>
  );
};

export default StarRating;
