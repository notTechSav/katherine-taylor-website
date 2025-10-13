"use client";

import PageHeroOverlay from "@/components/site/PageHeroOverlay";

const heroImage = {
  src: "/sf-page-bg.png",
  alt: "Golden hour light over San Francisco Bay",
};

const SanFranciscoPage = () => {
  return (
    <div className="bg-luxury-white text-luxury-black">
      <PageHeroOverlay
        title="San Francisco"
        subtitle="Where I spend most of my time with clients. Where continuity happens."
        eyebrow="The City"
        imageSrc={heroImage.src}
        imageAlt={heroImage.alt}
        alignment="left"
      />

      {/* Opening */}
      <section className="bg-luxury-white py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-8 max-w-2xl">
          <div className="space-y-7">
            <p className="text-[17px] leading-[1.9] text-luxury-black">
              I'm based in Sacramento, but San Francisco is where I spend most of my time with clients.
            </p>

            <div className="my-16 flex justify-center" aria-hidden="true">
              <span className="text-neutral-400/60">• • •</span>
            </div>

            <p className="text-base font-light leading-[1.85] tracking-[0.01em] text-gray-700">
              I know this city the way you know your own patterns—instinctively, without needing to think about it. Where to go when discretion matters. Where the food is worth the price. Which hotels understand privacy. How to move through the city without friction.
            </p>

            <div className="relative overflow-hidden rounded-sm bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-200">
              <div className="aspect-[16/9]">
                <img
                  src="/sf-table.png"
                  alt="San Francisco dining scene"
                  className="h-full w-full object-cover object-center md:object-[25%_40%]"
                  loading="lazy"
                />
              </div>
            </div>

            <p className="text-base font-light leading-[1.85] tracking-[0.01em] text-gray-700">
              This isn't a guide. It's context. The city is a backdrop, not the point.
            </p>
          </div>
        </div>
      </section>

      {/* Where I'm Comfortable */}
      <section className="border-t border-gray-200 py-20 md:py-28 bg-luxury-gray-50">
        <div className="container mx-auto px-6 md:px-8 max-w-2xl">
          <h2
            className="mb-8 text-3xl md:text-4xl font-extralight tracking-[-0.02em] text-luxury-black"
            style={{ fontWeight: 200 }}
          >
            Where I'm Comfortable
          </h2>

          <div className="space-y-6 text-base font-light leading-[1.85] text-gray-700">
            <p>
              <strong className="font-normal text-luxury-black">Spruce</strong> for dinner when conversation matters more than being seen. The kind of place where you can talk about what actually matters without feeling like you're performing for the room.
            </p>
            <p>
              <strong className="font-normal text-luxury-black">Top of the Mark</strong> when you want the view and the theater of it. Champagne at sunset, the whole city spread out below. It's tourist theater, but sometimes that's exactly right.
            </p>
            <p>
              <strong className="font-normal text-luxury-black">The Fairmont</strong> if you're the type who appreciates high tea unironically. Old San Francisco money, the kind of place that doesn't need to try.
            </p>
            <p>
              <strong className="font-normal text-luxury-black">Left Door on Union</strong> when craft cocktails are actually the point, not the excuse. Small, intimate, the kind of bar where the bartender knows what you mean when you say "something bitter."
            </p>
            <p>
              <strong className="font-normal text-luxury-black">Balboa Cafe</strong> if you want to meet locals who've been going there since before it was cool. Not trying to impress anyone, just consistent.
            </p>
            <p>
              <strong className="font-normal text-luxury-black">House of Prime Rib</strong> because some traditions exist for a reason, and pretending you're above them is exhausting.
            </p>
          </div>
        </div>
      </section>

      {/* Beyond the City */}
      <section className="border-t border-gray-200 py-20 md:py-28 bg-luxury-white">
        <div className="container mx-auto px-6 md:px-8 max-w-2xl">
          <h2
            className="mb-8 text-3xl md:text-4xl font-extralight tracking-[-0.02em] text-luxury-black"
            style={{ fontWeight: 200 }}
          >
            Beyond the City
          </h2>

          <div className="space-y-6 text-base font-light leading-[1.85] text-gray-700">
            <p>
              <strong className="font-normal text-luxury-black">Napa</strong> when you have time and want to disappear for a day. Wine country without the performance—just vineyards, good food, and the space to decompress.
            </p>
            <p>
              <strong className="font-normal text-luxury-black">Hot air balloon rides at sunrise</strong> if you're the kind of person who doesn't need to explain why that sounds perfect. Quiet, expansive, the kind of experience that doesn't need commentary.
            </p>
            <p>
              <strong className="font-normal text-luxury-black">Horseback riding in Pacifica</strong> when you want to be outside your own head for a few hours. The beach, the cliffs, the ocean—no agenda required.
            </p>
            <p>
              <strong className="font-normal text-luxury-black">Muir Woods</strong> when you need to remember that most of what feels urgent isn't. Cathedral-quiet redwoods, twenty minutes from the city.
            </p>
          </div>
        </div>
      </section>

      {/* How I Operate */}
      <section className="border-t border-gray-200 py-20 md:py-28 bg-luxury-gray-50">
        <div className="container mx-auto px-6 md:px-8 max-w-2xl">
          <h2
            className="mb-8 text-3xl md:text-4xl font-extralight tracking-[-0.02em] text-luxury-black"
            style={{ fontWeight: 200 }}
          >
            How I Operate in San Francisco
          </h2>

          <div className="space-y-6 text-base font-light leading-[1.85] text-gray-700">
            <p>
              I don't plan your itinerary unless you want me to. I don't suggest activities to fill time. I fit into whatever context you've built—business dinner, private evening, weekend escape—and make it feel like I've always been part of it.
            </p>
            <p>
              If you know San Francisco, you already know where we'd go. If you don't, I'll meet you where you are and we'll figure it out.
            </p>
            <p>
              Most of my San Francisco clients are repeat bookings. The city becomes shorthand—you know where I'm staying, I know your schedule, we skip the logistics and focus on the reason you're there.
            </p>
            <p>
              That's what continuity looks like. No reset, no re-explanation, no starting from scratch. Just continuation.
            </p>
          </div>
        </div>
      </section>

      {/* Hotels & Hosting */}
      <section className="border-t border-gray-200 py-20 md:py-28 bg-luxury-white">
        <div className="container mx-auto px-6 md:px-8 max-w-2xl">
          <h2
            className="mb-8 text-3xl md:text-4xl font-extralight tracking-[-0.02em] text-luxury-black"
            style={{ fontWeight: 200 }}
          >
            Hotels That Understand Discretion
          </h2>

          <div className="space-y-6 text-base font-light leading-[1.85] text-gray-700">
            <p>
              <strong className="font-normal text-luxury-black">The Four Seasons</strong> gets it. Privacy, professionalism, in-room spa services that don't require explanations.
            </p>
            <p>
              <strong className="font-normal text-luxury-black">The Fairmont</strong> if you value history and don't mind that everyone else in the lobby is a tourist. Discretion through anonymity.
            </p>
            <p>
              <strong className="font-normal text-luxury-black">The St. Regis</strong> when you want modern luxury and staff who understand that questions are unwelcome.
            </p>
            <p>
              <strong className="font-normal text-luxury-black">The Ritz-Carlton</strong> for old-money discretion. The kind of place where everyone assumes you belong, so no one asks.
            </p>
            <p className="italic text-gray-600">
              If you're booking a hotel for our meeting, any of these work. If you're staying somewhere else and it's suited to the occasion, that's fine too. Your space is your responsibility.
            </p>
          </div>
        </div>
      </section>

      {/* Sacramento vs SF */}
      <section className="border-t border-gray-200 py-20 md:py-28 bg-luxury-gray-50">
        <div className="container mx-auto px-6 md:px-8 max-w-2xl">
          <h2
            className="mb-8 text-3xl md:text-4xl font-extralight tracking-[-0.02em] text-luxury-black"
            style={{ fontWeight: 200 }}
          >
            Sacramento vs San Francisco
          </h2>

          <div className="space-y-6 text-base font-light leading-[1.85] text-gray-700">
            <p>
              I'm based in Sacramento, where I host at no additional cost. My space, my standards, zero logistical friction. Most Sacramento clients prefer this—it's private, consistent, and removes the variable of hotel quality.
            </p>
            <p>
              San Francisco clients are typically outcalls or travel arrangements. Higher volume, more transient, but also where most of my long-term relationships have developed. The city attracts a specific type of client—tech founders, venture capitalists, executives who move through the Bay Area frequently.
            </p>
            <p>
              Sacramento clients value continuity and discretion. San Francisco clients value adaptability and the ability to fit seamlessly into whatever context they're operating in—business dinner, conference attendance, weekend escape.
            </p>
            <p>
              Both work. The difference is context, not quality.
            </p>
          </div>
        </div>
      </section>

      {/* Why San Francisco */}
      <section className="border-t border-gray-200 py-20 md:py-28 bg-luxury-white">
        <div className="container mx-auto px-6 md:px-8 max-w-2xl">
          <h2
            className="mb-8 text-3xl md:text-4xl font-extralight tracking-[-0.02em] text-luxury-black"
            style={{ fontWeight: 200 }}
          >
            Why This City Works
          </h2>

          <div className="space-y-6 text-base font-light leading-[1.85] text-gray-700">
            <p>
              San Francisco understands transience. People come and go constantly—for work, for conferences, for meetings that require face time. A companion at dinner or an evening appointment doesn't register as unusual. The city absorbs it.
            </p>
            <p>
              Discretion is built into the infrastructure. Hotels that don't ask questions. Restaurants where privacy is assumed, not requested. Car services that understand timing matters more than small talk.
            </p>
            <p>
              The client base is sophisticated. They've done this before, or they understand how it works without needing it explained. They value efficiency, discretion, and the ability to compartmentalize without guilt.
            </p>
            <p>
              That's why I spend most of my time here. The city works for this. It always has.
            </p>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-gray-200 py-20 md:py-28 bg-luxury-gray-50">
        <div className="container mx-auto px-6 md:px-8 max-w-2xl text-center space-y-8">
          <p
            className="text-xl md:text-2xl font-extralight leading-[1.5] text-luxury-black"
            style={{ fontWeight: 200 }}
          >
            If you're in San Francisco and this sounds aligned, reach out.
          </p>
          <p className="text-base font-light leading-[1.85] text-gray-600">
            I'm here frequently. We'll figure out what makes sense.
          </p>
          <div className="pt-4">
            <a
              href="/inquire"
              className="inline-flex items-center gap-3 border border-gray-300 px-12 py-4 text-sm font-medium tracking-[0.1em] text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-400 hover:text-luxury-black hover:shadow-[0_4px_8px_rgba(0,0,0,0.08)]"
              style={{ fontWeight: 300 }}
            >
              INQUIRE
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-luxury-white px-6 py-16">
        <div className="mx-auto max-w-[620px] space-y-6 text-left">
          <nav className="flex flex-wrap gap-3 text-[14px] font-light text-luxury-black">
            <a
              href="/rates"
              className="underline-offset-[4px] transition-colors duration-300 hover:text-gray-600 hover:underline"
            >
              Rates
            </a>
            <a
              href="/faq"
              className="underline-offset-[4px] transition-colors duration-300 hover:text-gray-600 hover:underline"
            >
              FAQ
            </a>
            <a
              href="/about"
              className="underline-offset-[4px] transition-colors duration-300 hover:text-gray-600 hover:underline"
            >
              About
            </a>
          </nav>
          <p className="text-xs font-light text-gray-400 tracking-[0.08em]">
            © 2025 Katherine Taylor
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SanFranciscoPage;
