"use client";

import DetailsOrder from "@/components/ui/MyOrders/DetailsOrder/DetailsOrder";
import ordersData from "@/components/ui/MyOrders/orders.json";
import { IOrder } from "@/types/types";
import { useParams } from "next/navigation";
  
  export default function OrderDetailPage() {
    const { id } = useParams<{ id: string }>(); 

    const orders = ordersData as unknown as IOrder[];

    const order = orders.find((o) => o._id === id);

    if (!order) {
      return (
        <div className="container py-10">
          Замовлення не знайдено
        </div>
      );
    }
  
    return <DetailsOrder order={order} />;
  }