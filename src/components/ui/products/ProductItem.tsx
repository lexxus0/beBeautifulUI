"use client";

import { useEffect, useState } from "react";
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
  const availableVolumes = item.priceByVolume.filter(
    (v) => v.stockQuantity > 0
  );

  const [selectedVolume, setSelectedVolume] = useState(
    availableVolumes[0] ?? item.priceByVolume[0]
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addedProductName, setAddedProductName] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

  /* Товару немає внаявності */
  const isOutOfStock = item.inStock === false;

  /* Відсутній конкретний об'єм */
  const isSelectedVolumeOut =
    !selectedVolume || selectedVolume.stockQuantity === 0;

  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const favorites = useAppSelector(
    (state): IProduct[] => state.favorites.items
  );

  const isFavorite = favorites.some((fav: IProduct) => fav._id === item._id);

  useEffect(() => {
    if (isSelectedVolumeOut && availableVolumes.length > 0) {
      setSelectedVolume(availableVolumes[0]);
    }
  }, [isSelectedVolumeOut, availableVolumes]);

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
    if (selected && selected.stockQuantity > 0) {
      setSelectedVolume(selected);
    }
  };

  const getAverageRating = (reviews?: IUIReview[]) => {
    if (!Array.isArray(reviews) || reviews.length === 0) return 0;
    return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  };

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isOutOfStock || isSelectedVolumeOut) return;

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

    await dispatch(
      addCartItem({
        productId: item._id,
        selectedVolume: selectedVolume.volume,
        quantity: 1,
      })
    );

    setIsModalOpen(true);
    setTimeout(() => setIsModalOpen(false), 1500);
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
        <div
          className={`${styles.itemWrapper} ${
            isOutOfStock ? styles.outOfStock : ""
          }`}
        >
          <button onClick={handleFavoriteClick} className={styles.hardBtn}>
            <Icon
              name={isFavorite ? "icon-hard" : "icon-empty-heart"}
              className={styles.hardIcon}
            />
          </button>

          <Image
            src={canRenderImage ? item.imageUrl : srcPlaceholder}
            alt={item.name.ua}
            width={size.w}
            height={size.h}
            className={styles.image}
            onError={() => setImgError(true)}
          />

          <div className={styles.description}>
            <p className={styles.productName}>{item.name.ua}</p>
            <p className={styles.productCategory}>{item.category}</p>

            <div className={styles.reviews}>
              <StarRating size={16} rating={getAverageRating(item.reviews)} />
              <p className={styles.textReviews}>
                ({item.reviews?.length ?? 0} відгуків)
              </p>
            </div>

            {isOutOfStock ? (
              <p className={styles.noStock}>Немає в наявності</p>
            ) : (
              <div className={styles.priceVolumeWrap}>
                <p className={styles.price}>{selectedVolume.price} грн</p>

                <div className={styles.volumeWrapper}>
                  {item.priceByVolume.map((option) => {
                    const disabled = option.stockQuantity === 0;

                    return (
                      <button
                        key={option._id}
                        disabled={disabled}
                        onClick={(e) => handleVolumeClick(e, option._id)}
                        className={`${styles.volumeButton}
                          ${
                            selectedVolume._id === option._id
                              ? styles.volumeButtonActive
                              : styles.volumeButtonDefault
                          }
                          ${disabled ? styles.volumeDisabled : ""}
                        `}
                      >
                        {option.volume}ml
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock || isSelectedVolumeOut}
            className={`${styles.addCartBtn} ${
              isOutOfStock || isSelectedVolumeOut
                ? styles.addCartBtnDisabled
                : ""
            }`}
          >
            Додати до кошика
          </button>
        </div>
      </Link>

      {isModalOpen && (
        <BaseModal isOpen onClose={() => setIsModalOpen(false)}>
          <p>{addedProductName} додано до кошика</p>
        </BaseModal>
      )}
    </>
  );
}
