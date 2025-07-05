'use client';

import React, { useState } from "react";
import Image from "next/image";
import Icon from "@/components/elements/icon";

import styles from "./header.module.css";
import clsx from 'clsx';
import { usePathname } from "next/navigation";
import Link from "next/link";
import Navigation from "../Navigation/navigation";
import MobileMenu from "../MobileMenu/mobileMenu";

const buildCssClasses = ({ isActive }: { isActive: boolean }) =>
  clsx(styles.link, isActive && styles.activeLink);

export default function Header() {
  const [menu, setMenu] = useState(false)
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <Image
        src="/images/logo-mobile.png"
        alt="Logo"
        width={40}
        height={40}
        className={styles.imgMob}
      />
      <Image
        src="/images/logo-tablet.png"
        alt="Logo"
        width={56}
        height={56}
        className={styles.imgTablet}
      />
      <Image
        src="/images/logo-desktop.png"
        alt="Logo"
        width={64}
        height={64}
        className={styles.imgDesktop}
      />
      <Navigation />
      <div className={styles.wrapperNav}>
      <div className={styles.linkWrapper}>
      <Link
        href="/login"
        className={buildCssClasses({ isActive: pathname === '/login' })}
      >
        Увійти
      </Link>
      <Link
        href="/register"
        className={buildCssClasses({ isActive: pathname === '/register' || pathname === '/' })}
      >
        Зареєструватися
      </Link>      </div>
      <button className={styles.btnBurger} onClick={()=> {setMenu(true)}}>
        <Icon name="icon-burger-menu" className={styles.iconBurger} />
      </button>
      </div>
      {menu && <MobileMenu onClose={()=> {setMenu(false)}}/>}
    </header>
  );
}

