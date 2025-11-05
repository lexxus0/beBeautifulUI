"use client";

import BackButton from "@/components/ui/BackButton/BackButton";
import ProductItem from "@/components/ui/products/ProductItem";
import { useAppSelector } from "@/store/hooks";
import { IProduct } from "@/types/types";

const FavoritesPage = () => {
  const favorites = useAppSelector((state) => state.favorites.items);

  return (
    <>
      <BackButton />

      {favorites.length === 0 ? (
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <p className="font-normal text-[42px] leading-[140%] tracking-[0.01em] text-center">
            Список побажань порожній
          </p>
        </div>
      ) : (
        <div className="pt-[12px] pb-[20px] md:pt-[40px] md:pb-[40px] xl:pt-[60px] xl:pb-[60px] text-center">
          <h1
            className="font-semibold text-[24px] leading-[120%] mb-[16px]
      md:text-[32px] md:leading-[150%] md:tracking-[0.01em]
      xl:font-normal xl:text-[42px] xl:leading-[140%] xl:tracking-[0.01em] xl:mb-[16px]"
          >
            Список побажань
          </h1>
          <p
            className="font-light text-[16px] leading-[132%] mb-[20px] w-[335px] mx-auto
      md:text-[18px] md:leading-[150%] md:tracking-[0.02em] md:w-[664px] md:mb-[40px]
      xl:text-[24px] xl:leading-[150%] xl:tracking-[0.02em] xl:w-[1076px] xl:mb-[32px]"
          >
            Ми поєднуємо науковий підхід і натхнення природи, щоб створити
            свідомий догляд. Ваші побажання допомагають нам ставати кращими.
          </p>
          <div
            className="flex flex-wrap justify-center gap-10 mb-[40px]
      md:mb-[60px]
      xl:mb-[100px]"
          >
            {favorites.map((item: IProduct) => (
              <ProductItem key={item._id} item={item} />
            ))}
          </div>
          <p
            className="font-normal text-[18px] leading-[150%] w-[335px] mx-auto
      md:w-[664px]
      xl:text-[24px] xl:w-auto"
          >
            <span className="font-bold">Science Be Beautiful</span> — коли
            знання перетворюються на турботу, а наука служить красі.
          </p>
        </div>
      )}
    </>
  );
};

export default FavoritesPage;
