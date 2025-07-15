import Icon from "@/components/elements/icon";
import styles from "./Banner.module.scss";

const Banner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.imageWrapper}>
        <div className={styles.titleDesktop}>Створено Жінкою для Жінки</div>

        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.chatIcon}
        >
          <Icon name="icon-chat" className={styles.icon} />
        </a>
      </div>

      <div className={styles.titleMobile}>Створено Жінкою для Жінки</div>
    </section>
  );
};

export default Banner;
