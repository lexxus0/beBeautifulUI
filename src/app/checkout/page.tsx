"use client";

import { useState, useEffect } from "react";
import styles from "./Checkout.module.scss";
import ContactInfoForm from "@/components/ui/ContactInfoForm/ContactInfoForm";
import LoginForm from "@/components/ui/Auth/LoginForm/LoginForm";
import { useAppSelector } from "@/store/hooks";
import { selectIsLoggedIn } from "@/store/auth/selectors";
import CheckoutTabs from "@/components/ui/CheckoutTabs/CheckoutTabs";

const CheckoutPage = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
 const [activeTab, setActiveTab] = useState<"new" | "existing">(
    isLoggedIn ? "existing" : "new"
  );

  useEffect(() => {
    if (isLoggedIn) {
      setActiveTab("existing");
    }
  }, [isLoggedIn]);

  return (
    <div className={styles.checkout}>
      <CheckoutTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className={styles.formWrapper}>
       {isLoggedIn ? <ContactInfoForm/> : activeTab === "new" ? <ContactInfoForm /> : <LoginForm />}
      </div>
    </div>
  );
};

export default CheckoutPage;
