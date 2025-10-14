import React from "react";
// import Icon from "../../elements/Icons";
// import { Product } from "@/types/types";

import css from "./ProductRatingInput.module.css";
import RatingInput from "@/components/ui/RatingInput";

// export interface ProductRatingProps {
//   product: Product;
// }

const ProductRatingInput = () => {
  return (
    <div className={css.starAssessment}>
      <RatingInput />
      <p className={css.fidbackQuantity}>(0 відгуків)</p>
    </div>
  );
};

export default ProductRatingInput;
