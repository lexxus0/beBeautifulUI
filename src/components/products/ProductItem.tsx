import { IProduct } from "@/types/types";
import Image from "next/image";
import { useState } from "react";

interface ProductItemProps {
  item: IProduct;
  productId: string;
}

export default function ProductItem({ item, productId }: ProductItemProps) {
  const [selectedVolume, setSelectedVolume] = useState(item.priceByVolume[0]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = item.priceByVolume.find(
      (v) => v.volume === e.target.value
    );
    if (selected) {
      setSelectedVolume(selected);
    }
  };
  console.log(productId);

  return (
    <div className="px-4 md:w-[322px] lg:w-[400px]">
      <Image
        src="https://picsum.photos/id/237/290/306"
        alt={item.name}
        width={290}
        height={306}
        className="lg:w-[384px]"
      />
      <div className="my-6 text-center">
        <p className="font-lato font-semibold mb-4 text-2xl">{item.name}</p>
        <p className="font-roboto text-xl">{item.category}</p>
        <div className="flex justify-between items-center">
          <p className="font-roboto text-xl mt-2">
            <span className="font-semibold">{selectedVolume?.price} ₴</span>
          </p>
          <div className="my-4">
            <select
              id="volume"
              className="border px-4 py-2 rounded"
              value={selectedVolume?.volume}
              onChange={handleVolumeChange}
            >
              {item.priceByVolume.map((option) => (
                <option key={option._id} value={option.volume}>
                  {option.volume}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <button className="add-to-cart-btn-bg rounded-lg w-full h-14 text-center font-open-sans text-xl text-white">
        Додати до кошика
      </button>
    </div>
  );
}
