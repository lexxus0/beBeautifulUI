"use client";

import styles from "./BasketItem.module.scss";
import Image from "next/image";
import { BasketItemType } from "@/types/types";

interface BasketItemProps {
  item: BasketItemType;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

const BasketItem = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}: BasketItemProps) => {
  return (
    <div className={styles.item}>
      <Image src={item.image} alt={item.titleEn} width={80} height={80} />
      <div className={styles.info}>
        <div className={styles.titleEn}>{item.titleEn}</div>
        <div className={styles.titleUk}>
          {item.titleUk}, {item.volume}
        </div>
      </div>
      <div className={styles.quantity}>
        <button onClick={onDecrement}>-</button>
        <span>{item.quantity}</span>
        <button onClick={onIncrement}>+</button>
      </div>
      <div className={styles.price}>{item.price * item.quantity} ₴</div>
      <button className={styles.remove} onClick={onRemove}>
        ✕
      </button>
    </div>
  );
};

export default BasketItem;
