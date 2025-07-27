import { useState } from "react";
import clsx from "clsx";

type LangSwitcherProps = {
  className?: string;
};

export default function LangSwitcher({ className }: LangSwitcherProps) {
  const [lang, setLang] = useState<"UA" | "EN">("UA");

  const toggleLang = () => {
    setLang((prev) => (prev === "UA" ? "EN" : "UA"));
  };

  return (
    <button
      onClick={toggleLang}
      className={clsx(
        "w-[30px] h-[30px] lg:w-[38px] lg:h-[38px]",
        "border border-black-10 rounded-lg flex items-center justify-center",
        "transition-all duration-300 ease-in-out hover:border-gray-10 hover:text-gray-10",
        className
      )}
    >
      <p className="font-lato font-semibold text-xs lg:text-sm">{lang}</p>
    </button>
  );
}
