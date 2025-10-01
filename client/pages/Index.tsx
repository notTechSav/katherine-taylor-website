import DesignInMotionSection from "@/components/site/DesignInMotionSection";
import Hero from "@/components/site/Hero";
import ImmersiveVideoSection from "@/components/site/ImmersiveVideoSection";
import LegendReinventedSection from "@/components/site/LegendReinventedSection";
import LoveStorySection from "@/components/site/LoveStorySection";
import LoveUnlimitedSection from "@/components/site/LoveUnlimitedSection";

const Index = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <LoveUnlimitedSection />
      <LegendReinventedSection />
      <DesignInMotionSection />
      <ImmersiveVideoSection />
      <LoveStorySection />
    </div>
  );
};

export default Index;
