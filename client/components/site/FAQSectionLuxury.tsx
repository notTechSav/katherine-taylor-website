import { Minus, Plus } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const featuredFaqs: FaqItem[] = [
  {
    id: "what-is-escort",
    question: "What is an escort?",
    answer:
      "Having worked as an escort for over a decade, I can tell you it's refined companionship at its finest. As Katherine Taylor escort, I offer what the best SF escorts aspire to—cultured company that's elegant, confidential, and beautifully timed. Unlike what you might find searching 'escorts near me,' this is bespoke connection.",
  },
  {
    id: "how-much-do-escorts-cost",
    question: "How much do escorts cost?",
    answer:
      "After over a decade as a San Francisco escort, I've seen rates vary wildly—from $400 to $5000+ per hour. My rates begin at $2000 hourly, reflecting the caliber of experience you won't find in typical 'escort near me' searches. This investment ensures exclusive attention, impeccable preparation, and the refined companionship that distinguishes premium SF escorts.",
  },
  {
    id: "katherine-taylor-different",
    question: "What sets Katherine Taylor apart from other escorts near me?",
    answer:
      "In my decade-plus among San Francisco escorts and Bay Area escorts, I've cultivated something rare: truly bespoke encounters. While others juggle volume, I accept only 3-4 bookings monthly. Whether you're searching 'SF escort' or 'Sacramento escorts,' you'll find I'm the outlier—immaculate preparation, genuine chemistry, and experiences that transcend transaction.",
  },
];

const hiddenFaqs: FaqItem[] = [
  {
    id: "escort-vs-prostitute",
    question: "What is the difference between an escort and a prostitute?",
    answer:
      "After over a decade as an escort in San Francisco, I can clarify: escorts provide companionship services—attending events, dinners, cultural activities, offering sophisticated conversation. The distinction matters. When you search 'San Francisco escorts' or 'Bay Area escorts,' you're seeking social companionship, not transactional encounters. The focus remains on genuine connection.",
  },
  {
    id: "escorting-legal",
    question: "Is escorting legal in San Francisco and Sacramento?",
    answer:
      "Yes, with nuance. In my years as both a San Francisco escort and among Sacramento escorts, I've learned that companionship services operate legally when focused on social accompaniment. Whether you're searching 'SF escorts' or 'Sacramento escorts,' professional boundaries and mutual respect keep everything above board. Bay Area escorts who maintain these standards thrive.",
  },
  {
    id: "what-do-escorts-do",
    question: "What do escorts do?",
    answer:
      "Having spent over a decade as Katherine Taylor escort, I provide sophisticated companionship that goes beyond what most 'escorts near me' searches yield. From tech galas in SF to wine country retreats, I offer genuine connection, cultural fluency, and social ease. This isn't what you'll find from typical San Francisco escorts—it's carefully curated experience.",
  },
  {
    id: "are-escorts-safe",
    question: "Are escorts safe?",
    answer:
      "In my decade-plus as an SF escort, safety has been paramount. Unlike random 'escort near me' encounters, established San Francisco escorts maintain thorough screening, clear boundaries, and mutual respect. My process, refined over years among Bay Area escorts, ensures both parties feel secure and valued.",
  },
  {
    id: "escorts-near-me-travel",
    question: "What if I'm searching 'escorts near me' but you're not nearby?",
    answer:
      "I split my time as both a San Francisco escort and among Sacramento escorts, but distance is merely logistics. Whether you're searching 'SF escort,' 'Bay Area escorts,' or need me elsewhere entirely, fly-me-to-you arrangements are welcome. After a decade of travel companionship, I've perfected the art of arrival.",
  },
];

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
    <div className="border-t border-stone-200">
      <button
        onClick={() => handleToggle(item.id)}
        className="group flex w-full items-start justify-between py-8 transition-all duration-luxury-fast ease-luxury-in focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 md:py-10"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
        ref={(el) => {
          faqRefs.current[item.id] = el;
        }}
      >
        <h3 className="pr-8 text-left text-[0.9rem] font-light tracking-[0.05em] text-stone-900 transition-colors duration-300 group-hover:text-stone-600 sm:text-base">
          {item.question}
        </h3>
        <div className="mt-1">
          {isOpen ? (
            <Minus className="h-4 w-4 text-stone-400" strokeWidth={1} />
          ) : (
            <Plus
              className="h-4 w-4 text-stone-400 transition-colors group-hover:text-stone-600"
              strokeWidth={1}
            />
          )}
        </div>
      </button>

      <div
        id={`faq-answer-${item.id}`}
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-96 pb-8" : "max-h-0"
        }`}
      >
        <div className="pr-12 md:pr-24">
          <p className="max-w-[65ch] text-[0.82rem] font-light leading-7 tracking-wide text-stone-600/90 sm:text-sm">
            {item.answer}
          </p>

          <div className="mt-6">
            <a
              href="/booking"
              className="inline-block border-b border-stone-900 pb-1 text-[0.68rem] uppercase tracking-[0.38em] text-stone-900 transition-all duration-luxury-fast ease-luxury-in hover:border-stone-600 hover:text-stone-600"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative bg-luxury-white py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-8 md:px-12">
        <div className="mb-20 text-center md:mb-28">
          <span className="mb-4 block text-[0.78rem] uppercase tracking-[0.4em] text-stone-500">
            Insights & Guidance
          </span>
          <h2 className="mb-6 font-serif text-4xl tracking-[0.04em] text-stone-900 md:text-5xl">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto mb-6 h-px w-24 bg-stone-300" />
          <p className="mx-auto max-w-[65ch] text-[0.82rem] leading-7 text-stone-600/90 sm:text-sm">
            After over a decade as Katherine Taylor escort in San Francisco and
            Sacramento, I answer what "escorts near me" searches won't tell you.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div>
            {featuredFaqs.map((item) => (
              <FAQItem key={item.id} item={item} isOpen={openFaq === item.id} />
            ))}

            {showHidden &&
              hiddenFaqs.map((item) => (
                <FAQItem
                  key={item.id}
                  item={item}
                  isOpen={openFaq === item.id}
                />
              ))}

            <div className="border-t border-stone-200" />
          </div>

          <div className="mt-12 text-center">
            <Button
              variant="ctaSecondary"
              type="button"
              onClick={() => setShowHidden((prev) => !prev)}
              aria-expanded={showHidden}
            >
              {showHidden ? "Show Less" : "View All Questions"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSectionLuxury;
