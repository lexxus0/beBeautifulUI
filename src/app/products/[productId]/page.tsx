import ProductActions from "@/components/ui/ProductActions";
import ProductDescription from "@/components/ui/ProductDescription";
import ProductGallery from "@/components/ui/ProductGallery";
import ProductHeader from "@/components/ui/ProductHeader";
import { Product } from "@/types/types";

const getProductById = async (id: string): Promise<Product> => {
  const res = await fetch(
    `https://be-beautiful-backend.onrender.com/api/products/${id}`
  );
  return res.json();
};
export default async function ProductDetails({
  params,
}: {
  params: { productId: string };
}) {
  const product = await getProductById(params.productId);

  return (
    <section>
      <ProductHeader product={product.data} />
      <ProductGallery images={[product.data.imageUrl]} />
      <ProductDescription product={product} />
      <ProductActions product={product} />
    </section>
  );
}
