import React from "react";
import css from "@/components/ui/BrandPhilosophy/BrandPhilosophy.module.scss";

interface BrandPhilosophyProps {
  dynamicText: string;
}

const BrandPhilosophy: React.FC<BrandPhilosophyProps> = ({ dynamicText }) => {
  return (
    <div className={css.philosophyContainer}>
      <h2 className={css.title}>Цінність бренду у кожній баночці</h2>
      <div className={css.container}>
        <p>
          <span className={css.scienceSpan}>Science Be Beautiful®</span> — це
          формули, в яких є знання, любов і турбота про тебе. Кожен інгредієнт —
          це доказ, що навіть очищення може бути ніжним, природним і ефективним.
        </p>
        <p>{dynamicText}</p>
        <p>
          Ми віримо, що турбота про себе — це не розкіш. Це вибір. Про красу,
          яка починається не з дзеркала, а з внутрішнього «так» собі. Кожна
          баночка — як спокій. Як обійми. Як наука, що працює для тебе.
        </p>
      </div>
    </div>
  );
};

export default BrandPhilosophy;
