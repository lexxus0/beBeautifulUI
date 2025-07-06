import React from "react";

import styles from "./mobileMenu.module.css";
import Navigation from "../Navigation/navigation";
import Icon from "@/components/elements/icon";
import AuthMenu from "../AuthMenu/auth-menu";

type MobileMenuProps = {
  onClose?: () => void;
};

export default function MobileMenu({ onClose }: MobileMenuProps) {
  return (
    // <div className={styles.backdrop}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          <Icon name="icon-close" className={styles.icon} />
        </button>
        <Navigation />
        <div className="block md:hidden">
          <AuthMenu />
        </div>
      </div>
    // </div>
  );
}
