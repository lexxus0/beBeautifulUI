"use client";
import { IProduct } from "@/types/types";
import ProductImage from "@/components/elements/ProductImage";
import ProductRating from "@/components/ui/ProductRating/ProductRating";
import { useReviewData } from "@/helpers/hooks/useReviewData";

export const RecentlyViewedItem = ({ product }: { product: IProduct }) => {
  const { avgRating, count } = useReviewData(product._id);

  return (
    <div className="flex flex-col items-center">
      <ProductImage
        product={product}
        className="relative w-[130px] h-[130px] sm:w-[158px] sm:h-[158px] md:w-[208px] md:h-[272px] lg:w-[268px] lg:h-[306px] mb-2 object-cover"
      />

      <div className="flex flex-col items-center">
        <div className="h-18 mb-2 md:mb-7 flex flex-col gap-[2px] items-center">
          <p className="font-lato font-bold text-lg lg:font-semibold lg:text-2xl text-center text-black">
            {product.name?.ua}
          </p>
          <p className="font-roboto font-light text-sm lg:text-lg text-black">
            {product.category}
          </p>
        </div>

        <ProductRating value={avgRating} reviews={count} />

        <p className="font-lat text-lg lg:font-semibold lg:text-xl text-black mt-4">
          {product.priceByVolume[0].price} грн
        </p>
      </div>
    </div>
  );
};
