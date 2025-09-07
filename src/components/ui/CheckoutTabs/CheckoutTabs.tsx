"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./CheckoutTabs.module.scss";

interface CheckoutTabsProps {
  activeTab: "new" | "existing";
  setActiveTab: (tab: "new" | "existing") => void;
}

const CheckoutTabs = ({ activeTab, setActiveTab }: CheckoutTabsProps) => {
  const pathname = usePathname();

  const steps = [
    { number: 1, label: "Особисті дані", href: "/checkout" },
    { number: 2, label: "Інформація про доставку", href: "/delivery" },
    { number: 3, label: "Повернення та обмін", href: "/returns" },
  ];

  return (
    <div className={styles.tabsWrapper}>
      <h2 className={styles.title}>Оформлення замовлення</h2>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            activeTab === "new" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("new")}
        >
          Новий покупець
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "existing" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("existing")}
        >
          Я постійний клієнт
        </button>
      </div>
      <div className={styles.steps}>
        {steps.map((step) => {
          const isActive = pathname === step.href;
          return (
            <Link
              key={step.number}
              href={step.href}
              className={`${styles.stepLink} ${
                isActive ? styles.stepActive : ""
              }`}
            >
              {step.number}. {step.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutTabs;
