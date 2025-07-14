import homeMetadata from "@/metadata/homeMetadata";
import Description from "@/components/ui/Description/Description";
import FAQ from "@/components/ui/FAQ/FAQ";
import History from "@/components/ui/History/History";
import Category from "@/components/ui/Category/Category";

export const metadata = homeMetadata;

export default function page() {
  return (
    <div className="container">
      <Description/>
      <History/>
      <Category/>
      <FAQ />
    </div>
  );
}
