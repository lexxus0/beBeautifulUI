"use client";

import { Product } from "@/types/types";
import React, { useState } from "react";
import css from "@/components/ui/ProductDescription/ProductDescription.module.css";
import Icon from "@/components/elements/Icons";
export interface ProductDescriptionProps {
  product: Product;
}

const ProductDescription = ({ product }: ProductDescriptionProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const handleClick = (id: number) => {
    setActiveIndex(id === activeIndex ? null : id);
  };

  return (
    <div className={css.accordionWrapper}>
      <div className={css.accordionItem}>
        <button onClick={() => handleClick(0)} className={css.accordionHeader}>
          <span>Опис продукту:</span>
          <div
            className={`${css.arrow} ${
              activeIndex === 0 ? css.arrowRotated : ""
            }`}
          >
            <Icon
              name="icon-down-arrow"
              width={12}
              height={24}
              color="#2D2D2D"
            />
          </div>
        </button>
        {activeIndex === 0 && (
          <div className={css.accordionContent}>{product.description}</div>
        )}
      </div>

      <div className={css.accordionItem}>
        <button onClick={() => handleClick(1)} className={css.accordionHeader}>
          <span>Чому цей шампунь — більше, ніж очищення</span>
          <div
            className={`${css.arrow} ${
              activeIndex === 1 ? css.arrowRotated : ""
            }`}
          >
            <Icon
              name="icon-down-arrow"
              width={12}
              height={24}
              color="#2D2D2D"
            />
          </div>
        </button>
        {activeIndex === 1 && (
          <div className={css.accordionContent}>
            Це просто додатковий текст або пояснення.
          </div>
        )}
      </div>

      <div className={css.accordionItem}>
        <button onClick={() => handleClick(2)} className={css.accordionHeader}>
          <span>Основні активні компоненти:</span>
          <div
            className={`${css.arrow} ${
              activeIndex === 2 ? css.arrowRotated : ""
            }`}
          >
            <Icon
              name="icon-down-arrow"
              width={12}
              height={24}
              color="#2D2D2D"
            />
          </div>
        </button>
        {activeIndex === 2 && (
          <div className={css.accordionContent}>
            {product.activeIngredients.length > 0
              ? product.activeIngredients.map((item) => (
                  <div key={item._id}>ID: {item._id}</div>
                ))
              : "Немає активних компонентів"}
          </div>
        )}
      </div>

      <div className={css.accordionItem}>
        <button onClick={() => handleClick(3)} className={css.accordionHeader}>
          <span>Повний склад (INCI):</span>
          <div
            className={`${css.arrow} ${
              activeIndex === 3 ? css.arrowRotated : ""
            }`}
          >
            <Icon
              name="icon-down-arrow"
              width={12}
              height={24}
              color="#2D2D2D"
            />
          </div>
        </button>
        {activeIndex === 3 && (
          <div className={css.accordionContent}>
            {product.inciList?.join(", ")}
          </div>
        )}
      </div>

      <div className={css.accordionItem}>
        <button onClick={() => handleClick(4)} className={css.accordionHeader}>
          <span>Спосіб застосування:</span>
          <div
            className={`${css.arrow} ${
              activeIndex === 4 ? css.arrowRotated : ""
            }`}
          >
            <Icon
              name="icon-down-arrow"
              width={12}
              height={24}
              color="#2D2D2D"
            />
          </div>
        </button>
        {activeIndex === 4 && (
          <div className={css.accordionContent}>{product.instructions}</div>
        )}
      </div>

      <div className={css.accordionItem}>
        <button onClick={() => handleClick(5)} className={css.accordionHeader}>
          <span>Застереження:</span>
          <div
            className={`${css.arrow} ${
              activeIndex === 5 ? css.arrowRotated : ""
            }`}
          >
            <Icon
              name="icon-down-arrow"
              width={12}
              height={24}
              color="#2D2D2D"
            />
          </div>
        </button>
        {activeIndex === 5 && (
          <div className={css.accordionContent}>
            Тестове застереження. Уникати потрапляння в очі.
          </div>
        )}
      </div>

      <div className={css.accordionItem}>
        <button onClick={() => handleClick(6)} className={css.accordionHeader}>
          <span>Термін придатності:</span>
          <div
            className={`${css.arrow} ${
              activeIndex === 6 ? css.arrowRotated : ""
            }`}
          >
            <Icon
              name="icon-down-arrow"
              width={12}
              height={24}
              color="#2D2D2D"
            />
          </div>
        </button>
        {activeIndex === 6 && (
          <div className={css.accordionContent}>
            {new Date(product.createdAt).toLocaleDateString()} – 24 міс.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;
