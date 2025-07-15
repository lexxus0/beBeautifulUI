import homeMetadata from "@/metadata/homeMetadata";
import Description from "@/components/ui/HomePage/Description/Description";
import FAQ from "@/components/ui/FAQ/FAQ";
import Reviews from "@/components/ui/Reviews/Reviews";
import History from "@/components/ui/HomePage/History/History";
import Certificates from "@/components/ui/Certificates/Certificates";
import Category from "@/components/ui/HomePage/Category/Category";
import Banner from "@/components/ui/HomePage/Banner/Banner";

export const metadata = homeMetadata;

export default function page() {
  return (
    <>
      <Banner/>
      <Description/>
      <History />
      <Category/>
      <Certificates />
      <FAQ />
      <Reviews />
    </>
  );
}