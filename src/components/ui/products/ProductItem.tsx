"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addCartItem } from "@/store/cart/operations";
import { addToGuestCart } from "@/store/cart/slice";
import { toggleFavorite } from "@/store/favorites/slice";
import { selectIsLoggedIn } from "@/store/auth/selectors";
import { BaseModal } from "@/components/shared/Modal";
import Icon from "@/components/shared/Icon";
import { IProduct } from "@/types/types";
import { useResponsiveImage } from "@/helpers/hooks/useResponsiveImage";
import { useReviewData } from "@/helpers/hooks/useReviewData";
import styles from "./ProductItem.module.scss";
import ProductRating from "../ProductRating/ProductRating";
import { categoryNames } from "@/constants/categoryNames";

interface ProductItemProps {
  item: IProduct;
}

export default function ProductItem({ item }: ProductItemProps) {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const { avgRating, count } = useReviewData(item._id);
  const displayCategory = categoryNames[item.category] || item.category;

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

  const favorites = useAppSelector(
    (state): IProduct[] => state.favorites.items
  );

  const isFavorite = favorites.some((fav: IProduct) => fav._id === item._id);

  const sizeConfig = useMemo(
    () => ({
      mobile: 16,
      tablet: 16,
      desktop: 18,
    }),
    []
  );

  const layoutConfig = useMemo(
    () => ({
      gap: { mobile: 4, tablet: 4, desktop: 6 },
      marginRight: { mobile: 0, tablet: 8, desktop: 0 },
    }),
    []
  );

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
    { w: 242, h: 306 }
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
            alt={item.name?.ua || "Product"}
            width={size.w}
            height={size.h}
            loading="eager"
            className={styles.image}
            onError={() => setImgError(true)}
          />

          <div className={styles.description}>
            <p className={styles.productName}>{item.name?.ua}</p>
            <p className={styles.productCategory}>{displayCategory}</p>

            <div className={styles.reviews}>
              <ProductRating
                value={avgRating}
                reviews={count}
                sizeConfig={sizeConfig}
                layoutConfig={layoutConfig}
                className="w-full"
              />
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
                        key={`${option._id}+${option.volume}`}
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
