"use client";

import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

export default function FAQ() {
  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);

  const FAQ = [
    {
      num: "01",
      question: "Чи підходять ваші засоби для чутливої шкіри?",
      answer:
        "Так, ми використовуємо м'які та безпечні інгредієнти для чутливої шкіри.",
    },
    {
      num: "02",
      question: "Ви тестуєте продукцію на тваринах?",
      answer: "Ні, ми ніколи не тестуємо продукцію на тваринах.",
    },
    {
      num: "03",
      question: "Скільки триває доставка?",
      answer: "Зазвичай доставка займає від 2 до 5 робочих днів.",
    },
    {
      num: "04",
      question: "Чим ваші засоби відрізняються від інших?",
      answer:
        "Ми використовуємо виключно натуральні компоненти та сертифіковані формули.",
    },
    {
      num: "05",
      question: "Чи можна купити вашу продукцію офлайн?",
      answer: "Так, наша продукція доступна в обраних магазинах-партнерах.",
    },
    {
      num: "06",
      question: "Чи вся продукція сертифікована?",
      answer: "Так, уся наша продукція має відповідні сертифікати якості.",
    },
    {
      num: "07",
      question: "Який термін придатності продукції?",
      answer:
        "Термін придатності зазвичай складає 12–24 місяці, залежно від продукту.",
    },
    {
      num: "08",
      question: "Як правильно використовувати ваші засоби?",
      answer: "Повторимо ще раз — ні, ми повністю cruelty-free.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div>
      <h2 className="font-lato font-semibold text-3xl text-center text-[#333] mb-8 md:text-5xl md:uppercase md:mt-10">
        Часті запитання
      </h2>
      {FAQ.map((item, index) => {
        const isActive = activeIndexes.includes(index);
        return (
          <div
            key={item.num}
            className="border-b border-[#2d2d2d] mb-4 pb-2 cursor-pointer"
            onClick={() => toggleAccordion(index)}
          >
            <div className="flex items-center gap-6">
              <span className="font-lato font-semibold text-3xl text-[#2d2d2d] md:text-4xl">
                {item.num}
              </span>
              <h3 className="font-roboto font-light text-lg text-[#2d2d2d] md:text-2xl md:font-semibold">
                {item.question}
              </h3>
              <FaArrowRightLong className="ml-auto w-10 h-7" />
            </div>
            <div
              className={`font-lato text-base text-[#666] mt-2 transition-all duration-300 ease-in-out ${
                isActive
                  ? "max-h-40 opacity-100"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
