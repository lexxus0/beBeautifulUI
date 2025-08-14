import ProductActions from "@/components/ui/ProductActions/ProductActions";
import ProductDescription from "@/components/ui/ProductDescription/ProductDescription";
import ProductGallery from "@/components/ui/ProductGallery/ProductGallery";
import ProductHeader from "@/components/ui/ProductHeader/ProductHeader";
import { IProduct } from "@/types/types";
import css from "./page.module.css";
import BrandPhilosophy from "@/components/ui/BrandPhilosophy/BrandPhilosophy";

const getProductById = async (id: string): Promise<IProduct> => {
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
      <div className={css.productContainer}>
        <div className={css.header}>
          <ProductHeader product={product} />
        </div>
        <div className={css.gallery}>
          <ProductGallery product={product} />
        </div>
        <div className={css.description}>
          <ProductDescription product={product} />
        </div>
        <div className={css.actions}>
          <ProductActions product={product} />
        </div>
      </div>
      <div className={css.fullWidthWrapper}>
        <BrandPhilosophy dynamicText="Цей шампунь — як свіже «доброго ранку» собі. І як щоденне нагадування: ти — варта найкращого." />
      </div>
    </section>
  );
}
