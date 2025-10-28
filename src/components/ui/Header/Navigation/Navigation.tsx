"use client";
import React, { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import clsx from "clsx";
import styles from "./Navigation.module.scss";

type NavigationProps = {
  onClose?: () => void;
};

const buildCssClasses = ({ isActive }: { isActive: boolean }) =>
  clsx(styles.link, isActive && styles.activeLink);

export default function Navigation({ onClose }: NavigationProps) {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: "/", label: "Головна" },
    { href: "/products", label: "Каталог" },
    { href: "/#history", label: "Про нас" },
    { href: "/blog", label: "Блог" },
  ];

  const handleLinkClick = useCallback(
    (href: string) => {
      onClose?.();

      if (href.startsWith("/#")) {
        const id = href.split("#")[1];
        sessionStorage.setItem("scrollTo", id);
        router.push("/");
      } else {
        router.push(href);
      }
    },
    [router, onClose]
  );

  return (
    <ul className={styles.nav}>
      {links.map((link) => (
        <li
          key={link.href}
          className={buildCssClasses({
            isActive: pathname === link.href,
          })}
        >
          <Link
            href={link.href}
            onClick={() => handleLinkClick(link.href)}
            className="flex"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
