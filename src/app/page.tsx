import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import FeaturesSection from "@/components/FeaturesSection";
import PhilosophySection from "@/components/PhilosophySection";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      {/* Subtle border separator between abstract hero and grounded content */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

      <ProblemSection />
      <FeaturesSection />
      <PhilosophySection />
      <CTASection />

    </div>
  );
}
