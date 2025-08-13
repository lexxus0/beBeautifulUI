"use client";

import { useState } from "react";
import styles from "./Checkout.module.scss";
import ContactInfoForm from "@/components/ui/ContactInfoForm/ContactInfoForm";
import LoginForm from "@/components/ui/Auth/LoginForm/LoginForm";
import CheckoutTabs from "@/components/ui/CheckoutTabs/CheckoutTabs";
import BackButton from "@/components/ui/BackButton/BackButton";

const CheckoutPage = () => {
  const [activeTab, setActiveTab] = useState<"new" | "existing">("new");

  return (
    <>
      <BackButton />
      <div className="container">
        <div className={styles.checkout}>
          <CheckoutTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className={styles.formWrapper}>
            {activeTab === "new" ? <ContactInfoForm /> : <LoginForm />}
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
