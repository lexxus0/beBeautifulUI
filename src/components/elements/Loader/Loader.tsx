import Image from "next/image";
import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <Image
        src="/logo.png"
        alt="Logo"
        width={60}
        height={60}
        className={styles.logoLoader}
        priority
      />
    </div>
  );
}

export default Loader;
