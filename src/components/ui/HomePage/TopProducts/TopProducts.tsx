"use client";

import styles from "./TopProducts.module.scss";
import Link from "next/link";
import productsData from "./topProducts.json";
import { IProduct, TopProduct } from "@/types/types";
import BasketIcon from "@/components/elements/BasketIcon";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { addToGuestCart } from "@/store/cart/slice";
import { BaseModal } from "@/components/shared/Modal";
import Image from "next/image";

const TopProducts: React.FC = () => {
  const products = productsData as TopProduct[];
  const firstRow = products.slice(0, 2);
  const secondRow = products.slice(2);

  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addedProductName, setAddedProductName] = useState<string | null>(null);

  const handleAddToCart = (product: TopProduct) => {
    setAddedProductName(product.title);

    const cartProduct = {
      _id: product.id.toString(),
      name: product.title,
      priceByVolume: [{ volume: "default", price: product.price }],
      category: "top",
      reviews: [],
    };

    dispatch(
      addToGuestCart({
        product: cartProduct as unknown as IProduct,
        selectedVolume: 0, // "default",
        quantity: 1,
      })
    );

    setIsModalOpen(true);
    setTimeout(() => setIsModalOpen(false), 1500);
  };

  const renderProduct = (product: TopProduct) => (
    <article
      key={product.id}
      className={`${styles.card} ${product.title === "Box" ? styles.box : ""}`}
    >
      <div
        className={`${styles.bg} ${styles.mobile}`}
        style={{ backgroundImage: `url(${product.imageMobile})` }}
      />
      <div
        className={`${styles.bg} ${styles.desktop}`}
        style={{ backgroundImage: `url(${product.imageDesktop})` }}
      />
      <div className={styles.titleWrap}>
        <h3>{product.title}</h3>
        <p>{product.underTitle}</p>
      </div>
      <div className={styles.footer}>
        <span className={styles.price}>{product.price}</span>
        <button
          className={styles.cartBtn}
          aria-label="Додати в кошик"
          onClick={() => handleAddToCart(product)}
        >
          <BasketIcon variant="white" className={styles.icon} />
        </button>
      </div>
    </article>
  );

  return (
    <section className="container">
      <div className={styles.topProducts}>
        <div className={styles.header}>
          <h2>Топ-товари</h2>
          <p>Краса починається з догляду. А догляд — із довіри</p>
          <p className={styles.text}>
            <span>Science Be Beautiful</span> — доглядова косметика
            преміум-класу та засоби для дому з чистим складом, безпечні, дієві,
            чесні.
          </p>
        </div>

        <div className={styles.grid}>
          {firstRow.map(renderProduct)}

          <article className={`${styles.card} ${styles.cta}`}>
            <h3>Витончені та преміальні варіанти</h3>
            <Link href="#" className={styles.link}>
              Дивитись більше
            </Link>
          </article>

          {secondRow.map(renderProduct)}
        </div>
      </div>

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
              <span className="block font-bold text-black">{addedProductName}</span>{" "}
              <span className="block">додано до кошику.</span>
            </p>
          )}
        </BaseModal>
      )}
    </section>
  );
};

export default TopProducts;
