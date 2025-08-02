import homeMetadata from "@/metadata/homeMetadata";
import Description from "@/components/ui/HomePage/Description/Description";
import FAQ from "@/components/ui/HomePage/FAQ/FAQ";
import Reviews from "@/components/ui/Reviews/Reviews";
import History from "@/components/ui/HomePage/History/History";
import Certificates from "@/components/ui/HomePage/Certificates/Certificates";
import Category from "@/components/ui/HomePage/Category/Category";
import Banner from "@/components/ui/HomePage/Banner/Banner";
import TopProducts from "@/components/ui/HomePage/TopProducts/TopProducts";

export const metadata = homeMetadata;

export default function page() {
  return (
    <>
      <Banner />
      <TopProducts />
      <Description />
      <History />
      <Category />
      <Certificates />
      <FAQ />
      <Reviews />
    </>
  );
}
