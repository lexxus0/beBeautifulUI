"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/auth/selectors";
import { useViewport } from "@/helpers/hooks/useViewport";
import { useHasMounted } from "@/helpers/hooks/useHasMounted";
import BasketBlackIcon from "@/components/elements/BasketBlackIcon";
import AccountMenu from "../AccountMenu/AccountMenu";
import LangSwitcher from "../LangSwitcher/LangSwitcher";

import styles from "./UserMenu.module.scss";
import Icon from "@/components/shared/Icon";

type UserMenuProps = {
  onCloseMobileModal?: () => void;
};

export default function UserMenu({ onCloseMobileModal }: UserMenuProps) {
  const hasMounted = useHasMounted();
  const user = useAppSelector(selectUser);
  // console.log("user: ", user);

  const [openModal, setOpenModal] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { width } = useViewport();
  const isDesktop = width !== null && width >= 1440;

  const onToggleModal = () => {
    setOpenModal((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpenModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!hasMounted) return null;

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <LangSwitcher className="hidden lg:block mr-6" />
      <button
        type="button"
        onClick={() => {}}
        className="hidden lg:w-8 lg:h-8 lg:block lg:mr-8"
      >
        <BasketBlackIcon className="lg:w-8 lg:h-8" />
      </button>

      <div className="flex gap-[13px] items-center">
        {user ? (
          <Image
            src={user.avatar}
            alt={user.name}
            fill
            className="w-10 h-10 rounded-lg lg:w-12 lg:h-12 object-cover"
          />
        ) : (
          // <span>{user.name.charAt(0)}</span>
          <span
            className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg border-1 border-black-10 bg-gray-10
    text-2xl font-medium text-white-30 flex items-center justify-center"
          >
            US
          </span>
        )}
        {user ? (
          <p className={styles.text}>{user.name}</p>
        ) : (
          <p className={styles.text}>User</p>
        )}
        <button
          type="button"
          onClick={onToggleModal}
          className="hidden lg:flex w-[18px] h-[9px] items-center justify-center
        text-white-30 lg:text-black-10 hover:text-black-10 lg:hover:text-gray-10"
        >
          <Icon name="icon-arrow-down" className="w-[10px] h-[6px]" />
        </button>
      </div>
      {isDesktop ? (
        openModal && <AccountMenu onClose={() => setOpenModal(false)} />
      ) : (
        <div className="flex gap-4 items-center lg:hidden">
          <AccountMenu onClose={onCloseMobileModal} />
        </div>
      )}
    </div>
  );
}
