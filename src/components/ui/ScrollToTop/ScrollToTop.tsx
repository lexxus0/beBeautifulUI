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
      <div className={styles.container}>
        <div className={styles.inner}>
          <button className={styles.scrollToTop} onClick={scrollToTop}>
            <span className={styles.icon}>↑</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScrollToTop;