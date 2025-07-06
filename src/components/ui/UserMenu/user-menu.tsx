import Icon from "@/components/elements/icon";
import Image from "next/image";
import React from "react";

import styles from "./user-menu.module.css";

export default function UserMenu() {
  return (
    <div className="flex items-center justify-between pb-1 border-b-1 border-b-[#fdfdfd] mb-8 xl:pb-0 xl:border-none xl:mb-0">
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
        <p className="font-semibold text-base text-[#fdfdfd] xl:text-lg xl:text-[#2d2d2d]">
          Іванка
        </p>
      </div>
      <div className="flex gap-4 items-center xl:hidden">
        <button>
          <Icon name="icon-edit" className={styles.icon} />
        </button>
        <button>
          <Icon name="icon-logout" className={styles.icon} />
        </button>
      </div>
    </div>
  );
}
