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
  //  <Link href={href} className={styles.card}>
  //     <div className={styles.image}>
  //       <div
  //         className={`${styles.bg} ${styles.mobile}`}
  //         style={{ backgroundImage: `url(${imageMobile})` }}
  //       />
  //       <div
  //         className={`${styles.bg} ${styles.desktop}`}
  //         style={{ backgroundImage: `url(${imageDesktop})` }}
  //       />

  //       <div className={styles.overlay}></div>
  //       <div className={styles.title}>{title}</div>
  //       <div className={styles.description}>{description}</div>
  //     </div>
  //   </Link>


  <Link href={href} className={styles.flipCard}>
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
      <div className={styles.title}>{title}</div>
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
      <div className={`${styles.title} ${styles.titleHovered}`}>{title}</div>
      <div className={styles.description}>{description}</div>
    </div>
  </div>
</Link>

  );
};

export default CategoryCard;
