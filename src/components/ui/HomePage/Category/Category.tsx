import Link from "next/link";
import styles from "./Category.module.scss";
import CategoryCard from "./CategoryCard/CategoryCard";
import categoriesData from "./categoryData.json";
import { CategoryData } from "@/types/types";

const categories: CategoryData[] = categoriesData.map(item => ({
  ...item,
  href: {
    pathname: "/products",
    query: { category: item.category }
  }
}));

const Category = () => {
  return (
    <section className="container relative">
      <div className={styles.category}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Продукти без синтетичного “шуму” — тільки те, що працює
          </h2>
          <Link href="/products" className={styles.link}>
            Перейти до каталогу
          </Link>
        </div>

        <div className={styles.cardsWrapper}>
          {categories.map((item) => (
            <CategoryCard key={item.title} {...item} />
          ))}
        </div>
      </div>
      <div className="w-screen h-px bg-[#e0e0e0] absolute left-1/2 -translate-x-1/2 bottom-0 lg:-bottom-0"></div>
    </section>
  );
};

export default Category;
