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
      <section className="container">
        <Product productId={productId} />
        <section>
          <RecentlyViewed />
        </section>
        <section>
          <WantToKnowMore />
        </section>
      </section>
    </>
  );
}
