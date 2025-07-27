import Icon from "@/components/elements/Icon";
import styles from "./Banner.module.scss";

const Banner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.imageWrapper}>
        <div className={`container ${styles.bannerContainer}`}>
          <div className={styles.titleDesktop}>Створено жінкою для жінки</div>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.chatIcon}
          >
            <Icon name="icon-chat" className={styles.icon} />
          </a>
        </div>
      </div>
      <div className={styles.titleMobile}>Створено жінкою для жінки</div>
    </section>
  );
};

export default Banner;
