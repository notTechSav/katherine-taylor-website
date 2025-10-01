import AppointmentSection from "@/components/site/AppointmentSection";
import DesignInMotionSection from "@/components/site/DesignInMotionSection";
import Hero from "@/components/site/Hero";
import ImageMosaicSection from "@/components/site/ImageMosaicSection";
import ImmersiveVideoSection from "@/components/site/ImmersiveVideoSection";
import LegendReinventedSection from "@/components/site/LegendReinventedSection";
import LoveStorySection from "@/components/site/LoveStorySection";
import LoveUnlimitedSection from "@/components/site/LoveUnlimitedSection";
import NewLoveCTASection from "@/components/site/NewLoveCTASection";

const Index = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <ImageMosaicSection />
      <LoveUnlimitedSection />
      <LegendReinventedSection />
      <DesignInMotionSection />
      <ImmersiveVideoSection />
      <LoveStorySection />
      <AppointmentSection />
      <NewLoveCTASection />
    </div>
  );
};

export default Index;
