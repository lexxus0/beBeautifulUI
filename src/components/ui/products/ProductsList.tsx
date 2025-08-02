import { IProduct } from "@/types/types";
import React from "react";
import ProductItem from "./ProductItem";
import Filter from "./Filter";

interface IProductsListProps {
  products: IProduct[];
}

export default function ProductsList({ products }: IProductsListProps) {
  return (
    <div>
      {products.length === 0 ? (
        <div>loading</div>
      ) : (
        <div>
          <Filter />
          {products.length === 0 && <div>loading</div>}
          <ul className='flex flex-col gap-5 mb-10 md:flex-row md:flex-wrap lg:gap-10'>
            {products.map((item: IProduct) => (
              <ProductItem item={item} productId={item._id} key={item._id} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
