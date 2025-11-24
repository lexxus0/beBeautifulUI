import Product from "@/components/ui/products/Product";
import WantToKnowMore from "@/components/ui/WantToKnowMore/WantToKnowMore";
import RecentlyViewed from "@/components/ui/RecentlyViewed/RecentlyViewed";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  return (
    <>
        <Product productId={productId} />
        <section className="container">
          <RecentlyViewed />
        </section>
        <section className="container">
          <WantToKnowMore />
        </section>
    </>
  );
}
