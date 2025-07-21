"use client";

import React, { useState } from "react";
import Icon from "@/components/elements/icon";
import Navigation from "../Navigation/navigation";
import MobileMenu from "../MobileMenu/mobile-menu";
import Logo from "@/components/elements/logo";
import AuthMenu from "../AuthMenu/auth-menu";
// import UserMenu from "../UserMenu/user-menu";

import styles from "./header.module.css";

export default function Header() {
  const [menu, setMenu] = useState(false);

  return (
    <header className={styles.header}>
      <Logo className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16" />
      <div className="hidden lg:block">
        <Navigation />
      </div>

      <div className={styles.wrapperNav}>
        <div className="hidden md:block">
          <AuthMenu />
        </div>
        {/* <div className="hidden lg:block">
          <UserMenu />
        </div> */}
        <button
          className="w-10 h-10 md:w-8 md:h-8 lg:hidden"
          onClick={() => {
            setMenu(true);
          }}
        >
          <Icon name="icon-burger-menu" className="w-10 h-10 md:w-8 md:h-8" />
        </button>
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
