"use client";
import React, { useState } from "react";
import BackButton from "@/components/ui/BackButton/BackButton";
import CheckoutTabs from "@/components/ui/CheckoutTabs/CheckoutTabs";
import Link from "next/link";

export default function ReturnsPage() {
  const [activeTab, setActiveTab] = useState<"new" | "existing">("new");
  return (
    <>
      <BackButton />
      <div className="container pb-[50px] md:pt-5 lg:pb-[70px]">
        <CheckoutTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <p className="font-roboto font-light text-sm text-center md:text-lg md:pt-4 lg:text-xl lg:pt-[46px] mb-8">
          Відповідно до постанови{" "}
          <Link
            href="https://zakon.rada.gov.ua/laws/show/172-94-%D0%BF#Text"
            className="font-normal underline md:text-xl"
          >
            КМУ №172
          </Link>
          , <br /> парфумерно-косметичні засоби{" "}
          <span className="font-normal md:text-xl lg:text-[22px]">
            не підлягають поверненню та обміну
          </span>
        </p>
        <p className="font-lato font-bold text-lg text-center text-black mb-8 md:font-semibold md:text-[22px]">
          Ми завжди на боці чесності, тому:
        </p>
        <ul className="flex flex-col gap-1 mb-8">
          <li className="font-roboto text-sm md:text-lg lg:text-xl font-light text-center text-black">
            • Якщо при доставці товар було пошкоджено — зафіксуйте це одразу на
            пошті та зробіть повернення
          </li>
          <li className="font-roboto text-sm md:text-lg lg:text-xl font-light text-center text-black">
            • Якщо отримали не те, що замовляли — повідомте нас протягом 3 днів
          </li>
        </ul>
        <p className="font-lato font-bold text-base text-black text-center md:font-roboto md:font-normal md:text-xl">
          Ми несемо відповідальність за наші формули й турботу — до останньої
          баночки.
        </p>
      </div>
    </>
  );
}
