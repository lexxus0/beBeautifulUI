"use client";

import ProductItem from "@/components/ui/products/ProductItem";
import { useAppSelector } from "@/store/hooks";
import { IProduct } from "@/types/types";

const FavoritesPage = () => {
  const favorites = useAppSelector((state) => state.favorites.items);

  if (favorites.length === 0)
    return <p className="text-center mt-10">Список обраних порожній</p>;

  return (
    <div className="flex flex-wrap gap-10 justify-center my-10">
      {favorites.map((item: IProduct) => (
        <ProductItem key={item._id} item={item} />
      ))}
    </div>
  );
};

export default FavoritesPage;
