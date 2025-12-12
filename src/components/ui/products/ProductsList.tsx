import ProductItem from "./ProductItem";
import { IProduct } from "@/types/types";

interface IProductsListProps {
  products: IProduct[];
}

export default function ProductsList({ products }: IProductsListProps) {
  return (
    <ul className="flex flex-wrap justify-start gap-5 [&>a]:w-[calc(50%-10px)] md:gap-6 md:[&>a]:w-[calc(50%-12px)] lg:gap-6 lg:[&>a]:w-[calc(33.333%-16px)]">
      {products.map((item) => (
        <ProductItem key={item._id} item={item} />
      ))}
    </ul>
  );
}
