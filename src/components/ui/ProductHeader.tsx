import { Product } from "@/types/types";

export interface ProductHeaderProps {
  product: Product;
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
  return (
    <section>
      <h1>{product.name}</h1>
      <p>{product.category}</p>
      <div>
        <span>{product.inStock ? "У наявності" : "Немає в наявності"}</span>
      </div>
    </section>
  );
};

export default ProductHeader;
