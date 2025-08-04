"use client";

import { useEffect, useState } from "react";
import styles from "./ScrollToTop.module.scss";

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <button className={styles.scrollToTop} onClick={scrollToTop}>
          <svg
            width="40"
            height="18"
            viewBox="0 0 40 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: "rotate(90deg)" }}
          >
            <path
              d="M39.5 8.97167L0.957167 8.99984M17 1L0.5 8.99984L17 17"
              stroke="#111111"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ScrollToTop;
