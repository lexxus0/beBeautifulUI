"use client";

import { useState } from "react";
import { faqData } from "./faqData";
import Icon from "@/components/shared/Icon";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="container md:mb-16">
      <h2 className="font-lato font-semibold text-3xl text-center text-[#333] mb-8 md:text-5xl md:uppercase md:mt-10">
        Часті запитання
      </h2>

      {faqData.map((item, index) => {
        const isActive = activeIndex === index;

        return (
          <div
            key={item.num}
            className="border-b border-[#2d2d2d] mb-4 pb-2 cursor-pointer"
            onClick={() => toggleAccordion(index)}
          >

            <div className="flex items-center gap-6 w-full">
              <span className="font-lato font-semibold text-3xl text-[#2d2d2d] md:text-4xl">
                {item.num}
              </span>

              <h3
                className="
                  text-[#2d2d2d]
                  font-bold text-[16px] leading-[150%]
                  md:font-semibold md:text-[32px] md:leading-[150%] md:tracking-[0.01em]
                  font-roboto
                "
              >
                {item.question}
              </h3>

              <div
                className={`
                  ml-auto transition-transform duration-500 
                  ${isActive ? "rotate-[90deg] scale-[1.1]" : "rotate-0 scale-100"}
                `}
                style={{
                  transitionTimingFunction:
                    "cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                <Icon name="icon-long-right-arrow" className="w-8 h-8" />
              </div>
            </div>

            <div
              className={`
                text-[#666] overflow-hidden transition-all duration-500
                ease-[cubic-bezier(.4,0,.2,1)]
                ${isActive 
                  ? "max-h-[500px] opacity-100 translate-y-0" 
                  : "max-h-0 opacity-0 -translate-y-2"
                }

                /* typography mobile */
                font-light text-[14px] leading-[150%] tracking-[0.02em]

                /* typography tablet/desktop */
                md:text-[24px] md:leading-[150%] md:tracking-[0.02em] md:font-light

                /* indentation */
                pl-[62px]

                /* spacing between question & answer */
                mt-[30px] md:mt-[48px]
              `}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FAQ;
