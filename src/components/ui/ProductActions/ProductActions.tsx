"use client";

import { IProduct } from "@/types/types";
import React, { useState } from "react";

import css from "@/components/ui/ProductActions/ProductActions.module.css";
import Icon from "@/components/elements/Icons";
import BasketIcon from "@/components/elements/BasketIcon";

export interface ProductActionsProps {
  product: IProduct;
}

const ProductActions = ({ product }: ProductActionsProps) => {
  const [selectedVolume, setSelectedVolume] = useState<string | number | null>(
    null
  );
  const [quantity, setQuantity] = useState<number>(1);
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
                onClick={() => setSelectedVolume(product.stockQuantity)}
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
        <button className={css.addShoppingCartButton} type="button">
          Додати до кошика
          <BasketIcon name="icon-basket" width={20} height={20} />
        </button>
        <button className={css.addToFavoriteButton} type="button">
          <p>Додати до обраного</p>
          <Icon name="icon-heart" width={20} height={20} useGradient />
        </button>
      </div>
    </div>
  );
};

export default ProductActions;
