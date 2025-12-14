import styles from "./Description.module.scss";

const Description: React.FC = () => {
  return (
    <section className="container relative" id="history">
      <div className={styles.description}>
        <div className={styles.top}>
          <h3>
            Science Be Beautiful - <br />
            <span>це більше, ніж просто засоби</span>
          </h3>
          <p>
            Це формули, в яких працює кожна молекула. Це засоби, що створені на
            перетині науки й ніжності — з повагою до шкіри, дому, ритму життя.
          </p>
        </div>

        <h2 className={styles.title}>Science Be Beautiful</h2>

        <div className={styles.bottom}>
          <p>
            Це не про “догляд для жінок і дітей”.
            <br /> Це про <strong>жінку</strong>, яка знає, чого хоче.
            <br /> Яка не вибирає між натуральним і ефективним.
            <br /> Яка хоче бути красивою — на своїх умовах, і жити в чистому
            просторі без компромісів.
          </p>
          <p>
            <span>Science Be Beautiful - </span>
            це коли турбота починається ще до відкриття баночки. Це не про
            маскування. Це про чесний догляд. Про безпечний дім. Про те, щоб
            було просто. Дієво. І красиво.
          </p>
        </div>
      </div>
      <div className="w-screen h-px bg-[#e0e0e0] absolute left-1/2 -translate-x-1/2 bottom-0 lg:-bottom-0"></div>
    </section>
  );
};

export default Description;
