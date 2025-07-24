import { Product } from "@/types/types";
import css from "@/components/ui/ProductHeader/ProductHeader.module.css";
export interface ProductHeaderProps {
  product: Product;
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
  console.log(product);
  return (
    <div>
      <div className={css.categoryContainer}>
        <h3 className={css.category}>{product.name}</h3>

        <div className="flex items-center justify-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              product.inStock ? "bg-[#8db078]" : "bg-[#AF1818]"
            }`}
          />
          <p className={css.inStock}>
            {product.inStock ? "У наявності" : "Немає в наявності"}
          </p>
        </div>
      </div>
      <p className={css.features}>{product.features.join(" | ")}</p>
      <p className={css.volumeOption}>
        {product.volumeOptions?.length
          ? product.volumeOptions.join(" / ")
          : product.stockQuantity + " ml"}
      </p>
    </div>
  );
};

export default ProductHeader;
