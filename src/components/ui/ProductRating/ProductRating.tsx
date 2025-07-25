import React from "react";
import Icon from "../../elements/Icons";
// import { Product } from "@/types/types";

import css from "@/components/ui/ProductRating/ProductRating.module.css";

// export interface ProductRatingProps {
//   product: Product;
// }

const ProductRating = () => {
  const starArray = Array(5).fill(null, 0);

  return (
    <div className={css.starAssessment}>
      {starArray.map((_, index) => {
        return (
          <Icon
            key={index}
            name="icon-star"
            width={24}
            height={24}
            useGradient
          />
        );
      })}
      <p className={css.fidbackQuantity}>(0 відгуків)</p>
    </div>
  );
};

export default ProductRating;
