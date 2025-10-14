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

const Index = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      {/* About Section */}
      <LoveStorySection />
      {/* Gallery Preview Section - order-3 on mobile, order-[3] on tablet+ */}
      <div className="order-3 md:order-[4]">
        <ImageMosaicSection
          title="Private Collections"
          subtitle="Saved for private viewing. Each frame a standard, each collection a retreat."
          footerHeading="Three collections for your viewing"
          footerLinkLabel="Indulge"
          footerLinkHref="/gallery"
        />
      </div>
      {/* Journal Section - order-4 on mobile, order-[3] on tablet+ */}
      <div className="order-4 md:order-[3]">
        <BoutiqueAppointmentSection />
      </div>
      {/* Rates Section - Immersive Video */}
      <ImmersiveVideoSection />
      {/* FAQ Section - order-6 on mobile, order-[7] on tablet+ */}
      <div className="order-6 md:order-[7]">
        <FAQTeaserSection />
      </div>
      {/* Gifts Section - order-7 on mobile, order-[6] on tablet+ */}
      <div className="order-7 md:order-[6]">
        <GiftsBannerSection />
      </div>
      {/* San Francisco Section */}
      <SanFranciscoTeaserSection />
      {/* Inquire / Limited Availability Section */}
      <LimitedAvailabilitySection />
      {/* Email Signup */}
      <EmailSignupSection />
    </div>
  );
};

export default Index;
