"use client";

import React, { useState } from "react";
import Icon from "@/components/elements/Icon";
import Link from "next/link";

export default function HeaderActions() {
  const [lang, setLang] = useState<"UA" | "EN">("UA");

  const toggleLang = () => {
    setLang((prev) => (prev === "UA" ? "EN" : "UA"));
  };
  return (
    <div className="flex gap-6">
      <button
        onClick={toggleLang}
        className="w-[34px] h-[34px] lg:w-[38px] lg:h-[38px] 
      border border-black-10 rounded-lg flex items-center justify-center
      transition-all duration-300 ease-in-out hover:border-gray-10 hover:text-gray-10"
      >
        <p className="font-lato font-semibold text-sm">{lang}</p>
      </button>
      <Link
        href="/login"
        className="w-[34px] h-[34px] lg:w-[38px] lg:h-[38px] border border-black-10 rounded-lg 
      flex items-center justify-center transition-all duration-300 ease-in-out 
      hover:border-gray-10 hover:text-gray-10"
      >
        <Icon
          name="icon-user"
          className="w-[22px] h-[28px] lg:w-[25px] lg:h-[30px]"
        />
      </Link>
    </div>
  );
}
