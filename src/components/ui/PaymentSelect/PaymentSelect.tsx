"use client";

import BaseSelect from "@/components/elements/BaseSelect";

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
    note: "⚠️ Комісію за післяплату сплачує отримувач",
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
  return (
    <BaseSelect
      label={label}
      options={options}
      value={value}
      onSelect={(v) => onChange(v as PaymentChoice)}
      placeholder={placeholder}
      error={error}
      iconRight="icon-arrow-down"
      renderOption={(opt, selected) => (
        <div className="flex flex-col ">
          {/* основний текст */}
          <div
            className={`font-roboto font-light text-sm md:text-base ${
              selected ? "underline underline-offset-4" : ""
            }`}
          >
            {opt.label}
          </div>

          {/* додаткова примітка */}
          {opt.note && (
            <span className="text-xs font-roboto font-light mt-[2px]">
              {opt.note}
            </span>
          )}
        </div>
      )}
    />
  );
}
