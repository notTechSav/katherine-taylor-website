import DynamicContent from '@/components/DynamicContent';
import SeoHead from '@/components/site/SeoHead';
import { pageSeo } from '@/lib/page-seo';

const Maison = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-white px-6 py-24 text-center">
      <SeoHead
        title={pageSeo.maison.title}
        description={pageSeo.maison.description}
        path={pageSeo.maison.path}
      />
      <h1 className="text-4xl font-light tracking-[0.35em] uppercase text-gray-900">
        Maison
      </h1>
      <h2 className="mt-6 text-lg font-light tracking-luxury text-gray-700">
        Craft, heritage, and the private practice
      </h2>
      
      {/* AI-Generated Content Section */}
      <div className="mt-8 w-full max-w-4xl">
        <DynamicContent 
          page="maison"
          brandVoice="Katherine Taylor brand voice"
          className="text-left"
        />
      </div>
      
      {/* Fallback static content */}
      <div className="mt-8 max-w-2xl text-base font-light leading-loose text-gray-600">
        <p>
          Discover the stories, craftsmanship, and heritage behind our maison.
          Explore curated collections, design inspirations, and exclusive
          experiences crafted for modern connoisseurs.
        </p>
      </div>
    </div>
  );
};

export default Maison;
