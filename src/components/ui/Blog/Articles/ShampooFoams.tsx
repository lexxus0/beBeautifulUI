import Image from "next/image";
import styles from "@/app/blog/Blog.module.scss";
import blogData from "@/data/blog-list.json";

export const ShampooFoams = () => {
  const article = blogData.find(
    (item) => item.slug === "why-does-shampoo-foam",
  );
  if (!article) return null;

  return (
    <div className={styles.articleRichText}>
      {/* БЛОК 1 */}
      <section className={styles.articleBlock}>
        <div className={styles.blockText}>
          <span className={styles.fullDate}>{article.date}</span>
          <h1 className={styles.fullTitle}>{article.title}</h1>
          <p className={styles.mainParagraph}>Хімія бульбашок у ванній</p>
          <div className={styles.mobileOnlyImage}>
            <Image
              src="/images/blog/shampoo/foam-1.png"
              width={335}
              height={180}
              alt="foam"
              priority
            />
          </div>
          <p className={styles.paragraph}>
            Ви коли-небудь задумувались, чому шампунь під час миття
            перетворюється на густу піну?
          </p>
          <p className={styles.paragraph}>
            Здається, що це така проста річ — намочити волосся, нанести засіб і
            отримати м’які бульбашки. Але насправді за цим стоїть справжня хімія
            поверхонь і молекул.
          </p>
        </div>
        <div className={styles.desktopOnlyImage}>
          <Image
            src="/images/blog/shampoo/foam-1.png"
            width={600}
            height={400}
            alt="foam"
            priority
          />
        </div>
      </section>

      {/* БЛОК 2 */}
      <section className={styles.articleBlockSide}>
        <div className={styles.blockText}>
          <h2>Таємниця бульбашок: роль ПАР</h2>
          <p className={styles.paragraph}>
            У будь-якому шампуні є так звані поверхнево-активні речовини (ПАР).
          </p>
          <p className={styles.paragraph}>
            Це молекули, які мають «подвійну природу»:
          </p>
          <ul className={styles.paragraphList}>
            <li className={styles.paragraphListItem}>
              одна частина «любить» воду (гідрофільна),
            </li>
            <li className={styles.paragraphListItem}>
              інша — «любить» жир (гідрофобна).
            </li>
          </ul>
          <p className={styles.paragraph}>
            Коли ви миєте волосся, ці молекули працюють як маленькі «місточки»
            між водою та частинками бруду чи себуму. Вони обгортають забруднення
            і змивають їх.
          </p>
          <p className={styles.paragraph}>
            А піна — це побічний, але приємний ефект. Коли ми збовтуємо шампунь
            у воді, ПАР утворюють плівку навколо бульбашок повітря. І саме тому
            з’являється густа та стійка піна.
          </p>
        </div>
        <div className={styles.sideImage}>
          <Image
            src="/images/blog/shampoo/hair-in-foam-1.png"
            width={636}
            height={800}
            alt="hair in foam"
          />
        </div>
      </section>

      {/* БЛОК 3 */}
      <section className={styles.articleBlockSide}>
        <div className={styles.blockText}>
          <h2>Чому піна така важлива для нас?</h2>
          <p className={styles.paragraph}>
            Піна сама по собі не «миє». Але вона створює відчуття, що процес
            відбувається якісно:
          </p>
          <ul className={styles.paragraphList}>
            <li className={styles.paragraphListItem}>
              рівномірно розподіляє шампунь по волоссю,
            </li>
            <li className={styles.paragraphListItem}>
              допомагає масажувати шкіру голови,
            </li>
            <li>дарує приємний ритуал миття.</li>
          </ul>
          <p className={styles.paragraph}>
            Фактично піна — це як візуальний і тактильний індикатор, що шампунь
            почав працювати.
          </p>
        </div>
        <div className={styles.sideImage}>
          <Image
            src="/images/blog/shampoo/foam-2.png"
            width={636}
            height={800}
            alt="foam"
          />
        </div>
      </section>

      {/* БЛОК 4 */}
      <section className={styles.articleBlockSide}>
        <div className={styles.blockText}>
          <h2>А як щодо складу?</h2>
          <p className={styles.paragraph}>
            Сьогодні у формулах шампунів використовують різні типи ПАР. Є більш
            «сильні», які миють дуже інтенсивно, а є м’якші — з рослинних чи
            біотехнологічних джерел.
          </p>
          <p className={styles.paragraph}>
            Саме такі сучасні інгредієнти часто поєднують у формулах, щоб
            досягти балансу між ефективністю та ніжністю.
          </p>
          <p className={styles.paragraph}>
            Тому шампунь може одночасно гарно пінитися й бути м’яким до шкіри та
            волосся.
          </p>
        </div>
        <div className={styles.sideImage}>
          <Image
            src="/images/blog/shampoo/hair-in-foam-2.png"
            width={636}
            height={800}
            alt="hair in foam"
          />
        </div>
      </section>

      {/* БЛОК 5 */}
      <section className={styles.articleBlockSide}>
        <div className={styles.blockText}>
          <h2>Маленька наукова поезія</h2>
          <p className={styles.paragraph}>
            Кожна бульбашка у вашій долоні — це не просто повітря. Це цілий
            мікросвіт, де молекули працюють як архітектори: створюють тоненькі
            стінки, утримують форму й дозволяють нам насолоджуватися ніжною
            піною.
          </p>
        </div>
        <div className={styles.sideImage}>
          <Image
            src="/images/blog/shampoo/hands-in-foam.png"
            width={636}
            height={800}
            alt="hands in foam"
          />
        </div>
      </section>
    </div>
  );
};
