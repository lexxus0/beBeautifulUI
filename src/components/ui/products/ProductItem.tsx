import StarRating from "@/helpers/StarRating";
import { IProduct, IReview } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { updateCart } from "@/store/products/operations";

interface ProductItemProps {
  item: IProduct;
  productId?: string;
}

export default function ProductItem({ item }: ProductItemProps) {
  const [selectedVolume, setSelectedVolume] = useState(item.priceByVolume[0]);
  const dispatch = useAppDispatch();

  const handleVolumeClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    volume: string
  ) => {
    e.preventDefault();
    const selected = item.priceByVolume.find((v) => v.volume === volume);
    if (selected) {
      setSelectedVolume(selected);
    }
  };

  const getAverageRating = (reviews?: IReview[]) => {
    if (!Array.isArray(reviews) || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return total / reviews.length;
  };

   const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await dispatch(
        updateCart({ productId: item._id, quantity: 1 })
      ).unwrap();
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  return (
    <Link href={`/products/${item._id}`}>
      <div className="px-4 md:w-[322px] lg:w-[400px]">
        <Image
          src={"https://picsum.photos/id/237/290/306"}
          alt={item.name}
          width={290}
          height={306}
          className="lg:w-[384px] object-cover"
        />

        <div className="my-6 text-center">
          <p className="font-lato font-semibold mb-4 text-2xl">{item.name}</p>
          <p className="font-roboto text-xl capitalize">{item.category}</p>
          <div className="flex items-center gap-3 justify-center">
            <StarRating rating={getAverageRating(item.reviews)} />
            <p>{item.reviews?.length ?? 0} відгуків</p>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="font-roboto text-xl">
              <span className="font-semibold">{selectedVolume?.price} ₴</span>
            </p>

            <div className="flex gap-2">
              {item.priceByVolume.map((option) => (
                <button
                  key={option._id}
                  onClick={(e) => handleVolumeClick(e, option.volume)}
                  className={`border px-3 py-1 rounded text-sm ${
                    selectedVolume.volume === option.volume
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-300"
                  }`}
                >
                  {option.volume}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="add-to-cart-btn-bg rounded-lg w-full h-14 text-center font-open-sans text-xl text-white"
        >
          Додати до кошика
        </button>
      </div>
    </Link>
  );
}
