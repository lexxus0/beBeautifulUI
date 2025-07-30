"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectIsLoggedIn, selectUser } from "@/store/auth/selectors";
import { useHasMounted } from "@/helpers/hooks/useHasMounted";
import Icon from "@/components/elements/Icon";
import Navigation from "./Navigation/Navigation";
import MobileMenu from "./MobileMenu/MobileMenu";
import Logo from "@/components/elements/Logo";
import BasketBlackIcon from "@/components/elements/BasketBlackIcon";
import LangSwitcher from "./LangSwitcher/LangSwitcher";
import UserIcon from "./UserIcon/UserIcon";
import UserMenu from "./UserMenu/UserMenu";

import styles from "./Header.module.scss";

export default function Header() {
  const hasMounted = useHasMounted();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const user = useAppSelector(selectUser);
  console.log("user: ", user);
  // console.log("isLoggedIn", isLoggedIn);

  const [menu, setMenu] = useState(false);

  if (!hasMounted) return null;

  return (
    <header className="bg-gray lg:bg-white-20">
      <div className={styles.header}>
        <Logo className="w-15 h-15 lg:w-20 lg:h-20" />
        <div className="hidden lg:block">
          <Navigation />
        </div>
        {/* <UserMenu /> */}
        <div className={styles.wrapperNav}>
          {isLoggedIn ? (
            <div className="hidden lg:block">
              <UserMenu />
            </div>
          ) : (
            <div className="hidden md:flex gap-6">
              <LangSwitcher />
              <UserIcon className="hidden lg:flex" />
            </div>
          )}
          {/* <div className="hidden md:flex gap-6">
            <LangSwitcher />
            <UserIcon className="hidden lg:flex" />
          </div> */}
          <LangSwitcher className="hidden md:block lg:hidden" />
          <button
            type="button"
            onClick={() => {}}
            className="w-9 h-9 flex items-center justify-center lg:hidden"
          >
            <BasketBlackIcon className="w-6 h-6" />
          </button>
          <button
            type="button"
            className="w-10 h-10 flex items-center justify-center lg:hidden"
            onClick={() => {
              setMenu(true);
            }}
          >
            <Icon name="icon-burger-menu" className="w-8 h-8" />
          </button>
        </div>
      </div>
      {menu && (
        <MobileMenu
          onClose={() => {
            setMenu(false);
          }}
        />
      )}
    </header>
  );
}
