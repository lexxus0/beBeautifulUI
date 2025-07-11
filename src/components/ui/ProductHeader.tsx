import { Product } from "@/types/types";

export interface ProductHeaderProps {
  product: Product;
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
  return (
    <div>
      <div className="flex items-center justify-between w-full mb-8">
        <h3 className="font-semibold text-[22px] text-gray ">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </h3>
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-[#8db078] rounded-full " />
          <p className="font-light text-xs text-gray tracking-[0.24px] leading-[18px]">
            {product.inStock ? "У наявності" : "Немає в наявності"}
          </p>
        </div>
      </div>
      <p className="w-full font-text-14-ling-roboto text-gray font-light text-[14px] tracking-[0.28px] leading-[150%] mt-10">
        {product.features.join(" | ")}
      </p>
      <p className="font-text-16-ling-roboto text-gray font-light text-[16px] tracking-[0.32px] leading-[150%]">
        {product.volumeOptions?.length
          ? product.volumeOptions.join(" / ")
          : product.stockQuantity + " ml"}
      </p>
    </div>
  );
};

export default ProductHeader;
