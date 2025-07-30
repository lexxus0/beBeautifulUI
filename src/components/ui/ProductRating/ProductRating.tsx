import React from "react";
// import Icon from "../../elements/Icons";
// import { Product } from "@/types/types";

import css from "@/components/ui/ProductRating/ProductRating.module.css";
import Rate from "@/components/ui/Rate";

// export interface ProductRatingProps {
//   product: Product;
// }

const ProductRating = () => {
  return (
    <div className={css.starAssessment}>
      <Rate />
      <p className={css.fidbackQuantity}>(0 відгуків)</p>
    </div>
  );
};

export default ProductRating;
