import ProductActions from "@/components/ui/ProductActions/ProductActions";
import ProductDescription from "@/components/ui/ProductDescription/ProductDescription";
import ProductGallery from "@/components/ui/ProductGallery/ProductGallery";
import ProductHeader from "@/components/ui/ProductHeader/ProductHeader";
import { IProduct } from "@/types/types";
import css from "./page.module.css";
import BrandPhilosophy from "@/components/ui/BrandPhilosophy/BrandPhilosophy";
import VisitedProduct from "./VisitedProduct";
import RecentlyViewed from "@/components/ui/RecentlyViewed/RecentlyViewed";
import ProductReviews from "@/components/ui/ProductReviews/ProductReviews";

const getProductById = async (id: string): Promise<IProduct> => {
  try {
    const res = await fetch(
      `https://be-beautiful-backend.onrender.com/api/products/${id}`
    );
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    
    // Return a minimal product object to prevent crashes
    return {
      _id: id,
      name: "Продукт",
      sku: "UNKNOWN",
      volumeOptions: ["250ml"],
      priceByVolume: [{ volume: "250ml", price: 0, _id: "vol1" }],
      stockQuantity: 0,
      features: [],
      description: "Продукт тимчасово недоступний",
      instructions: "",
      activeIngredients: [],
      inciList: [],
      category: "unknown",
      isVegan: false,
      reviews: [],
      isPromoted: false,
      imageUrl: "/images/def.jpg",
      inStock: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }
};
export default async function ProductDetails({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = await getProductById(productId);

  return (
    <section className="container">
      <VisitedProduct productId={productId} />
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

      {/* Reviews Section */}
      <ProductReviews 
        productId={productId} 
        productName={product.name || "продукт"} 
      />

{/* нещодавно переглянуті */}
      <RecentlyViewed />
    </section>
  );
}
