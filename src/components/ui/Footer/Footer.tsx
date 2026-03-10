import Logo from "@/components/shared/Logo";
import styles from "./Footer.module.scss";
import Link from "next/link";
import Icon from "@/components/shared/Icon";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

const navData = [
  { href: "/#history", label: "Про бренд" },
  { href: "/products", label: "Каталог" },
  { href: "/blog", label: "Блог" },
  { href: "/pay-and-delivery", label: "Оплата і доставка" },
  { href: "/#certificates", label: "Подарункові сертифікати" },
  { href: "/#faq", label: "FAQ" },
];

const firstColumn = navData.slice(0, 3);
const secondColumn = navData.slice(3);

const Footer: React.FC = () => {
  const router = useRouter();

  const handleLinkClick = useCallback(
    (href: string) => {
      if (href.startsWith("/#")) {
        const id = href.split("#")[1];
        sessionStorage.setItem("scrollTo", id);
        router.push("/");
      } else {
        router.push(href);
      }
    },
    [router]
  );

  return (
    <footer id="footer" className={styles.footer}>
      <div className="container">
        <div className={styles.footerContainer}>
          <div className={styles.footerTop}>
            <div className={styles.footerMain}>
              <Link href="/" className={styles.logo}>
                <Logo className={styles.logoIcon} />
              </Link>

              <nav className={styles.nav}>
                <div className={styles.navWrap}>
                  {firstColumn.map(({ label, href }) => (
                    <Link
                      key={href}
                      href={href}
                      className={styles.navLink}
                      onClick={() => handleLinkClick(href)}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
                <div className={styles.navWrap}>
                  {secondColumn.map(({ label, href }) => (
                    <Link
                      key={href}
                      href={href}
                      className={styles.navLink}
                      onClick={() => handleLinkClick(href)}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
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
                    href="https://telegram.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    <Icon name="icon-telegram" className={styles.iconSocials} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    <Icon
                      name="icon-instagram"
                      className={styles.iconSocials}
                    />
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
      </div>
    </footer>
  );
};

export default Footer;
