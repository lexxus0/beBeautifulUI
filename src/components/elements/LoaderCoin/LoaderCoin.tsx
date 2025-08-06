import Image from "next/image";
import styles from "./LoaderCoin.module.css";

const LoaderCoin = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.logoWrapper}>
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className={styles.logo}
          priority
        />
      </div>
    </div>
  );
};

export default LoaderCoin;
