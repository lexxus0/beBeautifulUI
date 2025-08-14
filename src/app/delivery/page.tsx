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
      <div className="container pt-3 md:pt-[30px] md:pb-10 lg:pt-[57px] lg:pb-15">
      <CheckoutTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <DeliveryFormMarkup />
        <p className="font-roboto font-light text-xl text-center lg:text-2xl mx-auto">
          Ми цінуємо Ваш час
          <br />
          Тому зробили все, щоб замовлення з{" "}
          <span className="font-source-sans-pro font-semibold tracking-tighter">
            Science Be Beautiful{" "}
          </span>
          <br />
          було зручним, прозорим і без зайвого клопоту
        </p>
      </div>
    </>
  );
}
