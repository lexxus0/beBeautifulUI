import Image from "next/image";
import styles from "@/app/blog/Blog.module.scss";
import blogData from "@/data/blog-list.json";

export const HairStory = () => {
  const article = blogData.find(
    (item) => item.slug === "what-hair-can-tell-about-our-body",
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
            Волосся як дзеркало нашого здоров’я: що можуть сказати пасма про ваш
            стан
          </p>
          <div className={styles.mobileOnlyImage}>
            <Image
              src="/images/blog/hair/hair.png"
              width={335}
              height={180}
              alt="hair"
              priority
            />
          </div>
          <p className={styles.paragraph}>
            Волосся — це не лише естетика, а ще й відображення того, що
            відбувається всередині організму. Його стан залежить від хімічних
            процесів у клітинах, обміну речовин та зовнішніх факторів. Давайте
            розглянемо, які саме наукові факти стоять за цим.
          </p>
        </div>
        <div className={styles.desktopOnlyImage}>
          <Image
            src="/images/blog/hair/hair.png"
            width={600}
            height={400}
            alt="hair"
            priority
          />
        </div>
      </section>

      {/* БЛОК 2 */}
      <section className={styles.articleBlockSide}>
        <div className={styles.blockText}>
          <h2>Волосся як індикатор стану організму</h2>
          <p className={styles.paragraph}>
            Волосина на 95% складається з кератину — міцного білка, зшитого
            дисульфідними містками (зв’язки між атомами сірки в амінокислотах,
            зокрема цистеїні). Саме вони визначають міцність і пружність
            волосся.
          </p>
          <p className={styles.paragraph}>
            Якщо організм відчуває дефіцит поживних речовин (заліза, цинку,
            вітамінів групи B), це відображається на хімічних процесах у
            клітинах фолікула. Ріст волосся сповільнюється, структура стає
            слабшою, а зовні воно виглядає тьмяним.
          </p>
        </div>
        <div className={styles.sideImage}>
          <Image
            src="/images/blog/hair/hair-2.png"
            width={636}
            height={800}
            alt="hair"
          />
        </div>
      </section>

      {/* БЛОК 3 */}
      <section className={styles.articleBlockSide}>
        <div className={styles.blockText}>
          <h2>Як стрес впливає на випадіння</h2>
          <p className={styles.paragraph}>
            Хронічний стрес підвищує рівень кортизолу. Цей гормон впливає на
            мікроциркуляцію шкіри голови та порушує живлення клітин волосяних
            фолікулів. Науково доведено, що стрес може переводити волосся у фазу
            спокою (телоген), після чого воно передчасно випадає.
          </p>

          <p className={styles.paragraph}>
            Крім того, при стресі в клітинах зростає кількість вільних радикалів
            (окислювачів), які пошкоджують білкові структури та ДНК клітин
            фолікула. Це прискорює старіння і випадіння волосся.
          </p>
        </div>
        <div className={styles.sideImage}>
          <Image
            src="/images/blog/hair/hair-3.png"
            width={636}
            height={800}
            alt="hair"
          />
        </div>
      </section>

      {/* БЛОК 4 */}
      <section className={styles.articleBlockSide}>
        <div className={styles.blockText}>
          <h2>Роль харчування</h2>
          <p className={styles.paragraph}>
            Ріст волосся напряму залежить від синтезу білків і ферментів.
          </p>
          <ul className={styles.paragraphList}>
            <li className={styles.paragraphListItem}>
              Білки (амінокислоти, зокрема метіонін і цистеїн) — будівельний
              матеріал кератину.
            </li>
            <li className={styles.paragraphListItem}>
              Мікроелементи (залізо, цинк, магній, мідь) — активатори ферментів,
              які запускають реакції синтезу.
            </li>
            <li>
              Вітаміни групи B (особливо B7 — біотин, B12, B9) — беруть участь у
              метаболізмі амінокислот і нуклеїнових кислот.
            </li>
          </ul>
          <p className={styles.paragraph}>
            Якщо цих елементів бракує, волосся росте повільніше і стає слабшим.
            Це підтверджено численними клінічними дослідженнями.
          </p>
        </div>
        <div className={styles.sideImage}>
          <Image
            src="/images/blog/hair/hair-4.png"
            width={636}
            height={800}
            alt="hair"
          />
        </div>
      </section>

      {/* БЛОК 5 */}
      <section className={styles.articleBlockSide}>
        <div className={styles.blockText}>
          <h2>Сезонні зміни у волоссі</h2>
          <p className={styles.paragraph}>
            Сезонність випадіння — науково підтверджений факт.
          </p>
          <ul className={styles.paragraphList}>
            <li className={styles.paragraphListItem}>
              Восени кількість волосся у фазі телогену збільшується через
              зниження рівня вітаміну D та зміни гормонального фону.
            </li>
            <li className={styles.paragraphListItem}>
              Взимку волосся часто стає сухішим через низьку вологість і
              перепади температур, які впливають на ліпідний шар волосини.
            </li>
            <li>
              Навесні організм може відчувати дефіцит мікроелементів після зими,
              що теж відображається на структурі волосся.
            </li>
          </ul>
        </div>
        <div className={styles.sideImage}>
          <Image
            src="/images/blog/hair/hair-5.png"
            width={636}
            height={800}
            alt="hair"
          />
        </div>
      </section>

      {/* БЛОК 6 */}
      <section className={styles.articleBlockSide}>
        <div className={styles.blockText}>
          <h2>Жирність волосся і що насправді на неї впливає</h2>
          <p className={styles.paragraph}>
            Жирність волосся визначається активністю сальних залоз у шкірі
            голови. Вони виділяють себум — суміш жирних кислот, тригліцеридів і
            воскових ефірів, яка створює природний захист волосся.
          </p>
          <p className={styles.paragraph}>На роботу сальних залоз впливають:</p>
          <ul className={styles.paragraphList}>
            <li className={styles.paragraphListItem}>
              гормони (зокрема андрогени),
            </li>
            <li className={styles.paragraphListItem}>
              рівень стресу (кортизол може стимулювати посилене виділення
              себуму),
            </li>
            <li>
              харчування (надлишок простих вуглеводів і жирної їжі може
              підсилювати жирність),
            </li>
            <li>
              сон і відновлення (нестача сну порушує гормональний баланс),
            </li>
            <li>
              механічні фактори (часте доторкання до волосся чи агресивне
              розчісування розподіляють себум по довжині).
            </li>
          </ul>
          <p className={styles.paragraph}>
            {" "}
            А ось шампунь не «робить волосся жирним». Він лише змиває надлишки
            себуму. Якщо волосся швидко жирніє, це сигнал від організму, а не
            «помилка шампуню»
          </p>
        </div>
        <div className={styles.sideImage}>
          <Image
            src="/images/blog/hair/hair-6.png"
            width={636}
            height={800}
            alt="hair"
          />
        </div>
      </section>

      {/* БЛОК 7 */}
      <section className={styles.articleBlockSide}>
        <div className={styles.blockText}>
          <h2>Маленькі звички, які допомагають</h2>
          <ul className={styles.paragraphList}>
            <li className={styles.paragraphListItem}>
              Регулярне миття — видаляє себум, пил і продукти окислення.
            </li>
            <li className={styles.paragraphListItem}>
              Захист від сонця та холоду — ультрафіолет і мороз руйнують білкові
              та ліпідні структури.
            </li>
            <li>
              Збалансоване харчування — забезпечує організм амінокислотами,
              мікроелементами й антиоксидантами.
            </li>
            <li>
              Повноцінний сон — нормалізує гормональний фон і роботу сальних
              залоз
            </li>
            <li>
              М’яке розчісування — запобігає механічним пошкодженням і
              надмірному розподілу себуму по довжині.
            </li>
          </ul>
        </div>
        <div className={styles.sideImage}>
          <Image
            src="/images/blog/hair/hair-7.png"
            width={636}
            height={800}
            alt="hair"
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
            Волосся реагує на хімію нашого організму: білки, вітаміни, гормони,
            ферменти та баланс жирних кислот. Його стан — це точний «відбиток»
            внутрішніх процесів. І коли ми бачимо випадіння, сухість чи
            жирність, варто шукати причину не у шампуні, а в харчуванні, режимі,
            рівні стресу й догляді.
          </p>
        </div>
      </section>
    </div>
  );
};
