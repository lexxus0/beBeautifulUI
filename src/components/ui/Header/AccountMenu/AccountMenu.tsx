import React from "react";
import { useAppDispatch } from "@/store/hooks";
import { signoutUser } from "@/store/auth/operations";
import { persistor } from "@/store/store";
// import { useRouter } from "next/router";
import Link from "next/link";
import Icon from "@/components/elements/icon";

import styles from "./AccountMenu.module.scss";
import clsx from "clsx";

type AccountMenuProps = {
  onClose?: () => void;
};

export default function AccountMenu({ onClose }: AccountMenuProps) {
  const dispatch = useAppDispatch();
  // const router = useRouter();

  const handleLogout = async () => {
    try {
      await dispatch(signoutUser()).unwrap();
      await persistor.purge();
      // router.push('/');
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  const links = [
    { href: "/cabinet", label: "Особистий кабінет", icon: "icon-user-edit" },
    { href: "/pay", label: "Способи оплати", icon: "icon-pay" },
    { href: "/orders", label: "Замовлення", icon: "icon-orders" },
  ];

  return (
    <div className={styles.modal}>
      <ul className={styles.nav}>
        {links.map(({ href, label, icon }) => (
          <li key={href} className={styles.list}>
            <Link href={href} onClick={onClose} className={styles.link}>
              <Icon
                name={icon}
                className={clsx(
                  "w-5 h-5 stroke-white-20 lg:stroke-black-10",
                  icon === "icon-orders"
                    ? "fill-white-20  lg:fill-black-10"
                    : "fill-transparent "
                )}
              />
              <span className="hidden lg:block">{label}</span>
            </Link>
          </li>
        ))}
        <li className={styles.list}>
          <button type="button" onClick={handleLogout} className={styles.btn}>
            <Icon
              name="icon-logout"
              className="w-5 h-5 fill-white-20 lg:fill-current"
            />
            <span className="hidden lg:block">Вихід</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
