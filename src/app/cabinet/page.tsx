import ProtectedPage from "@/components/elements/ProtectedPage";
import UserCabinet from "@/components/ui/UserCabinet/UserCabinet";

export default function CabinetPage() {
  return (
    <ProtectedPage>
      <UserCabinet />
    </ProtectedPage>
  );
}
