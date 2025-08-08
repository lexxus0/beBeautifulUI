"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectIsLoggedIn, selectUser } from "@/store/auth/selectors";

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
    return null; // або <Loader/>
  }

  return <>{children}</>;
}
