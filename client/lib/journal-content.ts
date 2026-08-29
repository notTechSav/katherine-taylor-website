/** Per-entry overrides for essays that carry their own search intent. */
export type JournalEssaySeo = {
  title?: string;
  description?: string;
  keywords?: string;
  geoRegion?: string;
  geoPlacename?: string;
};

export type JournalEssay = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  publishedDate: string;
  readNext?: string;
  seo?: JournalEssaySeo;
};

export type JournalBlock =
  | { type: "heading"; level: 2 | 3 | 4; text: string }
  | { type: "list"; items: string[] }
  | { type: "paragraph"; text: string };

export type JournalDisplayCopy = {
  pageTitle: string;
  subtitle: string;
  microline: string;
  ctaLabel: string;
  closeLabel: string;
  readNextPrefix: string;
};

export const journalDisplay: JournalDisplayCopy = {
  pageTitle: "The High-End Edition",
  subtitle: "A journal by Katherine Taylor Escort",
  microline: "I write infrequently. Scarcity is intentional.",
  ctaLabel: "Read quietly",
  closeLabel: "Close",
  readNextPrefix: "Read next:",
};

export const heroImage = {
  src: "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2F468e25adcb8345b7bbb221b9cb08720c?format=webp&width=800",
  alt: "Open journal on linen table beside a glass of water in warm morning light",
};

