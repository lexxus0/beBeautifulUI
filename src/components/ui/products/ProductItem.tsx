"use client";

import StarRating from "@/helpers/StarRating";
import { IProduct, IReview } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addCartItem } from "@/store/cart/operations";
import { selectIsLoggedIn } from "@/store/auth/selectors";
import { addToGuestCart } from "@/store/cart/slice";
import { BaseModal } from "@/components/shared/Modal";

interface ProductItemProps {
  item: IProduct;
  productId?: string;
}

export default function ProductItem({ item }: ProductItemProps) {
  const [selectedVolume, setSelectedVolume] = useState(item.priceByVolume[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

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

    if (!selectedVolume) return;

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
      {isModalOpen && (
        <BaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <img
            src="/gif/cart.gif"
            alt="Товар додано до кошика"
            className="w-[150px] h-[150px] object-contain mb-4 mx-auto"
          />
          <p className="font-roboto font-light text-xl italic uppercase text-center text-[#808080] mb-4">
            Товар додано до кошика.
          </p>
        </BaseModal>
      )}
    </>
  );
}
