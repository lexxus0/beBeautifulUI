"use client";

import { useRouter } from "next/navigation";
import styles from "./Breadcrumbs.module.scss";
import Icon from "@/components/shared/Icon";
import { categoryNames } from "@/constants/categoryNames";

interface BreadcrumbsProps {
  category: string;
  name: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ category, name }) => {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const translatedCategory = categoryNames[category] || category;
  const firstWord = name?.split(" ")[0];

  return (
    <div className={styles.navigationWrapper}>
      <div className={styles.navigationContainer}>
        <div className={styles.navigationPath}>
          <Icon name="icon-double-arrow" className={styles.icon} />
          <button
            className={styles.link}
            onClick={() => handleNavigate("/products")}
          >
            Каталог
          </button>
          <Icon name="icon-double-arrow" className={styles.icon} />

          <button
            className={styles.link}
            onClick={() => handleNavigate(`/products?category=${category}`)}
          >
            {translatedCategory}
          </button>
          <Icon name="icon-double-arrow" className={styles.icon} />

          <span>{firstWord}</span>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
