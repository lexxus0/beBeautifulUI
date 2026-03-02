"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Icon from "../shared/Icon";

type BaseOption = {
  value: string;
  label: string;
  note?: string;
};

type BaseSelectProps = {
  options: BaseOption[];
  value?: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  renderOption?: (opt: BaseOption, selected: boolean) => ReactNode;
  className?: string;
  iconLeft?: string;
  iconRight?: string;
  searchable?: boolean;
  onClear?: () => void;
  clearable?: boolean;
  clearMode?: "replace" | "both" | "none";
};

export default function BaseSelect({
  options,
  value,
  onSelect,
  placeholder,
  label,
  error,
  renderOption,
  className,
  iconLeft,
  iconRight,
  searchable = false,
  onClear,
  clearable,
  clearMode = "none",
}: BaseSelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [query, setQuery] = useState("");

  const rootRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const selected = options.find((opt) => opt.value === value);

  const filtered = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(query.toLowerCase())
      )
    : options;

  useEffect(() => {
    if (!value) {
      setQuery("");
      return;
    }
    if (selected && !open) {
      setQuery(selected.label);
    }
  }, [value, selected, open]);

  // Закриття при кліку поза елементом
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // Клавіатурна навігація
  const handleListKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key === "Escape") return setOpen(false);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(options.length - 1, i + 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const opt = options[activeIndex];
      if (opt) {
        onSelect(opt.value);
        setOpen(false);
      }
    }
  };

  const showClear = !!(clearable && value);
  const mode = clearMode ?? "none";

  return (
    <div
      ref={rootRef}
      className={`relative w-full max-w-xl mb-[34px] md:mb-[42px] lg:mb-15 ${className}`}
    >
      {label && (
        <label className="mb-[2px] font-roboto font-light text-sm md:text-base text-gray-10">
          {label}
        </label>
      )}

      {/* Поле або кнопка */}
      <div
        className="relative flex items-center justify-between border-b rounded-lg border-black-10"
        onClick={() => setOpen(true)}
      >
        {iconLeft && (
          <Icon
            name={iconLeft}
            className="w-[18px] h-[18px] absolute top-[14px] left-3 fill-transparent stroke-black-10"
          />
        )}

        {/* Кнопка або кастомний елемент */}
        {searchable ? (
          <input
            ref={inputRef}
            value={query || selected?.label || ""}
            onChange={(e) => {
              const val = e.target.value;
              setQuery(val);
              setOpen(true);
              if (val === "") {
                onSelect("");
              }
            }}
            placeholder={placeholder}
            onClick={() => setOpen(true)}
            className="w-full p-3 pl-[48px] text-sm md:text-base placeholder:text-black-10 bg-transparent outline-none"
          />
        ) : (
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className={`w-full p-3 pr-2 text-sm bg-transparent outline-none ${
              iconLeft ? "pl-[48px]" : ""
            }`}
          >
            <span
              className={`block font-roboto font-light text-start ${className}`}
            >
              {selected?.label ?? placeholder}
            </span>
          </button>
        )}

        <div className={`absolute right-2 ${className}`}>
          {/* ❌ clear */}
          {mode !== "none" && showClear && (
            <button
              type="button"
              aria-label="Очистити"
              onClick={(e) => {
                e.stopPropagation();
                onClear?.();
                onSelect("");
                setQuery("");
                setActiveIndex(0);
                setOpen(false);
              }}
            >
              <Icon
                name="icon-close"
                className="w-4 h-4 text-gray-500 fill-transparent"
              />
            </button>
          )}

          {/* ⬇️ arrow */}
          {iconRight &&
            (mode === "both" ||
              mode === "none" ||
              (mode === "replace" && !showClear)) && (
              <button
                type="button"
                aria-label="Відкрити список"
                onClick={(e) => {
                  e.stopPropagation();
                  onClear?.();
                  onSelect("");
                  setQuery("");
                  setActiveIndex(0);
                  setOpen((prev) => !prev);
                }}
              >
                <Icon
                  name={iconRight}
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
        </div>
      </div>

      {error && (
        <p className="mt-1 text-sm text-rose-600" id="error-message">
          {error}
        </p>
      )}

      {/* Випадаючий список */}
      {open && (
        <ul
          ref={listRef}
          tabIndex={0}
          onKeyDown={handleListKeyDown}
          className="absolute top-18 left-0 w-full max-h-72 overflow-auto bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-10"
        >
          {filtered.map((opt, i) => {
            const isSelected = opt.value === value;
            return (
              <li
                key={opt.value}
                onClick={() => {
                  onSelect(opt.value);
                  setQuery(opt.label);
                  setOpen(false);
                }}
                onMouseEnter={() => setActiveIndex(i)}
                className={`px-4 py-2 cursor-pointer ${
                  isSelected ? "underline underline-offset-4" : ""
                }`}
              >
                {renderOption ? renderOption(opt, isSelected) : opt.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
