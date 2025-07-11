import homeMetadata from "@/metadata/homeMetadata";
import Description from "@/components/ui/Description";
import FAQ from "@/components/ui/FAQ/FAQ";
import History from "@/components/ui/History";

export const metadata = homeMetadata;

export default function page() {
  return (
    <div className="container">
      <Description/>
      <History/>
      <FAQ />
    </div>
  );
}
