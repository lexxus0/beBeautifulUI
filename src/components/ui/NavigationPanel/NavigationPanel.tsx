"use client";

import { useRouter } from "next/navigation";
import styles from "./NavigationPanel.module.scss";
import Icon from "@/components/shared/Icon";

interface NavigationPanelProps {
  category: string;
  name: string;
}

const NavigationPanel: React.FC<NavigationPanelProps> = ({ category, name }) => {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const firstWord = name.split(" ")[0];

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
            {category}
          </button>
          <Icon name="icon-double-arrow" className={styles.icon} />

          <span className={styles.link}>{firstWord}</span>
        </div>
      </div>
    </div>
  );
};

export default NavigationPanel;
