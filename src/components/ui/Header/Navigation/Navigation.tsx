"use client";
import React, { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectIsLoggedIn } from "@/store/auth/selectors";
import { useHasMounted } from "@/helpers/hooks/useHasMounted";
import Link from "next/link";
import BasketIcon from "@/components/elements/BasketIcon";

import styles from "./Navigation.module.scss";
import clsx from "clsx";
import Icon from "@/components/shared/Icon";

type NavigationProps = {
  onClose?: () => void;
};

const buildCssClasses = ({ isActive }: { isActive: boolean }) =>
  clsx(styles.link, isActive && styles.activeLink);

export default function Navigation({ onClose }: NavigationProps) {
  const hasMounted = useHasMounted();
  const pathname = usePathname();
  const router = useRouter();
  const isLoggenIn = useAppSelector(selectIsLoggedIn);

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
      <li>
        {hasMounted && !isLoggenIn && (
          <div className="flex gap-8 items-center">
            <Link
              href="/basket"
              className="hidden lg:block lg:w-8 lg:h-8 relative"
            >
              <BasketIcon className="lg:w-8 lg:h-8" />
              <div className="absolute -top-[2px] -right-2 flex items-center justify-center bg-white-20 w-4 h-4 rounded-3xl border-1 border-black-10">
                <p className="font-lato text-[10px]">2</p>
              </div>
            </Link>
            <Link href="favorites" className="sm:hidden lg:block">
              <Icon name="icon-hard" className="w-8 h-7" />
            </Link>
          </div>
        )}
      </li>
    </ul>
  );
}
