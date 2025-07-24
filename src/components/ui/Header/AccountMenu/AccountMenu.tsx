import React from "react";
import Link from "next/link";

import styles from "./AccountMenu.module.css";

type AccountMenuProps = {
  onClose?: () => void;
};

export default function AccountMenu({ onClose }: AccountMenuProps) {
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
          <li key={link.href} className={styles.link}>
            <Link href={link.href} onClick={onClose}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
