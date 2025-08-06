import Image from "next/image";
import styles from "./LoaderSnake.module.scss";

const LoaderSnake = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.logoWrapper}>
        <div className={styles.logoInner}>
          <Image
            src="/logo.png"
            alt="Logo"
            fill
            className={styles.logo}
            priority
          />
        </div>
        <span className={styles.track}></span>
        <span className={styles.snake}></span>
      </div>
    </div>
  );
};

export default LoaderSnake;
