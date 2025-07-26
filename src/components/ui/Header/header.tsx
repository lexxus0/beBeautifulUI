"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectIsLoggedIn, selectUser } from "@/store/auth/selectors";
import Icon from "@/components/elements/Icon";
import Navigation from "./Navigation/Navigation";
import MobileMenu from "./MobileMenu/MobileMenu";
import Logo from "@/components/elements/Logo";
// import AuthMenu from "./AuthMenu/AuthMenu";
import UserMenu from "./UserMenu/UserMenu";
import HeaderActions from "./HeaderActions/HeaderActions";
import BasketBlackIcon from "@/components/elements/BasketBlackIcon";

import styles from "./Header.module.scss";

export default function Header() {
  const isLoggenIn = useAppSelector(selectIsLoggedIn);
  const user = useAppSelector(selectUser);
  console.log("user: ", user);

  const [menu, setMenu] = useState(false);

  return (
    <header className="bg-gray lg:bg-white-20">
      <div className={styles.header}>
        <Logo className="w-15 h-15 lg:w-20 lg:h-20" />
        <div className="hidden lg:block">
          <Navigation />
        </div>

        <div className={styles.wrapperNav}>
          {isLoggenIn ? (
            <div className="hidden lg:block">
              <UserMenu />
            </div>
          ) : (
            <div className="hidden lg:block">
              <HeaderActions />
            </div>
          )}
          <BasketBlackIcon className="w-8 h-8 lg:hidden" />
          <button
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
