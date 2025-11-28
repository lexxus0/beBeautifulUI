"use client";

import React, { useState } from "react";
import css from "@/components/ui/ProductDescription/ProductDescription.module.css";
import { IProduct } from "@/types/types";
import Icon from "@/components/elements/Icons";

export interface ProductDescriptionProps {
  product: IProduct;
}

const ProductDescription = ({ product }: ProductDescriptionProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const handleClick = (id: number) => {
    setActiveIndex(id === activeIndex ? null : id);
  };

  return (
    <div className={css.accordionWrapper}>
      <div className={css.accordionItem}>
        <button
          onClick={() => handleClick(0)}
          className={`${css.accordionHeader} ${
            activeIndex === 0 ? css.active : ""
          }`}
        >
          <span className={css.descriptionTitle}>Опис продукту:</span>
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
          <p className={css.accordionContent}>{product.description}</p>
        )}
      </div>

      <div className={css.accordionItem}>
        <button
          onClick={() => handleClick(1)}
          className={`${css.accordionHeader} ${
            activeIndex === 1 ? css.active : ""
          }`}
        >
          <span className={css.descriptionTitle}>
            Чому цей шампунь — більше, ніж очищення
          </span>
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
          <p className={css.accordionContent}>
            Це просто додатковий текст або пояснення.
          </p>
        )}
      </div>

      <div className={css.accordionItem}>
        <button
          onClick={() => handleClick(2)}
          className={`${css.accordionHeader} ${
            activeIndex === 2 ? css.active : ""
          }`}
        >
          <span className={css.descriptionTitle}>
            Основні активні компоненти:
          </span>
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
                  <p key={item._id}>ID: {item._id}</p>
                ))
              : "Немає активних компонентів"}
          </div>
        )}
      </div>

      <div className={css.accordionItem}>
        <button
          onClick={() => handleClick(3)}
          className={`${css.accordionHeader} ${
            activeIndex === 3 ? css.active : ""
          }`}
        >
          <span className={css.descriptionTitle}>Повний склад (INCI):</span>
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
          <p className={css.accordionContent}>{product.inciList?.join(", ")}</p>
        )}
      </div>

      <div className={css.accordionItem}>
        <button
          onClick={() => handleClick(4)}
          className={`${css.accordionHeader} ${
            activeIndex === 4 ? css.active : ""
          }`}
        >
          <span className={css.descriptionTitle}>Спосіб застосування:</span>
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
          <p className={css.accordionContent}>{product.instructions}</p>
        )}
      </div>

      <div className={css.accordionItem}>
        <button
          onClick={() => handleClick(5)}
          className={`${css.accordionHeader} ${
            activeIndex === 5 ? css.active : ""
          }`}
        >
          <span className={css.descriptionTitle}>Застереження:</span>
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
          <p className={css.accordionContent}>
            Тестове застереження. Уникати потрапляння в очі.
          </p>
        )}
      </div>

      <div className={css.accordionItem}>
        <button
          onClick={() => handleClick(6)}
          className={`${css.accordionHeader} ${
            activeIndex === 6 ? css.active : ""
          }`}
        >
          <span className={css.descriptionTitle}>Термін придатності:</span>
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
          <p className={css.accordionContent}>
            {new Date(product.createdAt).toLocaleDateString()} – 24 міс.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;
