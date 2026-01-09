"use client";

import { ICartItem } from "@/types/cart";
import { useResponsiveImage } from "@/helpers/hooks/useResponsiveImage";
import { useMemo, useState } from "react";
import { normalizeBackendImageUrl } from "@/helpers/normalizeImage";
import Image from "next/image";
import Icon from "@/components/shared/Icon";
import styles from "./BasketItem.module.scss";
import Link from "next/link";

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
  const [imgError, setImgError] = useState(false);

  const { product, quantity, variant } = item;

  const { size, srcPlaceholder } = useResponsiveImage(
    { w: 124, h: 112 },
    { w: 94, h: 94 },
    { w: 196, h: 156 }
  );

  const unitPrice = variant.price ?? 0;
  const volumeLabel = variant.volume ?? "";
  const totalPrice = Math.round(unitPrice * quantity * 100) / 100;

  const imageSrc = useMemo(() => {
    return normalizeBackendImageUrl(product.imageUrl);
  }, [product.imageUrl]);

  const canRenderImage = !!imageSrc && !imgError;

  const handleDecrement = () => {
    if (quantity > 1) {
      onDecrement();
    } else {
      onRemove();
    }
  };

  return (
    <div className={styles.item}>
      <Link href={`/products/${product._id}`} className={styles.wrapperInfo}>
        {canRenderImage ? (
          <Image
            src={item.product.imageUrl}
            alt={item.product.name?.ua}
            width={size.w}
            height={size.h}
            className={styles.img}
            onError={() => setImgError(true)}
          />
        ) : (
          <Image
            className={styles.img}
            src={srcPlaceholder}
            alt={item.product.name?.ua}
            width={size.w}
            height={size.h}
          />
        )}
        <div className={styles.info}>
          <p className={styles.titleEn}>{item.product.name?.ua}</p>
          <p className={styles.titleUk}>
            {/* {item.product.name.ua} */}
            {item.product.category.charAt(0).toUpperCase() +
              item.product.category.slice(1)}
            <span className={styles.volume}>{volumeLabel} мл</span>
          </p>
          <p className={styles.priceMob}>{totalPrice} грн</p>
        </div>
      </Link>

      <div className={styles.wrapperPrice}>
        <div className={styles.quantity}>
          <button onClick={handleDecrement}>
            <Icon name="icon-minus" />
          </button>
          <p>{quantity}</p>
          <button onClick={onIncrement}>
            <Icon name="icon-plus" />
          </button>
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
