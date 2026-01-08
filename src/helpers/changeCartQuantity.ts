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
  const { product, variant, quantity, selectedVolume } = item;

  const volume = selectedVolume ?? variant.volume;
  const isServerCart = isLoggedIn && !isGuest;

  const removeItem = () => {
    onRemove?.(item);

    if (isServerCart) {
      dispatch(deleteCartItem({ productId: product._id, selectedVolume: volume }));
    } else {
      dispatch(
        removeGuestItem({
          productId: product._id,
          selectedVolume: volume,
        })
      );
    }
  };

  if (type === "remove") {
    removeItem();
    return;
  }

  const newQuantity = type === "inc" ? quantity + 1 : quantity - 1;

  if (newQuantity <= 0) {
    removeItem();
    return;
  }

  if (isServerCart) {
    dispatch(
      updateCartItem({
        productId: product._id,
        selectedVolume: volume,
        quantity: newQuantity,
      })
    );
  } else {
    dispatch(
      updateGuestItemQuantity({
        productId: product._id,
        selectedVolume: volume,
        quantity: newQuantity,
      })
    );
  }
};
