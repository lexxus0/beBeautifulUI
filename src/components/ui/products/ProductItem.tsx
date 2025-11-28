"use client";

import StarRating from "@/helpers/StarRating";
import { IProduct } from "@/types/types";
import { IUIReview } from "@/types/reviews";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addCartItem } from "@/store/cart/operations";
import { selectIsLoggedIn } from "@/store/auth/selectors";
import { toggleFavorite } from "@/store/favorites/slice";
import { addToGuestCart } from "@/store/cart/slice";
import { BaseModal } from "@/components/shared/Modal";
import Icon from "@/components/shared/Icon";

interface ProductItemProps {
  item: IProduct;
  productId?: string;
}

const ProductItem = ({ item }: ProductItemProps) => {
  const [selectedVolume, setSelectedVolume] = useState(item.priceByVolume[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const favorites = useAppSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((fav: IProduct) => fav._id === item._id);
  const [addedProductName, setAddedProductName] = useState<string | null>(null);

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

  const getAverageRating = (reviews?: IUIReview[]) => {
    if (!Array.isArray(reviews) || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return total / reviews.length;
  };

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!selectedVolume) return;

    setAddedProductName(item.name);

    if (!isLoggedIn) {
      // Гостьовий кошик: зберігаємо повний продукт
      dispatch(
        addToGuestCart({
          product: item,
          selectedVolume: selectedVolume.volume,
          quantity: 1,
        })
      );

      setIsModalOpen(true);
      setTimeout(() => setIsModalOpen(false), 1500);

      return;
    }

    try {
      await dispatch(
        addCartItem({
          productId: item._id,
          selectedVolume: selectedVolume.volume,
          quantity: 1,
        })
      ).unwrap();

      setIsModalOpen(true);
      setTimeout(() => setIsModalOpen(false), 1500);
    } catch (error) {
      console.error("Не вдалося додати в кошик:", error);
    }
  };

  return (
    <>
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
            <p className="font-lato font-semibold text-2xl mb-2 h-16 line-clamp-2 overflow-hidden">
              {item.name}
            </p>
            <p className="font-roboto text-xl capitalize mb-2">
              {item.category}
            </p>
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
      {isModalOpen && (
        <BaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="relative w-[150px] h-[150px] object-contain mb-4 mx-auto">
            <Image
              src="/gif/cart.gif"
              alt="Товар додано до кошика"
              fill
              className="object-contain"
              unoptimized
            />
          </div>

          {addedProductName && (
            <p className="font-open-sans text-lg text-gray-600 text-center">
              <span className="block font-bold text-black">
                {addedProductName}
              </span>{" "}
              <span className="block">додано до кошику.</span>
            </p>
          )}
        </BaseModal>
      )}
    </>
  );
};

export default ProductItem;
