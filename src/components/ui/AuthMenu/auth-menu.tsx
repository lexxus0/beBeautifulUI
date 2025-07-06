import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import styles from "./auth-menu.module.css";
import clsx from "clsx";

const buildCssClasses = ({
    isActive,
    additionalClass,
  }: {
    isActive: boolean;
    additionalClass: string;
  }) =>
    clsx(styles.link, styles[additionalClass], isActive && styles.activeLink);

export default function AuthMenu() {
  const pathname = usePathname();
  return (
    <div className={styles.linkWrapper}>
      <Link
        href="/login"
        className={buildCssClasses({
            isActive: pathname === "/login",
            additionalClass: "signIn",
          })}
      >
        Увійти
      </Link>
      <Link
        href="/register"
        className={buildCssClasses({
            isActive: pathname === "/register" || pathname !== "/login",
            additionalClass: "signUp",
        })}
      >
        Зареєструватися
      </Link>
    </div>
  );
}
