import homeMetadata from "@/metadata/homeMetadata";
import Description from "@/components/ui/Description/Description";
import FAQ from "@/components/ui/FAQ/FAQ";
import Reviews from "@/components/ui/Reviews/Reviews";
import History from "@/components/ui/History/History";
import Certificates from "@/components/ui/Certificates/Certificates";
import Category from "@/components/ui/Category/Category";

export const metadata = homeMetadata;

export default function page() {
  return (
    <div className="container">
      <Description />
      <Category />
      <History />
      <Certificates />
      <FAQ />
      <Reviews />
    </div>
  );
}
