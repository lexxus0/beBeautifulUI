import Logo from "@/components/elements/logo";
import Icon from "@/components/elements/icon";
import styles from "./Footer.module.css";
import Link from "next/link";

const Footer = () => {
  const navData = [
    ["Про бренд", "/about"],
    ["Каталог", "/products"],
    ["Блог", "/blog"],
    ["Книга", "/book"],
    ["Доставка", "/delivery"],
    ["Подарункові сертифікати", "/certificates"],
    ["FAQ", "/faq"],
    ["Контакти", "/contacts"],
  ];

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.footerTop}>
          <div>
            <Link href="/" className={styles.logo}>
              <Logo className={styles.logoIcon} />
            </Link>

            <nav className={styles.nav}>
              {navData.map(([label, href]) => (
                <Link key={href} href={href} className={styles.navLink}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <ul className={styles.socials}>
            <li>
              <Link href="https://www.facebook.com" className={styles.navLink}>
                <Icon name="icon-facebook" className={styles.iconSocials} />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.instagram.com/"
                className={styles.navLink}
              >
                <Icon name="icon-instagram" className={styles.iconSocials} />
              </Link>
            </li>
            <li>
              <Link href="https://www.linkedin.com/" className={styles.navLink}>
                <Icon name="icon-linkedin" className={styles.iconSocials} />
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.links}>
            <Link href="/privacy-policy">Політика конфіденційності</Link>
            <span>|</span>
            <Link href="/terms">Умови використання</Link>
          </p>
          <hr className={styles.divider} />
          <p className={styles.copyright}>
            &copy; 2025 Science Be Beautiful. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
