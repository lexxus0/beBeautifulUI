"use client";

import { IProduct } from "@/types/types";
import React, { useState, useEffect } from "react";

import css from "@/components/ui/ProductActions/ProductActions.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectIsLoggedIn } from "@/store/auth/selectors";
import { addToGuestCart } from "@/store/cart/slice";
import { addCartItem } from "@/store/cart/operations";
import { BaseModal } from "@/components/shared/Modal";
import toast from "react-hot-toast";
import Image from "next/image";
import Icon from "@/components/shared/Icon";

export interface ProductActionsProps {
  product: IProduct;
}

const ProductActions = ({ product }: ProductActionsProps) => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const availableVolumes = product.priceByVolume.filter(
    (v) => v.stockQuantity > 0
  );

  const isOutOfStock =
    product.inStock === false || availableVolumes.length === 0;

  const [selectedVolume, setSelectedVolume] = useState(
    availableVolumes[0] ?? product.priceByVolume[0]
  );

  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isSelectedVolumeOut =
    !selectedVolume || selectedVolume.stockQuantity === 0;

  useEffect(() => {
    if (!isOutOfStock && isSelectedVolumeOut && availableVolumes.length > 0) {
      setSelectedVolume(availableVolumes[0]);
    }
  }, [isSelectedVolumeOut, availableVolumes, isOutOfStock]);

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isOutOfStock || isSelectedVolumeOut) {
      toast.error("Товар відсутній");
      return;
    }

    if (!isLoggedIn) {
      dispatch(
        addToGuestCart({
          product,
          selectedVolume: selectedVolume.volume,
          quantity,
        })
      );

      setIsModalOpen(true);
      setTimeout(() => setIsModalOpen(false), 1500);
      return;
    }

    try {
      await dispatch(
        addCartItem({
          productId: product._id,
          selectedVolume: selectedVolume.volume,
          quantity,
        })
      ).unwrap();

      setIsModalOpen(true);
      setTimeout(() => setIsModalOpen(false), 1500);
    } catch (error) {
      console.error("Не вдалося додати в кошик:", error);
    }
  };

  return (
    <div className={css.actionsWrapper}>
      <div className={css.actionsContainer}>
        {isOutOfStock ? (
          <p className={css.noStock}>Немає в наявності</p>
        ) : (
          <>
            <div>
              <p className={css.label}>Об&apos;єм</p>
              <div className={css.actionValueButton}>
                {product.priceByVolume.map((option) => {
                  const disabled = option.stockQuantity === 0;

                  return (
                    <button
                      key={option._id}
                      disabled={disabled}
                      onClick={() => setSelectedVolume(option)}
                      className={`${css.volumeButton}
                        ${selectedVolume._id === option._id ? css.active : ""}
                        ${disabled ? css.volumeDisabled : ""}
                      `}
                    >
                      {option.volume}ml
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={css.priceQuantityContainer}>
              <div className={css.priceQuantityItem}>
                <p className={css.label}>Ціна</p>
                <div className={css.price}>
                  <p>{selectedVolume.price} грн</p>
                </div>
              </div>

              <div className={css.priceQuantityItem}>
                <p className={css.label}>Кількість</p>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className={css.selectQuantity}
                />
              </div>
            </div>
          </>
        )}
      </div>

      <div className={css.addButtonContainer}>
        <button
          className={`${css.addShoppingCartButton} ${
            isOutOfStock ? css.addCartBtnDisabled : ""
          }`}
          type="button"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
        >
          Додати до кошика
        </button>

        <button
          className={css.addToFavoriteButton}
          type="button"
          aria-label="Додати до обраного"
        >
          <p>Додати до обраного</p>
          <Icon name="icon-hard" className="fill-black-10 w-5 h-[17px]" />
        </button>
      </div>

      {isModalOpen && (
        <BaseModal isOpen onClose={() => setIsModalOpen(false)}>
          <div className="relative w-[150px] h-[150px] object-contain mb-4 mx-auto">
            <Image
              src="/gif/cart.gif"
              alt="Товар додано до кошика"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <p className="font-roboto font-light text-xl italic uppercase text-center text-[#808080] mb-4">
            Товар додано до кошика.
          </p>
        </BaseModal>
      )}
    </div>
  );
};

export default ProductActions;
