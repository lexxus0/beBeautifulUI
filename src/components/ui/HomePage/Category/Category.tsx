import Link from "next/link";
import styles from "./Category.module.scss";
import CategoryCard from "./CategoryCard/CategoryCard";
import categoriesData from "./categoryData.json";
import { CategoryData } from "@/types/types";

const categories: CategoryData[] = categoriesData;

const Category = () => {
  return (
    <section className={`container ${styles.category}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Продукти без синтетичного “шуму” — тільки те, що працює
        </h2>
        <Link href="/catalog" className={styles.link}>
          Перейти до каталогу
        </Link>
      </div>

      <div className={styles.cardsWrapper}>
        {categories.map((item) => (
          <CategoryCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
};

export default Category;