export const essays: JournalEssay[] = [
  {
    slug: "memoirs-in-the-city",
    title: "Memoirs in the City",
    excerpt:
      "After going viral at a Warriors game, I vanished from San Francisco. Searches turned up nothing. This is why I left—and why I'm back.",
    body: `## Searching for Katherine Taylor in San Francisco

A rush of searches: "Katherine Taylor", "Katherine Taylor Steph Curry", "Katherine Taylor Warriors" - nothing. "Katherine Taylor website"? TMZ inquired. "Katherine Taylor Twitter"? New York Post. Nothing. "San Francisco escorts"? "Sacramento escorts"? "Bay Area escorts"? "Escorts near me"? -*googled* an Amish man on his time away on a library computer. The website: "KatherineTaylorEscort.com" - gone.

How does someone become viral and decide to suddenly walk?

This is the story I've been meaning to tell for a long time, why I left San Francisco.

In a city built on being seen, what happens when you choose to disappear?

I couldn't help but wonder: when you walk away from everything at the peak—do you cease to exist, or finally start living?

## What Sacramento Couldn't Give Me

I moved back to Sacramento in December 2024 after teetering with the idea of marriage. I left escorting to try to find love. A normal life, perhaps. The kind where people don't Google you after a Warriors game.

(Hint—for anyone wanting to skip to the bottom, "love" I did find. Just not the kind I was looking for.)

For a few months, it worked. I tried civilian dating. Went to the usual Sacramento spots trying to forget what I'd left behind.

I went to Mix Ultra Lounge on K Street hoping to find a trace of Balboa Café—the Marina energy, the espresso-then-vodka progression, the back booths that served their purpose. They didn't have espresso martinis.

I went to Barwest on J Street and somehow found myself thinking about the Tenderloin. The IPO founders I'd known who didn't care about appearances and chose to stay in those tiny hotels anyway. The ones who called me mediocre and meant it as a compliment.

I went to Revival at the Sawyer Hotel and remembered my favorite Sacramento couple—the ones who would periodically visit me in San Francisco. We'd go to Left Door on Union and they'd systematically dismantle every business idea I considered viable. I miss them.

I ordered espresso martinis at three different Sacramento bars. None of them knew what I was talking about. It still wasn't San Francisco.

Then suddenly, I stopped being mediocre. In Sacramento, people were actually impressed by me. Groups of men would approach like they didn't know what restraint was. I'd get approached in Home Depot parking lots while I was busy writing Claude.ai something about AI products I'd heard about. Just as I started reminiscing about my Pacific Heights apartment not far from Anthropic's office, a man named Victor walked up with a Russian accent and told me to give him my number like it was an assumed close.

I started wearing glasses with no lenses everywhere I went to ward off the sexual attention. That somehow made me more approachable. Hookup culture is strange. Did you know that's a thing? People just hook up and don't talk to each other after. I found that odd because my clients and I talk all the time. Here, maybe there was just nothing to talk about.

Sacramento was teaching me to settle. And somewhere in the middle of bad dates and worse espresso martinis, I realized what I'd been looking for wasn't a person.

It was a city. One that never let me settle.

## Why I Lived Above Google (Literally)

My last San Francisco apartment was in Pacific Heights, above the Google offices. My neighbors were department heads, compliance officers, strategy directors. They never acknowledged each other in the hallway, but they all somehow knew me.

"Oh, you date Katherine too?" "No, she's just my neighbor."

Living in Pacific Heights taught me that discretion in San Francisco isn't about secrecy. It's infrastructure. Hotels that don't ask questions because they've learned not to. Restaurants on Fillmore Street where privacy is assumed. Car services that eliminated the driver entirely—Waymos from Pacific Heights to the St. Regis without a single shared glance.

This city understands transience. People arrive for board meetings, investor dinners, global economic conferences. A companion at dinner registers as ordinary in the Financial District. In SOMA. The city absorbs it.

I missed flexing my skills. I missed the two-sentence emails from founders who were trying to weed me out by directly stating what they wanted—and I missed even more being able to tell those messages apart from the gentlemen who truly had to be declined for risk and compliance reasons. I couldn't help dwelling on the difference between texting a CEO versus a CFO. The CFO was always a better negotiator than me. Those nuances turned into the moments my founders directly told me not to burden them with—the boring, senseless details. Now I understood why.

That's what I missed. The standard.

## The Clients Who Made Me Better

The Steph Curry moment crashed my website. Not emotionally—technically. The bandwidth couldn't handle the traffic from TMZ and the New York Post. Three months offline.

My assistant Sandi dismissed it. "Men don't care if you write. Don't make rebuilding a website a production."

My niche built the internet.

One San Francisco client—a founder with two IPOs in enterprise software—declined to critique my rebuilt site out of politeness. Another, a product lead at Google, identified six errors I'd missed. My New York clients, finance professionals from Morgan Stanley and Goldman, called it flawless.

San Francisco built the infrastructure we all use, so they held me to it. Your advantage here isn't appearance. It's keeping pace with someone who's taken two companies public, understanding references to transformer architectures, maintaining composure when the sommelier at Gary Danko in Russian Hill recognizes your date by name.

One client—a VC who'd backed three unicorns—asked me during dinner at Gary Danko what my "moat" was. Up until then, I'd only heard the word "moat" used to describe financial literacy in Robert Kiyosaki's Rich Dad Poor Dad—"financial literacy is the moat that separates the two classes." That language, that moat, I had a grasp on. Tech, not yet.

He spent the next 45 minutes explaining competitive advantages, network effects, and why my discretion was defensible. I took notes on my phone. He laughed and said, "You're the only escort I know who treats dates like board meetings."

I realized I did know the word moat after all.

I still have those notes. They're better than the business degree at Sacramento State I paid for.

I haven't outsourced a website build, security audit, or assistant hire since. San Francisco humbled me. The most valuable assets are digital.

I missed that caliber.

## Where I'm Comfortable in San Francisco

A decade of experience distilled into recommendations. Where to dine. Where to stay. What makes each place worth your time.

### Dining — Where Discretion Is Assumed

#### Spruce — Presidio Heights

Conversation over spectacle. Dim lighting, attentive staff, a wine list curated with care.

A founder once told me over dinner here that he'd just turned down a $400 million acquisition offer. Spruce has that effect—dim enough that you feel safe admitting things you wouldn't say in daylight. I never asked if he regretted it.

I'm certain he made the right choice, just as I did ordering the added truffles on my pasta. The dish arrived and the conversation changed. Spruce's truffles are indeed equally as interesting as a $400 million acquisition, and if you're at all conflicted about turning down a deal like that, you won't be after that specific dish.

The truffles vary between $200 and $10,000 per gram (not quite) depending on season and availability. Reservations required. Regulars are accommodated.

#### Songbird — Oakland

Michelin-rated, understated. Chef Chris Bleidorn's tasting menu changes with the seasons. The precision remains constant. A Google executive took me here on our fourth date—mentioned his position only in passing. The Waymo pickup meant no shared attention with a driver. Oakland locals protect this place carefully.

#### House of Prime Rib — Polk Gulch

One of the only places I'll give a discount to if you can get a table. Good luck. They're booked a year in advance.

Ask me if you need one, though. I slip Marcus—the valet—a hundred dollars every time I see him. He's easy to spot. In fact, just stand outside and look lost, and he'll spot you. His polite greeting is his way of saying he, unlike the hostess, will take your money.

Thankfully, the art of palm greasing wasn't the only thing that stayed unchanged since 1949. Prime rib carved tableside from a steel cart. Salad spun in a wooden bowl for your entertainment. Copious amounts of wine poured generously enough that Marcus once recommended I not drive, but take a Waymo home instead.

There's always a line. It's always justified. The valet knows which regulars haven't visited recently and will text when there's a cancellation.

Otherwise, OpenTable has them booked eight months out. Good luck.

#### Gary Danko — Russian Hill

Michelin-starred for good reason. Three courses minimum, five recommended. Wine pairings are assertive but justified. Dress code enforced—jackets required, provided if necessary. The sommelier recognizes established guests. Privacy through professionalism.

#### Quince — Jackson Square

Three Michelin stars. Eight courses. Chef Michael Tusk sources obsessively—olive oil from a specific Ligurian grove, pasta flour from an Umbrian mill. Three hours minimum. Bring someone who doesn't need their phone.

#### Benu — SoMa

More courses than possible to consume, but thank god for the interruptions. Fourteen pauses because the founder across from me has moved on from solving the world's problems and can't help himself with the problem-solving mentality—he transitions to mine.

"You're marketing incorrectly, Katherine. You need to focus on your existing clientele first and figure out what a 'value add' is."

"Okay, what's a value add?"

Two months later, he sends me to Herman Miller after I asked about a chair recommendation—a real-life, in-store lesson where yes, now I understand both the concept and the delivery. There stands in my office a $2,000 reminder of how much smarter people are in San Francisco, in the form of a chair. The value add was the lesson.

#### Atelier Crenn — Cow Hollow

Remarkable. So was the company. The company was more remarkable, though. I remember there being one too many courses—it's time to leave when your date happens to be more interesting than the white chocolate orb filled with apple cider liquid and topped with crème de cassis that we came for but couldn't stay for.

#### Left Door on Union — Cow Hollow

Fifteen seats. Craft cocktails that require patience. Conversation is the point. My favorite Sacramento couple would visit me in San Francisco and we'd end up here. They'd systematically dismantle every business idea I considered viable over Oaxaca Old Fashioneds. Two hours of uninterrupted attention.

#### Balboa Café — Marina District

Marina locals who've been coming for years—my favorite place to see my clientele in the wild. A wink from across the crowd settles exactly as it should.

"You look great, Katherine. So does my wife next to me. You're an exceptional hugger, but now would not be the time."

Little does he know, the woman next to me isn't just a friend, and he's not the only one having date night. This is San Francisco, after all.

Espresso comes first at Balboa, then vodka—intellect is sharp around here and there's no reason to dumb yourself down. The velvet green booths serve their purpose. They keep me and my date safe from the crowd.

#### The Fairmont, Tonga Room — Nob Hill

Tiki bar inside the Fairmont. A lagoon, orchestrated thunderstorms, a band on a floating stage. Absurd and perfect in equal measure. Mai tais strong enough to justify the price. Sometimes theater is exactly what's needed after a week of earnest conversations about disruption.

#### The Mark Hopkins, Top of the Mark — Nob Hill

My favorite of all. The only place I know in San Francisco with no key-carded hotel elevator that still meets my standards—if you discount how slowly the elevator actually moves. Tourists from California and beyond, all wanting to see the view.

I take the stairs. A few of their drinks and you'll forget your card at the bar, come back for another one during closing hour, and like many places in San Francisco, forget that closing hour even exists. The conversations are that good.

Top of the Mark taught me quickly that nothing in San Francisco is limited—ideas, ambitions, possibilities. Everything reaches the sky here.

The views at Top of the Mark definitely included.

#### Foreign Cinema — Mission District

Dinner and a film projected on the wall. California-Mediterranean cuisine, oysters, weekend brunch that runs until 3 PM. The heated patio works year-round. Mission locals, gallery openings, the kind of crowd that values art over apps.

#### State Bird Provisions — Western Addition

Dim sum-style service with a Michelin star. Small plates on carts, everything made to order. Reservations released at midnight exactly 60 days in advance. Set an alarm. The pancakes with burrata and strawberries sound wrong and taste perfect.

#### Zuni Café — Hayes Valley

The roast chicken for two requires 60 minutes. Order it when you sit down. The wait is justified. Caesar salad with house-cured anchovies. Brick oven. Wood tables. San Francisco institution since 1979. Pre-theater crowd before symphony and opera.

### Hotels — Where Staff Understand

#### The Four Seasons San Francisco — SoMa

Privacy is architectural here, not requested.

A mention of the Four Seasons and I already know the assignment—no need to explain. Black car. In-suite for privacy reasons. Arrive exactly at seven, not a moment after. Don't be boring. Come unnoticed. Don't stand out. Privacy is paramount.

These things never need to be said. Not only do I know the assignment, but darling, you're not the first decamillionaire to walk through those doors. Trust me—the staff is used to it.

In-room services require no explanation. Staff trained to a standard most hotels aspire to. High-net-worth clientele means companion visits register as ordinary. Upper floors overlook the city entirely.

#### The Fairmont San Francisco — Nob Hill

History and anonymity. Lobby tourists photograph the grand staircase, creating discretion through volume. Tony Bennett's legacy memorialized in plaques. Old San Francisco luxury—not modern, not attempting to be.

#### The St. Regis San Francisco — SoMa

Modern precision. Staff who understand questions are unwelcome.

I'm living proof that the hotel staff is so polite, they don't mind—nor say anything—about you navigating Christian Louboutin red-bottom needle-point stilettos at 7 AM. In fact, they'll tell you to walk carefully through the raised safety bumps that separate the residential side of the St. Regis from the hotel entrance.

Just don't fall.

Designed for business travelers who value efficiency and privacy equally. Walking distance to Moscone Center, close to the Financial District. Everything you need, nothing superfluous.

#### The Ritz-Carlton San Francisco — Nob Hill

Established discretion. Everyone assumes you belong; no one asks. The rooms initially lacked Bluetooth speakers—an amusing oversight in a tech city, later corrected after a regular client mentioned it to management.

#### Palace Hotel — Financial District

Historic without performance. The Garden Court's glass dome ceiling dates to 1909. Afternoon tea service beneath it offers old San Francisco without Fairmont crowds. Favored by tech executives who don't signal. Understated deliberately.

#### The Proper Hotel — Mid-Market

Kelly Wearstler interiors. Rooftop with unobstructed city views. Villon restaurant downstairs for California-Mediterranean. Mid-Market location means Twitter (now X) headquarters proximity. Tech crowd, design-forward, younger energy than Nob Hill.

### Neighborhoods — Where I've Lived and Worked

#### Pacific Heights

Where I lived above Google. Wealth that doesn't advertise. Teslas considered understated. Residents include tech department heads, investors who don't introduce themselves, the occasional escort who owns property in Sacramento. Fillmore Street for dining and shopping. Lafayette Park at 7 AM for silent assessment disguised as dog walking.

#### Nob Hill

Old San Francisco. The Fairmont, the Mark Hopkins, wealth that predates tech. Grace Cathedral overlooks everyone. Tradition and discretion established long ago. Cable cars mean tourists, which means anonymity through numbers.

#### Russian Hill

Quieter than Pacific Heights, equally sophisticated. Residential, established. Neighbors mind their business because they expect reciprocity. Lombard Street brings daytime tourists. Nights are silent. Gary Danko is here—that clarifies the clientele.

#### Financial District

Business travelers. Late check-ins, early SFO flights, dinner meetings that extend. Empty weekends, packed weekdays. Efficiency over elegance. Clients here bill their time at $1,500 per hour and value yours accordingly.

#### SoMa

Startup culture. Convention center proximity. Everyone's in town for something, no one's asking questions. The St. Regis, the Four Seasons, Moscone Center. Professional transience as infrastructure.

SFMOMA for Friday nights when I needed to think. I'd take my phone and obsess over how Andy Warhol used repetition to create such exceptional pieces, sending ChatGPT photos like we're best friends.

"What about this one?"

"That's not a Warhol, Katherine. I can see it says 'Diego Rivera' in the description. In fact, predictive analysis will tell me you're in the Frida Kahlo section, and knowing you, need to head out because the museum is now closed."

Chat could see with his AI eyes.

#### Marina District

Younger tech money. Balboa Café without irony. More casual than Pacific Heights, less formal than Nob Hill. Still sophisticated. Still San Francisco.

#### Cow Hollow

Between the Marina and Pacific Heights. Union Street boutiques, Left Door for cocktails, residential side streets. The neighborhood that doesn't announce itself. Quieter than Marina, younger than Pacific Heights. Balanced.

#### Mission District

Art galleries, murals, Valencia Street corridor. Foreign Cinema, Tartine Bakery lines that justify the wait. Tech money mixed with artists who were here first. Dolores Park on weekends. The neighborhood that resists easy categorization.

I remember spending Friday nights here when I wasn't on a date. Gallery hopping on Valencia, always staying past closing at coffee shops where no one seemed to mind.

### Beyond the City — Where We Disappear

#### Napa Valley

Discretion through distance. Where San Francisco decompresses. Meadowood, Auberge du Soleil, French Laundry if you plan three months ahead. Wine country is less about the wine, more about the space between conversations. I'm more interested in the company than the varietal.

#### Sonoma

Quieter than Napa, less showy. Healdsburg for Michelin stars without Napa prices. Russian River Valley for pinot noir. The kind of place where you remember why you liked each other in the first place.

#### Carmel & Big Sur

Two hours south on Highway 1. Carmel for Michelin restaurants and art galleries. Big Sur for coastline and the realization that most urgency is manufactured. Ventana, Post Ranch Inn—the kind of weekend escape that feels significant.

#### Muir Woods

Cathedral-quiet redwoods, twenty minutes north. When you need to remember that most of what feels urgent isn't. No cell service. That's the point.

## The Peninsula, the South Bay, the East Bay

Ten years taught me geography matters. Not just which city—which neighborhood. Not just which hotel—which entrance.

### The Peninsula

Palo Alto. Sand Hill Road. Stanford. Venture capital epicenter. Clients in town for pitch meetings who need someone fluent in cap tables. Menlo Park for Meta headquarters and additional VC offices. Mountain View for Google's main campus. Redwood City for Oracle. San Mateo for the space between.

### The South Bay

San Jose. Downtown, Santana Row, the sprawling tech hub people underestimate. Cisco, Adobe, PayPal—less visible than San Francisco, equally wealthy. Sunnyvale for LinkedIn. Cupertino for Apple Park. Los Gatos for Netflix and wine bars. Campbell and Saratoga for residential wealth.

### The East Bay

Oakland. Songbird, Art Murmur, the lake. Less pretension than San Francisco, more authenticity. Berkeley for university culture and conversations that extend past 3 AM. Walnut Creek for East Bay wealth untied to tech. Piedmont for residential discretion.

## Frequently Asked Questions

### What areas of San Francisco do you serve?

I provide luxury companion services throughout San Francisco including Pacific Heights, Nob Hill, Russian Hill, the Financial District, SoMa, Marina District, Cow Hollow, and Mission District. I also serve the entire Bay Area including Peninsula cities (Palo Alto, Menlo Park, Mountain View), South Bay (San Jose, Sunnyvale, Cupertino), East Bay (Oakland, Berkeley, Walnut Creek), and Wine Country (Napa, Sonoma, Healdsburg).

### What services do you offer as a San Francisco escort?

I offer elite companion services including dinner dates at restaurants like Gary Danko, Spruce, and Quince; overnight arrangements at luxury hotels such as the Four Seasons and St. Regis; weekend travel to Napa Valley and beyond; business event accompaniment; and extended engagements. Discretion is architectural, not requested.

### How do I book a luxury companion in San Francisco?

Screening is required for all new clients. I accept LinkedIn profiles, employment verification, or two provider references. Please allow 24-48 hours advance notice for dinner dates and overnight arrangements, though occasional last-minute availability exists for repeat clients. Rates are provided after screening.

### Do you offer travel companionship?

Yes, I provide travel companion services both domestically and internationally with advance arrangements. Wine country escapes to Napa and Sonoma are particularly popular, as are weekend trips to Carmel and Big Sur. For extended international travel, please inquire at least two weeks in advance.

### What makes you different from other San Francisco escorts?

I specialize in serving San Francisco's tech and finance professionals. My clients include founders, VCs, and executives at Google, Meta, and other major companies. I understand transformer architectures, cap tables, competitive advantages, and network effects. I know why the sommelier at Gary Danko recognizes your date by name. I've learned more at dinner tables in Pacific Heights than I did earning my business degree at Sacramento State.

### Are you available for same-day bookings?

While I prefer 24-48 hours notice for optimal preparation, I occasionally accommodate same-day requests for established clients. Availability varies based on my schedule. For the best experience and to ensure availability, advance booking is strongly recommended, particularly for dinner reservations at places like House of Prime Rib or Benu.

## San Francisco, If This Sounds Aligned

As an independent, verified escort serving San Francisco's tech and finance elite, I offer high-end companion services for discerning professionals who value discretion, intelligence, and sophistication.

### Screening Required

- LinkedIn profile or employment verification
- Two provider references, or verification through preferred screening service

### Advance Notice

24-48 hours preferred for dinner dates and overnight arrangements. Repeat clients receive priority. Occasional last-minute availability for established relationships.

### Service Areas

- San Francisco: All neighborhoods, outcall to luxury hotels or private residences
- Sacramento: Incall at private East Sacramento residence (no additional cost), or outcall
- Bay Area: Peninsula, South Bay, East Bay, Wine Country
- Travel: Domestic and international companion services with advance arrangements

### What I Offer

Dinner companionship at Michelin-starred restaurants. Overnight arrangements at Four Seasons, St. Regis, and other luxury properties. Weekend travel to Napa Valley, Sonoma, Carmel, and beyond. Business event accompaniment. Extended engagements. Discretion that's assumed, not requested.

### Contact

Reach me through the inquiry form. Rates available upon request after screening.

## I ♥ SF

If you've been following my career and wondered where I went—now you know. I tried to leave. I tried civilian life, Sacramento dating, the idea that normal was what I wanted.

Turns out I fell in love with San Francisco instead.

Not the poetic version. The tourist-shirt-in-Fisherman's-Wharf version. The cliché they print on sweatshirts for people visiting from Ohio.

I ♥ SF.

Except I mean it. The standards. The infrastructure. The way tech founders call you mediocre and somehow make it feel like you just won something. The Waymos. The sommelier at Gary Danko who recognizes your date by name. The valet at House of Prime Rib who texts you when there's a cancellation. The fact that discretion isn't a request—it's architecture.

Sacramento taught me I don't want normal. San Francisco taught me what I do want.

Whether you're seeking a dinner companion in Pacific Heights, an overnight arrangement at the Four Seasons, or a travel companion to Napa Valley, I provide the luxury escort experience San Francisco's elite professionals deserve.

So I'm back. If this sounds aligned—welcome to my world.

-Katherine`,
    publishedDate: "2026-08-27",
    readNext: "continuity-as-craft",
    seo: {
      title: "Memoirs in the City | Katherine Taylor in San Francisco",
      description:
        "After going viral at a Warriors game, Katherine Taylor vanished from San Francisco. Searches turned up nothing. This is why she left—and why she's back.",
      keywords:
        "Katherine Taylor San Francisco, San Francisco escorts, Memoirs in the City, Katherine Taylor",
      geoRegion: "US-CA",
      geoPlacename: "San Francisco",
    },
  },
  {
    slug: "continuity-as-craft",
    title: "Continuity as Craft",
    excerpt:
      "I don't begin from introductions anymore. Most of my work starts in the middle—continuing a conversation we left half-finished six months ago. Continuity isn't remembering; it's architecture.",
    body: `I don't begin from introductions anymore. Most of my work starts in the middle—continuing a conversation we left half-finished six months ago. Continuity isn't remembering; it's architecture. I build silent frameworks that let decisions land without translation.

Over time, that structure becomes the product. A new client once asked what he was actually paying for. I told him, "The first meeting is expensive because I have to build the blueprint. Every one after that gets faster." They never doubt the math again.

People mistake institutional memory for recall, but memory alone has no value. Continuity becomes art when it turns knowledge into anticipation. I can tell from a client's punctuation when he's under pressure. Their silence tells me what their schedule wouldn't dare admit.

The easiest way to lose that craft is to scale. Once you widen the roster, you start to forget the temperature of each relationship. You start needing notes. Notes are the death of intuition. I learned that from watching partners at a law firm re-introduce themselves to the same client annually.

My favorite moments happen in silence. A client will start to brief me, then pause, realizing I already know what he's about to say. That pause is worth more than any testimonial. It's the sound of efficiency replacing ceremony.

Continuity isn't sentimentality. It's operational mastery disguised as empathy. It saves two or three hours of re-establishing context every engagement. It's the difference between someone performing interest and someone fluent in your private vocabulary.

The mistake is thinking continuity just happens. It's a discipline—preparation, repetition, review. I reread old threads before every meeting the way a litigator studies precedent. The patterns compound; decisions shorten.

I don't sell first meetings anymore. I sell the third one—the one that moves at full depth because we no longer waste energy on translation. Continuity is why my rates rise and my volume doesn't. The product is certainty that you'll be heard before you speak.

After a decade of practice, I've learned that mastery isn't variety; it's precision repeated until it becomes intuition. Continuity is my medium. It's the invisible structure that holds everything else upright.

The conversation never resets. It just gets quieter, faster, and closer to truth.`,
    publishedDate: "2025-10-07",
    readNext: "the-luxury-of-unsaid-things",
  },
  {
    slug: "the-luxury-of-unsaid-things",
    title: "The Luxury of Unsaid Things",
    excerpt:
      "The higher the rate, the quieter the room gets. People assume they're paying for polish; they're really paying for the silence where nothing has to be explained. Silence is expensive because anticipation takes work.",
    body: `The higher the rate, the quieter the room gets. People assume they're paying for polish; they're really paying for the silence where nothing has to be explained.

Silence is expensive because anticipation takes work. You can't read subtext until you've spent years reading people. I built that fluency the slow way—thousands of hours noticing what tone, pacing, or phrasing signals worry.

When someone new arrives, they often test the space. They fill the first few minutes with disclaimers or self-editing, the reflexes of people who are constantly managed or recorded. Then they stop. The moment they realize I'm already calibrated, their breathing changes.

That stillness isn't emotional theatre; it's operational efficiency. In rooms where the stakes are high, the ability to understand someone without translation shortens every decision loop. You get to clarity faster because you're not wasting time interpreting.

Luxury brands have known this for decades. Aman remembers your preferred pillow and the exact hour you like to swim. Ritz-Carlton briefs the staff ten days before arrival so you never have to repeat yourself. The result is relief disguised as service.

At this level, conversation itself becomes a form of craftsmanship. What's left unsaid carries the weight. I don't need a client to describe his exhaustion from a merger or the tension in a board seat; it's there in cadence, in the pauses between sentences.

The irony of ultra-premium work is that you can only sustain it through restraint. Every detail is deliberate—the tempo, the brevity, the fact that I never ask questions I already know the answers to. The quiet signals are the proof of competence.

When a client leaves, I don't follow up with thanks or reminders. The silence after is part of the service. He knows I'll remember when the next decision point comes; he doesn't need reassurance. The trust is in the continuity of quiet.

What most people call luxury is ornament—excess applied to simplicity. The real luxury is conservation: saying less, promising less, remembering more. It's the calm that only exists when two people know the conversation is already underway.

Silence, at this level, isn't emptiness. It's the most articulate proof of understanding there is.`,
    publishedDate: "2025-10-07",
    readNext: "scarcity-discipline",
  },
  {
    slug: "scarcity-discipline",
    title: "Scarcity Discipline",
    excerpt:
      "Scarcity isn't a tactic. It's infrastructure. I keep twenty active clients because any more and I'd start forgetting the rhythm of their sentences. Price is the safety valve that preserves precision.",
    body: `Scarcity isn't a tactic. It's infrastructure. I keep twenty active clients because any more and I'd start forgetting the rhythm of their sentences. At this level, forgetting isn't forgivable—it's the fracture that breaks trust.

People think raising rates is about ambition. It isn't. It's about preservation. When demand rises, I have two choices: expand or refine. Expansion would mean delegation, assistants, notes, performance. Refinement means deeper recall.

Scarcity protects continuity. It keeps institutional memory alive by keeping it human. When I know exactly how many conversations I can hold in my head at once, my service stops being reactive. I can prepare in advance because I already know the context.

Every industry that survives at the top practices some form of this. Hermès caps production because mastery can't be scaled. Private banks limit portfolios so their relationship managers remember family histories without prompting.

I learned the same rule by accident. Early in my career I took everyone who asked. The work was constant but shallow—too many names, too much reset. I was busy but forgettable. Then I started saying no. What remained was depth.

Scarcity requires nerve. Turning people away in a culture built on volume feels wrong at first. But when you realize that attention is the true limited commodity, everything else reorders itself. You start guarding the resource instead of your calendar.

Now, when someone new reaches out, I don't think about whether I can fit them in. I think about which existing client's cadence I'd have to sacrifice to make room. That arithmetic keeps me honest. It's why my rates rise, and my availability doesn't.

This is why I don't advertise availability, and why "fully booked" isn't posturing. It's an ecosystem rule. If continuity is the craft, scarcity is the workshop that keeps the craft possible.

The older I get, the clearer the equation becomes: attention divided is memory diluted. And without memory, there is no discretion, no foresight, no real luxury.

I don't sell more time. I protect the conditions that make the time worth anything at all.`,
    publishedDate: "2025-10-07",
    readNext: "memoirs-in-the-city",
  },
];

