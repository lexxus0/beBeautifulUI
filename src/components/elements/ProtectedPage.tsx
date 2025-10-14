"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectIsLoggedIn, selectUser } from "@/store/auth/selectors";
import Loader from "@/components/ui/Loader/Loader";

export default function ProtectedPage({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const user = useAppSelector(selectUser);
    const isLoading = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/auth");
    }
  }, [user, isLoading, router]);

  if (!user) {
    return <Loader/>;
  }

  return <>{children}</>;
}
