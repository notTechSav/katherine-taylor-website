import DynamicContent from '@/components/DynamicContent';

const FAQ = () => {
  return (
    <div className="bg-white">
      <section className="flex min-h-[40vh] flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="text-4xl font-light uppercase tracking-[0.35em] text-gray-900">
          Frequently Asked Questions
        </h1>
        <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-gray-600">
          A curated list of common questions, policies, and resources will be
          available here to support your journey with Katherine Taylor.
        </p>
      </section>
      
      {/* AI-Generated Content Section */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-4xl">
          <DynamicContent 
            page="faq"
            brandVoice="Katherine Taylor brand voice"
            className="text-gray-700"
          />
        </div>
      </section>
    </div>
  );
};

export default FAQ;
