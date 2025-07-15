import ProductActions from "@/components/ui/ProductActions/ProductActions";
import ProductDescription from "@/components/ui/ProductDescription/ProductDescription";
import ProductGallery from "@/components/ui/ProductGallery";
import ProductHeader from "@/components/ui/ProductHeader/ProductHeader";
import { Product } from "@/types/types";

const getProductById = async (id: string): Promise<Product> => {
  const res = await fetch(
    `https://be-beautiful-backend.onrender.com/api/products/${id}`
  );
  const json = await res.json();
  return json.data;
};
export default async function ProductDetails({
  params,
}: {
  params: { productId: string };
}) {
  const product = await getProductById(params.productId);
  return (
    <section className="container">
      <ProductHeader product={product} />
      <ProductGallery product={product} />
      <ProductDescription product={product} />
      <ProductActions product={product} />
    </section>
  );
}
