import Description from "@/components/ui/Description";
import FAQ from "@/components/ui/FAQ/FAQ";
import History from "@/components/ui/History";

export default function page() {
  return (
    <div className="container">
      <Description/>
      <History/>
      <FAQ />
    </div>
  );
}
