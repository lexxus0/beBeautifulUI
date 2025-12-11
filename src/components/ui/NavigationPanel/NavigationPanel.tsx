"use client";

import { useRouter } from "next/navigation";
import styles from "./NavigationPanel.module.scss";
import Icon from "@/components/shared/Icon";

interface NavigationPanelProps {
  category: string;
  name: {en: string, ua: string};
}

const NavigationPanel: React.FC<NavigationPanelProps> = ({
  category,
  name,
}) => {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const firstWord = name.en.split(" ")[0];

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

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
            {capitalize(category)}
          </button>
          <Icon name="icon-double-arrow" className={styles.icon} />

          <span>{firstWord}</span>
        </div>
      </div>
    </div>
  );
};

export default NavigationPanel;
