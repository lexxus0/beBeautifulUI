import React from "react";
import Navigation from "../Navigation/navigation";
import Icon from "@/components/elements/icon";
import AuthMenu from "../AuthMenu/auth-menu";
import UserMenu from "../UserMenu/user-menu";

import styles from "./mobile-menu.module.css";

type MobileMenuProps = {
  onClose?: () => void;
};

export default function MobileMenu({ onClose }: MobileMenuProps) {
  return (
    <div className={styles.modal}>
      <button className={styles.closeBtn} onClick={onClose}>
        <Icon name="icon-close" className={styles.iconClose} />
      </button>
      <UserMenu />
      <div className="relative">
        <input className={styles.input} placeholder="Пошук..."/>
        <Icon name="icon-search" className={styles.iconSearch} />
      </div>
      <Navigation />
      <div className="block md:hidden">
        <AuthMenu />
      </div>
    </div>
  );
}
