"use client";

import { IProduct } from "@/types/types";
import React, { useState } from "react";

import css from "@/components/ui/ProductActions/ProductActions.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectIsLoggedIn } from "@/store/auth/selectors";
import { addToGuestCart } from "@/store/cart/slice";
import { addCartItem } from "@/store/cart/operations";
import { BaseModal } from "@/components/shared/Modal";
import toast from "react-hot-toast";
import Image from "next/image";
import BaseSelect from "@/components/elements/BaseSelect";
import { getFormattedVolume } from "@/helpers/hooks/getFormattedVolume";
import Icon from "@/components/shared/Icon";

export interface ProductActionsProps {
  product: IProduct;
}

const ProductActions = ({ product }: ProductActionsProps) => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const [selectedVolume, setSelectedVolume] = useState(
    product.volumeOptions?.[0] || ""
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!selectedVolume) {
      toast.error("Будь ласка, оберіть обʼєм перед додаванням у кошик.");
      return;
    }

    if (!isLoggedIn) {
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

  const price =
    product.priceByVolume.find((opt) => opt.volume === selectedVolume)?.price ||
    product.priceByVolume[0].price;

  const quantityOptions = Array.from({ length: 10 }, (_, i) => ({
    value: String(i + 1),
    label: String(i + 1),
  }));

  return (
    <div className={css.actionsWrapper}>
      <div className={css.actionsContainer}>
        <div>
          <p className={css.label}>Об&apos;єм</p>
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
                  {getFormattedVolume(vol)}
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

        <div className={css.priceQuantityContainer}>
          <div className={css.priceQuantityItem}>
            <p className={css.label}>Ціна</p>
            <div className={css.price}>
              <p>{price} грн</p>
            </div>
          </div>
          <div className={css.priceQuantityItem}>
            <p className={css.label}>Кількість</p>

            <BaseSelect
              options={quantityOptions}
              value={String(quantity)}
              onSelect={(val) => setQuantity(Number(val))}
              placeholder="Оберіть кількість"
              className={css.selectQuantity}
              iconRight="icon-arrow-down"
            />
          </div>
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
          <p className="font-roboto font-light text-xl italic uppercase text-center text-[#808080] mb-4">
            Товар додано до кошика.
          </p>
        </BaseModal>
      )}
    </div>
  );
};

export default ProductActions;
