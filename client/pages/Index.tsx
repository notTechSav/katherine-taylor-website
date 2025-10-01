import DesignInMotionSection from "@/components/site/DesignInMotionSection";
import FAQSectionLuxury from "@/components/site/FAQSectionLuxury";
import Hero from "@/components/site/Hero";
import ImageMosaicSection from "@/components/site/ImageMosaicSection";
import ImmersiveVideoSection from "@/components/site/ImmersiveVideoSection";
import LegendReinventedSection from "@/components/site/LegendReinventedSection";
import LoveStorySection from "@/components/site/LoveStorySection";
import LoveUnlimitedSection from "@/components/site/LoveUnlimitedSection";

const Index = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <ImageMosaicSection />
      <LoveUnlimitedSection />
      <LegendReinventedSection />
      <DesignInMotionSection />
      <ImmersiveVideoSection />
      <ImageMosaicSection />
      <FAQSectionLuxury />
      <LoveStorySection />
    </div>
  );
};

export default Index;
