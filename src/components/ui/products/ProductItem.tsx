"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addCartItem } from "@/store/cart/operations";
import { addToGuestCart } from "@/store/cart/slice";
import { toggleFavorite } from "@/store/favorites/slice";
import { selectIsLoggedIn } from "@/store/auth/selectors";
import { BaseModal } from "@/components/shared/Modal";
import Icon from "@/components/shared/Icon";
import StarRating from "@/helpers/StarRating";
import { IProduct } from "@/types/types";
import { IUIReview } from "@/types/reviews";
import { useResponsiveImage } from "@/helpers/hooks/useResponsiveImage";

interface ProductItemProps {
  item: IProduct;
}

export default function ProductItem({ item }: ProductItemProps) {
  const [selectedVolume, setSelectedVolume] = useState(item.priceByVolume[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addedProductName, setAddedProductName] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const favorites = useAppSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((fav: IProduct) => fav._id === item._id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(toggleFavorite(item));
  };

  const handleVolumeClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    volumeId: string
  ) => {
    e.preventDefault();
    const selected = item.priceByVolume.find((v) => v._id === volumeId);
    if (selected) setSelectedVolume(selected);
  };

  const getAverageRating = (reviews?: IUIReview[]) => {
    if (!Array.isArray(reviews) || reviews.length === 0) return 0;
    return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  };

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!selectedVolume) return;

    setAddedProductName(item.name.ua);

    if (!isLoggedIn) {
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

  const { size, srcPlaceholder } = useResponsiveImage(
    { w: 124, h: 112 },
    { w: 94, h: 94 },
    { w: 196, h: 156 }
  );

  const canRenderImage = !!item.imageUrl && !imgError;

  return (
    <>
      <Link href={`/products/${item._id}`}>
        <div className="relative flex flex-col items-center p-4 md:w-[322px] lg:w-[400px]">
          <button
            onClick={handleFavoriteClick}
            className="absolute top-6 right-4"
          >
            {isFavorite ? (
              <Icon name="icon-hard" className="w-7 h-6" />
            ) : (
              <Icon name="icon-empty-heart" className="w-7 h-6" />
            )}
          </button>

          {canRenderImage ? (
            <Image
              src={item.imageUrl}
              alt={item.name.ua}
              width={size.w}
              height={size.h}
              className="lg:w-[384px] object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <Image
              src={srcPlaceholder}
              alt={item.name.ua}
              width={size.w}
              height={size.h}
              className="lg:w-[384px] object-cover"
            />
          )}

          <div className="my-6 text-center flex flex-col items-center w-full">
            <p className="font-lato font-semibold text-2xl mb-2 h-16 line-clamp-2 overflow-hidden">
              {item.name.ua}
            </p>
            <p className="font-roboto text-xl capitalize mb-2">
              {item.category}
            </p>
            <div className="flex items-center gap-3 justify-center">
              <StarRating rating={getAverageRating(item.reviews)} />
              <p>{item.reviews?.length ?? 0} відгуків</p>
            </div>

            <div className="flex justify-between items-center mt-4 w-full">
              <p className="font-roboto text-xl">
                <span className="font-semibold">{selectedVolume?.price} ₴</span>
              </p>
              <div className="flex gap-2">
                {item.priceByVolume.map((option) => (
                  <button
                    key={option._id}
                    onClick={(e) => handleVolumeClick(e, option._id)}
                    className={`border px-3 py-1 rounded text-sm ${
                      selectedVolume._id === option._id
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-300"
                    }`}
                  >
                    {option.volume}ml
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
          <div className="relative w-[150px] h-[150px] mb-4 mx-auto">
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
              </span>
              <span className="block">додано до кошику.</span>
            </p>
          )}
        </BaseModal>
      )}
    </>
  );
}
