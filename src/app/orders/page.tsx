import ProtectedPage from "@/components/elements/ProtectedPage";
import MyOrders from "@/components/ui/MyOrders/MyOrders";

export default function CabinetPage() {
  return (
    <ProtectedPage>
      <MyOrders />
    </ProtectedPage>
  );
}
