"use client";

import { ICartItem } from "@/types/types";
import Image from "next/image";
import styles from "./BasketItem.module.scss";

interface BasketItemProps {
  item: ICartItem;
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
  const { product, quantity, selectedVolume } = item;

  const option =
    product.priceByVolume.find((opt) => opt.volume === selectedVolume) ||
    product.priceByVolume[0];

  const unitPrice = option?.price ?? 0;
  const volumeLabel = option?.volume ?? "";
  const totalPrice = Math.round(unitPrice * quantity * 100) / 100;

  return (
    <div className={styles.item}>
      <div className={styles.wrapperInfo}>
        <Image
          className={styles.img}
          src={item.product.imageUrl}
          alt={item.product.name}
          width={124}
          height={112}
        />
        <div className={styles.info}>
          <p className={styles.titleEn}>{item.product.name}</p>
          <p className={styles.titleUk}>
            {item.product.name}
            {volumeLabel && (
              <span className={styles.volume}> {volumeLabel}</span>
            )}
          </p>
          <p className={styles.priceMob}>{totalPrice} грн</p>
        </div>
      </div>
      <div className={styles.wrapperPrice}>
        <div className={styles.quantity}>
          <button onClick={onDecrement}>-</button>
          <p>{quantity}</p>
          <button onClick={onIncrement}>+</button>
        </div>
        <p className={styles.priceDesk}>{totalPrice} грн</p>
        <button className={styles.remove} onClick={onRemove}>
          <svg
            className={styles.iconTrash}
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 9.5L18.005 20.846C17.9236 21.3094 17.6815 21.7292 17.3212 22.0317C16.9609 22.3342 16.5055 22.5 16.035 22.5H7.965C7.49454 22.5 7.03913 22.3342 6.67882 22.0317C6.31852 21.7292 6.07639 21.3094 5.995 20.846L4 9.5M21 6.5H15.375M15.375 6.5V4.5C15.375 3.96957 15.1643 3.46086 14.7892 3.08579C14.4141 2.71071 13.9054 2.5 13.375 2.5H10.625C10.0946 2.5 9.58586 2.71071 9.21079 3.08579C8.83571 3.46086 8.625 3.96957 8.625 4.5V6.5M15.375 6.5H8.625M3 6.5H8.625"
              stroke="#AF1818"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BasketItem;
