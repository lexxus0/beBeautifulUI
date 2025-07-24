"use client";

import React, { useState } from "react";
import Image from "next/image";
import Icon from "@/components/elements/Icon";
import AccountMenu from "../AccountMenu/AccountMenu";

import styles from "./UserMenu.module.css";

export default function UserMenu() {
  const [openModal, setOpenModal] = useState(false);

  const onToggleModal = () => {
    setOpenModal(prev => !prev);  
  };

  return (
    <div className={styles.wrapper}>
      <Icon
        name="icon-basket"
        className="hidden lg:block lg:w-8 lg:h-8 lg:mr-8"
      />

      <div className="flex gap-[13px] items-center">
        <Image
          src="/images/user.png"
          alt="VocabBuilder"
          width={48}
          height={48}
          className="block xl:hidden"
        />
        <Image
          src="/images/user-dek.png"
          alt="VocabBuilder"
          width={40}
          height={40}
          className="hidden xl:block"
        />
        <p className={styles.text}>Іванка</p>
        <button
          onClick={onToggleModal}
          className="w-[18px] h-[9px] flex items-center justify-center
        text-white-30 lg:text-black-10 hover:text-black-10 lg:hover:text-gray-10"
        >
          <Icon name="icon-arrow-down" className="w-[10px] h-[6px]" />
        </button>
      </div>
      <div className="flex gap-4 items-center xl:hidden">
        <button>
          <Icon name="icon-edit" className="w-6 h-6 fill-white-30" />
        </button>
        <button>
          <Icon name="icon-logout" className="w-6 h-6 fill-white-30" />
        </button>
      </div>
      {openModal && <AccountMenu onClose={()=> setOpenModal(false)}/>}
    </div>
  );
}
