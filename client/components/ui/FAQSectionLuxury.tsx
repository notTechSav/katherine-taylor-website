import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, ExternalLink } from 'lucide-react';

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
  seoLinks: Array<{ text: string; url: string }>;
  featured: boolean;
};

const faqData: FaqItem[] = [
  {
    id: "what-is-escort",
    question: "What is an escort?",
    answer: "A refined companion. As Katherine Taylor escort, I offer cultured company—elegant, confidential, and beautifully timed—what discerning sf escorts aspire to.",
    seoLinks: [
      { text: "About Companionship", url: "/companion-services" },
      { text: "Etiquette Guide", url: "/escort-etiquette" }
    ],
    featured: true
  },
  {
    id: "how-much-do-escorts-cost",
    question: "How much do escorts cost?",
    answer: "After over a decade as an escort in San Francisco, I've observed that rates vary significantly based on experience, location, and service quality. My current rates are transparently detailed on my rates page, reflecting the caliber of companionship I provide.",
    seoLinks: [
      { text: "View Rates", url: "/escort-rates-sf" },
      { text: "Premium Services", url: "/luxury-escort-services" }
    ],
    featured: true
  },
  {
    id: "katherine-taylor-different",
    question: "What Sets Katherine Taylor Apart from Other Escorts Near Me?",
    answer: "Among San Francisco escorts and Bay Area escorts, I keep encounters bespoke: limited bookings, immaculate preparation, and chemistry that feels effortless.",
    seoLinks: [
      { text: "Exclusive Services", url: "/premium-escort-experience" },
      { text: "San Francisco Portfolio", url: "/sf-escort-gallery" }
    ],
    featured: true
  },
  {
    id: "escorting-legal",
    question: "Is escorting legal?",
    answer: "Yes and no; when meeting San Francisco escorts, Sacramento escorts, or Bay Area escorts, try to keep to etiquette and the law tends favor you for being respectful.",
    seoLinks: [
      { text: "Legal Information", url: "/escort-laws-california" },
      { text: "Safety Guidelines", url: "/escort-safety-tips" }
    ],
    featured: false
  },
  {
    id: "how-to-find-escort",
    question: "How to find an escort?",
    answer: "Introduce yourself with date, time, and city—San Francisco, Sacramento, or elsewhere in the Bay Area. My escort rates in San Francisco are shared upon confirmation—clear, tasteful, and simple.",
    seoLinks: [
      { text: "Booking Process", url: "/how-to-book" },
      { text: "Contact Guidelines", url: "/escort-contact-etiquette" }
    ],
    featured: false
  },
  {
    id: "are-escorts-safe",
    question: "Are escorts safe?",
    answer: "Safety in escorting depends on thorough screening, clear communication, and professional boundaries. In my decade-plus experience, I maintain strict screening protocols and always prioritize mutual safety and respect.",
    seoLinks: [
      { text: "Safety Protocols", url: "/escort-safety-screening" },
      { text: "Professional Standards", url: "/escort-safety-guidelines" }
    ],
    featured: false
  },
  {
    id: "escorts-near-me",
    question: "What if you're nowhere near me when I search \"escorts near me\"?",
    answer: "I tour and host across the Bay Area—most often as a San Francisco escort—and I indulge in being one of the Sacramento escorts. Fly-me-to-you is available; distance is merely an invitation.",
    seoLinks: [
      { text: "Bay Area Services", url: "/bay-area-escort-services" },
      { text: "Travel Arrangements", url: "/escort-travel-booking" }
    ],
    featured: false
  }
];

const featuredFaqs = faqData.filter(item => item.featured);
const hiddenFaqs = faqData.filter(item => !item.featured);

