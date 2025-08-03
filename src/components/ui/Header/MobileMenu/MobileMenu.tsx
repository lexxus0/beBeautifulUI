import React from "react";
import Navigation from "../Navigation/Navigation";
import { useAppSelector } from "@/store/hooks";
import { selectIsLoggedIn, selectUser } from "@/store/auth/selectors";
import UserMenu from "../UserMenu/UserMenu";
import LangSwitcher from "../LangSwitcher/LangSwitcher";
import UserIcon from "../UserIcon/UserIcon";
import Icon from "@/components/shared/Icon";

import styles from "./MobileMenu.module.scss";

type MobileMenuProps = {
  onClose?: () => void;
};

export default function MobileMenu({ onClose }: MobileMenuProps) {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const user = useAppSelector(selectUser);
  console.log("user: ", user);

  return (
    <div className={styles.modal}>
      <LangSwitcher className="absolute top-5 left-4" />
      <button type="button" className={styles.closeBtn} onClick={onClose}>
        <Icon name="icon-close" className={styles.iconClose} />
      </button>
      {isLoggedIn ? (
        <div className="">
          <UserMenu onCloseMobileModal={onClose} />
        </div>
      ) : (
        <div className="flex justify-center">
          <UserIcon onClose={onClose} />
        </div>
      )}
      <div className="border-t border-t-white-30 pt-8 mt-1">
        <div className="relative">
          <input className={styles.input} placeholder="Пошук..." />
          <Icon name="icon-search" className={styles.iconSearch} />
        </div>
        <Navigation onClose={onClose} />
      </div>
    </div>
  );
}
