import { IProduct } from "@/types/types";
import React from "react";
import ProductItem from "./ProductItem";

interface IProductsListProps {
  products: IProduct[];
}

export default function ProductsList({ products }: IProductsListProps) {
  console.log(products);
  return (
    <div>
      <ul className="flex flex-col gap-5 mb-10 md:flex-row md:flex-wrap md:gap-3 xxl:gap-10">
        {products.map((item: IProduct) => (
          <ProductItem item={item} productId={item._id} key={item._id} />
        ))}
      </ul>
    </div>
  );
}
