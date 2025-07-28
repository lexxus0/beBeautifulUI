"use client";
import { selectUser } from "@/store/auth/selectors";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import ProfileForm from "./ProfileForm/ProfileForm";
import Icon from "@/components/elements/Icon";

import styles from "./UserCabinet.module.scss";

export default function UserCabinet() {
  const user = useAppSelector(selectUser);
  return (
    <div className="container py-6 md:pt-4 md:pb-10 lg:pt-10 lg:pb-15 ">
      <h2 className="font-lato font-semibold text-2xl lg:text-[42px] text-[#49454f] mb-8">
        Редагувати профіль
      </h2>
      <div className="w-full  md:w-[436px] mx-auto mb-10 lg:w-full lg:flex gap-[134px] items-center lg:mb-[156px] relative">
        <div className="relative w-45 h-45 lg:w-[306px] lg:h-[306px] mb-12 mx-auto md:mb-[50px] lg:mx-0 lg:mb-0">
          {user ? (
            <Image
              src={user.avatar}
              alt={user.name}
              fill
              className="w-45 h-45 rounded-lg lg:w-[306px] lg:h-[306px] object-cover mx-auto"
            />
          ) : (
            // <span>{user.name.charAt(0)}</span>
            <span
              className="w-45 h-45 lg:w-[306px] lg:h-[306px] rounded-lg border-1 border-black-10 bg-gray-10
          text-7xl font-medium text-white-30 flex items-center justify-center mx-auto lg:mx-0"
            >
              US
            </span>
          )}
          <button type="button" className={styles.btnEdit}>
            <Icon name="icon-edit" className="w-[19px] h-[19px]" />
          </button>
        </div>
        <ProfileForm />
      </div>
      <button
        type="button"
        className="font-open-sans text-lg md:text-xl mx-auto flex gap-3 items-center p-3 lg:ml-0"
      >
        <Icon name="icon-logout" className="w-6 h-6" />
        Вихід
      </button>
    </div>
  );
}
