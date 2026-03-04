"use client";

import DetailsOrder from "@/components/ui/MyOrders/DetailsOrder/DetailsOrder";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchOrderById } from "@/store/orders/operations";
import { selectCurrentOrder } from "@/store/orders/selectors";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const current = useAppSelector(selectCurrentOrder);
  const order = current?._id === id ? current : null;

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [dispatch, id]);

  if (!order) {
    return <div className="container py-10">Замовлення не знайдено</div>;
  }

  return <DetailsOrder order={order} />;
}
