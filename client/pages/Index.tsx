import BoutiqueAppointmentSection from "@/components/site/BoutiqueAppointmentSection";
import FAQTeaserSection from "@/components/site/FAQTeaserSection";
import GiftsBannerSection from "@/components/site/GiftsBannerSection";
import Hero from "@/components/site/Hero";
import ImageMosaicSection from "@/components/site/ImageMosaicSection";
import ImmersiveVideoSection from "@/components/site/ImmersiveVideoSection";
import LimitedAvailabilitySection from "@/components/site/LimitedAvailabilitySection";
import LoveStorySection from "@/components/site/LoveStorySection";
import SanFranciscoTeaserSection from "@/components/site/SanFranciscoTeaserSection";
import EmailSignupSection from "@/components/site/EmailSignupSection";
import GoldenHourVideoSection from "@/components/site/GoldenHourVideoSection";

const Index = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      {/* About Section */}
      <LoveStorySection />
      {/* Journal Section */}
      <BoutiqueAppointmentSection />
      {/* Gallery Preview Section */}
      <ImageMosaicSection
        title="Private Collections"
        subtitle="Saved for private viewing. Each frame a standard, each collection a retreat."
        footerHeading="Three collections for your viewing"
        footerLinkLabel="Indulge"
        footerLinkHref="/gallery"
      />
      {/* Rates Section - Immersive Video */}
      <ImmersiveVideoSection />
      {/* Gifts Section */}
      <GiftsBannerSection />
      {/* FAQ Section */}
      <FAQTeaserSection />
      {/* San Francisco Section */}
      <SanFranciscoTeaserSection />
      {/* Golden Hour Video */}
      <GoldenHourVideoSection />
      {/* Inquire / Limited Availability Section */}
      <LimitedAvailabilitySection />
      {/* Email Signup */}
      <EmailSignupSection />
    </div>
  );
};

export default Index;
