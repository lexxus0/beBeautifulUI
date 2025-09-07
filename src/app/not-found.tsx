import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container py-10 md:py-15 lg:pt-10 relative">
      <div className="flex justify-between mb-11 md:mb-20 lg:mb-0">
        <div
          className="w-[158px] h-[172px] overflow-hidden rounded-sm shadow-[0_2px_8px_0_rgba(217,209,193,0.32)]
            md:w-[322px] md:h-[340px]
            lg:w-[636px] lg:h-[681px]"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center"
          >
            <source src="/images/not-found/IMG_4325.MP4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div>
          <Image
            src="/images/not-found/404-mob.png"
            alt="not found page"
            width={158}
            height={107}
            className="md:hidden mb-4"
          />
          <Image
            src="/images/not-found/404-tab.png"
            alt="not found page"
            width={322}
            height={224}
            className="hidden md:block lg:hidden mb-10"
          />
          <Image
            src="/images/not-found/404-desk.png"
            alt="not found page"
            width={636}
            height={442}
            className="hidden lg:block mb-10"
          />
          <p className="font-lato font-bold text-black-10 text-center text-xs mb-2 md:text-lg lg:font-normal lg:text-[28px] lg:mb-4">
            Цієї сторінки тут немає
          </p>

          <p className="font-roboto font-light text-[10px] text-center text-[#8d8d8d] md:text-sm lg:text-lg">
            Але турбота — завжди поруч
          </p>
        </div>
      </div>
      <div className="flex justify-between lg:absolute lg:right-18 lg:bottom-15 lg:w-[636px]">
        <Link
          href="/"
          className="w-[135px] sm:w-[158px] font-open-sans py-3 sm:py-[15px] rounded-lg text-[10px] sm:text-xs md:text-lg md:w-[322px] md:py-[13px] lg:w-[306px] lg:py-[18px] lg:text-base flex justify-center items-center
          bg-[linear-gradient(180deg,_#2d2d2d_4.33%,_#2d2d2d)] text-white transition-shadow duration-300 
             hover:bg-[#1a1a1a] hover:shadow-[0_4px_4px_0_rgba(0,0,0,0.24)] hover:border-b-[0.4px] hover:border-b-[#1a1a1a]
             focus:bg-[#1a1a1a] focus:shadow-[0_4px_4px_0_rgba(0,0,0,0.24)] focus:border-b-[0.4px] focus:border-b-[#1a1a1a]
             active:bg-[#111] active:border-b-[0.4px] active:border-b-[#111]"
        >
          Повернутись на головну
        </Link>
        <Link
          href="/products"
          className="w-[135px] sm:w-[158px] font-open-sans py-3 sm:py-[15px] rounded-lg text-[10px] sm:text-xs md:text-lg md:w-[322px] md:py-[13px] lg:w-[306px] lg:py-[18px] lg:text-base flex justify-center items-center
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
