"use client";

import { useState, useEffect } from "react";
import styles from "./Checkout.module.scss";
import ContactInfoForm from "@/components/ui/ContactInfoForm/ContactInfoForm";
import LoginForm from "@/components/ui/Auth/LoginForm/LoginForm";
import { useAppSelector } from "@/store/hooks";
import { selectIsLoggedIn } from "@/store/auth/selectors";

const CheckoutPage = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [activeTab, setActiveTab] = useState<"new" | "existing">("new");

  useEffect(() => {
    if (isLoggedIn) {
      setActiveTab("existing");
    }
  }, [isLoggedIn]);

  return (
    <div className={styles.checkout}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            activeTab === "new" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("new")}
          disabled={isLoggedIn}
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

      <div className={styles.formWrapper}>
        {activeTab === "new" ? <ContactInfoForm /> : <LoginForm />}
      </div>
    </div>
  );
};

export default CheckoutPage;
