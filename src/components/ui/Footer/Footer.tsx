import type { FC } from "react";
import Logo from "@/components/elements/logo";
import Icon from "@/components/elements/icon";
import styles from "./Footer.module.css";
import Link from "next/link";

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

const Footer: FC = () => {

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.footerTop}>
          <div className={styles.footerMain}>
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
          <div className={styles.socialWrap}>
            <a
              href="mailto:hello@sciencebebeautiful.com"
              className={styles.emailLink}
            >
              hello@sciencebebeautiful.com
            </a>

            <ul className={styles.socials}>
              <li>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <Icon name="icon-facebook" className={styles.iconSocials} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <Icon name="icon-instagram" className={styles.iconSocials} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <Icon name="icon-linkedin" className={styles.iconSocials} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.links}>
            <Link href="/privacy-policy">Політика конфіденційності</Link>
            <span>|</span>
            <Link href="/terms">Умови використання</Link>
          </div>
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
