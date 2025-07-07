import Icon from "@/components/elements/icon";
import Image from "next/image";
import React from "react";

import styles from "./user-menu.module.css";

export default function UserMenu() {
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
      </div>
      <div className="flex gap-4 items-center xl:hidden">
        <button>
          <Icon name="icon-edit" className="w-6 h-6 fill-white-30" />
        </button>
        <button>
          <Icon name="icon-logout" className="w-6 h-6 fill-white-30" />
        </button>
      </div>
    </div>
  );
}
