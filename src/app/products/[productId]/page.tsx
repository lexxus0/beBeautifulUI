// import Product from "@/components/ui/products/Product";
import WantToKnowMore from "@/components/ui/WantToKnowMore/WantToKnowMore";
import RecentlyViewed from "@/components/ui/RecentlyViewed/RecentlyViewed";
import ProductWrapper from "@/components/ui/products/ProductWrapper";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  console.log("Render ProductDetails");
  return (
    <>
      <ProductWrapper productId={productId} />
      <section className="container">
        <WantToKnowMore />
      </section>
      <section className="container">
        <RecentlyViewed />
      </section>
    </>
  );
}
