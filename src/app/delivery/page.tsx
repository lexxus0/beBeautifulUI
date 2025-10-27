'use client';
import React, { useState } from "react";
import DeliveryFormMarkup from "@/components/ui/DeliveryFormMarkup/DeliveryFormMarkup";
import BackButton from "@/components/ui/BackButton/BackButton";
import CheckoutTabs from "@/components/ui/CheckoutTabs/CheckoutTabs";

export default function DeliveryPage() {
    const [activeTab, setActiveTab] = useState<"new" | "existing">("new");

  return (
    <>
    <BackButton />
      <div className="container pb-16 md:pt-5 md:pb-10 lg:pb-15">
      <CheckoutTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <DeliveryFormMarkup />
        <p className="font-roboto font-light text-base text-center md:text-xl lg:text-2xl lg:ml-22">
          Ми цінуємо Ваш час
          <br />
          Тому зробили все, щоб замовлення з{" "}
          <span className="font-source-sans-pro font-semibold text-xl md:text-[22px] lg:text-[28px] tracking-tighter">
            Science Be Beautiful{" "}
          </span> <br className="hidden md:block"/>
          було зручним, прозорим і без зайвого клопоту
        </p>
      </div>
    </>
  );
}
