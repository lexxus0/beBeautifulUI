import React from "react";
import DeliveryFormMarkup from "@/components/ui/DeliveryFormMarkup/DeliveryFormMarkup";

export default function DeliveryPage() {
  return (
    <>
      <div className="container md:pb-10 lg:pb-15">
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