const FAQSectionLuxury = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [showHidden, setShowHidden] = useState(false);
  const faqRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const structuredData = useMemo(() => {
    const entities = [...featuredFaqs, ...hiddenFaqs].map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    }));

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: entities,
    };
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [structuredData]);

  const handleToggle = (id: string) => {
    const nextOpen = openFaq === id ? null : id;
    setOpenFaq(nextOpen);

    if (nextOpen) {
      const element = faqRefs.current[nextOpen];
      if (element) {
        window.setTimeout(() => {
          element.focus();
        }, 120);
      }
    }
  };

  const FAQItem = ({ item, isOpen }: { item: FaqItem; isOpen: boolean }) => (
    <article
      id={item.id}
      className="group border border-stone-200/50 bg-white overflow-hidden transition-all duration-300 hover:shadow-[0_1px_1px_rgba(0,0,0,0.12),0_2px_2px_rgba(0,0,0,0.12),0_4px_4px_rgba(0,0,0,0.12),0_8px_8px_rgba(0,0,0,0.12)] hover:border-stone-300/60"
    >
      <button
        onClick={() => handleToggle(item.id)}
        className="w-full px-6 md:px-8 py-6 md:py-8 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-stone-50/50 hover:to-stone-50/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
        ref={(el) => {
          faqRefs.current[item.id] = el;
        }}
      >
        <h3 className="text-lg md:text-xl font-light text-stone-900 tracking-[0.05em] pr-4 group-hover:text-stone-600 transition-colors duration-300">
          {item.question}
        </h3>
        <ChevronDown
          className={cn(
            "w-5 h-5 md:w-6 md:h-6 text-stone-400 transition-all duration-300",
            isOpen ? "rotate-180 scale-110" : "group-hover:scale-110"
          )}
        />
      </button>

      <div
        id={`faq-answer-${item.id}`}
        className={cn(
          "transition-all duration-500 ease-out overflow-hidden",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-6 md:px-8 pb-6 md:pb-8">
          <div className="w-16 h-px bg-gradient-to-r from-stone-400 to-transparent mb-4 md:mb-6" />

          <p className="text-base md:text-lg text-stone-700 leading-[1.8] mb-4 md:mb-6 font-light tracking-[0.01em] max-w-[65ch]">
            {item.answer}
          </p>

          <div className="flex flex-wrap gap-3">
            {item.seoLinks.map((link, linkIndex) => (
              <a
                key={linkIndex}
                href={link.url}
                className="group inline-flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 hover:text-stone-900 text-xs md:text-sm font-medium tracking-[0.08em] transition-all duration-300 hover:shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:-translate-y-0.5"
              >
                <span>{link.text}</span>
                <ExternalLink className="w-3 h-3 md:w-4 md:h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  );

  return (
    <section className="relative py-20 md:py-32 bg-white" id="faq">
      <div className="container mx-auto px-6 md:px-8">

        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent to-stone-400"></div>
            <div className="w-1.5 h-1.5 bg-stone-400 rotate-45"></div>
            <div className="w-12 md:w-16 h-px bg-gradient-to-r from-stone-400 to-transparent"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-extralight tracking-[0.05em] text-stone-900 mb-6">
            FAQ
          </h2>
          <p className="text-lg md:text-xl text-stone-600 tracking-[0.02em] font-light leading-[1.8] max-w-3xl mx-auto">
            What is an escort? How much do escorts cost? After over a decade in San Francisco, Katherine Taylor escorts You, If You Will, Through Escort Culture as your personal tour guide through San Francisco, Sacramento, and the Bay Area.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">

          {/* Featured FAQs (always visible) */}
          <div className="space-y-4 mb-6">
            {featuredFaqs.map((item) => (
              <FAQItem key={item.id} item={item} isOpen={openFaq === item.id} />
            ))}
          </div>

          {/* Hidden FAQs (expandable) */}
          <div className={cn(
            "space-y-4 transition-all duration-700 ease-in-out overflow-hidden",
            showHidden ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          )}>
            {hiddenFaqs.map((item) => (
              <FAQItem
                key={item.id}
                item={item}
                isOpen={openFaq === item.id}
              />
            ))}
          </div>

          {/* Show More/Less Toggle */}
          <div className="text-center mt-8">
            <button
              onClick={() => setShowHidden((prev) => !prev)}
              className="group inline-flex items-center gap-3 px-8 py-4 border border-stone-300 hover:border-stone-400 text-stone-700 hover:text-stone-900 font-medium tracking-[0.1em] transition-all duration-300 hover:shadow-[0_4px_8px_rgba(0,0,0,0.08)] transform hover:-translate-y-0.5 text-sm"
              aria-expanded={showHidden}
            >
              <span>{showHidden ? 'SHOW FEWER' : 'STEP FURTHER'}</span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-all duration-300",
                  showHidden && "rotate-180"
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSectionLuxury;
