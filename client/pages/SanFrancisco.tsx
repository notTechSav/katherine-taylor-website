"use client";

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeroOverlay from "@/components/site/PageHeroOverlay";

const heroImage = {
  src: "/sf-page-bg.png",
  alt: "Golden hour light over San Francisco Bay",
};

const SanFranciscoPage = () => {
  const [showStory, setShowStory] = useState(false);

  const revealStory = () => {
    setShowStory(true);
  };

  return (
    <div className="bg-luxury-white text-luxury-black">
      <Helmet>
        <title>Katherine Taylor - Elite San Francisco Escort | Luxury Companion Bay Area</title>
        <meta name="description" content="Katherine Taylor - independent luxury escort serving San Francisco's tech elite. High-end dinner dates, overnight arrangements, travel companionship. Pacific Heights, Nob Hill, Financial District. Verified, discreet, exceptional." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Katherine Taylor",
            "jobTitle": "Luxury Companion",
            "description": "Elite San Francisco escort providing high-end companion services",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "San Francisco",
              "addressRegion": "CA",
              "addressCountry": "US"
            },
            "areaServed": [
              "San Francisco",
              "Bay Area",
              "Peninsula",
              "South Bay",
              "East Bay",
              "Sacramento",
              "Napa Valley",
              "Sonoma"
            ],
            "serviceType": [
              "Companion Services",
              "Dinner Companionship",
              "Travel Companion",
              "Business Event Accompaniment",
              "Overnight Arrangements"
            ]
          })}
        </script>
      </Helmet>

      <PageHeroOverlay
        title="San Francisco"
        subtitle="Where I spend most of my time with clients. Where continuity happens."
        eyebrow="The City"
        imageSrc={heroImage.src}
        imageAlt={heroImage.alt}
        alignment="left"
      />

      {/* H1 */}
      <section className="bg-luxury-white py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-8 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-extralight tracking-[-0.02em] text-luxury-black mb-12" style={{ fontWeight: 200 }}>
            "San Francisco escorts" - "escorts near me" won't help you find Katherine Taylor
          </h1>

          {/* Cold Open */}
          <div className="cold-open space-y-7">
            <p className="text-base font-light leading-[1.85] tracking-[0.01em] text-gray-700">
              A rush of searches: "Katherine Taylor", "Katherine Taylor Steph Curry",
              "Katherine Taylor Warriors" - nothing. "Katherine Taylor website"? TMZ inquired.
              "Katherine Taylor Twitter"? New York Post. Nothing. "San Francisco escorts"?
              "Sacramento escorts"? "Bay Area escorts"? "Escorts near me"? -*googled* an Amish man
              on his time away on a library computer. The website: "KatherineTaylorEscort.com" - gone.
            </p>

            <p className="bridge text-base font-light leading-[1.85] tracking-[0.01em] text-gray-700 italic">
              How does someone become viral and decide to suddenly walk?
            </p>

            <p className="context text-base font-light leading-[1.85] tracking-[0.01em] text-gray-700">
              This is the story I've been meaning to tell for a long time, why I left San Francisco.
            </p>

            <p className="signature text-base font-light leading-[1.85] tracking-[0.01em] text-luxury-black">
              -Katherine
            </p>
          </div>
        </div>
      </section>

      {/* THE BUTTON */}
      <div className="border-t border-b border-gray-200 bg-luxury-gray-50 py-20">
        <div className="container mx-auto px-6 md:px-8 max-w-2xl text-center">
          <button
            onClick={revealStory}
            className="story-reveal inline-flex items-center gap-3 border border-gray-300 px-12 py-4 text-sm font-medium tracking-[0.1em] text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-400 hover:text-luxury-black hover:shadow-[0_4px_8px_rgba(0,0,0,0.08)]"
            style={{ fontWeight: 300 }}
          >
            If you'd like to hear this story →
          </button>
        </div>
      </div>

      {/* BELOW THE BUTTON: The Full Story */}
      {showStory && (
        <div id="full-story" className="love-letter">

          {/* Carrie Bradshaw Opening */}
          <section className="carrie-opening bg-luxury-white py-20 md:py-28">
            <div className="container mx-auto px-6 md:px-8 max-w-2xl space-y-7">
              <p className="question text-xl md:text-2xl font-extralight leading-[1.5] text-luxury-black italic" style={{ fontWeight: 200 }}>
                In a city built on being seen, what happens when you choose to disappear?
              </p>

              <p className="observation text-base font-light leading-[1.85] tracking-[0.01em] text-gray-700">
                I couldn't help but wonder: when you walk away from everything at the peak—
                do you cease to exist, or finally start living?
              </p>
            </div>
          </section>

          {/* Chapter 1: What Sacramento Couldn't Give Me */}
          <section className="chapter border-t border-gray-200 py-20 md:py-28 bg-luxury-gray-50">
            <div className="container mx-auto px-6 md:px-8 max-w-2xl">
              <h2 className="mb-8 text-3xl md:text-4xl font-extralight tracking-[-0.02em] text-luxury-black" style={{ fontWeight: 200 }}>
                What Sacramento Couldn't Give Me
              </h2>

              <div className="space-y-6 text-base font-light leading-[1.85] text-gray-700">
                <p>
                  I moved back to Sacramento in December 2024 after teetering with the idea of marriage.
                  I left escorting to try to find love. A normal life, perhaps. The kind where people
                  don't Google you after a Warriors game.
                </p>

                <p className="hint italic">
                  (Hint—for anyone wanting to skip to the bottom, "love" I did find. Just not the
                  kind I was looking for.)
                </p>

                <p>
                  For a few months, it worked. I tried civilian dating. Went to the usual Sacramento spots
                  trying to forget what I'd left behind.
                </p>

                <p>
                  I went to Mix Ultra Lounge on K Street hoping to find a trace of Balboa Café—the Marina
                  energy, the espresso-then-vodka progression, the back booths that served their purpose.
                  They didn't have espresso martinis.
                </p>

                <p>
                  I went to Barwest on J Street and somehow found myself thinking about the Tenderloin.
                  The IPO founders I'd known who didn't care about appearances and chose to stay in those
                  tiny hotels anyway. The ones who called me mediocre and meant it as a compliment.
                </p>

                <p>
                  I went to Revival at the Sawyer Hotel and remembered my favorite Sacramento couple—the ones
                  who would periodically visit me in San Francisco. We'd go to Left Door on Union and they'd
                  systematically dismantle every business idea I considered viable. I miss them.
                </p>

                <p>
                  I ordered espresso martinis at three different Sacramento bars. None of them knew what I was
                  talking about. It still wasn't San Francisco.
                </p>

                <p>
                  Then suddenly, I stopped being mediocre. In Sacramento, people were actually impressed by me.
                  Groups of men would approach like they didn't know what restraint was. I'd get approached in
                  Home Depot parking lots while I was busy writing Claude.ai something about AI products I'd
                  heard about. Just as I started reminiscing about my Pacific Heights apartment not far from
                  Anthropic's office, a man named Victor walked up with a Russian accent and told me to give
                  him my number like it was an assumed close.
                </p>

                <p>
                  I started wearing glasses with no lenses everywhere I went to ward off the sexual attention.
                  That somehow made me more approachable. Hookup culture is strange. Did you know that's a thing?
                  People just hook up and don't talk to each other after. I found that odd because my clients
                  and I talk all the time. Here, maybe there was just nothing to talk about.
                </p>

                <p>
                  Sacramento was teaching me to settle. And somewhere in the middle of bad dates and worse
                  espresso martinis, I realized what I'd been looking for wasn't a person.
                </p>

                <p>It was a city. One that never let me settle.</p>
              </div>
            </div>
          </section>

          {/* Chapter 2: Why I Lived Above Google */}
          <section className="chapter border-t border-gray-200 py-20 md:py-28 bg-luxury-white">
            <div className="container mx-auto px-6 md:px-8 max-w-2xl">
              <h2 className="mb-8 text-3xl md:text-4xl font-extralight tracking-[-0.02em] text-luxury-black" style={{ fontWeight: 200 }}>
                Why I Lived Above Google (Literally)
              </h2>

              <div className="space-y-6 text-base font-light leading-[1.85] text-gray-700">
                <p>
                  My last San Francisco apartment was in Pacific Heights, above the Google offices.
                  My neighbors were department heads, compliance officers, strategy directors. They never
                  acknowledged each other in the hallway, but they all somehow knew me.
                </p>

                <p>
                  <em>"Oh, you date Katherine too?"</em><br/>
                  <em>"No, she's just my neighbor."</em>
                </p>

                <p>
                  Living in Pacific Heights taught me that discretion in San Francisco isn't about secrecy.
                  It's infrastructure. Hotels that don't ask questions because they've learned not to.
                  Restaurants on Fillmore Street where privacy is assumed. Car services that eliminated
                  the driver entirely—Waymos from Pacific Heights to the St. Regis without a single
                  shared glance.
                </p>

                <p>
                  This city understands transience. People arrive for board meetings, investor dinners,
                  global economic conferences. A companion at dinner registers as ordinary in the Financial
                  District. In SOMA. The city absorbs it.
                </p>

                <p>
                  I missed flexing my skills. I missed the two-sentence emails from founders who were trying
                  to weed me out by directly stating what they wanted—and I missed even more being able to
                  tell those messages apart from the gentlemen who truly had to be declined for risk and
                  compliance reasons. I couldn't help dwelling on the difference between texting a CEO versus
                  a CFO. The CFO was always a better negotiator than me. Those nuances turned into the moments
                  my founders directly told me not to burden them with—the boring, senseless details. Now I
                  understood why.
                </p>

                <p>That's what I missed. The standard.</p>
              </div>
            </div>
          </section>

          {/* Chapter 3: The Clients Who Made Me Better */}
          <section className="chapter border-t border-gray-200 py-20 md:py-28 bg-luxury-gray-50">
            <div className="container mx-auto px-6 md:px-8 max-w-2xl">
              <h2 className="mb-8 text-3xl md:text-4xl font-extralight tracking-[-0.02em] text-luxury-black" style={{ fontWeight: 200 }}>
                The Clients Who Made Me Better
              </h2>

              <div className="space-y-6 text-base font-light leading-[1.85] text-gray-700">
                <p>
                  The Steph Curry moment crashed my website. Not emotionally—technically. The bandwidth
                  couldn't handle the traffic from TMZ and the New York Post. Three months offline.
                </p>

                <p>
                  My assistant Sandi dismissed it. <em>"Men don't care if you write. Don't make rebuilding
                  a website a production."</em>
                </p>

                <p>My niche built the internet.</p>

                <p>
                  One San Francisco client—a founder with two IPOs in enterprise software—declined to
                  critique my rebuilt site out of politeness. Another, a product lead at Google, identified
                  six errors I'd missed. My New York clients, finance professionals from Morgan Stanley
                  and Goldman, called it flawless.
                </p>

                <p>
                  San Francisco built the infrastructure we all use, so they held me to it. Your advantage
                  here isn't appearance. It's keeping pace with someone who's taken two companies public,
                  understanding references to transformer architectures, maintaining composure when the
                  sommelier at Gary Danko in Russian Hill recognizes your date by name.
                </p>

                <p>
                  One client—a VC who'd backed three unicorns—asked me during dinner at Gary Danko what
                  my "moat" was. Up until then, I'd only heard the word "moat" used to describe financial
                  literacy in Robert Kiyosaki's <em>Rich Dad Poor Dad</em>—"financial literacy is the
                  moat that separates the two classes." That language, that moat, I had a grasp on.
                  Tech, not yet.
                </p>

                <p>
                  He spent the next 45 minutes explaining competitive advantages, network effects, and
                  why my discretion was defensible. I took notes on my phone. He laughed and said,
                  "You're the only escort I know who treats dates like board meetings."
                </p>

                <p>
                  I realized I did know the word moat after all.
                </p>

                <p>
                  I still have those notes. They're better than the business degree at Sacramento State
                  I paid for.
                </p>

                <p>
                  I haven't outsourced a website build, security audit, or assistant hire since.
                  San Francisco humbled me. The most valuable assets are digital.
                </p>

                <p>I missed that caliber.</p>
              </div>
            </div>
          </section>

          {/* THE DIRECTORY */}
          <section className="directory border-t border-gray-200 py-20 md:py-28 bg-luxury-white">
            <div className="container mx-auto px-6 md:px-8 max-w-2xl">
              <h2 className="mb-8 text-3xl md:text-4xl font-extralight tracking-[-0.02em] text-luxury-black" style={{ fontWeight: 200 }}>
                Where I'm Comfortable in San Francisco
              </h2>

              <p className="text-base font-light leading-[1.85] text-gray-700 mb-12">
                A decade of experience distilled into recommendations. Where to dine. Where to stay.
                What makes each place worth your time.
              </p>

              {/* DINING */}
              <h3 className="text-2xl font-extralight tracking-[-0.02em] text-luxury-black mb-6 mt-12" style={{ fontWeight: 200 }}>
                Dining — Where Discretion Is Assumed
              </h3>

              <div className="space-y-8">
                <div className="location-card space-y-3">
                  <h4 className="text-xl font-light text-luxury-black">Spruce</h4>
                  <p className="neighborhood text-sm font-light text-gray-500 tracking-[0.05em]">Presidio Heights</p>
                  <div className="space-y-4 text-base font-light leading-[1.85] text-gray-700">
                    <p>
                      Conversation over spectacle. Dim lighting, attentive staff, a wine list curated
                      with care.
                    </p>
                    <p>
                      A founder once told me over dinner here that he'd just turned down a $400 million
                      acquisition offer. Spruce has that effect—dim enough that you feel safe admitting
                      things you wouldn't say in daylight. I never asked if he regretted it.
                    </p>
                    <p>
                      I'm certain he made the right choice, just as I did ordering the added truffles on
                      my pasta. The dish arrived and the conversation changed. Spruce's truffles are indeed
                      equally as interesting as a $400 million acquisition, and if you're at all conflicted
                      about turning down a deal like that, you won't be after that specific dish.
                    </p>
                    <p>
                      The truffles vary between $200 and $10,000 per gram (not quite) depending on season and availability.
                      Reservations required. Regulars are accommodated.
                    </p>
                  </div>
                </div>

                <div className="location-card space-y-3">
                  <h4 className="text-xl font-light text-luxury-black">Songbird</h4>
                  <p className="neighborhood text-sm font-light text-gray-500 tracking-[0.05em]">Oakland</p>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    Michelin-rated, understated. Chef Chris Bleidorn's tasting menu changes with the seasons.
                    The precision remains constant. A Google executive took me here on our fourth date—
                    mentioned his position only in passing. The Waymo pickup meant no shared attention
                    with a driver. Oakland locals protect this place carefully.
                  </p>
                </div>

                <div className="location-card space-y-3">
                  <h4 className="text-xl font-light text-luxury-black">House of Prime Rib</h4>
                  <p className="neighborhood text-sm font-light text-gray-500 tracking-[0.05em]">Polk Gulch</p>
                  <div className="space-y-4 text-base font-light leading-[1.85] text-gray-700">
                    <p>
                      One of the only places I'll give a discount to if you can get a table. Good luck.
                      They're booked a year in advance.
                    </p>
                    <p>
                      Ask me if you need one, though. I slip Marcus—the valet—a hundred dollars every
                      time I see him. He's easy to spot. In fact, just stand outside and look lost, and
                      he'll spot you. His polite greeting is his way of saying he, unlike the hostess,
                      will take your money.
                    </p>
                    <p>
                      Thankfully, the art of palm greasing wasn't the only thing that stayed unchanged
                      since 1949. Prime rib carved tableside from a steel cart. Salad spun in a wooden
                      bowl for your entertainment. Copious amounts of wine poured generously enough that
                      Marcus once recommended I not drive, but take a Waymo home instead.
                    </p>
                    <p>
                      There's always a line. It's always justified. The valet knows which regulars haven't
                      visited recently and will text when there's a cancellation.
                    </p>
                    <p>
                      Otherwise, OpenTable has them booked eight months out. Good luck.
                    </p>
                  </div>
                </div>

                <div className="location-card space-y-3">
                  <h4 className="text-xl font-light text-luxury-black">Gary Danko</h4>
                  <p className="neighborhood text-sm font-light text-gray-500 tracking-[0.05em]">Russian Hill</p>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    Michelin-starred for good reason. Three courses minimum, five recommended. Wine pairings
                    are assertive but justified. Dress code enforced—jackets required, provided if necessary.
                    The sommelier recognizes established guests. Privacy through professionalism.
                  </p>
                </div>

                <div className="location-card space-y-3">
                  <h4 className="text-xl font-light text-luxury-black">Quince</h4>
                  <p className="neighborhood text-sm font-light text-gray-500 tracking-[0.05em]">Jackson Square</p>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    Three Michelin stars. Eight courses. Chef Michael Tusk sources obsessively—olive oil
                    from a specific Ligurian grove, pasta flour from an Umbrian mill. Three hours minimum.
                    Bring someone who doesn't need their phone.
                  </p>
                </div>

                <div className="location-card space-y-3">
                  <h4 className="text-xl font-light text-luxury-black">Benu</h4>
                  <p className="neighborhood text-sm font-light text-gray-500 tracking-[0.05em]">SoMa</p>
                  <div className="space-y-4 text-base font-light leading-[1.85] text-gray-700">
                    <p>
                      More courses than possible to consume, but thank god for the interruptions. Fourteen
                      pauses because the founder across from me has moved on from solving the world's problems
                      and can't help himself with the problem-solving mentality—he transitions to mine.
                    </p>
                    <p>
                      <em>"You're marketing incorrectly, Katherine. You need to focus on your existing clientele
                      first and figure out what a 'value add' is."</em>
                    </p>
                    <p>
                      <em>"Okay, what's a value add?"</em>
                    </p>
                    <p>
                      Two months later, he sends me to Herman Miller after I asked about a chair recommendation—
                      a real-life, in-store lesson where yes, now I understand both the concept and the delivery.
                      There stands in my office a $2,000 reminder of how much smarter people are in San Francisco,
                      in the form of a chair. The value add was the lesson.
                    </p>
                  </div>
                </div>

                <div className="location-card space-y-3">
                  <h4 className="text-xl font-light text-luxury-black">Atelier Crenn</h4>
                  <p className="neighborhood text-sm font-light text-gray-500 tracking-[0.05em]">Cow Hollow</p>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    Remarkable. So was the company. The company was more remarkable, though. I remember there
                    being one too many courses—it's time to leave when your date happens to be more interesting
                    than the white chocolate orb filled with apple cider liquid and topped with crème de cassis
                    that we came for but couldn't stay for.
                  </p>
                </div>

                <div className="location-card space-y-3">
                  <h4 className="text-xl font-light text-luxury-black">Left Door on Union</h4>
                  <p className="neighborhood text-sm font-light text-gray-500 tracking-[0.05em]">Cow Hollow</p>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    Fifteen seats. Craft cocktails that require patience. Conversation is the point.
                    My favorite Sacramento couple would visit me in San Francisco and we'd end up here.
                    They'd systematically dismantle every business idea I considered viable over Oaxaca
                    Old Fashioneds. Two hours of uninterrupted attention.
                  </p>
                </div>

                <div className="location-card space-y-3">
                  <h4 className="text-xl font-light text-luxury-black">Balboa Café</h4>
                  <p className="neighborhood text-sm font-light text-gray-500 tracking-[0.05em]">Marina District</p>
                  <div className="space-y-4 text-base font-light leading-[1.85] text-gray-700">
                    <p>
                      Marina locals who've been coming for years—my favorite place to see my clientele
                      in the wild. A wink from across the crowd settles exactly as it should.
                    </p>
                    <p>
                      <em>"You look great, Katherine. So does my wife next to me. You're an exceptional
                      hugger, but now would not be the time."</em>
                    </p>
                    <p>
                      Little does he know, the woman next to me isn't just a friend, and he's not the
                      only one having date night. This is San Francisco, after all.
                    </p>
                    <p>
                      Espresso comes first at Balboa, then vodka—intellect is sharp around here and
                      there's no reason to dumb yourself down. The velvet green booths serve their
                      purpose. They keep me and my date safe from the crowd.
                    </p>
                  </div>
                </div>

                <div className="location-card space-y-3">
                  <h4 className="text-xl font-light text-luxury-black">The Fairmont — Tonga Room</h4>
                  <p className="neighborhood text-sm font-light text-gray-500 tracking-[0.05em]">Nob Hill</p>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    Tiki bar inside the Fairmont. A lagoon, orchestrated thunderstorms, a band on a
                    floating stage. Absurd and perfect in equal measure. Mai tais strong enough to
                    justify the price. Sometimes theater is exactly what's needed after a week of
                    earnest conversations about disruption.
                  </p>
                </div>

                <div className="location-card space-y-3">
                  <h4 className="text-xl font-light text-luxury-black">The Mark Hopkins — Top of the Mark</h4>
                  <p className="neighborhood text-sm font-light text-gray-500 tracking-[0.05em]">Nob Hill</p>
                  <div className="space-y-4 text-base font-light leading-[1.85] text-gray-700">
                    <p>
                      My favorite of all. The only place I know in San Francisco with no key-carded
                      hotel elevator that still meets my standards—if you discount how slowly the
                      elevator actually moves. Tourists from California and beyond, all wanting to
                      see the view.
                    </p>
                    <p>
                      I take the stairs. A few of their drinks and you'll forget your card at the
                      bar, come back for another one during closing hour, and like many places in
                      San Francisco, forget that closing hour even exists. The conversations are
                      that good.
                    </p>
                    <p>
                      Top of the Mark taught me quickly that nothing in San Francisco is limited—
                      ideas, ambitions, possibilities. Everything reaches the sky here.
                    </p>
                    <p>
                      The views at Top of the Mark definitely included.
                    </p>
                  </div>
                </div>

                <div className="location-card space-y-3">
                  <h4 className="text-xl font-light text-luxury-black">Foreign Cinema</h4>
                  <p className="neighborhood text-sm font-light text-gray-500 tracking-[0.05em]">Mission District</p>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    Dinner and a film projected on the wall. California-Mediterranean cuisine, oysters,
                    weekend brunch that runs until 3 PM. The heated patio works year-round. Mission
                    locals, gallery openings, the kind of crowd that values art over apps.
                  </p>
                </div>

                <div className="location-card space-y-3">
                  <h4 className="text-xl font-light text-luxury-black">State Bird Provisions</h4>
                  <p className="neighborhood text-sm font-light text-gray-500 tracking-[0.05em]">Western Addition</p>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    Dim sum-style service with a Michelin star. Small plates on carts, everything made
                    to order. Reservations released at midnight exactly 60 days in advance. Set an alarm.
                    The pancakes with burrata and strawberries sound wrong and taste perfect.
                  </p>
                </div>

                <div className="location-card space-y-3">
                  <h4 className="text-xl font-light text-luxury-black">Zuni Café</h4>
                  <p className="neighborhood text-sm font-light text-gray-500 tracking-[0.05em]">Hayes Valley</p>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    The roast chicken for two requires 60 minutes. Order it when you sit down. The wait
                    is justified. Caesar salad with house-cured anchovies. Brick oven. Wood tables.
                    San Francisco institution since 1979. Pre-theater crowd before symphony and opera.
                  </p>
                </div>
              </div>

              {/* HOTELS */}
              <h3 className="text-2xl font-extralight tracking-[-0.02em] text-luxury-black mb-6 mt-16" style={{ fontWeight: 200 }}>
                Hotels — Where Staff Understand
              </h3>

              <div className="space-y-8">
                <div className="location-card space-y-3">
                  <h4 className="text-xl font-light text-luxury-black">The Four Seasons San Francisco</h4>
                  <p className="neighborhood text-sm font-light text-gray-500 tracking-[0.05em]">SoMa</p>
                  <div className="space-y-4 text-base font-light leading-[1.85] text-gray-700">
                    <p>
                      Privacy is architectural here, not requested.
                    </p>
                    <p>
                      A mention of the Four Seasons and I already know the assignment—no need to explain.
                      Black car. In-suite for privacy reasons. Arrive exactly at seven, not a moment after.
                      Don't be boring. Come unnoticed. Don't stand out. Privacy is paramount.
                    </p>
                    <p>
                      These things never need to be said. Not only do I know the assignment, but darling,
                      you're not the first decamillionaire to walk through those doors. Trust me—the staff
                      is used to it.
                    </p>
                    <p>
                      In-room services require no explanation. Staff trained to a standard most hotels
                      aspire to. High-net-worth clientele means companion visits register as ordinary.
                      Upper floors overlook the city entirely.
                    </p>
                  </div>
                </div>

                <div className="location-card space-y-3">
                  <h4 className="text-xl font-light text-luxury-black">The Fairmont San Francisco</h4>
                  <p className="neighborhood text-sm font-light text-gray-500 tracking-[0.05em]">Nob Hill</p>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    History and anonymity. Lobby tourists photograph the grand staircase, creating
                    discretion through volume. Tony Bennett's legacy memorialized in plaques. Old
                    San Francisco luxury—not modern, not attempting to be.
                  </p>
                </div>

                <div className="location-card space-y-3">
                  <h4 className="text-xl font-light text-luxury-black">The St. Regis San Francisco</h4>
                  <p className="neighborhood text-sm font-light text-gray-500 tracking-[0.05em]">SoMa</p>
                  <div className="space-y-4 text-base font-light leading-[1.85] text-gray-700">
                    <p>
                      Modern precision. Staff who understand questions are unwelcome.
                    </p>
                    <p>
                      I'm living proof that the hotel staff is so polite, they don't mind—nor say anything—
                      about you navigating Christian Louboutin red-bottom needle-point stilettos at 7 AM.
                      In fact, they'll tell you to walk carefully through the raised safety bumps that
                      separate the residential side of the St. Regis from the hotel entrance.
                    </p>
                    <p>
                      Just don't fall.
                    </p>
                    <p>
                      Designed for business travelers who value efficiency and privacy equally. Walking
                      distance to Moscone Center, close to the Financial District. Everything you need,
                      nothing superfluous.
                    </p>
                  </div>
                </div>

                <div className="location-card space-y-3">
                  <h4 className="text-xl font-light text-luxury-black">The Ritz-Carlton San Francisco</h4>
                  <p className="neighborhood text-sm font-light text-gray-500 tracking-[0.05em]">Nob Hill</p>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    Established discretion. Everyone assumes you belong; no one asks. The rooms initially
                    lacked Bluetooth speakers—an amusing oversight in a tech city, later corrected after
                    a regular client mentioned it to management.
                  </p>
                </div>

                <div className="location-card space-y-3">
                  <h4 className="text-xl font-light text-luxury-black">Palace Hotel</h4>
                  <p className="neighborhood text-sm font-light text-gray-500 tracking-[0.05em]">Financial District</p>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    Historic without performance. The Garden Court's glass dome ceiling dates to 1909.
                    Afternoon tea service beneath it offers old San Francisco without Fairmont crowds.
                    Favored by tech executives who don't signal. Understated deliberately.
                  </p>
                </div>

                <div className="location-card space-y-3">
                  <h4 className="text-xl font-light text-luxury-black">The Proper Hotel</h4>
                  <p className="neighborhood text-sm font-light text-gray-500 tracking-[0.05em]">Mid-Market</p>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    Kelly Wearstler interiors. Rooftop with unobstructed city views. Villon restaurant
                    downstairs for California-Mediterranean. Mid-Market location means Twitter (now X)
                    headquarters proximity. Tech crowd, design-forward, younger energy than Nob Hill.
                  </p>
                </div>
              </div>

              {/* NEIGHBORHOODS */}
              <h3 className="text-2xl font-extralight tracking-[-0.02em] text-luxury-black mb-6 mt-16" style={{ fontWeight: 200 }}>
                Neighborhoods — Where I've Lived and Worked
              </h3>

              <div className="space-y-8">
                <div className="location-card space-y-3">
                  <h4 className="text-xl font-light text-luxury-black">Pacific Heights</h4>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    Where I lived above Google. Wealth that doesn't advertise. Teslas considered understated.
                    Residents include tech department heads, investors who don't introduce themselves,
                    the occasional escort who owns property in Sacramento. Fillmore Street for dining and
                    shopping. Lafayette Park at 7 AM for silent assessment disguised as dog walking.
                  </p>
                </div>

                <div className="location-card space-y-3">
                  <h4 className="text-xl font-light text-luxury-black">Nob Hill</h4>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    Old San Francisco. The Fairmont, the Mark Hopkins, wealth that predates tech.
                    Grace Cathedral overlooks everyone. Tradition and discretion established long ago.
                    Cable cars mean tourists, which means anonymity through numbers.
                  </p>
                </div>

                <div className="location-card space-y-3">
                  <h4 className="text-xl font-light text-luxury-black">Russian Hill</h4>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    Quieter than Pacific Heights, equally sophisticated. Residential, established.
                    Neighbors mind their business because they expect reciprocity. Lombard Street brings
                    daytime tourists. Nights are silent. Gary Danko is here—that clarifies the clientele.
                  </p>
                </div>

                <div className="location-card space-y-3">
                  <h4 className="text-xl font-light text-luxury-black">Financial District</h4>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    Business travelers. Late check-ins, early SFO flights, dinner meetings that extend.
                    Empty weekends, packed weekdays. Efficiency over elegance. Clients here bill their
                    time at $1,500 per hour and value yours accordingly.
                  </p>
                </div>

                <div className="location-card space-y-3">
                  <h4 className="text-xl font-light text-luxury-black">SoMa</h4>
                  <div className="space-y-4 text-base font-light leading-[1.85] text-gray-700">
                    <p>
                      Startup culture. Convention center proximity. Everyone's in town for something,
                      no one's asking questions. The St. Regis, the Four Seasons, Moscone Center.
                      Professional transience as infrastructure.
                    </p>
                    <p>
                      SFMOMA for Friday nights when I needed to think. I'd take my phone and obsess over
                      how Andy Warhol used repetition to create such exceptional pieces, sending ChatGPT
                      photos like we're best friends.
                    </p>
                    <p>
                      <em>"What about this one?"</em>
                    </p>
                    <p>
                      <em>"That's not a Warhol, Katherine. I can see it says 'Diego Rivera' in the description.
                      In fact, predictive analysis will tell me you're in the Frida Kahlo section, and knowing
                      you, need to head out because the museum is now closed."</em>
                    </p>
                    <p>
                      Chat could see with his AI eyes.
                    </p>
                  </div>
                </div>

                <div className="location-card space-y-3">
                  <h4 className="text-xl font-light text-luxury-black">Marina District</h4>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    Younger tech money. Balboa Café without irony. More casual than Pacific Heights,
                    less formal than Nob Hill. Still sophisticated. Still San Francisco.
                  </p>
                </div>

                <div className="location-card space-y-3">
                  <h4 className="text-xl font-light text-luxury-black">Cow Hollow</h4>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    Between the Marina and Pacific Heights. Union Street boutiques, Left Door for cocktails,
                    residential side streets. The neighborhood that doesn't announce itself. Quieter than
                    Marina, younger than Pacific Heights. Balanced.
                  </p>
                </div>

                <div className="location-card space-y-3">
                  <h4 className="text-xl font-light text-luxury-black">Mission District</h4>
                  <div className="space-y-4 text-base font-light leading-[1.85] text-gray-700">
                    <p>
                      Art galleries, murals, Valencia Street corridor. Foreign Cinema, Tartine Bakery lines
                      that justify the wait. Tech money mixed with artists who were here first. Dolores Park
                      on weekends. The neighborhood that resists easy categorization.
                    </p>
                    <p>
                      I remember spending Friday nights here when I wasn't on a date. Gallery hopping on
                      Valencia, always staying past closing at coffee shops where no one seemed to mind.
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-extralight tracking-[-0.02em] text-luxury-black mb-6 mt-16" style={{ fontWeight: 200 }}>
                Beyond the City — Where We Disappear
              </h3>

              <div className="space-y-8">
                <div className="location-card space-y-3">
                  <h4 className="text-xl font-light text-luxury-black">Napa Valley</h4>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    Discretion through distance. Where San Francisco decompresses. Meadowood, Auberge du Soleil,
                    French Laundry if you plan three months ahead. Wine country is less about the wine, more
                    about the space between conversations. I'm more interested in the company than the varietal.
                  </p>
                </div>

                <div className="location-card space-y-3">
                  <h4 className="text-xl font-light text-luxury-black">Sonoma</h4>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    Quieter than Napa, less showy. Healdsburg for Michelin stars without Napa prices.
                    Russian River Valley for pinot noir. The kind of place where you remember why you
                    liked each other in the first place.
                  </p>
                </div>

                <div className="location-card space-y-3">
                  <h4 className="text-xl font-light text-luxury-black">Carmel & Big Sur</h4>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    Two hours south on Highway 1. Carmel for Michelin restaurants and art galleries.
                    Big Sur for coastline and the realization that most urgency is manufactured. Ventana,
                    Post Ranch Inn—the kind of weekend escape that feels significant.
                  </p>
                </div>

                <div className="location-card space-y-3">
                  <h4 className="text-xl font-light text-luxury-black">Muir Woods</h4>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    Cathedral-quiet redwoods, twenty minutes north. When you need to remember that most
                    of what feels urgent isn't. No cell service. That's the point.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SERVICE AREAS */}
          <section className="service-areas border-t border-gray-200 py-20 md:py-28 bg-luxury-gray-50">
            <div className="container mx-auto px-6 md:px-8 max-w-2xl">
              <h2 className="mb-8 text-3xl md:text-4xl font-extralight tracking-[-0.02em] text-luxury-black" style={{ fontWeight: 200 }}>
                Service Areas Throughout the Bay
              </h2>

              <p className="text-base font-light leading-[1.85] text-gray-700 mb-12">
                Ten years taught me geography matters. Not just which city—which neighborhood.
                Not just which hotel—which entrance.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-light text-luxury-black mb-3">Elite Companion Services: Peninsula</h3>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    Palo Alto. Sand Hill Road. Stanford. Venture capital epicenter. Clients in town for
                    pitch meetings who need someone fluent in cap tables. Menlo Park for Meta headquarters
                    and additional VC offices. Mountain View for Google's main campus. Redwood City for
                    Oracle. San Mateo for the space between.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-light text-luxury-black mb-3">Luxury Escort Services: South Bay</h3>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    San Jose. Downtown, Santana Row, the sprawling tech hub people underestimate. Cisco,
                    Adobe, PayPal—less visible than San Francisco, equally wealthy. Sunnyvale for LinkedIn.
                    Cupertino for Apple Park. Los Gatos for Netflix and wine bars. Campbell and Saratoga
                    for residential wealth.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-light text-luxury-black mb-3">Professional Companion: East Bay</h3>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    Oakland. Songbird, Art Murmur, the lake. Less pretension than San Francisco, more
                    authenticity. Berkeley for university culture and conversations that extend past 3 AM.
                    Walnut Creek for East Bay wealth untied to tech. Piedmont for residential discretion.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="faq border-t border-gray-200 py-20 md:py-28 bg-luxury-white">
            <div className="container mx-auto px-6 md:px-8 max-w-2xl">
              <h2 className="mb-12 text-3xl md:text-4xl font-extralight tracking-[-0.02em] text-luxury-black" style={{ fontWeight: 200 }}>
                Frequently Asked Questions
              </h2>

              <div className="space-y-10">
                <div className="faq-item">
                  <h3 className="text-xl font-light text-luxury-black mb-3">What areas of San Francisco do you serve?</h3>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    I provide luxury companion services throughout San Francisco including Pacific Heights,
                    Nob Hill, Russian Hill, the Financial District, SoMa, Marina District, Cow Hollow, and
                    Mission District. I also serve the entire Bay Area including Peninsula cities (Palo Alto,
                    Menlo Park, Mountain View), South Bay (San Jose, Sunnyvale, Cupertino), East Bay (Oakland,
                    Berkeley, Walnut Creek), and Wine Country (Napa, Sonoma, Healdsburg).
                  </p>
                </div>

                <div className="faq-item">
                  <h3 className="text-xl font-light text-luxury-black mb-3">What services do you offer as a San Francisco escort?</h3>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    I offer elite companion services including dinner dates at restaurants like Gary Danko,
                    Spruce, and Quince; overnight arrangements at luxury hotels such as the Four Seasons and
                    St. Regis; weekend travel to Napa Valley and beyond; business event accompaniment; and
                    extended engagements. Discretion is architectural, not requested.
                  </p>
                </div>

                <div className="faq-item">
                  <h3 className="text-xl font-light text-luxury-black mb-3">How do I book a luxury companion in San Francisco?</h3>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    Screening is required for all new clients. I accept LinkedIn profiles, employment
                    verification, or two provider references. Please allow 24-48 hours advance notice for
                    dinner dates and overnight arrangements, though occasional last-minute availability exists
                    for repeat clients. Rates are provided after screening.
                  </p>
                </div>

                <div className="faq-item">
                  <h3 className="text-xl font-light text-luxury-black mb-3">Do you offer travel companionship?</h3>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    Yes, I provide travel companion services both domestically and internationally with advance
                    arrangements. Wine country escapes to Napa and Sonoma are particularly popular, as are
                    weekend trips to Carmel and Big Sur. For extended international travel, please inquire
                    at least two weeks in advance.
                  </p>
                </div>

                <div className="faq-item">
                  <h3 className="text-xl font-light text-luxury-black mb-3">What makes you different from other San Francisco escorts?</h3>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    I specialize in serving San Francisco's tech and finance professionals. My clients include
                    founders, VCs, and executives at Google, Meta, and other major companies. I understand
                    transformer architectures, cap tables, competitive advantages, and network effects. I know
                    why the sommelier at Gary Danko recognizes your date by name. I've learned more at dinner
                    tables in Pacific Heights than I did earning my business degree at Sacramento State.
                  </p>
                </div>

                <div className="faq-item">
                  <h3 className="text-xl font-light text-luxury-black mb-3">Are you available for same-day bookings?</h3>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    While I prefer 24-48 hours notice for optimal preparation, I occasionally accommodate
                    same-day requests for established clients. Availability varies based on my schedule.
                    For the best experience and to ensure availability, advance booking is strongly recommended,
                    particularly for dinner reservations at places like House of Prime Rib or Benu.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* BOOKING */}
          <section className="booking border-t border-gray-200 py-20 md:py-28 bg-luxury-gray-50">
            <div className="container mx-auto px-6 md:px-8 max-w-2xl">
              <h2 className="mb-8 text-3xl md:text-4xl font-extralight tracking-[-0.02em] text-luxury-black" style={{ fontWeight: 200 }}>
                How to Book a Luxury Companion in San Francisco
              </h2>

              <p className="text-base font-light leading-[1.85] text-gray-700 mb-12">
                As an independent, verified escort serving San Francisco's tech and finance elite,
                I offer high-end companion services for discerning professionals who value discretion,
                intelligence, and sophistication.
              </p>

              <div className="booking-details space-y-8">
                <div>
                  <h3 className="text-xl font-light text-luxury-black mb-3">Screening Required</h3>
                  <ul className="list-disc list-inside space-y-2 text-base font-light leading-[1.85] text-gray-700">
                    <li>LinkedIn profile or employment verification</li>
                    <li>Two provider references, or verification through preferred screening service</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-light text-luxury-black mb-3">Advance Notice</h3>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    24-48 hours preferred for dinner dates and overnight arrangements. Repeat clients receive priority. Occasional last-minute availability for established relationships.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-light text-luxury-black mb-3">Service Areas</h3>
                  <div className="text-base font-light leading-[1.85] text-gray-700 space-y-2">
                    <p><strong className="font-normal text-luxury-black">San Francisco:</strong> All neighborhoods, outcall to luxury hotels or private residences</p>
                    <p><strong className="font-normal text-luxury-black">Sacramento:</strong> Incall at private East Sacramento residence (no additional cost), or outcall</p>
                    <p><strong className="font-normal text-luxury-black">Bay Area:</strong> Peninsula, South Bay, East Bay, Wine Country</p>
                    <p><strong className="font-normal text-luxury-black">Travel:</strong> Domestic and international companion services with advance arrangements</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-light text-luxury-black mb-3">What I Offer</h3>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    Dinner companionship at Michelin-starred restaurants. Overnight arrangements at Four Seasons,
                    St. Regis, and other luxury properties. Weekend travel to Napa Valley, Sonoma, Carmel, and beyond.
                    Business event accompaniment. Extended engagements. Discretion that's assumed, not requested.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-light text-luxury-black mb-3">Contact</h3>
                  <p className="text-base font-light leading-[1.85] text-gray-700">
                    <a href="/inquire" className="underline hover:text-luxury-black transition-colors">Contact me through the inquiry form</a>
                  </p>
                </div>

                <p className="rates text-sm font-light text-gray-600 italic pt-4 border-t border-gray-200">
                  Rates available upon request after screening.
                </p>
              </div>
            </div>
          </section>

          {/* CLOSING */}
          <section className="closing border-t border-gray-200 py-20 md:py-28 bg-luxury-white">
            <div className="container mx-auto px-6 md:px-8 max-w-2xl space-y-7">
              <p className="text-base font-light leading-[1.85] text-gray-700">
                If you've been following my career and wondered where I went—now you know. I tried to
                leave. I tried civilian life, Sacramento dating, the idea that normal was what I wanted.
              </p>

              <p className="text-base font-light leading-[1.85] text-gray-700">
                Turns out I fell in love with San Francisco instead.
              </p>

              <p className="text-base font-light leading-[1.85] text-gray-700">
                Not the poetic version. The tourist-shirt-in-Fisherman's-Wharf version. The cliché they
                print on sweatshirts for people visiting from Ohio.
              </p>

              <p className="heart text-xl font-normal text-luxury-black">
                <strong>I ♥ SF.</strong>
              </p>

              <p className="text-base font-light leading-[1.85] text-gray-700">
                Except I mean it. The standards. The infrastructure. The way tech founders call you mediocre
                and somehow make it feel like you just won something. The Waymos. The sommelier at Gary Danko
                who recognizes your date by name. The valet at House of Prime Rib who texts you when there's
                a cancellation. The fact that discretion isn't a request—it's architecture.
              </p>

              <p className="text-base font-light leading-[1.85] text-gray-700">
                Sacramento taught me I don't want normal. San Francisco taught me what I do want.
              </p>

              <p className="text-base font-light leading-[1.85] text-gray-700">
                Whether you're seeking a dinner companion in Pacific Heights, an overnight arrangement at
                the Four Seasons, or a travel companion to Napa Valley, I provide the luxury escort experience
                San Francisco's elite professionals deserve.
              </p>

              <p className="text-base font-light leading-[1.85] text-gray-700">
                So I'm back. If this sounds aligned—welcome to my world.
              </p>

              <p className="signature text-base font-light leading-[1.85] tracking-[0.01em] text-luxury-black">
                -Katherine
              </p>
            </div>
          </section>

        </div>
      )}

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
