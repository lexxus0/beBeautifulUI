import { IProduct } from "@/types/types";
import Image from "next/image";

interface ProductItemProps {
  item: IProduct;
  productId: string;
}

export default function ProductItem({ item, productId }: ProductItemProps) {
  console.log(productId);
  return (
    <div>
      <Image src={item.imageUrl} alt={item.name} width={200} height={200} />
    </div>
  );
}
