import React from "react";
import Navigation from "../Navigation/Navigation";
import Icon from "@/components/elements/Icon";
import AuthMenu from "../AuthMenu/AuthMenu";
import UserMenu from "../UserMenu/UserMenu";

import styles from "./MobileMenu.module.scss";

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
        <input className={styles.input} placeholder="Пошук..." />
        <Icon name="icon-search" className={styles.iconSearch} />
      </div>
      <Navigation onClose={onClose} />
      <div>
        <AuthMenu />
      </div>
    </div>
  );
}
