import React from "react";
import css from "@/components/ui/ProductRating/ProductRating.module.css";
import ReviewSummary from "../ReviewSummary/ReviewSummary";

export interface ProductRatingProps {
  productId: string;
}

const ProductRating: React.FC<ProductRatingProps> = ({ productId }) => {
  return (
    <div className={css.starAssessment}>
      <ReviewSummary 
        productId={productId} 
        showCount={true}
        size={16}
      />
    </div>
  );
};

export default ProductRating;
