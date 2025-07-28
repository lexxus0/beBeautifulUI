import Link from "next/link";
import styles from "./CategoryCard.module.scss";
import { CategoryCardProps } from "@/types/types";

const CategoryCard = ({
  title,
  description,
  imageMobile,
  imageDesktop,
  href,
}: CategoryCardProps) => {
  return (
    <div className={styles.flipCard}>
      <div className={styles.flipInner}>
        {/* FRONT */}
        <div className={`${styles.cardFace} ${styles.front}`}>
          <div
            className={`${styles.bg} ${styles.mobile}`}
            style={{ backgroundImage: `url(${imageMobile})` }}
          />
          <div
            className={`${styles.bg} ${styles.desktop}`}
            style={{ backgroundImage: `url(${imageDesktop})` }}
          />
          <div className={styles.overlay}></div>
          <div className={styles.title}>
            <Link href={href}>{title}</Link>
          </div>
        </div>

        {/* BACK */}
        <div className={`${styles.cardFace} ${styles.back}`}>
          <div
            className={`${styles.bg} ${styles.mobile}`}
            style={{ backgroundImage: `url(${imageMobile})` }}
          />
          <div
            className={`${styles.bg} ${styles.desktop}`}
            style={{ backgroundImage: `url(${imageDesktop})` }}
          />
          <div className={styles.overlay}></div>
          <div className={styles.title}>
            <Link href={href}>{title}</Link>
          </div>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
