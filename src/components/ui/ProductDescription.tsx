import { Product } from "@/types/types";
import React from "react";

export interface ProductDescriptionProps {
  product: Product;
}

const ProductDescription = (product: ProductDescriptionProps) => {
  return <div>ProductDescription</div>;
};

export default ProductDescription;
