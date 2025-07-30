import { useState } from "react";
import Icon from "@/components/elements/icon";
import styles from "./Rate.module.css";

const Rate = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className={styles.starRating}>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? styles.on : styles.off}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <Icon name="icon-star" width={24} height={24} />
          </button>
        );
      })}
    </div>
  );
};

export default Rate;
