"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/auth/selectors";
// import Image from "next/image";
import { signoutUser } from "@/store/auth/operations";
import ProfileForm from "./ProfileForm/ProfileForm";
import Icon from "@/components/shared/Icon";
import { useRouter } from "next/navigation";

export default function UserCabinet() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);

  const handleLogout = async () => {
    try {
      await dispatch(signoutUser());
      router.push("/");
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  return (
    <div className="container py-6 md:pt-4 md:pb-5 lg:pt-10 lg:pb-15 ">
      <h2 className="font-lato font-semibold text-2xl lg:text-[42px] text-[#49454f] mb-8 lg:mb-10">
        Редагувати профіль
      </h2>
      <ProfileForm user={user} />
      <button
        type="button"
        onClick={handleLogout}
        className="font-open-sans text-lg md:text-xl mx-auto flex gap-3 items-center p-3 lg:ml-0 lg:mt-[140px]"
      >
        <Icon name="icon-logout" className="w-6 h-6" />
        Вихід
      </button>
    </div>
  );
}
