"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectIsLoggedIn } from "@/store/auth/selectors";
import Link from "next/link";
import Icon from "@/components/shared/Icon";
import Navigation from "./Navigation/Navigation";
import MobileMenu from "./MobileMenu/MobileMenu";
import Logo from "@/components/shared/Logo";
// import BasketIcon from "@/components/elements/BasketIcon";
import LangSwitcher from "./LangSwitcher/LangSwitcher";
import UserIcon from "./UserIcon/UserIcon";
import UserMenu from "./UserMenu/UserMenu";

import styles from "./Header.module.scss";
import BasketHeader from "./BasketHeader/BasketHeader";

export default function Header() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  // const user = useAppSelector(selectUser);
  // console.log("user: ", user);
  // console.log("isLoggedIn", isLoggedIn);

  const [menu, setMenu] = useState(false);

  return (
    <header className="bg-gray shadow-[0_2px_8px_0_rgba(45,45,45,0.24)] lg:bg-white-20">
      <div className={styles.header}>
        <Link href="/">
          <Logo className="w-15 h-15 lg:w-20 lg:h-20 lg:mr-[142px]" />
        </Link>
        <div className="hidden lg:block lg:mr-auto">
          <Navigation />
        </div>
        <div className={styles.wrapper}>
          <div className="flex items-center gap-4 md:gap-5 lg:gap-6">
            <Link
              href="/favorites"
              className="flex items-center justify-center px-1"
            >
              <Icon
                name="icon-hard"
                 className="w-[26px] h-[22px] md:w-[26px] md:h-[22px] lg:w-[28px] lg:h-[24px]"
              />
            </Link>
            <BasketHeader />
            {/* <Link
            href="/basket"
            className="w-9 h-9 flex items-center justify-center relative"
          >
            <BasketIcon className="w-6 h-6 md:w-7 md:h-7 lg:w-[30px] lg:h-[30px]" />
            <div className="absolute top-[3px] -right-[2px] flex items-center justify-center bg-white-20 w-[14px] h-[14px] rounded-3xl border-1 border-black-10">
              <p className="font-lato text-[10px]">2</p>
            </div>
          </Link> */}
            <LangSwitcher className="hidden md:block" />
            <button
              type="button"
              aria-label="Відкрити меню"
              className="w-10 h-10 flex items-center justify-center lg:hidden"
              onClick={() => {
                setMenu(true);
              }}
            >
              <Icon
                name="icon-burger-menu"
                aria-hidden="true"
                className="w-8 h-8"
              />
            </button>
            {isLoggedIn ? (
              <div className="hidden lg:block">
                <UserMenu />
              </div>
            ) : (
              <div className="">
                <UserIcon className="hidden lg:flex" />
              </div>
            )}
          </div>
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
