import Description from "@/components/ui/Description";
import FAQ from "@/components/ui/FAQ/FAQ";
import Reviews from "@/components/ui/Reviews/Reviews";
import History from "@/components/ui/History";

export default function page() {
  return (
    <div className="container">
      <Description />
      <History />
      <FAQ />
      <Reviews />
    </div>
  );
}
