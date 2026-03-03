"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectIsLoggedIn } from "@/store/auth/selectors";
import { addCartItem } from "@/store/cart/operations";
import type { IOrderResponse } from "@/types/orders";
// import { clearServerCart } from "@/store/cart/operations";
import toast from "react-hot-toast";

export const useRepeatOrder = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const repeatOrder = async (order: IOrderResponse) => {
    if (!order.items?.length) return;

    if (!isLoggedIn) {
      toast.error("Увійдіть, щоб повторити замовлення");
      router.push("/login");
      return;
    }

    try {
      // якщо перезаписувати кошик:
      // await dispatch(clearServerCart()).unwrap();

      for (const item of order.items) {
        if (!item.product) continue;

        await dispatch(
          addCartItem({
            productId: item.product._id,
            selectedVolume: item.selectedVolume,
            quantity: item.quantity,
          })
        ).unwrap();
      }

      return true;
    } catch {
      toast.error("Не вдалося повторити замовлення");
      return false;
    }
  };

  return { repeatOrder };
};
