"use client";

import { useRouter } from "next/navigation";
import styles from "./BackButton.module.scss";
import Icon from "@/components/shared/Icon";
import { ReactNode } from "react";

interface BackButtonProps {
  children?: ReactNode;
}

const BackButton: React.FC<BackButtonProps> = ({ children = "Назад" }) => {
  const router = useRouter();

  return (
    <div className={styles.backButtonWrapper}>
      <div className={styles.backButtonContainer}>
        <button className={styles.backButton} onClick={() => router.back()}>
          <Icon name="icon-double-arrow" className={styles.icon} />
          {children}
        </button>
      </div>
    </div>
  );
};

export default BackButton;
