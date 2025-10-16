import { Builder } from '@builder.io/react';

// Import all your site components
import OpeningVideoSection from '@/sections/OpeningVideoSection';
import LegendReinventedSection from '@/components/site/LegendReinventedSection';
import GalleryPreviewSection from '@/sections/GalleryPreviewSection';
import AboutSection from '@/sections/AboutSection';
import DesignInMotionSection from '@/components/site/DesignInMotionSection';
import BoutiqueAppointmentSection from '@/components/site/BoutiqueAppointmentSection';
import FAQSectionLuxury from '@/components/site/FAQSectionLuxury';
import GiftsTeaserSection from '@/components/site/GiftsTeaserSection';
import RatesVideoSection from '@/sections/RatesVideoSection';
import LimitedAvailabilitySection from '@/components/site/LimitedAvailabilitySection';
import LoveUnlimitedSection from '@/components/site/LoveUnlimitedSection';
import NewLoveCTASection from '@/components/site/NewLoveCTASection';
import NewsletterSection from '@/sections/NewsletterSection';

// Import UI components
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

/**
 * Register all components with Builder.io for visual editing
 * This makes your React components draggable in the Builder.io visual editor
 */

// Register Opening Video Section (formerly Hero)
Builder.registerComponent(OpeningVideoSection, {
  name: 'Opening Video Section',
  inputs: [
    {
      name: 'backgroundImage',
      type: 'file',
      allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'],
      defaultValue: 'https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2Faeb049f55ced4eeca0bd9f5973346df1?format=webp&width=1600'
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Welcome'
    },
    {
      name: 'subtitle',
      type: 'longText',
      defaultValue: 'Discover luxury companionship'
    }
  ]
});

// Register LegendReinventedSection
Builder.registerComponent(LegendReinventedSection, {
  name: 'Legend Reinvented Section',
  description: 'Hero section with background image and CTA'
});

// Register Gallery Preview Section (formerly ImageMosaicSection)
Builder.registerComponent(GalleryPreviewSection, {
  name: 'Gallery Preview Section',
  description: 'Gallery mosaic layout section'
});

// Register About Section (formerly LoveStorySection)
Builder.registerComponent(AboutSection, {
  name: 'About Section',
  description: 'Story section with imagery'
});

// Register DesignInMotionSection
Builder.registerComponent(DesignInMotionSection, {
  name: 'Design In Motion Section',
  description: 'Animated design showcase section'
});

// Register BoutiqueAppointmentSection
Builder.registerComponent(BoutiqueAppointmentSection, {
  name: 'Boutique Appointment Section',
  description: 'Call-to-action for booking appointments'
});

// Register FAQSectionLuxury
Builder.registerComponent(FAQSectionLuxury, {
  name: 'FAQ Section',
  description: 'Luxury styled FAQ accordion section'
});

// Register GiftsTeaserSection
Builder.registerComponent(GiftsTeaserSection, {
  name: 'Gifts Teaser Section',
  description: 'Preview section for gift offerings'
});

// Register Rates Video Section (formerly ImmersiveVideoSection)
Builder.registerComponent(RatesVideoSection, {
  name: 'Rates Video Section',
  description: 'Full-width video background section'
});

// Register LimitedAvailabilitySection
Builder.registerComponent(LimitedAvailabilitySection, {
  name: 'Limited Availability Section',
  description: 'Urgency messaging section'
});

// Register LoveUnlimitedSection
Builder.registerComponent(LoveUnlimitedSection, {
  name: 'Love Unlimited Section',
  description: 'Feature highlight section'
});

// Register NewLoveCTASection
Builder.registerComponent(NewLoveCTASection, {
  name: 'New Love CTA Section',
  description: 'Call-to-action section for new connections'
});

// Register Newsletter Section (formerly EmailSignupSection)
Builder.registerComponent(NewsletterSection, {
  name: 'Newsletter Section',
  description: 'Newsletter subscription section'
});

// Register UI Components
Builder.registerComponent(Button, {
  name: 'Button',
  inputs: [
    {
      name: 'children',
      type: 'text',
      defaultValue: 'Click Me'
    },
    {
      name: 'variant',
      type: 'string',
      enum: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link', 'ctaPrimary', 'ctaSecondary'],
      defaultValue: 'default'
    },
    {
      name: 'size',
      type: 'string',
      enum: ['default', 'sm', 'lg', 'icon'],
      defaultValue: 'default'
    }
  ]
});

Builder.registerComponent(Card, {
  name: 'Card',
  canHaveChildren: true,
  defaultChildren: [
    {
      '@type': '@builder.io/sdk:Element',
      component: { name: 'Card Header' }
    },
    {
      '@type': '@builder.io/sdk:Element',
      component: { name: 'Card Content' }
    }
  ]
});

Builder.registerComponent(CardHeader, {
  name: 'Card Header',
  canHaveChildren: true
});

Builder.registerComponent(CardTitle, {
  name: 'Card Title',
  inputs: [
    {
      name: 'children',
      type: 'text',
      defaultValue: 'Card Title'
    }
  ]
});

Builder.registerComponent(CardDescription, {
  name: 'Card Description',
  inputs: [
    {
      name: 'children',
      type: 'text',
      defaultValue: 'Card description text'
    }
  ]
});

Builder.registerComponent(CardContent, {
  name: 'Card Content',
  canHaveChildren: true
});

Builder.registerComponent(CardFooter, {
  name: 'Card Footer',
  canHaveChildren: true
});

export default Builder;

