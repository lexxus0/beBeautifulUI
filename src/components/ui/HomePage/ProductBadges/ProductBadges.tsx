"use client";

import Image from "next/image";
import { badges } from "./badgesData";

const ProductBadges = () => {
  return (
    <section className="container">
      <div className="flex justify-center gap-2 md:gap-2 lg:gap-8 border-b border-[#e9ddce] py-[5px] md:py-4 lg:py-8">
        {badges.map((feature, idx) => (
          <div key={idx} className="flex-shrink-0">
            <Image
              src={feature.src}
              alt={feature.alt}
              width={60}
              height={60}
              className="md:w-[120px] md:h-[120px] lg:w-[120px] lg:h-[120px]"
              priority={true}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductBadges;
