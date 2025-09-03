"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "@/components/shared/Icon";
import styles from "./PaymentSelect.module.scss";

export type PaymentChoice = "card" | "invoice" | "cod";
export type PaymentOption = {
  value: PaymentChoice;
  label: string;
  note?: string;
};

type PaymentSelectProps = {
  value: PaymentChoice | undefined;
  onChange: (v: PaymentChoice) => void;
  options?: PaymentOption[];
  label?: string;
  placeholder?: string;
  error?: string;
};

const DEFAULT_OPTIONS: PaymentOption[] = [
  {
    value: "card",
    label:
      "Онлайн-оплата (на сайті банківською карткою або через Apple Pay / Google Pay)",
  },
  {
    value: "invoice",
    label: "Через термінал або Приват24 — за реквізитами",
  },
  {
    value: "cod",
    label: "При отриманні — післяплата",
    note: "Комісію за післяплату сплачує отримувач",
  },
];

export default function PaymentSelect({
  value,
  onChange,
  options = DEFAULT_OPTIONS,
  label = "Варіант оплати",
  placeholder = "Варіант оплати",
  error,
}: PaymentSelectProps) {
  const [open, setOpen] = useState<boolean>(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const selectedIndex = options.findIndex((o) => o.value === value);

  const selected = useMemo(
    () => (selectedIndex >= 0 ? options[selectedIndex] : undefined),
    [options, selectedIndex]
  );

  const [activeIndex, setActiveIndex] = useState<number>(
    Math.max(0, selectedIndex)
  );

  // клік поза селектом — закрити
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

const openAndFocus = () => {
    setOpen(true);
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setTimeout(() => listRef.current?.focus(), 0);
  };

  const onButtonKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === " " || e.key === "Enter" || e.key === "ArrowDown") {
      e.preventDefault();
      openAndFocus();
    }
  };

  const onListKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key === "Escape") return setOpen(false);
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIndex(i => Math.min(options.length - 1, i + 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setActiveIndex(i => Math.max(0, i - 1)); }
    if (e.key === "Enter") {
      e.preventDefault();
      const opt = options[activeIndex];
      if (opt) { onChange(opt.value); setOpen(false); }
    }
  };

  return (
    <div ref={rootRef} className="w-full max-w-xl relative mb-[34px] md:mb-[42px] lg:mb-15">
      <label className="mb-[2px] font-roboto font-light text-sm md:text-base text-gray-10">
        {label}
      </label>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        {...(error ? { "aria-invalid": true, "aria-describedby": "payment-error" } : {})}
        onClick={() => (open ? setOpen(false) : openAndFocus())}
        onKeyDown={onButtonKeyDown}
        className={styles.input}
      >
        <span className="min-w-0 flex-1 pr-5">
          <span
            className="block text-start truncate"
            title={selected?.label ?? placeholder}
          >
            {selected?.label ?? placeholder}
          </span>
        </span>
        <Icon name="icon-arrow-down" className="w-[14px] h-[9px]" />
      </button>


      {error && <p id="payment-error" className="mt-1 text-sm text-rose-600">{error}</p>}

      {/* випадаючий список */}
      {open && (
        <ul
          role="listbox"
          tabIndex={0}
          ref={listRef}
          onKeyDown={onListKeyDown}
          className="absolute top-19 max-h-72 w-full overflow-auto rounded-xl border border-gray-300 bg-[#f3f2f2] py-[10px] px-6 shadow-lg outline-none flex flex-col gap-[10px]"
        >
          {options.map((opt, i) => {
            const isSelected = opt.value === value;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={[
                  "font-roboto font-light text-sm md:text-base cursor-pointer rounded-lg",
                ].join(" ")}
              >
                <div
                  className={`${
                    isSelected ? "underline underline-offset-4" : ""
                  }`}
                >
                  {opt.label}
                </div>
                {opt.note && (
                  <div className="flex items-start gap-2 text-sm">
                    <span aria-hidden>⚠️</span>
                    <span className="text-xs">{opt.note}</span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
