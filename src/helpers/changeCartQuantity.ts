import { deleteCartItem, updateCartItem } from "@/store/cart/operations";
import { removeGuestItem, updateGuestItemQuantity } from "@/store/cart/slice";
import { AppDispatch } from "@/store/store";
import { ICartItem } from "@/types/cart";

export const changeCartQuantity = ({
  item,
  type,
  dispatch,
  isLoggedIn,
  isGuest,
  onRemove,
}: {
  item: ICartItem;
  type: "inc" | "dec" | "remove";
  dispatch: AppDispatch;
  isLoggedIn: boolean;
  isGuest: boolean;
  onRemove?: (item: ICartItem) => void;
}) => {
  const { product, selectedVolume, quantity } = item;

  // === DECREMENT LOGIC ===
  const removeItem = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onRemove && onRemove(item);

    if (isLoggedIn && !isGuest) {
      dispatch(deleteCartItem({ productId: product._id }));
    } else {
      dispatch(
        removeGuestItem({
          productId: product._id,
          selectedVolume,
        })
      );
    }
  };

  // 🔴 явно видалити (по кнопці "кошик")
  if (type === "remove") {
    removeItem();
    return;
  }

  // === DECREMENT LOGIC ===
  if (type === "dec") {
    if (quantity === 1) {
      removeItem();
      return;
    }

    if (isLoggedIn && !isGuest) {
      dispatch(
        updateCartItem({
          productId: product._id,
          selectedVolume,
          quantity: quantity - 1,
        })
      );
    } else {
      dispatch(
        updateGuestItemQuantity({
          productId: product._id,
          selectedVolume,
          quantity: quantity - 1,
        })
      );
    }
    return;
  }

  // === INCREMENT LOGIC ===
  if (type === "inc") {
    if (isLoggedIn && !isGuest) {
      dispatch(
        updateCartItem({
          productId: product._id,
          selectedVolume,
          quantity: quantity + 1,
        })
      );
    } else {
      dispatch(
        updateGuestItemQuantity({
          productId: product._id,
          selectedVolume,
          quantity: quantity + 1,
        })
      );
    }
  }
};
