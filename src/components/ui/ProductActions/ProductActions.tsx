"use client";

import { Product } from "@/types/types";
import React, { useState } from "react";

import css from "@/components/ui/ProductActions/ProductActions.module.css";

export interface ProductActionsProps {
  product: Product;
}

const ProductActions = ({ product }: ProductActionsProps) => {
  const [selectedVolume, setSelectedVolume] = useState<string | number | null>(
    null
  );
  const [quantity, setQuantity] = useState<number>(1);
  return (
    <div className={css.actionsWrapper}>
      <div className={css.actioncontainer}>
        <p className={css.volume}>Об'єм</p>
        {product.volumeOptions.length !== 0 ? (
          product.volumeOptions.map((vol) => (
            <button
              key={vol}
              onClick={() => setSelectedVolume(vol)}
              className={`${css.volumeButton} ${
                selectedVolume === vol ? css.active : ""
              }`}
            >
              {vol}
            </button>
          ))
        ) : (
          <button
            className={`${css.volumeButton} ${css.active}`}
            onClick={() => setSelectedVolume(product.stockQuantity)}
          >
            {product.stockQuantity}
          </button>
        )}
      </div>

      <div className={css.actioncontainer}>
        <p className={css.selectQuantityParagraph}>Кількість</p>
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
  );
};

export default ProductActions;
