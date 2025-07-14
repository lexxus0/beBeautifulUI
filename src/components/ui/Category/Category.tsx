import Link from "next/link";
import styles from "./Category.module.scss";
import CategoryCard from "./CategoryCard/CategoryCard";

type CategoryData = {
  title: string;
  description: string;
  imageMobile: string;
  imageDesktop: string;
  href: string;
};

const categories: CategoryData[] = [
  {
    title: "Волосся",
    description:
      "Делікатне очищення і природний блиск. Без обтяження. Без випадіння.",
    imageMobile: "/images/categories/hair-mobile.png",
    imageDesktop: "/images/categories/hair.png",
    href: "/catalog/hair",
  },
  {
    title: "Обличчя",
    description:
      "Турбота, що відчувається з першого дотику. Формули, створені з любовʼю до шкіри.",
    imageMobile: "/images/categories/face-mobile.png",
    imageDesktop: "/images/categories/face.png",
    href: "/catalog/face",
  },
  {
    title: "Тіло",
    description:
      "Щоденна ніжність для тіла. Легкість, комфорт і баланс у кожному русі.",
    imageMobile: "/images/categories/body-mobile.png",
    imageDesktop: "/images/categories/body.png",
    href: "/catalog/body",
  },
  {
    title: "Товари для дому",
    description:
      "Чистота, яка дихає спокоєм. Мінімум складників — максимум дії.",
    imageMobile: "/images/categories/for-home-mobile.png",
    imageDesktop: "/images/categories/for-home.png",
    href: "/catalog/home",
  },
];

const Category = () => {
  return (
    <section className={styles.section}>
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
