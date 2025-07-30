"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectIsLoggedIn } from "@/store/auth/selectors";
import Link from "next/link";
import BasketBlackIcon from "@/components/elements/BasketBlackIcon";

import styles from "./Navigation.module.scss";
import clsx from "clsx";
import { useHasMounted } from "@/helpers/hooks/useHasMounted";

type NavigationProps = {
  onClose?: () => void;
};

const buildCssClasses = ({ isActive }: { isActive: boolean }) =>
  clsx(styles.link, isActive && styles.activeLink);

export default function Navigation({ onClose }: NavigationProps) {
  const hasMounted = useHasMounted();
  const pathname = usePathname();
  const isLoggenIn = useAppSelector(selectIsLoggedIn);

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
          <Link href={link.href} onClick={onClose}>
            {link.label}
          </Link>
        </li>
      ))}
      <li>
        {hasMounted && !isLoggenIn && (
          <button type="button" onClick={()=>{}} className="hidden lg:block lg:w-8 lg:h-8">
            <BasketBlackIcon className="lg:w-8 lg:h-8" />
          </button>
        )}
      </li>
    </ul>
  );
}
