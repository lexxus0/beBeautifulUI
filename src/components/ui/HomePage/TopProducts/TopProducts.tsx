"use client";

// import Icon from "@/components/elements/Icon";
import styles from "./TopProducts.module.scss";
import Link from "next/link";
import products from "./topProducts.json";
import { TopProduct } from "@/types/types";
import BasketIcon from "@/components/elements/BasketIcon";

const TopProducts: React.FC = () => {
  return (
    <section className="container">
      <div className={styles.topProducts}>
        <div className={styles.header}>
          <h2>Топ- товари</h2>
          <p>Краса починається з догляду. А догляд — із довіри</p>
          <p className={styles.text}>
            <span>Science Be Beautiful</span> — доглядова косметика
            преміум-класу та засоби для дому з чистим складом, безпечні, дієві,
            чесні.
          </p>
        </div>

        <div className={styles.grid}>
          {(products as TopProduct[]).map(
            ({ id, title, underTitle, price, imageMobile, imageDesktop }) => (
              <article
                key={id}
                className={`${styles.card} ${
                  title === "Box" ? styles.box : ""
                }`}
              >
                <div
                  className={`${styles.bg} ${styles.mobile}`}
                  style={{ backgroundImage: `url(${imageMobile})` }}
                />
                <div
                  className={`${styles.bg} ${styles.desktop}`}
                  style={{ backgroundImage: `url(${imageDesktop})` }}
                />

                <div className={styles.titleWrap}>
                  <h3>{title}</h3>
                  <p>{underTitle}</p>
                </div>

                <div className={styles.footer}>
                  <span className={styles.price}>{price}</span>
                  <button
                    className={styles.cartBtn}
                    aria-label="Додати в кошик"
                  >
                    <BasketIcon className={styles.icon} />
                  </button>
                </div>
              </article>
            )
          )}

          <article className={`${styles.card} ${styles.cta}`}>
            <h3>Витончені та преміальні варіанти</h3>
            <Link href="#" className={styles.link}>
              Дивитись більше
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
};

export default TopProducts;
