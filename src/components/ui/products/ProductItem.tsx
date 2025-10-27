import StarRating from "@/helpers/StarRating";
import { IProduct, IReview } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateCart } from "@/store/cart/operations";
import Icon from "@/components/shared/Icon";
import { toggleFavorite } from "@/store/favorites/slice";

interface ProductItemProps {
  item: IProduct;
  productId?: string;
}

const ProductItem = ({ item }: ProductItemProps) => {
  const [selectedVolume, setSelectedVolume] = useState(item.priceByVolume[0]);
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((fav: IProduct) => fav._id === item._id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(toggleFavorite(item));
  };

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
      await dispatch(updateCart({ productId: item._id, quantity: 1 })).unwrap();
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  return (
    <Link href={`/products/${item._id}`}>
      <div className="relative flex flex-col items-center p-4 md:w-[322px] lg:w-[400px]">
        <button
          onClick={handleFavoriteClick}
          className="absolute top-6 right-4 z-10"
        >
          {isFavorite ? (
            <Icon name="icon-hard" className="w-7 h-6" />
          ) : (
            <Icon name="icon-empty-heart" className="w-7 h-6" />
          )}
        </button>

        <Image
          src={"https://picsum.photos/id/237/290/306"}
          alt={item.name}
          width={230}
          height={260}
          className="lg:w-[384px] object-cover"
        />

        <div className="my-6 text-center flex flex-col items-center w-full">
          <p className="font-lato font-semibold text-2xl mb-2 h-16 line-clamp-2 overflow-hidden">{item.name}</p>
          <p className="font-roboto text-xl capitalize mb-2">{item.category}</p>
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
};

export default ProductItem;
