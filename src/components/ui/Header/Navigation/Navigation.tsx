"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectIsLoggedIn } from "@/store/auth/selectors";
import { useHasMounted } from "@/helpers/hooks/useHasMounted";
import Link from "next/link";
import BasketIcon from "@/components/elements/BasketIcon";

import styles from "./Navigation.module.scss";
import clsx from "clsx";

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

  return (
    <ul className={styles.nav}>
      {links.map((link) => (
        <li
          key={link.href}
          className={buildCssClasses({
            isActive: pathname === link.href,
          })}
        >
          <Link href={link.href} onClick={onClose} className="flex">
            {link.label}
          </Link>
        </li>
      ))}
      <li>
        {hasMounted && !isLoggenIn && (
          <Link href="/basket" className="hidden lg:block lg:w-8 lg:h-8">
            <BasketIcon className="lg:w-8 lg:h-8" />
          </Link>
        )}
      </li>
    </ul>
  );
}
