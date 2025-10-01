import BoutiqueAppointmentSection from "@/components/site/BoutiqueAppointmentSection";
import DesignInMotionSection from "@/components/site/DesignInMotionSection";
import FAQSectionLuxury from "@/components/site/FAQSectionLuxury";
import Hero from "@/components/site/Hero";
import ImageMosaicSection from "@/components/site/ImageMosaicSection";
import ImmersiveVideoSection from "@/components/site/ImmersiveVideoSection";
import LegendReinventedSection from "@/components/site/LegendReinventedSection";
import LimitedAvailabilitySection from "@/components/site/LimitedAvailabilitySection";
import LoveStorySection from "@/components/site/LoveStorySection";
import LoveUnlimitedSection from "@/components/site/LoveUnlimitedSection";
import EmailSignupSection from "@/components/site/EmailSignupSection";

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
      <BoutiqueAppointmentSection />
      <LimitedAvailabilitySection />
      <LoveStorySection />
      <EmailSignupSection />
    </div>
  );
};

export default Index;
