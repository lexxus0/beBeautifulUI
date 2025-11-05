"use client";

import { useRouter } from "next/navigation";
import styles from "./BackButton.module.scss";
import Icon from "@/components/shared/Icon";
import { ReactNode } from "react";

interface BackButtonProps {
  children?: ReactNode;
  href?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  children = "Назад",
  href,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <div className={styles.backButtonWrapper}>
      <div className={styles.backButtonContainer}>
        <button className={styles.backButton} onClick={handleClick}>
          <Icon name="icon-double-arrow" className={styles.icon} />
          {children}
        </button>
      </div>
    </div>
  );
};

export default BackButton;
