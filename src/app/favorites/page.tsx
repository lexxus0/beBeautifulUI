"use client";

import BackButton from "@/components/ui/BackButton/BackButton";
import ProductItem from "@/components/ui/products/ProductItem";
import { useAppSelector } from "@/store/hooks";
import { IProduct } from "@/types/types";

const FavoritesPage = () => {
  const favorites = useAppSelector((state) => state.favorites.items);

  if (favorites.length === 0)
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <p className="font-normal text-[42px] leading-[140%] tracking-[0.01em] text-center">
          Список побажань порожній
        </p>
      </div>
    );

  return (
    <>
      <BackButton />
      <div className="pt-10 pb-10">
        <h1 className="text-center mb-10font-normal text-[42px] leading-[140%] tracking-[0.01em]">
          Список побажань
        </h1>
        <p className="text-center mb-10">
          Ми поєднуємо науковий підхід і натхнення природи, щоб створити
          свідомий догляд. Ваші побажання допомагають нам ставати кращими.
        </p>
        <div className="flex flex-wrap gap-10 justify-center my-10">
          {favorites.map((item: IProduct) => (
            <ProductItem key={item._id} item={item} />
          ))}
        </div>

        <p className="text-center">
          <span className="font-bold">Science Be Beautiful</span> — коли знання
          перетворюються на турботу, а наука служить красі.
        </p>
      </div>
    </>
  );
};

export default FavoritesPage;
