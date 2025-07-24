// import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";

import styles from "./AccountMenu.module.css";
// import clsx from "clsx";

type AccountMenuProps = {
    onClose?: () => void;
  };

// const buildCssClasses = ({ isActive }: { isActive: boolean }) =>
//   clsx(styles.link, isActive && styles.activeLink);


export default function AccountMenu({ onClose }: AccountMenuProps) {
    // const pathname = usePathname();

    const links = [
      { href: "/cabinet", label: "Особистий кабінет" },
      { href: "/pay", label: "Способи оплати" },
      { href: "/orders", label: "Замовлення" },
      { href: "/logout", label: "Вихід" },
    ];

    return (
        <div className={styles.modal}>
        <ul className={styles.nav}>
        {links.map((link) => (
          <li
            key={link.href}
            className={styles.link}
          >
            <Link href={link.href} onClick={onClose}>{link.label}</Link>
          </li>
        ))}
        </ul>
        </div>
    )
}