export const journalMetadata = {
  title: "The Journal | Katherine Taylor",
  description:
    "Essays, memoirs, and notes from Katherine Taylor on companionship, travel, culture, and the quiet discipline of continuity.",
  keywords: "Katherine Taylor journal, memoirs, companionship, travel, culture",
  openGraph: {
    title: "The Journal | Katherine Taylor",
    description:
      "Essays, memoirs, and notes on companionship, travel, culture, and continuity.",
    image: heroImage.src,
  },
};

export const essayMetadata = {
  title: "Continuity in High-End Company | Katherine Taylor Escort Journal",
  description:
    "On institutional memory and the art of anticipation in luxury companionship. An essay from The High-End Edition.",
  keywords:
    "Katherine Taylor journal, continuity, discretion, San Francisco companionship",
};

const headingPattern = /^(#{2,4})\s+(.*)$/;

/**
 * Essay bodies are plain text. Longer pieces mark structure with `##`/`###`/`####`
 * headings and `- ` list items so a single body string can carry a full memoir.
 */
export const parseJournalBody = (body: string): JournalBlock[] =>
  body
    .split(/\n\s*\n+/g)
    .map((block) => block.trim())
    .filter(Boolean)
    .map<JournalBlock>((block) => {
      const heading = headingPattern.exec(block);
      if (heading) {
        return {
          type: "heading",
          level: heading[1].length as 2 | 3 | 4,
          text: heading[2].trim(),
        };
      }

      const lines = block.split("\n").map((line) => line.trim());
      if (lines.every((line) => line.startsWith("- "))) {
        return {
          type: "list",
          items: lines.map((line) => line.slice(2).trim()),
        };
      }

      return { type: "paragraph", text: lines.join(" ") };
    });

export const getEssayBySlug = (slug: string | undefined) =>
  essays.find((essay) => essay.slug === slug);

export const getReadNextEssay = (slug: string | undefined) => {
  if (!slug) return undefined;
  const essay = getEssayBySlug(slug);
  if (!essay?.readNext) return undefined;
  return getEssayBySlug(essay.readNext);
};

/**
 * Format a date-only value (YYYY-MM-DD) as a calendar date.
 * `new Date("YYYY-MM-DD")` is UTC midnight and can display the previous day.
 */
export function formatJournalPublishedDate(isoDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) {
    return isoDate;
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}
