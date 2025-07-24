import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Icon from "@/components/elements/Icon";
// import BasketIcon from "@/components/elements/BasketIcon";

import styles from "./Navigation.module.css";
import clsx from "clsx";

type NavigationProps = {
  onClose?: () => void;
};

const buildCssClasses = ({ isActive }: { isActive: boolean }) =>
  clsx(styles.link, isActive && styles.activeLink);

export default function Navigation({ onClose }: NavigationProps) {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Головна" },
    { href: "/products", label: "Каталог" },
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
          <Link href={link.href} onClick={onClose}>{link.label}</Link>
        </li>
      ))}
      <li>
      {/* <BasketIcon className="hidden lg:block lg:w-8 lg:h-8 fill-black-10"/> */}
        <Icon name="icon-basket" className="hidden lg:block lg:w-8 lg:h-8" />
      </li>
    </ul>
  );
}
