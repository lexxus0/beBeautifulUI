"use client";

import { useState } from "react";
import styles from "./Checkout.module.scss";
import ContactInfoForm from "@/components/ui/ContactInfoForm/ContactInfoForm";
import LoginForm from "@/components/ui/Auth/LoginForm/LoginForm";

export default function CheckoutPage() {
  const [activeTab, setActiveTab] = useState<"new" | "existing">("new");

  return (
    <div className={styles.checkout}>
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

      <div className={styles.formWrapper}>
        {activeTab === "new" ? <ContactInfoForm /> : <LoginForm />}
      </div>
    </div>
  );
}
