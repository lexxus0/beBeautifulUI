import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Icon from "@/components/elements/Icon";

import styles from "./AuthMenu.module.css";
import clsx from "clsx";

const buildCssClasses = ({
  isActive,
  additionalClass,
}: {
  isActive: boolean;
  additionalClass: string;
}) => clsx(styles.link, styles[additionalClass], isActive && styles.activeLink);

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
        <Icon name="icon-login" className="w-[19px] h-[19px] md:hidden" />
        Увійти
      </Link>
      <Link
        href="/register"
        className={buildCssClasses({
          isActive: pathname === "/register" || pathname !== "/login",
          additionalClass: "signUp",
        })}
      >
        <Icon name="icon-register" className="w-[19px] h-[19px] md:hidden" />
        Зареєструватися
      </Link>
    </div>
  );
}
