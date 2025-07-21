"use client";

import React, { useState } from "react";
import Icon from "@/components/elements/Icon";
import Navigation from "../Navigation/Navigation";
import MobileMenu from "../MobileMenu/MobileMenu";
import Logo from "@/components/elements/Logo";
// import AuthMenu from "../AuthMenu/AuthMenu";
// import UserMenu from "../UserMenu/UserMenu";

import styles from "./Header.module.css";

export default function Header() {
  const [menu, setMenu] = useState(false);

  return (
    <header className="bg-gray lg:bg-white-20">
      <div className={styles.header}>
      <Logo className="w-15 h-15 lg:w-20 lg:h-20" />
      <div className="hidden lg:block">
        <Navigation />
      </div>

      <div className={styles.wrapperNav}>
        {/* <div className="hidden md:block">
          <AuthMenu />
        </div> */}
        {/* <div className="hidden lg:block">
          <UserMenu />
        </div> */}
        <button
          className="w-10 h-10 flex items-center justify-center lg:hidden"
          onClick={() => {
            setMenu(true);
          }}
        >
          <Icon name="icon-burger-menu" className="w-7 h-7" />
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
