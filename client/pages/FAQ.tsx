"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import PageHeroOverlay from "@/components/site/PageHeroOverlay";

const heroImage = {
  src: "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2Fff453c7ff48442fc8efd2f475a954ade?format=webp&width=800",
  alt: "Thoughtful composition suggesting clarity and answers",
};

const FAQPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-luxury-white text-luxury-black">
      <PageHeroOverlay
        title="FAQ"
        subtitle="Answers to questions most providers avoid."
        eyebrow="Frequently Asked"
        imageSrc={heroImage.src}
        imageAlt={heroImage.alt}
        alignment="left"
      />

      {/* Introduction */}
      <section className="bg-luxury-white">
        <div className="container mx-auto px-6 pb-12 pt-16 md:px-8 md:pt-20">
          <div className="mx-auto max-w-2xl space-y-6 text-center">
            <p className="text-base font-light leading-[1.85] tracking-[0.01em] text-gray-700 md:text-lg">
              Most escort FAQ pages are evasive, moralistic, or written by people who've never done this work.
            </p>
            <p className="text-base font-light leading-[1.85] tracking-[0.01em] text-gray-700 md:text-lg">
              These answers come from over a decade of lived experience at the highest tier of the industry.
            </p>
          </div>
        </div>
      </section>

      {/* Tier 1: Initially Visible FAQs */}
      <section className="border-t border-gray-200 bg-luxury-white py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-8 max-w-3xl">

          {/* FAQ 1 */}
          <div className="mb-16">
            <h2
              className="mb-4 text-2xl md:text-3xl font-extralight tracking-[-0.02em] text-luxury-black"
              style={{ fontWeight: 200 }}
            >
              What does screening involve?
            </h2>
            <div className="space-y-4 text-base font-light leading-[1.8] text-gray-700">
              <p>
                Two professional references from established providers, or for those new to this: government-issued ID and LinkedIn or professional website verification.
              </p>
              <p>
                This isn't negotiable. If you're uncomfortable with screening, we're not a fit. The process protects us both—and tells me whether you've done this thoughtfully before.
              </p>
            </div>
          </div>

          {/* FAQ 2 */}
          <div className="mb-16">
            <h2
              className="mb-4 text-2xl md:text-3xl font-extralight tracking-[-0.02em] text-luxury-black"
              style={{ fontWeight: 200 }}
            >
              What payment methods do you accept?
            </h2>
            <div className="space-y-4 text-base font-light leading-[1.8] text-gray-700">
              <p>
                Wire transfer, Zelle, PayPal, Visa, MasterCard, Amex—whatever moves money cleanly for you.
              </p>
              <p>
                I'm an established merchant with payment processing, so everything runs through secure infrastructure. Your transaction is protected, documented if you need records, and completely discreet.
              </p>
              <p>
                If you need an invoice for tax-deductible business expenses, I have an S-corp structure set up specifically for that. Corporate entertainment, consulting fees, executive coaching—I've invoiced under all of them. It's cleaner for your accounting, and I'm set up to handle it seamlessly.
              </p>
              <p>
                The only caveat: Amex charges a 3% processing fee on transactions over $10,000. I ask that you cover that if you're using Amex for larger bookings.
              </p>
              <p>
                Payment is preferred in advance—full amount or 50% deposit to secure, with balance due 24 hours before we meet. This removes the transactional moment from our actual time together.
              </p>
            </div>
          </div>

          {/* FAQ 3 */}
          <div className="mb-16">
            <h2
              className="mb-4 text-2xl md:text-3xl font-extralight tracking-[-0.02em] text-luxury-black"
              style={{ fontWeight: 200 }}
            >
              Why don't you have escort reviews?
            </h2>
            <div className="space-y-4 text-base font-light leading-[1.8] text-gray-700">
              <p>
                I did—extensively. I was ranked #1 or #2 among San Francisco escorts and in the top twelve nationally on major review platforms. Then I had a client whose profile made public escort reviews impossible to maintain.
              </p>
              <p>
                I delisted everything overnight. The rankings, the testimonials, the verification—gone.
              </p>
              <p>
                That's the choice: participate in escort review culture, or work with clients who require discretion beyond what review boards can offer. I chose the latter.
              </p>
              <p>
                My reputation moves through private referrals now—the way it should at this level. If you need escort reviews to feel safe, there are excellent providers who maintain them. I'm not one of them anymore, and that's not a failing. It's the cost of doing this correctly.
              </p>
              <p className="italic text-gray-600">
                The kind of client who needs that level of discretion doesn't leave reviews. They send referrals.
              </p>
            </div>
          </div>

          {/* FAQ 4 */}
          <div className="mb-16">
            <h2
              className="mb-4 text-2xl md:text-3xl font-extralight tracking-[-0.02em] text-luxury-black"
              style={{ fontWeight: 200 }}
            >
              Do you require an NDA?
            </h2>
            <div className="space-y-4 text-base font-light leading-[1.8] text-gray-700">
              <p>
                I've signed them before and will again without hesitation. If your situation requires one, send it at least 24 hours before we meet so I have time to review.
              </p>
              <p>
                That said: discretion is embedded in how I operate, not just legally enforced. An NDA formalizes what I already practice.
              </p>
            </div>
          </div>

          {/* FAQ 5 */}
          <div className="mb-16">
            <h2
              className="mb-4 text-2xl md:text-3xl font-extralight tracking-[-0.02em] text-luxury-black"
              style={{ fontWeight: 200 }}
            >
              Do you prefer hosting or visiting?
            </h2>
            <div className="space-y-4 text-base font-light leading-[1.8] text-gray-700">
              <p>
                I host in Sacramento at no additional cost—my space, my standards, zero logistical friction.
              </p>
              <p>
                For outcalls, I prefer car service. Your space is your responsibility; if it's not suited to the occasion, it shows immediately.
              </p>
            </div>
          </div>

          {/* FAQ 6 */}
          <div className="mb-16">
            <h2
              className="mb-4 text-2xl md:text-3xl font-extralight tracking-[-0.02em] text-luxury-black"
              style={{ fontWeight: 200 }}
            >
              What do overnight or multi-day bookings include?
            </h2>
            <div className="space-y-4 text-base font-light leading-[1.8] text-gray-700">
              <p>
                Seven uninterrupted hours of sleep. One to two hours of personal time—pilates, a run, privacy to decompress.
              </p>
              <p>
                I'm not décor. Extended time means I need space to remain present, not performative. If that sounds unreasonable, book shorter.
              </p>
            </div>
          </div>

          {/* FAQ 7 */}
          <div className="mb-16">
            <h2
              className="mb-4 text-2xl md:text-3xl font-extralight tracking-[-0.02em] text-luxury-black"
              style={{ fontWeight: 200 }}
            >
              How do I book?
            </h2>
            <div className="space-y-4 text-base font-light leading-[1.8] text-gray-700">
              <p>
                Email me with: who you are, what you're looking for, preferred dates and duration, and how you found me.
              </p>
              <p>
                Vague inquiries rarely get responses. If you've read this far, you know what I'm looking for—substance, clarity, respect for both our time.
              </p>
              <p>
                I respond within 24 hours if the fit seems mutual. If you don't hear from me within 48 hours, it means I'm not the right match.
              </p>
            </div>
          </div>

          {/* FAQ 8 */}
          <div className="mb-16">
            <h2
              className="mb-4 text-2xl md:text-3xl font-extralight tracking-[-0.02em] text-luxury-black"
              style={{ fontWeight: 200 }}
            >
              Do you travel, or only work locally?
            </h2>
            <div className="space-y-4 text-base font-light leading-[1.8] text-gray-700">
              <p>
                I don't tour publicly. I travel when the client and circumstance justify it—San Francisco frequently, nationally by arrangement, internationally rarely.
              </p>
              <p>
                Fly-me-to-you is available for extended bookings. Distance isn't an issue when the fit is right. Geography is just logistics.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* View More Button */}
      <section className="bg-luxury-white pb-12">
        <div className="container mx-auto px-6 md:px-8">
          <div className="text-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="group inline-flex items-center gap-3 border border-gray-300 px-8 py-4 text-sm font-medium tracking-[0.1em] text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-400 hover:text-luxury-black hover:shadow-[0_4px_8px_rgba(0,0,0,0.08)]"
              style={{ fontWeight: 300 }}
            >
              <span>
                {isExpanded ? "VIEW FEWER QUESTIONS" : "VIEW MORE QUESTIONS"}
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-all duration-300 ${isExpanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Tier 2: Expanded FAQs (SEO Arsenal) */}
      <div
        className={`overflow-hidden transition-all duration-700 ease-in-out ${
          isExpanded ? "max-h-[50000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <section className="border-t border-gray-200 bg-luxury-gray-50 py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-8 max-w-3xl">

            {/* FAQ 9 */}
            <div className="mb-16">
              <h2
                className="mb-4 text-2xl md:text-3xl font-extralight tracking-[-0.02em] text-luxury-black"
                style={{ fontWeight: 200 }}
              >
                Is escorting legal in California?
              </h2>
              <div className="space-y-4 text-base font-light leading-[1.8] text-gray-700">
                <p>
                  Companionship is legal. Time, conversation, presence—legal.
                </p>
                <p>
                  The line between legal companionship and illegal solicitation is intentionally blurred in California law. What makes the difference in practice: how you conduct yourself, how you communicate, and whether law enforcement has any reason to care.
                </p>
                <p>
                  I've operated for over a decade without legal issues because I understand the framework:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">Screening protects both of us legally and practically</li>
                  <li className="border-l-2 border-gray-300 pl-4">Payment is framed as time and companionship, not specific acts</li>
                  <li className="border-l-2 border-gray-300 pl-4">Discretion and professionalism signal that you're not the target</li>
                  <li className="border-l-2 border-gray-300 pl-4">Clear boundaries and explicit communication prevent misunderstandings</li>
                </ul>
                <p>
                  The clients who need everything spelled out in transactional terms are usually the ones who don't understand how this works at a professional level. The law favors discretion, respect, and relationships that don't look like street-level solicitation.
                </p>
                <p className="text-sm italic text-gray-600">
                  If you're concerned about legal risk, consult an attorney in your jurisdiction. I'm not a lawyer—but I've navigated this successfully long enough to know where the boundaries actually sit in practice.
                </p>
              </div>
            </div>

            {/* FAQ 10 */}
            <div className="mb-16">
              <h2
                className="mb-4 text-2xl md:text-3xl font-extralight tracking-[-0.02em] text-luxury-black"
                style={{ fontWeight: 200 }}
              >
                How do escorts pay taxes?
              </h2>
              <div className="space-y-4 text-base font-light leading-[1.8] text-gray-700">
                <p>
                  The same way any other independent contractor does—except we can't deduct most business expenses the way other industries can.
                </p>
                <p>
                  I report income under my S-corp as consulting or professional services. It's structured the same way a freelance consultant, executive coach, or creative professional would report: 1099s for payments over $600, quarterly estimated taxes, legitimate business deductions for travel, hosting, wardrobe, and marketing.
                </p>
                <p>
                  The IRS doesn't care what industry you're in as long as you report income accurately. The mistake most providers make is operating entirely in cash and not reporting anything—which works until it doesn't.
                </p>
                <p>
                  I use a CPA who understands the industry. I keep immaculate records. I pay my taxes. It's not glamorous, but it's how you operate at this level for a decade without problems.
                </p>
                <p className="text-sm italic text-gray-600">
                  If you're new to this and asking because you want to do it correctly: hire a CPA, set up an LLC or S-corp, report your income, pay quarterly estimates, and keep clean books. The legal risk isn't the work itself—it's tax evasion.
                </p>
              </div>
            </div>

            {/* FAQ 11 */}
            <div className="mb-16">
              <h2
                className="mb-4 text-2xl md:text-3xl font-extralight tracking-[-0.02em] text-luxury-black"
                style={{ fontWeight: 200 }}
              >
                What's the legal difference between an escort and prostitution?
              </h2>
              <div className="space-y-4 text-base font-light leading-[1.8] text-gray-700">
                <p>
                  In practice? Framing, presentation, and who's paying attention.
                </p>
                <p>
                  Legally, California Penal Code 647(b) makes it illegal to solicit or engage in prostitution—defined as exchanging sexual acts for money or other compensation. Escorting is paying for time and companionship. What happens during that time between consenting adults is not, in theory, part of the transaction.
                </p>
                <p>
                  The distinction is subjective and interpreted by law enforcement based on context:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">How you advertise</li>
                  <li className="border-l-2 border-gray-300 pl-4">How you communicate with clients</li>
                  <li className="border-l-2 border-gray-300 pl-4">Whether explicit acts are discussed in exchange for specific payment</li>
                  <li className="border-l-2 border-gray-300 pl-4">Whether you're operating discreetly or visibly</li>
                </ul>
                <p>
                  High-end providers operate in a completely different context than street-level solicitation. Law enforcement has limited resources and focuses on trafficking, exploitation, and public nuisance. If you're screening clients, operating independently, paying taxes, and conducting yourself professionally, you're not the target.
                </p>
                <p className="text-sm italic text-gray-600">
                  That said: this is not legal advice. Laws vary by jurisdiction, and enforcement is inconsistent. If you're operating in this space, consult an attorney and understand your local laws.
                </p>
              </div>
            </div>

            {/* FAQ 12 */}
            <div className="mb-16">
              <h2
                className="mb-4 text-2xl md:text-3xl font-extralight tracking-[-0.02em] text-luxury-black"
                style={{ fontWeight: 200 }}
              >
                Do I need an LLC as an escort?
              </h2>
              <div className="space-y-4 text-base font-light leading-[1.8] text-gray-700">
                <p>
                  You don't <em>need</em> one, but it's smart for liability protection, tax benefits, and legitimacy.
                </p>
                <p>
                  I operate under an S-corp, which allows me to:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">Invoice clients professionally for tax-deductible business expenses</li>
                  <li className="border-l-2 border-gray-300 pl-4">Separate personal and business finances cleanly</li>
                  <li className="border-l-2 border-gray-300 pl-4">Take advantage of tax deductions (home office, travel, marketing, wardrobe)</li>
                  <li className="border-l-2 border-gray-300 pl-4">Pay myself a reasonable salary and take distributions (lower self-employment tax)</li>
                  <li className="border-l-2 border-gray-300 pl-4">Present as a legitimate business entity if ever questioned</li>
                </ul>
                <p>
                  An LLC is simpler to set up and maintain. An S-corp has more tax advantages but requires payroll and more admin. For most providers, an LLC is sufficient.
                </p>
                <p>
                  The mistake is operating under your personal name with no business structure. It makes taxes harder, offers no liability protection, and looks amateurish if you're working with corporate clients who need proper invoicing.
                </p>
                <p className="text-sm italic text-gray-600">
                  Find a CPA or attorney who understands independent contractor businesses (they don't need to know the industry specifics) and set it up correctly from the start.
                </p>
              </div>
            </div>

            {/* FAQ 13 */}
            <div className="mb-16">
              <h2
                className="mb-4 text-2xl md:text-3xl font-extralight tracking-[-0.02em] text-luxury-black"
                style={{ fontWeight: 200 }}
              >
                How much do high-end escorts actually make?
              </h2>
              <div className="space-y-4 text-base font-light leading-[1.8] text-gray-700">
                <p>
                  It depends entirely on volume, rates, and how you define "high-end."
                </p>
                <p>
                  I've seen providers at my tier (multi-hour minimums, $2,000+ hourly rates, limited availability) make anywhere from $150,000 to $500,000+ annually. The upper end requires:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">Exceptional discretion (attracts the clients who can pay)</li>
                  <li className="border-l-2 border-gray-300 pl-4">Limited bookings (scarcity increases value)</li>
                  <li className="border-l-2 border-gray-300 pl-4">Repeat clients (revenue comes from relationships, not volume)</li>
                  <li className="border-l-2 border-gray-300 pl-4">Travel flexibility (FMTY and international bookings add significant income)</li>
                  <li className="border-l-2 border-gray-300 pl-4">Professional infrastructure (S-corp, merchant processing, seamless logistics)</li>
                </ul>
                <p>
                  The providers making $500K+ are typically seeing 5-10 clients per month on retainer or extended bookings. The ones burning out at $150K are trying to maintain volume at lower rates.
                </p>
                <p>
                  Most providers never reach this tier—not because they're not beautiful or capable, but because they don't understand business structure, discretion economics, or client psychology at this level.
                </p>
                <p className="italic text-gray-600">
                  This isn't an industry where working harder equals earning more. It's inverse: the less available you are, the more valuable your time becomes—if you've built the reputation to support it.
                </p>
              </div>
            </div>

            {/* FAQ 14 */}
            <div className="mb-16">
              <h2
                className="mb-4 text-2xl md:text-3xl font-extralight tracking-[-0.02em] text-luxury-black"
                style={{ fontWeight: 200 }}
              >
                Independent escort vs agency—what's the difference?
              </h2>
              <div className="space-y-4 text-base font-light leading-[1.8] text-gray-700">
                <p>
                  Control, economics, and clientele.
                </p>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>Agency:</p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">They handle marketing, screening, bookings</li>
                  <li className="border-l-2 border-gray-300 pl-4">You split revenue (typically 30-50% to the agency)</li>
                  <li className="border-l-2 border-gray-300 pl-4">Built-in client base, less business overhead</li>
                  <li className="border-l-2 border-gray-300 pl-4">Less control over who you see, when, and rates</li>
                  <li className="border-l-2 border-gray-300 pl-4">Often higher volume, lower rates per appointment</li>
                </ul>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>Independent:</p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">You control everything: rates, screening, availability, brand</li>
                  <li className="border-l-2 border-gray-300 pl-4">You keep 100% of revenue</li>
                  <li className="border-l-2 border-gray-300 pl-4">You handle all business logistics: taxes, marketing, booking, screening</li>
                  <li className="border-l-2 border-gray-300 pl-4">Higher barrier to entry—building reputation takes years</li>
                  <li className="border-l-2 border-gray-300 pl-4">Ability to position at luxury tier and command premium rates</li>
                </ul>
                <p>
                  I've been independent for over a decade because I value control over convenience. I choose my clients, set my rates, and build relationships on my terms. The trade-off is that I'm also running a business—accounting, marketing, client management, logistics.
                </p>
                <p>
                  Most providers who try to go independent fail because they underestimate the business side. It's not just about being attractive and available—it's about positioning, discretion, client psychology, and operational excellence.
                </p>
                <p className="text-sm italic text-gray-600">
                  If you're risk-averse, new to the industry, or don't want to handle business infrastructure, an agency makes sense. If you want autonomy and are willing to build the systems to support it, independent is the only way to reach the top tier.
                </p>
              </div>
            </div>

            {/* FAQ 15 */}
            <div className="mb-16">
              <h2
                className="mb-4 text-2xl md:text-3xl font-extralight tracking-[-0.02em] text-luxury-black"
                style={{ fontWeight: 200 }}
              >
                What is GFE in escorting?
              </h2>
              <div className="space-y-4 text-base font-light leading-[1.8] text-gray-700">
                <p>
                  Girlfriend Experience—intimacy that feels personal, not transactional.
                </p>
                <p>
                  It means different things to different people, which is why I don't use the term. Some interpret it as specific acts; others mean emotional availability, chemistry, and the absence of a clock-watching dynamic.
                </p>
                <p>
                  What I offer is continuity, presence, and the ability to be myself rather than performing a role. If that fits your definition of GFE, then yes. If you're looking for a checklist of services, we're not aligned.
                </p>
                <p>
                  The term has become so overused in escort advertising that it's lost meaning. Every provider claims to offer it; few actually deliver the emotional intelligence and presence it requires.
                </p>
                <p className="italic text-gray-600">
                  I'd rather describe what I actually provide: cultured conversation, genuine interest in who you are, the ability to adapt to any context (business dinner, private evening, travel companion), and chemistry that doesn't feel forced. If that sounds like GFE to you, then we're probably a fit.
                </p>
              </div>
            </div>

            {/* FAQ 16 */}
            <div className="mb-16">
              <h2
                className="mb-4 text-2xl md:text-3xl font-extralight tracking-[-0.02em] text-luxury-black"
                style={{ fontWeight: 200 }}
              >
                What should first-time escort clients know?
              </h2>
              <div className="space-y-4 text-base font-light leading-[1.8] text-gray-700">
                <p>
                  That this is simpler than you're making it.
                </p>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>Before you reach out:</p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">Read the provider's website completely—rates, screening requirements, booking process</li>
                  <li className="border-l-2 border-gray-300 pl-4">Understand what she offers and whether you're aligned</li>
                  <li className="border-l-2 border-gray-300 pl-4">Have your screening information ready (references or ID + LinkedIn)</li>
                  <li className="border-l-2 border-gray-300 pl-4">Know your preferred date, time, and duration</li>
                </ul>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>When you contact:</p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">Introduce yourself with substance—who you are, what you're looking for, why you're reaching out</li>
                  <li className="border-l-2 border-gray-300 pl-4">Provide screening information upfront, don't make her ask</li>
                  <li className="border-l-2 border-gray-300 pl-4">Be specific about dates and duration</li>
                  <li className="border-l-2 border-gray-300 pl-4">Don't negotiate rates or ask what's included—if you have to ask, you're not ready</li>
                </ul>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>During the appointment:</p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">Arrive on time, clean, and prepared</li>
                  <li className="border-l-2 border-gray-300 pl-4">Payment handled in advance means you don't bring it up</li>
                  <li className="border-l-2 border-gray-300 pl-4">Don't ask for more time than you've booked—extend properly or book longer next time</li>
                  <li className="border-l-2 border-gray-300 pl-4">Respect boundaries without needing them explained repeatedly</li>
                </ul>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>After:</p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">If you want to see her again, say so and book your next appointment</li>
                  <li className="border-l-2 border-gray-300 pl-4">Don't disappear and reappear months later expecting priority</li>
                  <li className="border-l-2 border-gray-300 pl-4">Leave a private reference if requested (for her future screening)</li>
                </ul>
                <p className="italic text-gray-600">
                  The clients who thrive in this are the ones who treat it like any other professional engagement: clear communication, mutual respect, and understanding that her time and discretion are what you're paying for.
                </p>
              </div>
            </div>

            {/* FAQ 17 */}
            <div className="mb-16">
              <h2
                className="mb-4 text-2xl md:text-3xl font-extralight tracking-[-0.02em] text-luxury-black"
                style={{ fontWeight: 200 }}
              >
                How do I verify an escort is legitimate?
              </h2>
              <div className="space-y-4 text-base font-light leading-[1.8] text-gray-700">
                <p>
                  Screening goes both ways. You should verify me the same way I verify you.
                </p>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>What to look for:</p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">Professional website with clear rates and policies</li>
                  <li className="border-l-2 border-gray-300 pl-4">Established online presence (not just a phone number and stock photos)</li>
                  <li className="border-l-2 border-gray-300 pl-4">Consistent information across platforms</li>
                  <li className="border-l-2 border-gray-300 pl-4">Willingness to provide references or verification</li>
                  <li className="border-l-2 border-gray-300 pl-4">Clear screening requirements (legitimate providers always screen)</li>
                </ul>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>Red flags:</p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">No screening required (suggests desperation or risk)</li>
                  <li className="border-l-2 border-gray-300 pl-4">Rates too low for the market (unsustainable or bait-and-switch)</li>
                  <li className="border-l-2 border-gray-300 pl-4">Vague policies or unwillingness to answer questions</li>
                  <li className="border-l-2 border-gray-300 pl-4">Pressuring you to book immediately</li>
                  <li className="border-l-2 border-gray-300 pl-4">No professional web presence, only ads</li>
                </ul>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>How to verify me specifically:</p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">I've operated for over a decade—longevity is the best verification</li>
                  <li className="border-l-2 border-gray-300 pl-4">I maintain professional infrastructure (S-corp, merchant processing, website)</li>
                  <li className="border-l-2 border-gray-300 pl-4">I require screening, which protects us both</li>
                  <li className="border-l-2 border-gray-300 pl-4">My rates are transparent and consistent</li>
                  <li className="border-l-2 border-gray-300 pl-4">I don't advertise on volume-based platforms</li>
                </ul>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>Use escort forums and private boards:</p>
                <p>
                  This is something most providers won't tell you, but I will: escort forums and private verification boards are one of the most valuable tools for avoiding scams—and I can't participate in them anymore due to visibility concerns, but I respect their purpose.
                </p>
                <p>
                  These communities exist specifically to share information:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">If a provider has a history of scamming, it's reported immediately</li>
                  <li className="border-l-2 border-gray-300 pl-4">If a client is dangerous, unethical, or doesn't pay, every reputable provider in the region knows within hours</li>
                  <li className="border-l-2 border-gray-300 pl-4">The community is tight-knit, mostly women who don't take risks with safety, law, or economics</li>
                </ul>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>How they work in practice:</p>
                <p>
                  When I was active on review boards (before I had to delist due to being seen publicly with high-profile clients), I used them in reverse: I'd research potential clients based on what they said about other providers. If someone left rude, entitled, or disrespectful reviews, I wouldn't see them—because he'd treat me the same way.
                </p>
                <p>
                  Providers also share information directly. If someone has a bad experience—client doesn't pay, violates boundaries, behaves dangerously—an email goes out to every reputable provider in the area. There's no such thing as "getting away with something" in this industry. Word travels faster than you think.
                </p>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>Why I'm no longer on them:</p>
                <p>
                  I had to leave public forums after being photographed courtside with someone whose career required absolute anonymity. My rankings, reviews, and verification all came down overnight. It wasn't a choice—it was necessary.
                </p>
                <p>
                  But that doesn't mean forums aren't valuable. They are. They're one of the best self-policing mechanisms in an industry where traditional verification doesn't exist.
                </p>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>Bottom line:</p>
                <p>
                  If you're genuinely concerned about legitimacy, research escort forums in your area. Look for providers with established reputations and longevity. Ask the provider for a brief phone or video call before booking—legitimate providers will accommodate this if you've already passed screening. Scammers won't.
                </p>
                <p className="italic text-gray-600">
                  The providers you should worry about aren't the ones requiring extensive screening and operating with professional infrastructure—it's the ones who make it too easy.
                </p>
              </div>
            </div>

            {/* FAQ 18 */}
            <div className="mb-16">
              <h2
                className="mb-4 text-2xl md:text-3xl font-extralight tracking-[-0.02em] text-luxury-black"
                style={{ fontWeight: 200 }}
              >
                What should I expect from a luxury escort experience?
              </h2>
              <div className="space-y-4 text-base font-light leading-[1.8] text-gray-700">
                <p>
                  Not a checklist. Not a performance. A dynamic that feels effortless because of the work that went into it before you arrived.
                </p>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>What differentiates luxury from volume:</p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">Preparation—I've researched who you are, what you do, what matters to you</li>
                  <li className="border-l-2 border-gray-300 pl-4">Context adaptation—I fit seamlessly whether we're at a business dinner or private evening</li>
                  <li className="border-l-2 border-gray-300 pl-4">Conversation—cultured, intelligent, curious; not scripted small talk</li>
                  <li className="border-l-2 border-gray-300 pl-4">Presence—I'm not watching the clock or performing a role</li>
                  <li className="border-l-2 border-gray-300 pl-4">Discretion—embedded in how I operate, not something you have to request</li>
                  <li className="border-l-2 border-gray-300 pl-4">Continuity—if we meet again, I remember everything; the context carries forward</li>
                </ul>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>What luxury is not:</p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">A menu of services</li>
                  <li className="border-l-2 border-gray-300 pl-4">Trying harder to impress you</li>
                  <li className="border-l-2 border-gray-300 pl-4">Performing fantasy rather than being present</li>
                  <li className="border-l-2 border-gray-300 pl-4">Catering to every whim without boundaries</li>
                  <li className="border-l-2 border-gray-300 pl-4">Available on-demand</li>
                </ul>
                <p>
                  The clients who understand luxury companionship are the ones who value preparation, intelligence, and discretion over novelty or performance. They're not looking for someone to fill a role—they're looking for someone who enhances the experience of being themselves.
                </p>
                <p className="italic text-gray-600">
                  If you're comparing providers based on who offers more or charges less, you're not shopping at this tier.
                </p>
              </div>
            </div>

            {/* FAQ 19 */}
            <div className="mb-16">
              <h2
                className="mb-4 text-2xl md:text-3xl font-extralight tracking-[-0.02em] text-luxury-black"
                style={{ fontWeight: 200 }}
              >
                How do married clients see escorts discreetly?
              </h2>
              <div className="space-y-4 text-base font-light leading-[1.8] text-gray-700">
                <p>
                  Carefully, and with more logistics than single clients.
                </p>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>What works:</p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">Business travel (legitimate reason to be away, hotel already booked)</li>
                  <li className="border-l-2 border-gray-300 pl-4">Daytime appointments (easier to explain than overnight)</li>
                  <li className="border-l-2 border-gray-300 pl-4">Payment methods that don't flag (corporate card, separate account, cash alternatives)</li>
                  <li className="border-l-2 border-gray-300 pl-4">Communication through encrypted channels (Signal, ProtonMail)</li>
                  <li className="border-l-2 border-gray-300 pl-4">Clear boundaries around contact frequency and timing</li>
                </ul>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>What doesn't:</p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">Calling from your personal phone</li>
                  <li className="border-l-2 border-gray-300 pl-4">Using your primary email address</li>
                  <li className="border-l-2 border-gray-300 pl-4">Booking from your home</li>
                  <li className="border-l-2 border-gray-300 pl-4">Leaving a digital trail (calendar entries, location sharing)</li>
                  <li className="border-l-2 border-gray-300 pl-4">Texting at hours that raise questions</li>
                </ul>
                <p>
                  I've worked with married clients for a decade. The ones who do it successfully are meticulous about operational security—not because they're paranoid, but because they understand what's at stake.
                </p>
                <p>
                  I don't judge the decision, but I also don't enable carelessness. If you're married and want to do this correctly, treat it like any other high-stakes situation that requires discretion. Compartmentalize, communicate clearly, and don't put me in a position where I'm complicit in a mess.
                </p>
                <p className="italic text-gray-600">
                  If you're sloppy with logistics, we're not a fit—not because of morality, but because I don't work with clients who create unnecessary risk.
                </p>
              </div>
            </div>

            {/* FAQ 20 */}
            <div className="mb-16">
              <h2
                className="mb-4 text-2xl md:text-3xl font-extralight tracking-[-0.02em] text-luxury-black"
                style={{ fontWeight: 200 }}
              >
                What do founders and executives look for in a companion?
              </h2>
              <div className="space-y-4 text-base font-light leading-[1.8] text-gray-700">
                <p>
                  Intelligence, discretion, and the ability to exist in their world without friction.
                </p>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>What this client type values:</p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">No explanations required—I understand their context without them having to teach me</li>
                  <li className="border-l-2 border-gray-300 pl-4">Operational excellence—logistics handled seamlessly, no surprises</li>
                  <li className="border-l-2 border-gray-300 pl-4">Conversational range—I can discuss their industry, current events, ideas that interest them</li>
                  <li className="border-l-2 border-gray-300 pl-4">Discretion as default—not just contractual, but embedded in how I operate</li>
                  <li className="border-l-2 border-gray-300 pl-4">Time efficiency—they value scarcity; limited availability signals I'm not desperate</li>
                </ul>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>What they don't value:</p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">Performance or theatrics</li>
                  <li className="border-l-2 border-gray-300 pl-4">Needing to be impressed by their status (I already know who they are)</li>
                  <li className="border-l-2 border-gray-300 pl-4">Emotional labor beyond what's natural</li>
                  <li className="border-l-2 border-gray-300 pl-4">Availability on-demand (signals low value)</li>
                </ul>
                <p>
                  The founders and executives I work with prefer advance payment, S-corp invoicing, and minimal coordination. They're not price-sensitive—they're time-sensitive and risk-averse.
                </p>
                <p>
                  They want someone who fits into their life without creating complications, can hold a conversation at a business dinner, and understands that discretion isn't negotiable.
                </p>
                <p className="italic text-gray-600">
                  If you're in this demographic and you're still reading, you already know whether we're aligned.
                </p>
              </div>
            </div>

            {/* FAQ 21 */}
            <div className="mb-16">
              <h2
                className="mb-4 text-2xl md:text-3xl font-extralight tracking-[-0.02em] text-luxury-black"
                style={{ fontWeight: 200 }}
              >
                Sacramento vs San Francisco escort market—what's the difference?
              </h2>
              <div className="space-y-4 text-base font-light leading-[1.8] text-gray-700">
                <p>
                  San Francisco has more volume, higher competition, and a more established luxury market. Sacramento is quieter, less saturated, and underestimated.
                </p>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>San Francisco:</p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">Higher density of high-net-worth clients (tech, finance, venture capital)</li>
                  <li className="border-l-2 border-gray-300 pl-4">More established luxury providers competing at the top tier</li>
                  <li className="border-l-2 border-gray-300 pl-4">Higher rates sustainable due to clientele and cost of living</li>
                  <li className="border-l-2 border-gray-300 pl-4">More anonymity—easier to operate discreetly in a larger city</li>
                  <li className="border-l-2 border-gray-300 pl-4">Travel hub—easier for FMTY and international clients</li>
                </ul>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>Sacramento:</p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">State capital—politicians, lobbyists, executives with discretion needs</li>
                  <li className="border-l-2 border-gray-300 pl-4">Less competition at the luxury tier (most providers are volume-based)</li>
                  <li className="border-l-2 border-gray-300 pl-4">Lower cost of living allows for better hosting infrastructure</li>
                  <li className="border-l-2 border-gray-300 pl-4">Smaller market means reputation travels faster (good and bad)</li>
                  <li className="border-l-2 border-gray-300 pl-4">Less transient—repeat clients more common</li>
                </ul>
                <p>
                  I'm based in Sacramento and travel to San Francisco frequently because both markets serve different client types. Sacramento clients tend to value continuity and discretion over novelty. SF clients are more transient but higher volume.
                </p>
                <p>
                  For providers considering either market: SF has more opportunity but requires more investment (rates, presentation, competition). Sacramento rewards longevity and reputation but has a smaller pool.
                </p>
                <p className="italic text-gray-600">
                  For clients: if you're in Sacramento and think you need to go to SF for quality, you're wrong. The providers who understand this market operate differently—less visibility, more discretion, better continuity.
                </p>
              </div>
            </div>

            {/* FAQ 22 */}
            <div className="mb-16">
              <h2
                className="mb-4 text-2xl md:text-3xl font-extralight tracking-[-0.02em] text-luxury-black"
                style={{ fontWeight: 200 }}
              >
                FMTY escort etiquette and logistics
              </h2>
              <div className="space-y-4 text-base font-light leading-[1.8] text-gray-700">
                <p>
                  Fly-me-to-you is not "book a flight and hope it works out." It's a coordinated arrangement that requires planning, trust, and proper compensation structure.
                </p>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>What I require for FMTY:</p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">Minimum booking length (overnight or multi-day)</li>
                  <li className="border-l-2 border-gray-300 pl-4">First-class airfare or private travel arranged in advance</li>
                  <li className="border-l-2 border-gray-300 pl-4">Accommodation at your standard or better</li>
                  <li className="border-l-2 border-gray-300 pl-4">Travel fee on top of base rate (varies by destination)</li>
                  <li className="border-l-2 border-gray-300 pl-4">Deposit to secure (non-refundable if you cancel)</li>
                </ul>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>What successful FMTY clients do:</p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">Book weeks or months in advance, not last-minute</li>
                  <li className="border-l-2 border-gray-300 pl-4">Provide complete travel itinerary before I confirm</li>
                  <li className="border-l-2 border-gray-300 pl-4">Understand that travel time is not "free time"—it's part of the booking</li>
                  <li className="border-l-2 border-gray-300 pl-4">Arrange car service for airport pickup and all local transportation</li>
                  <li className="border-l-2 border-gray-300 pl-4">Respect that I need sleep and personal time on extended trips</li>
                </ul>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>What doesn't work:</p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">"Can you fly here this weekend?" on Tuesday</li>
                  <li className="border-l-2 border-gray-300 pl-4">Expecting me to book my own travel and front the costs</li>
                  <li className="border-l-2 border-gray-300 pl-4">Treating me like I'm on-call for the entire trip</li>
                  <li className="border-l-2 border-gray-300 pl-4">No itinerary, no plan, just "we'll figure it out"</li>
                </ul>
                <p>
                  FMTY works when the client understands it's a significant investment and plans accordingly. I've had incredible multi-day trips with clients who treat it like the executive experience it is. I've also declined dozens of poorly planned requests from people who don't understand the logistics.
                </p>
                <p className="italic text-gray-600">
                  If you want FMTY done correctly, reach out with your dates, destination, and what you're envisioning. We'll structure it properly, or I'll tell you it's not feasible.
                </p>
              </div>
            </div>

            {/* FAQ 23 */}
            <div className="mb-16">
              <h2
                className="mb-4 text-2xl md:text-3xl font-extralight tracking-[-0.02em] text-luxury-black"
                style={{ fontWeight: 200 }}
              >
                How has escorting changed in the last 10 years?
              </h2>
              <div className="space-y-4 text-base font-light leading-[1.8] text-gray-700">
                <p>
                  The internet professionalized it, OnlyFans commodified it, and platforms killed the middle tier.
                </p>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>What's changed:</p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4"><strong>Review culture died.</strong> Backpage, TER, other boards either shut down or became liability risks. High-end providers left public platforms.</li>
                  <li className="border-l-2 border-gray-300 pl-4"><strong>OnlyFans normalized monetizing access.</strong> Now everyone has a subscription model, which diluted exclusivity but also expanded the market.</li>
                  <li className="border-l-2 border-gray-300 pl-4"><strong>Screening became mandatory.</strong> Anti-trafficking laws (FOSTA-SESTA) made platforms liable, so independent providers had to screen more rigorously.</li>
                  <li className="border-l-2 border-gray-300 pl-4"><strong>Payment infrastructure improved.</strong> Zelle, PayPal, merchant processing—moving money became easier and more discreet.</li>
                  <li className="border-l-2 border-gray-300 pl-4"><strong>The market bifurcated.</strong> Volume-based providers compete on price and availability. Luxury providers compete on discretion and scarcity. The middle disappeared.</li>
                </ul>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>What hasn't changed:</p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">The fundamentals—discretion, screening, emotional intelligence, presence</li>
                  <li className="border-l-2 border-gray-300 pl-4">The clientele at the top (founders, executives, married professionals)</li>
                  <li className="border-l-2 border-gray-300 pl-4">The economics of scarcity (limited availability = higher value)</li>
                </ul>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>What I've observed:</p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">More women entered the industry during COVID, many treating it as short-term income rather than long-term career</li>
                  <li className="border-l-2 border-gray-300 pl-4">Clients became more sophisticated about screening and verification</li>
                  <li className="border-l-2 border-gray-300 pl-4">Discretion became more valuable as digital trails became harder to hide</li>
                  <li className="border-l-2 border-gray-300 pl-4">The providers who survived and thrived were the ones who understood business infrastructure, not just marketing</li>
                </ul>
                <p className="italic text-gray-600">
                  If you're asking this because you're considering entering the industry: it's harder to build a luxury reputation now than it was 10 years ago, but the top tier is less saturated because fewer providers understand what it takes to operate there.
                </p>
              </div>
            </div>

            {/* FAQ 24 */}
            <div className="mb-16">
              <h2
                className="mb-4 text-2xl md:text-3xl font-extralight tracking-[-0.02em] text-luxury-black"
                style={{ fontWeight: 200 }}
              >
                What should I expect on my first escort appointment? How do I prepare?
              </h2>
              <div className="space-y-4 text-base font-light leading-[1.8] text-gray-700">
                <p>
                  Come as you are. That's the entire point.
                </p>
                <p>
                  I've built a career on reading subtle body language—I know when someone's nervous, distracted, carrying something heavy. There's no need to perform or pretend you're more confident than you feel.
                </p>
                <p>
                  Escorts, especially those who've done this for years, excel at emotional intelligence. We're professionally good at making you feel comfortable, at drawing out the best version of you, at creating space where you can exhale. You'll leave feeling better than when you arrived—that's not an accident. It's the work.
                </p>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>What to actually do:</p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">Show up on time, clean, and present</li>
                  <li className="border-l-2 border-gray-300 pl-4">Let me lead the rhythm—I'll adjust to where you are</li>
                  <li className="border-l-2 border-gray-300 pl-4">Don't apologize for being nervous; I expect it from first-timers</li>
                  <li className="border-l-2 border-gray-300 pl-4">Trust that I've done this hundreds of times and know how to make it feel natural</li>
                </ul>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>What you don't need to worry about:</p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">Having the perfect thing to say</li>
                  <li className="border-l-2 border-gray-300 pl-4">Performing confidence you don't feel</li>
                  <li className="border-l-2 border-gray-300 pl-4">Hiding that you're human and carrying whatever you're carrying</li>
                </ul>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>What I've observed:</p>
                <p>
                  A lot of men arrive carrying something they don't feel safe expressing anywhere else. The weight of not feeling loved, seen, or valued. Women often forget to love the men in their lives—and that's heartbreaking. You don't need to explain it. I see it immediately.
                </p>
                <p>
                  This work exists at the intersection of companionship and emotional release. Some dates are light, fun, easy. Others require me to hold space for grief, loneliness, burnout, existential exhaustion. I'm trained for both.
                </p>
                <p className="italic text-gray-600">
                  So if you're nervous about your first appointment: good. It means you're human and you care how it goes. Come anyway. I'll meet you where you are.
                </p>
              </div>
            </div>

            {/* FAQ 25 */}
            <div className="mb-16">
              <h2
                className="mb-4 text-2xl md:text-3xl font-extralight tracking-[-0.02em] text-luxury-black"
                style={{ fontWeight: 200 }}
              >
                Are escorts dateable?
              </h2>
              <div className="space-y-4 text-base font-light leading-[1.8] text-gray-700">
                <p>
                  Of course. This is a career, not a death sentence.
                </p>
                <p>
                  Some escorts have boyfriends or partners—they're not available. The ones who are single? Absolutely dateable. It's no different than any other profession where someone might meet a romantic partner through work.
                </p>
                <p>
                  Do you see the irony? Someone who makes a career out of connection, presence, and understanding what people need emotionally—yes, they're extraordinarily dateable. The skillset translates.
                </p>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>The reality:</p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">Some escorts keep their professional and personal lives completely separate</li>
                  <li className="border-l-2 border-gray-300 pl-4">Some are open to relationships with clients if the chemistry and circumstances align</li>
                  <li className="border-l-2 border-gray-300 pl-4">Some are already in committed relationships and this is purely professional</li>
                </ul>
                <p>
                  It's contingent on the person, not the profession.
                </p>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>What makes it complicated:</p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">Boundaries—both have to be willing to renegotiate the professional dynamic</li>
                  <li className="border-l-2 border-gray-300 pl-4">Discretion—if the relationship becomes public, it impacts their work</li>
                  <li className="border-l-2 border-gray-300 pl-4">Power dynamics—the financial exchange has to end or shift entirely</li>
                  <li className="border-l-2 border-gray-300 pl-4">Jealousy and insecurity—some partners can't handle the work continuing</li>
                </ul>
                <p className="italic text-gray-600">
                  I've known providers who married former clients. I've known others who would never cross that line. It's individual, not categorical.
                </p>
              </div>
            </div>

            {/* FAQ 26 */}
            <div className="mb-16">
              <h2
                className="mb-4 text-2xl md:text-3xl font-extralight tracking-[-0.02em] text-luxury-black"
                style={{ fontWeight: 200 }}
              >
                Do escorts fall in love with their clients?
              </h2>
              <div className="space-y-4 text-base font-light leading-[1.8] text-gray-700">
                <p>
                  Yes. We're human.
                </p>
                <p>
                  You spend hours in private with someone—sometimes repeatedly over months or years. You learn their vulnerabilities, their humor, what makes them feel seen. Of course love happens. It's not frequent, but it's also not rare.
                </p>
                <p>
                  Think about it: people fall in love with coworkers, bosses, clients in other industries all the time. Spending quality time together, especially in intimate settings, creates attachment. Escorting is no different—except the context makes it more complicated.
                </p>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>When it happens:</p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">Usually with repeat clients where genuine rapport has developed</li>
                  <li className="border-l-2 border-gray-300 pl-4">Often when the client treats the provider as a person, not a service</li>
                  <li className="border-l-2 border-gray-300 pl-4">Sometimes when the chemistry was undeniable from the beginning</li>
                </ul>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>What makes it complicated:</p>
                <ul className="space-y-2 ml-6">
                  <li className="border-l-2 border-gray-300 pl-4">The financial exchange muddies whether feelings are genuine or transactional</li>
                  <li className="border-l-2 border-gray-300 pl-4">Professional boundaries exist for a reason—crossing them has consequences</li>
                  <li className="border-l-2 border-gray-300 pl-4">Clients sometimes confuse the performance of intimacy with actual intimacy</li>
                  <li className="border-l-2 border-gray-300 pl-4">Providers sometimes confuse their own skill at creating connection with romantic feelings</li>
                </ul>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>My experience:</p>
                <p>
                  I've had clients I genuinely cared about—looked forward to seeing, thought about between appointments, felt protective of. Is that love? Maybe. Is it the same as a relationship where no money changes hands? Probably not.
                </p>
                <p>
                  The healthiest version is when both people recognize the feelings, appreciate them, and don't try to force them into a structure they weren't built for. Some of my longest client relationships exist in that gray area: affection, trust, continuity—but not romance.
                </p>
                <p>
                  Others have crossed into something more, and the professional dynamic ended. That's rare, but it happens.
                </p>
                <p className="font-medium text-luxury-black" style={{ fontWeight: 400 }}>Bottom line:</p>
                <p className="italic text-gray-600">
                  Escorts are not immune to human emotion. We fall in love, we get attached, we care. The ones who pretend otherwise are either lying or haven't been doing this long enough to encounter it yet.
                </p>
              </div>
            </div>

          </div>
        </section>
      </div>

      {/* Closing Statement */}
      <section className="border-t border-gray-200 py-20 md:py-28 bg-luxury-white">
        <div className="container mx-auto px-6 md:px-8 max-w-2xl text-center space-y-8">
          <p
            className="text-xl md:text-2xl font-extralight leading-[1.5] text-luxury-black"
            style={{ fontWeight: 200 }}
          >
            Still have questions?
          </p>
          <p className="text-base font-light leading-[1.85] tracking-[0.01em] text-gray-700">
            If your question isn't answered here, it probably means we should talk directly.
          </p>
          <div className="pt-4">
            <a
              href="/inquire"
              className="inline-flex items-center gap-3 border border-gray-300 px-8 py-4 text-sm font-medium tracking-[0.1em] text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-400 hover:text-luxury-black hover:shadow-[0_4px_8px_rgba(0,0,0,0.08)]"
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
              href="/inquire"
              className="underline-offset-[4px] transition-colors duration-300 hover:text-gray-600 hover:underline"
            >
              Inquire
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

export default FAQPage;
