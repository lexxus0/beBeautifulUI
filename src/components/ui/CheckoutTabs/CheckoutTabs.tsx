"use client";

import styles from "./CheckoutTabs.module.scss";

interface CheckoutTabsProps {
  activeTab: "new" | "existing";
  setActiveTab: (tab: "new" | "existing") => void;
}

const CheckoutTabs = ({ activeTab, setActiveTab }: CheckoutTabsProps) => {
  return (
    <div className={styles.tabs}>
      <button
        className={`${styles.tab} ${activeTab === "new" ? styles.active : ""}`}
        onClick={() => setActiveTab("new")}
      >
        Новий покупець
      </button>
      <button
        className={`${styles.tab} ${activeTab === "existing" ? styles.active : ""}`}
        onClick={() => setActiveTab("existing")}
      >
        Я постійний клієнт
      </button>
    </div>
  );
};

export default CheckoutTabs;
