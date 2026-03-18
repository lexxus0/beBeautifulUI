import Image from "next/image";
import styles from "@/app/blog/Blog.module.scss";
import blogData from "@/data/blog-list.json";

export const Myths = () => {
  const article = blogData.find(
    (item) => item.slug === "5-myths-about-hair-care",
  );
  if (!article) return null;

  return (
    <div className={styles.articleRichText}>
      {/* БЛОК 1 */}
      <section className={styles.articleBlock}>
        <div className={styles.blockText}>
          <span className={styles.fullDate}>{article.date}</span>
          <h1 className={styles.fullTitle}>{article.title}</h1>
          <p className={styles.mainParagraph}>
            Розвінчуємо найпопулярніші помилки, які заважають мати красиве та
            здорове волосся
          </p>
          <div className={styles.mobileOnlyImage}>
            <Image
              src="/images/blog/myths/girl-and-2-bottles.png"
              width={335}
              height={180}
              alt="girl and 2 bottles"
              priority
            />
          </div>
          <p className={styles.paragraph}>
            Кожна з нас хоча б раз чула поради від подруг, майстрів чи навіть
            бабусь: «Мий голову двічі», «Волосся звикає до шампуню», «Чим більше
            піни — тим краще». Здається, що в цьому є логіка. Але чи справді це
            так? Давайте розберемося.
          </p>
        </div>
        <div className={styles.desktopOnlyImage}>
          <Image
            src="/images/blog/myths/girl-and-2-bottles.png"
            width={600}
            height={400}
            alt="girl and 2 bottles"
            priority
          />
        </div>
      </section>

      {/* БЛОК 2 */}
      <section className={styles.articleBlockSide}>
        <div className={styles.blockText}>
          <h2>Міф 1. Волосся звикає до шампуню</h2>
          <p className={styles.paragraph}>
            Правда: волосся не має пам’яті, воно не «звикає». Змінюється не
            волосся, а потреби шкіри голови. Влітку ми більше потіємо, взимку —
            страждаємо від сухого повітря, а стрес теж може впливати на стан.
            Тому іноді варто міняти шампунь залежно від сезону чи стану шкіри,
            але не через «звикання».
          </p>
        </div>
        <div className={styles.sideImage}>
          <Image
            src="/images/blog/myths/girl-and-1-bottle.png"
            width={636}
            height={800}
            alt="girl and 1 bottles"
          />
        </div>
      </section>

      {/* БЛОК 3 */}
      <section className={styles.articleBlockSide}>
        <div className={styles.blockText}>
          <h2>Міф 2. Чим більше піни — тим чистіше волосся</h2>
          <p className={styles.paragraph}>
            Правда: піна — це результат роботи поверхнево-активних речовин. Вона
            допомагає рівномірно розподілити шампунь і створює приємний ефект
            миття, але її кількість не визначає якість очищення. Чистота
            залежить від складу шампуню та правильно підібраної формули.
          </p>
        </div>
        <div className={styles.sideImage}>
          <Image
            src="/images/blog/myths/hair-in-foam.png"
            width={636}
            height={800}
            alt="hair in foam"
          />
        </div>
      </section>

      {/* БЛОК 4 */}
      <section className={styles.articleBlockSide}>
        <div className={styles.blockText}>
          <h2>
            Міф 3. Чим частіше підстригати кінчики, тим швидше росте волосся
          </h2>
          <p className={styles.paragraph}>
            Правда: ріст волосся відбувається у фолікулах на шкірі голови, а не
            на кінчиках. Стрижка не впливає на швидкість росту, але допомагає
            зберегти волосся охайним і запобігти ламкості. Регулярне підрізання
            створює ілюзію більш здорового й густого волосся.
          </p>
        </div>
        <div className={styles.sideImage}>
          <Image
            src="/images/blog/myths/scissors-in-hand.png"
            width={636}
            height={800}
            alt="scissors in hand"
          />
        </div>
      </section>

      {/* БЛОК 5 */}
      <section className={styles.articleBlockSide}>
        <div className={styles.blockText}>
          <h2>Міф 4. Мити голову потрібно лише один раз</h2>
          <p className={styles.paragraph}>
            Кожна бульбашка у вашій долоні — це не просто повітря. Це цілий
            мікросвіт, де молекули працюють як архітектори: створюють тоненькі
            стінки, утримують форму й дозволяють нам насолоджуватися ніжною
            піною.
          </p>
        </div>
        <div className={styles.sideImage}>
          <Image
            src="/images/blog/myths/girl-washes-her-hair.png"
            width={636}
            height={800}
            alt="girl washes her hair"
          />
        </div>
      </section>

      {/* БЛОК 6 */}
      <section className={styles.articleBlockSide}>
        <div className={styles.blockText}>
          <h2>Міф 5. Маска може замінити кондиціонер</h2>
          <p className={styles.paragraph}>
            Правда: маска й кондиціонер мають різні завдання.
          </p>
          <ul className={styles.paragraphList}>
            <li className={styles.paragraphListItem}>
              Кондиціонер швидко закриває кутикулу, робить волосся гладким і
              слухняним
            </li>
            <li className={styles.paragraphListItem}>
              Маска працює глибше, насичує й відновлює
            </li>
          </ul>
          <p className={styles.paragraph}>
            Вони не взаємозамінні, а доповнюють одне одного.
          </p>
        </div>
        <div className={styles.sideImage}>
          <Image
            src="/images/blog/myths/girl-washes-her-hair-2.png"
            width={636}
            height={800}
            alt="girl washes her hair"
          />
        </div>
      </section>

      {/* ВИСНОВОК */}
      <section
        className={`${styles.articleBlockSide} ${styles.conclusionBlock}`}
      >
        <div className={styles.blockText}>
          <h2>Висновок:</h2>
          <p className={styles.paragraph}>
            Наші уявлення про догляд часто ґрунтуються на міфах, які передаються
            «з уст в уста». Але реальність інша: слухайте не міфи, а своє
            волосся й дослухайтесь до науково доведених фактів. Саме баланс між
            очищенням, зволоженням і захистом робить волосся справді здоровим.
          </p>
        </div>
      </section>
    </div>
  );
};
