import Link from "next/link";
import React from "react";

import styles from "./navigation.module.css";
import Icon from "@/components/elements/icon";


export default function Navigation() {
  const links = [
    { href: "/main", label: "Головна" },
    { href: "/catalog", label: "Каталог" },
    { href: "/aboutus", label: "Про нас" },
    { href: "/blog", label: "Блог" },
    { href: "/book", label: "Книга рецепців" },
  ];
  return (
    // <div className={styles.nav}>
    <ul className={styles.nav}>
      {links.map((link) => (
        <li key={link.href} className={styles.itemNav}>
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
      <li>
        <Icon name='icon-basket' className="w-8 h-8 -ml-[7px]"/>
      </li>
    </ul>
    // </div>
  );
}
