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
import styles from "./ProductItem.module.scss";

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
    { w: 158, h: 158 },
    { w: 242, h: 306 },
    { w: 196, h: 156 }
  );

  const canRenderImage = !!item.imageUrl && !imgError;

  return (
    <>
      <Link href={`/products/${item._id}`}>
        <div className={styles.itemWrapper}>
          <button onClick={handleFavoriteClick} className={styles.hardBtn}>
            {isFavorite ? (
              <Icon name="icon-hard" className={styles.hardIcon} />
            ) : (
              <Icon name="icon-empty-heart" className={styles.hardIcon} />
            )}
          </button>

          {canRenderImage ? (
            <Image
              src={item.imageUrl}
              alt={item.name.ua}
              width={size.w}
              height={size.h}
              className={styles.image}
              onError={() => setImgError(true)}
            />
          ) : (
            <Image
              src={srcPlaceholder}
              alt={item.name.ua}
              width={size.w}
              height={size.h}
              className={styles.image}
            />
          )}

          <div className={styles.description}>
            <p className={styles.productName}>{item.name.ua}</p>
            <p className={styles.productCategory}>{item.category}</p>
            <div className={styles.reviews}>
              <StarRating size={16} rating={getAverageRating(item.reviews)} />
              <p className={styles.textReviews}>({item.reviews?.length ?? 0} відгуків)</p>
            </div>

            <div className={styles.priceVolumeWrap}>
              <p className={styles.price}>{selectedVolume?.price} грн</p>
              <div className={styles.volumeWrapper}>
                {item.priceByVolume.map((option) => (
                  <button
                    key={option._id}
                    onClick={(e) => handleVolumeClick(e, option._id)}
                    className={`${styles.volumeButton} ${
                      selectedVolume._id === option._id
                        ? styles.volumeButtonActive
                        : styles.volumeButtonDefault
                    }`}
                  >
                    {option.volume}ml
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button onClick={handleAddToCart} className={styles.addCartBtn}>
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
