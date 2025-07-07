import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Icon from "@/components/elements/icon";

import styles from "./navigation.module.css";
import clsx from "clsx";

const buildCssClasses = ({ isActive }: { isActive: boolean }) =>
  clsx(styles.link, isActive && styles.activeLink);

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/main", label: "Головна" },
    { href: "/catalog", label: "Каталог" },
    { href: "/aboutus", label: "Про нас" },
    { href: "/blog", label: "Блог" },
    { href: "/book", label: "Книга рецепців" },
  ];

  const isAuthPage = pathname === "/login" || pathname === "/register";
  return (
    <ul className={styles.nav}>
      {links.map((link) => (
        <li
          key={link.href}
          className={buildCssClasses({
            isActive: !isAuthPage && pathname === link.href,
          })}
        >
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
      <li>
        <Icon name="icon-basket" className="hidden lg:block lg:w-8 lg:h-8" />
      </li>
    </ul>
  );
}
