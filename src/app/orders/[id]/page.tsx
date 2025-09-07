"use client";

import DetailsOrder from "@/components/ui/MyOrders/DetailsOrder/DetailsOrder";
import ordersData from "@/components/ui/MyOrders/orders.json";
import { useParams } from "next/navigation";
  
  export default function OrderDetailPage() {
    const { id } = useParams();

    const order = ordersData.find((o) => o._id === id);
    return <DetailsOrder  order={order}/>;
  }