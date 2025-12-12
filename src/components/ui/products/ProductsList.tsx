import ProductItem from "./ProductItem";
import { IProduct } from "@/types/types";

interface IProductsListProps {
  products: IProduct[];
}

export default function ProductsList({ products }: IProductsListProps) {
  return (
    <ul className="flex flex-col gap-5 mb-10 md:flex-row md:flex-wrap lg:gap-10">
      {products.map((item) => (
        <ProductItem key={item._id} item={item} />
      ))}
    </ul>
  );
}
