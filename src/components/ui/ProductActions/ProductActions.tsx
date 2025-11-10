"use client";

import { IProduct } from "@/types/types";
import React, { useState } from "react";

import css from "@/components/ui/ProductActions/ProductActions.module.css";
import Icon from "@/components/elements/Icons";
import BasketIcon from "@/components/elements/BasketIcon";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectIsLoggedIn } from "@/store/auth/selectors";
import { addToGuestCart } from "@/store/cart/slice";
import { addCartItem } from "@/store/cart/operations";
import { BaseModal } from "@/components/shared/Modal";
import toast from "react-hot-toast";

export interface ProductActionsProps {
  product: IProduct;
}

const ProductActions = ({ product }: ProductActionsProps) => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const [selectedVolume, setSelectedVolume] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!selectedVolume) {
      toast.error("Будь ласка, оберіть обʼєм перед додаванням у кошик.");
      return;
    }

    if (!isLoggedIn) {
      // Гостьовий кошик: зберігаємо повний продукт
      dispatch(
        addToGuestCart({
          product,
          selectedVolume,
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
          selectedVolume,
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
        <div>
          <p className={css.volume}>Об&apos;єм</p>
          <div className={css.actionValueButton}>
            {product.volumeOptions && product.volumeOptions.length !== 0 ? (
              product.volumeOptions.map((vol) => (
                <button
                  key={vol}
                  onClick={() => setSelectedVolume(vol)}
                  className={`${css.volumeButton} ${
                    selectedVolume === vol ? css.active : ""
                  }`}
                >
                  {vol} мл
                </button>
              ))
            ) : (
              <button
                className={`${css.volumeButton} ${css.active}`}
                onClick={() =>
                  setSelectedVolume(product.stockQuantity.toString())
                }
              >
                {product.stockQuantity} мл
              </button>
            )}
          </div>
        </div>

        <div className={css.quantityContainer}>
          <p className={css.quantity}>Кількість</p>
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className={css.selectQuantity}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={css.addButtonContainer}>
        <button
          className={css.addShoppingCartButton}
          type="button"
          onClick={handleAddToCart}
          aria-label="Додати до кошика"
        >
          Додати до кошика
          <BasketIcon name="icon-basket" width={20} height={20} />
        </button>
        <button
          className={css.addToFavoriteButton}
          type="button"
          aria-label="Додати до обраного"
        >
          <p>Додати до обраного</p>
          <Icon name="icon-heart" width={20} height={20} useGradient />
        </button>
      </div>

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
    </div>
  );
};

export default ProductActions;
