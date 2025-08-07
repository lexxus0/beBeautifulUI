import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function notFound() {
  return (
    <div className="container py-8 md:pt-10 md:pb-20 lg:pt-16 lg:pb-40">
      <Image
        src="/images/not-found/ooops-mob.png"
        alt="not found page"
        width={318}
        height={224}
        className="md:hidden mx-auto mb-6"
      />
      <Image
        src="/images/not-found/ooops-tab.png"
        alt="not found page"
        width={573}
        height={404}
        className="hidden md:block lg:hidden mb-6 mx-auto"
      />
      <Image
        src="/images/not-found/ooops-desk.png"
        alt="not found page"
        width={1297}
        height={336}
        className="hidden lg:block mb-6 mx-auto"
      />
      <p className="font-source-sans-pro font-semibold text-black text-center md:text-xl lg:text-3xl">
        Ми перевірили всі молекули — цієї сторінки тут немає
      </p>
      <Image
        src="/images/not-found/404-mob.png"
        alt="not found page"
        width={220}
        height={206}
        className="lg:hidden mx-auto"
      />
      <Image
        src="/images/not-found/404-desk.png"
        alt="not found page"
        width={260}
        height={244}
        className="hidden lg:block mx-auto"
      />
      <p className="font-source-sans-pro text-lg text-center text-black italic mb-10 md:text-xl lg:text-2xl lg:mb-[78px]">
        Але турбота — завжди поруч
      </p>
      <div className="flex flex-col gap-6 md:flex-row md:gap-[22px] md:w-fit md:mx-auto">
        <Link
          href="/"
          className="font-open-sans py-4 rounded-lg text-lg md:text-xl md:w-[322px] lg:w-[416px] flex justify-center items-center
          bg-[linear-gradient(180deg,_#2d2d2d_4.33%,_#2d2d2d)] text-white transition-shadow duration-300 
             hover:bg-[#1a1a1a] hover:shadow-[0_4px_4px_0_rgba(0,0,0,0.24)] hover:border-b-[0.4px] hover:border-b-[#1a1a1a]
             focus:bg-[#1a1a1a] focus:shadow-[0_4px_4px_0_rgba(0,0,0,0.24)] focus:border-b-[0.4px] focus:border-b-[#1a1a1a]
             active:bg-[#111] active:border-b-[0.4px] active:border-b-[#111]"
        >
          Повернутись на головну
        </Link>
        <Link
          href="/products"
          className="font-open-sans py-4 rounded-lg text-lg md:text-xl md:w-[322px] lg:w-[416px] flex justify-center items-center
          border border-black-10 text-black-10 transition-all duration-300
             hover:border-b-[0.4px] hover:border-black hover:shadow-[0_4px_8px_0_rgba(45,45,45,0.24)]
             focus:border-b-[0.4px] focus:border-black focus:shadow-[0_4px_8px_0_rgba(45,45,45,0.24)]
             active:border-b-[0.4px] active:border-black active:bg-[#111] active:text-white"
        >
          Перейти до каталогу
        </Link>
      </div>
    </div>
  );
}
