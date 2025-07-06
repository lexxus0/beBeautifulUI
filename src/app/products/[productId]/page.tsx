import ProductActions from "@/components/ui/ProductActions";
import ProductDescription from "@/components/ui/ProductDescription";
import ProductGallery from "@/components/ui/ProductGallery";
import ProductHeader from "@/components/ui/ProductHeader";

export const ProductsDetails = async ({ params }) => {
  return (
    <main>
      <ProductHeader />
      <ProductGallery />
      <ProductDescription />
      <ProductActions />
    </main>
  );
};
