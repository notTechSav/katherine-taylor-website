import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const body =
  "text-base font-light leading-[1.85] tracking-[0.01em] text-gray-700";

const P = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <p className={cn(body, className)}>{children}</p>;

const Strong = ({ children }: { children: ReactNode }) => (
  <P>
    <strong className="font-medium text-luxury-black">{children}</strong>
  </P>
);

const Quote = ({ children }: { children: ReactNode }) => (
  <blockquote className="border-l-2 border-gray-300 py-2 pl-4 text-base font-light italic leading-[1.85] text-gray-700">
    {children}
  </blockquote>
);

const Chapter = ({
  id,
  heading,
  cream,
  children,
}: {
  id: string;
  heading: string;
  cream?: boolean;
  children: ReactNode;
}) => (
  <section
    aria-labelledby={id}
    className={
      cream
        ? "border-t border-gray-200 bg-luxury-gray-50 py-20 md:py-28"
        : "border-t border-gray-200 bg-luxury-white py-20 md:py-28"
    }
  >
    <div className="container mx-auto max-w-2xl px-6 md:px-8">
      <h2
        id={id}
        className="mb-8 text-3xl font-extralight tracking-[-0.02em] text-luxury-black md:text-4xl"
        style={{ fontWeight: 200 }}
      >
        {heading}
      </h2>
      <div className="space-y-6">{children}</div>
    </div>
  </section>
);

const Hotel = ({ name, children }: { name: string; children: ReactNode }) => (
  <div className="space-y-6">
    <h3
      className="text-2xl font-extralight tracking-[-0.02em] text-luxury-black"
      style={{ fontWeight: 200 }}
    >
      {name}
    </h3>
    {children}
  </div>
);

const SacramentoLongVersion = () => {
  return (
    <div id="long-version-content">
      <Chapter id="proximity-heading" heading="The Right Person Is Not Always the Nearest Person">
        <P>One of my favorite people routinely gets on a Delta flight, comes to see me for a few hours, and flies home afterward.</P>
        <P>This has never struck me as particularly unusual.</P>
        <P>People travel for people.</P>
        <P>We've known each other long enough that we've essentially watched each other grow up. One of my favorite dates wasn't in a particularly impressive restaurant or hotel. It was going back to the house where he grew up and seeing his old Columbia jerseys still hanging on the wall of his childhood bedroom.</P>
        <P>Now he's married.</P>
        <P>I joke that I'm patiently standing in line to become wife number two because this man is wonderful.</P>
        <P>What matters is that the relationship became worth the inconvenience.</P>
        <P>That's not remotely unusual in escorting. Clients travel. Providers travel. Some of the women I've met in this industry are absolutely worth getting on an airplane for.</P>
        <P>Life gets increasingly shorter.</P>
        <P>Certain moments are not worth passing up simply because the right person wasn't technically “near me.”</P>
        <P>So yes—start locally.</P>
        <P>Just don't confuse a map pin with compatibility.</P>
      </Chapter>

      <Chapter id="high-end-heading" heading="What High-End Escorting Actually Means" cream>
        <P>High-end does not mean champagne.</P>
        <P>It does not mean Christian Louboutins.</P>
        <P>I learned that lesson from one of my favorite San Francisco clients.</P>
        <P>He had brought two companies to the public markets and, the first time we met, looked like an absolute dreamboat in Lululemon joggers and a beanie.</P>
        <P>I, meanwhile, arrived in what I had apparently decided was the official high-end escort uniform: very expensive stilettos.</P>
        <P>Eventually he looked at me and told me to calm down with my attire.</P>
        <P>“What the hell is wrong with my attire?”</P>
        <P>“Why are you wearing Christian Louboutins? I know you hate them.”</P>
        <P>I explained the obvious.</P>
        <P>They're practically a staple in the escort wardrobe. Everyone wears them.</P>
        <P>Then I looked at him.</P>
        <P>Two IPOs.</P>
        <P>Joggers.</P>
        <P>Beanie.</P>
        <P>Absolutely no need to prove anything to anybody.</P>
        <P>He was already the coolest person in the room.</P>
        <P>And suddenly I realized I looked stupid trying to impress a man who was already impressed with me.</P>
        <P>I never wore them again.</P>
        <Strong>High-end isn't conspicuous. High-end is fluent.</Strong>
      </Chapter>

      <Chapter id="memory-heading" heading="At the High End, Companionship Has a Memory">
        <P>I've known one of my longtime clients for seven or eight years.</P>
        <P>When we first met, he was trying to acquire automotive dealerships.</P>
        <P>Some of the early deals were painful to watch.</P>
        <P>He knew they were painful.</P>
        <P>“I have to get my foot in the door, Katherine. I know this is a bad deal. I have to take it.”</P>
        <P>So he did.</P>
        <P>There were years of underwriting, difficult negotiations, manufacturers that initially didn't want to do business with him, and calculated compromises that looked terrible until you understood the longer game.</P>
        <P>Eventually the dealerships came.</P>
        <P>Then more dealerships came.</P>
        <P>His business today is roughly three times the size it was when I first knew him.</P>
        <P>Somewhere along the way, I learned the entire cast.</P>
        <P>He can say “Jennifer,” and I know which Jennifer.</P>
        <P>I know the attorneys, managers, employees, personalities, histories, bad decisions that weren't actually mistakes, and good decisions that initially looked insane.</P>
        <P>I've even watched his appearance change.</P>
        <Strong>The bigger his dealerships became, the smaller his jewelry became.</Strong>
        <P>I loved watching that happen.</P>
        <P>We can be at the Wynn Tower Suites or sitting at my house and somehow never leave—not because Las Vegas ran out of things to do, but because eventually talking to each other becomes more entertaining than whatever we planned.</P>
        <P>He once wrote a song that described me as an angel with white nails.</P>
        <P>My nails have been white ever since.</P>
        <P>What I give him isn't novelty.</P>
        <P>It's continuity.</P>
        <P>He doesn't have to rebuild the context of his life every time he sees me.</P>
        <P>There's already a common language waiting for us.</P>
      </Chapter>

      <Chapter id="important-heading" heading="If It's Important to You, I Remember It" cream>
        <P>Early in my career, I wrote everything down.</P>
        <P>Names. Associations. Important dates.</P>
        <P>A client's boss. His kids. His grandchildren. His favorite wine. The person at work driving him insane.</P>
        <P>Whether he's social or quiet. Whether he likes spectacle or privacy. Whether he runs cold. Whether he'd rather be surrounded by people or somewhere nobody can see us.</P>
        <P>Paper, by the way.</P>
        <P>Not the cloud.</P>
        <P>Eventually memory becomes muscle memory.</P>
        <P>I met one gentleman in Miami only once.</P>
        <P>Years later, he contacted me again and carefully began reintroducing himself.</P>
        <P>
          <em>Hi, it's Jim. We met on this date, at this place...</em>
        </P>
        <P>I remember thinking:</P>
        <P>
          <em>Jim.</em>
        </P>
        <P>
          <em>I know.</em>
        </P>
        <P>
          <em>And I miss you too.</em>
        </P>
        <P>Then I asked how his grandchildren were doing.</P>
        <P>By name.</P>
        <P>He was floored.</P>
        <P>That's still one of my favorite compliments I've ever received, because the thing that surprised him wasn't that I remembered <em>him</em>.</P>
        <Strong>I remembered what mattered to him.</Strong>
        <P>That's different.</P>
      </Chapter>

      <Chapter id="interest-heading" heading="You Cannot Fake Interest for Four Hours">
        <P>One of the first things I would tell a woman who is new to escorting is this:</P>
        <P>Do not be embarrassed because you aren't charging an extraordinary rate in your first year.</P>
        <P>That's normal.</P>
        <P>We paid our dues.</P>
        <P>Stay in one place long enough to become good.</P>
        <P>Then stay longer.</P>
        <P>Do the same boring thing over and over again.</P>
        <P>Take notes.</P>
        <P>Listen.</P>
        <P>Actually listen.</P>
        <P>Rarely is the most financially successful woman in this business simply the prettiest woman in the room.</P>
        <P>People remember how you made them feel.</P>
        <P>You also won't adore every client instantly when you're new.</P>
        <P>That part is a learned skill.</P>
        <P>Go deeper.</P>
        <P>Find something about the person in front of you that you genuinely like.</P>
        <P>Maybe he's funny. Maybe he's brilliant at his work. Maybe he's an exceptional father. Maybe his enthusiasm for some impossibly boring subject is so sincere that you end up loving the way he explains it.</P>
        <P>Find the true thing.</P>
        <P>Because people can tell when you're being fake.</P>
        <P>Four hours is a very long time to perform interest badly.</P>
      </Chapter>

      <Chapter id="rates-heading" heading="The Only Real Scarcity Is Time" cream>
        <P>Raising your rates is inevitable if you become busy enough.</P>
        <P>Not because one morning you wake up and decide you're suddenly worth more.</P>
        <P>Because time cannot be manufactured.</P>
        <P>You cannot be two places at once.</P>
        <P>Once your schedule becomes stressful enough that you stop thinking clearly, remembering people properly, or looking forward to your dates, something has to change.</P>
        <P>For me, that's when rates move.</P>
        <P>Early in my career, someone convinced me success was about volume.</P>
        <P>It wasn't.</P>
        <P>Volume sucks.</P>
        <P>Too much of it steals cognitive bandwidth.</P>
        <P>I want enough space around my dates that three days beforehand I'm already thinking about what I want to wear.</P>
        <P>I've gotten to the point where I can sometimes predict what a man will prefer based partly on how he dressed and even how he sat when we first met.</P>
        <P>That lights me up.</P>
        <Strong>Lower rates would eventually dilute my own enjoyment.</Strong>
        <P>And if I'm not enjoying myself, something valuable has already been lost.</P>
        <P>Some longtime clients remain at grandfathered rates.</P>
        <P>Sometimes somebody books a certain amount of time and I casually cushion another hour or two because I'm having fun.</P>
        <P>I know.</P>
        <P>You're probably not supposed to do that.</P>
        <P>I do it anyway.</P>
        <P>At this stage of my career, the number protects the time.</P>
        <P>The time protects the relationship.</P>
      </Chapter>

      <Chapter id="booking-heading" heading="What to Know Before Booking a Sacramento Escort">
        <P>The easiest new clients can complete a booking in fewer than two emails.</P>
        <P>Give me what I need upfront.</P>
        <ul className="ml-6 space-y-2">
          <li className="border-l-2 border-gray-300 pl-4 text-base font-light leading-[1.85] text-gray-700">Your name.</li>
          <li className="border-l-2 border-gray-300 pl-4 text-base font-light leading-[1.85] text-gray-700">Requested date and general plans.</li>
          <li className="border-l-2 border-gray-300 pl-4 text-base font-light leading-[1.85] text-gray-700">The identification required for screening.</li>
          <li className="border-l-2 border-gray-300 pl-4 text-base font-light leading-[1.85] text-gray-700">Your LinkedIn or professional information when applicable.</li>
          <li className="border-l-2 border-gray-300 pl-4 text-base font-light leading-[1.85] text-gray-700">One or two established provider references who know to expect my email.</li>
        </ul>
        <P>LinkedIn isn't there merely for my benefit.</P>
        <P>It's arguably there for yours.</P>
        <P>If you work in private equity, I'd rather know that beforehand so I can brush up on the language of your world instead of staring at you blankly during dinner.</P>
        <P>Screening answers one question:</P>
        <Strong>Can we responsibly meet?</Strong>
        <P>Compatibility answers another:</P>
        <Strong>Do I think we're going to enjoy each other?</Strong>
        <P>Those are not the same question.</P>
        <P>At this stage of my career, I care about both.</P>
      </Chapter>

      <Chapter id="money-heading" heading="Why I Sometimes Screen for Your Wallet, Too" cream>
        <P>I play games with my websites.</P>
        <P>Constantly.</P>
        <P>Once I decided I was Hermès and removed the rates entirely.</P>
        <P>Surely not listing the price would communicate exclusivity.</P>
        <P>It did not.</P>
        <P>Experiment concluded.</P>
        <P>Rates returned.</P>
        <P>I still occasionally leave little tripwires in my pricing.</P>
        <P>If I list four hours and six hours and somebody becomes intensely focused on engineering five, I pay attention.</P>
        <P>No disrespect.</P>
        <P>I just don't want anybody refinancing a house to see me.</P>
        <P>This is supposed to be fun.</P>
        <P>It's supposed to feel joyous.</P>
        <P>Even I won't enjoy myself if I know seeing me is financially difficult for you.</P>
        <P>There are clients for whom the rate is effectively bookkeeping.</P>
        <P>They check the number because somebody needs the number and then move on.</P>
        <P>That's generally the financial relationship I prefer.</P>
        <P>High-end does not mean extracting the largest possible amount from everybody willing to spend it.</P>
        <P>Sometimes good judgment means recognizing that your service is simply not the right purchase for somebody right now.</P>
      </Chapter>

      <Chapter id="expectations-heading" heading="First Time? Lower Your Expectations. Seriously.">
        <P>If this is your first time meeting an escort, please do not construct a supernatural woman in your imagination before she arrives.</P>
        <P>I'm a woman.</P>
        <P>I'm very much human.</P>
        <P>I'm probably nervous too.</P>
        <P>Only one of us is allowed to be nervous at the same time, so unfortunately you'll need to calm down.</P>
        <P>Drop the expectations.</P>
        <P>Or at least reduce them.</P>
        <P>I cannot change your life.</P>
        <P>That's not my job.</P>
        <P>I cannot take you away from your wife.</P>
        <P>I know that's occasionally a fun fantasy.</P>
        <P>Reality is considerably less cinematic.</P>
        <P>What I can offer is a place in your life where you can relax, talk, disappear for a while, and trust that vulnerability won't be met with judgment.</P>
        <P>Believe me.</P>
        <P>You are unlikely to surprise me.</P>
        <P>And here's the part people sometimes forget:</P>
        <Strong>I'm having fun too.</Strong>
      </Chapter>

      <Chapter id="presence-heading" heading="The Best Restaurant Is the One Where You Like Your Date" cream>
        <P>I can make almost any restaurant memorable.</P>
        <P>First, I insist on meeting you there.</P>
        <P>I want you to watch me walk in.</P>
        <P>The Katherine you see in photographs is very much me, but a photograph cannot give you the human part.</P>
        <P>I love watching the expression change from:</P>
        <P>
          <em>This is my first time meeting Katherine. What the hell am I supposed to say?</em>
        </P>
        <P>into the relaxed, lean-back-in-the-booth posture that happens when you realize I'm very much a real person, I'm happy to be there, and the evening doesn't need to be difficult.</P>
        <P>I sit next to my dates whenever possible.</P>
        <P>Across the table can feel like an interview.</P>
        <P>Beside you feels like we're on the same team.</P>
        <P>And don't be surprised if I didn't bring my phone.</P>
        <P>Why would I need one?</P>
        <P>The world tends to stop for me during a good date.</P>
        <P>I become interested in the better parts of the person sitting next to me.</P>
        <P>That is the evening.</P>
        <P>The restaurant is just where we happened to put it.</P>
      </Chapter>

      <Chapter id="sacramento-heading" heading="What a Sacramento Escort Learns About Sacramento">
        <P>Sacramento is nothing like the Bay.</P>
        <P>Prepare to relax.</P>
        <P>Things move more slowly here.</P>
        <P>San Francisco trained me to believe I needed to be training a language model, signing my name “Founder,” and knowing the latest AI startup news before breakfast.</P>
        <P>My clients built much of the technology I use.</P>
        <P>There is something uniquely humiliating about producing mediocre work in front of the people who built the tools you're using to produce it.</P>
        <P>I've had San Francisco clients find six mistakes on a landing page I'd convinced myself was finished.</P>
        <P>I've been called mediocre there and somehow understood it as useful feedback.</P>
        <P>Then I came back to Sacramento.</P>
        <P>Suddenly my perfectly respectable investment strategy—good old-fashioned real estate—was interesting again.</P>
        <P>Nobody asked about my Series A.</P>
        <P>I could leave the house without brushing my hair and somehow feel like a superstar.</P>
        <P>It was peaceful.</P>
        <P>Sacramento has excellent food.</P>
        <P>It even has Michelin-starred restaurants.</P>
        <P>Thankfully, it has not fully adopted San Francisco's enthusiasm for holding you hostage through what feels like sixteen courses.</P>
        <P>
          <em>Cough. Atelier Crenn.</em>
        </P>
        <P>At some point I would like to talk to my date.</P>
        <P>Sacramento is very good at leaving room for the person you came with.</P>
      </Chapter>

      <Chapter id="stay-heading" heading="Where I Would Stay in Sacramento" cream>
        <P>If you're coming here from San Francisco, don't try to recreate San Francisco.</P>
        <P>Let Sacramento be Sacramento.</P>
        <Hotel name="Delta King">
          <P>One of my favorite pieces of the city.</P>
          <P>It's a riverboat converted into a hotel and restaurant, and it feels unmistakably Sacramento.</P>
          <P>Give me a sunset-lit table on the Delta King and there's a non-zero probability you could propose to me and I'd say yes.</P>
          <P>I've technically never made it much farther than the bar and restaurant.</P>
          <P>I keep meaning to.</P>
        </Hotel>
        <Hotel name="The Citizen Hotel">
          <P>Sexy.</P>
          <P>Classic.</P>
          <P>It reminds me a little of the Mark Hopkins in San Francisco without desperately trying to imitate San Francisco.</P>
          <P>Grange downstairs is wonderful.</P>
          <P>If you want something established and adult instead of aggressively trendy, I like it here.</P>
        </Hotel>
        <Hotel name="Kimpton Sawyer Hotel">
          <P>Modern Sacramento.</P>
          <P>DOCO. Golden 1 Center. A fabulous pool.</P>
          <P>Polished without requiring much effort.</P>
          <P>It's an easy choice when you want Sacramento immediately outside the door.</P>
          <P>The main thing I would tell someone coming here from the Bay is:</P>
          <Strong>You are allowed to relax.</Strong>
          <P>I didn't believe it either.</P>
          <P>Then I moved here and stayed.</P>
        </Hotel>
      </Chapter>

      <Chapter id="summer-heading" heading="Sacramento Summers Win">
        <P>Every Fourth of July reminds me why I'm happy to be here.</P>
        <P>Clear skies.</P>
        <P>Actual fireworks.</P>
        <P>Hot summer nights.</P>
        <P>And—this is important—not needing Patagonia in July.</P>
        <P>Good luck to the fog.</P>
        <P>San Francisco has many advantages.</P>
        <P>Reliably seeing the fireworks you're supposedly celebrating is not always among them.</P>
      </Chapter>

      <Chapter id="retirement-heading" heading="I Quit Escorting to Date Normally" cream>
        <P>When I left this industry, I genuinely thought I'd be married within two years.</P>
        <P>Yes.</P>
        <P>Married.</P>
        <P>I had passive income. I had a beautiful home in Sacramento. I went on lots of dates. I experimented with a quieter life.</P>
        <P>At one point I was essentially practicing how to become a tradwife because there wasn't much else for me to do.</P>
        <P>And then something strange happened.</P>
        <P>I remembered that I missed being the best at something.</P>
        <Strong>I didn't miss working because I needed money. I missed having somewhere to put my mastery.</Strong>
      </Chapter>

      <Chapter id="civilian-heading" heading="Civilian Dating Taught Me Something I Wasn't Expecting">
        <P>Capacity can look like danger when somebody isn't accustomed to it.</P>
        <P>Even when I omitted escorting from the equation, my social fluency could scare the hell out of the men I dated.</P>
        <P>In my professional life, clients assume I understand rooms.</P>
        <P>After a few drinks, some actively enjoy it.</P>
        <P>I've heard:</P>
        <Quote>“Go talk to those two guys at the bar. Turn them on. Come back and pretend you're meeting me for the first time.”</Quote>
        <P>Or:</P>
        <Quote>“Katherine, my wife is coming. I can't wait for you to meet her.”</Quote>
        <P>Or the wonderfully specific:</P>
        <Quote>“Half the board is at this hotel. Don't leave the room while I'm in meetings. Play Jenga or something.”</Quote>
        <P>They know I have a handle on myself.</P>
        <P>After ten years, that's assumed.</P>
        <P>Traditional dating was different.</P>
        <P>I could be at a social event, notice somebody clearly wanted to talk, walk over to say hello, and suddenly the man I was dating was grabbing my arm asking me to sit down because he thought I might embarrass him.</P>
        <P>I'm thinking:</P>
        <P>
          <em>We're at a social event. Let's socialize. Come with me. We may leave knowing two wonderful people we didn't know fifteen minutes ago.</em>
        </P>
        <P>He's thinking:</P>
        <P>
          <em>Why is my girlfriend talking to strangers?</em>
        </P>
        <P>To me, that's not flirting.</P>
        <P>That's social expansion.</P>
        <P>And eventually I realized I cannot prove loyalty by becoming less socially capable.</P>
        <P>I can choose somebody.</P>
        <P>I can be faithful.</P>
        <P>I can reassure him.</P>
        <P>What I cannot sustainably do is make my world smaller so that my ability to navigate it feels less threatening.</P>
        <P>It's difficult to feel deeply desired by somebody who also seems frightened of the person they're desiring.</P>
        <P>Eventually I began missing the allegedly unconventional world I'd left.</P>
        <P>The one where nobody ever asked me to become less interesting so he could feel safer.</P>
      </Chapter>

      <Chapter id="clients-heading" heading="My Clients Made My World Bigger" cream>
        <P>One longtime client has brought two companies to the stock market.</P>
        <P>He's brilliant.</P>
        <P>He's also terrifying.</P>
        <P>At one point he sent me a message saying he had cancer and that it meant the end of us seeing each other.</P>
        <P>I cried.</P>
        <P>Six months later, the man looked better than he did before cancer and was talking to me about work he'd done on his own treatment.</P>
        <P>Why do I let this man scare me?</P>
        <P>He's earned the right.</P>
        <P>When he speaks, I listen.</P>
        <P>Years ago, after my viral moment, I joined OnlyFans without really understanding what OnlyFans was.</P>
        <P>He hated it.</P>
        <P>“Mediocre.”</P>
        <P>That was his assessment.</P>
        <P>He showed me profiles he considered excellent.</P>
        <P>Then he showed me profiles he didn't.</P>
        <P>The lesson wasn't really about OnlyFans.</P>
        <P>It was about value.</P>
        <P>Eventually I agreed with him, shut mine down, publicly apologized, and returned the money.</P>
        <P>Another time we were sitting at Benu while he casually dissected what he thought several escort platforms were doing wrong.</P>
        <P>Once I asked him which computer chair I should buy.</P>
        <P>“Herman Miller.”</P>
        <P>I thought spending roughly two thousand dollars on a chair was absurd.</P>
        <P>I bought it anyway.</P>
        <P>Then I learned an entire lesson about product value, margins, and why exceptional companies don't necessarily compete by being cheaper.</P>
        <P>The chair is still in my office.</P>
        <Strong>Some clients pay for your time. Some eventually change the way you think.</Strong>
        <P>He isn't really a client in my mind anymore.</P>
        <P>Role model is probably closer.</P>
        <P>One of my favorite compliments I've ever received came from him:</P>
        <P>“You're good under pressure.”</P>
        <P>I am.</P>
        <P>My clients built the internet.</P>
        <P>I have to be.</P>
      </Chapter>

      <Chapter id="women-heading" heading="Some Escorts Are Worth Getting on a Plane For">
        <P>There's another misconception hidden inside searches like “escorts near me.”</P>
        <P>That the goal is simply to locate the closest available woman.</P>
        <P>Some women in this industry are extraordinary.</P>
        <P>The best escort I've personally known is Gisele Lenor.</P>
        <P>She's Houston-based, stunning, kind, disciplined, hilarious and seemingly incapable of having an off day.</P>
        <P>Rain or shine, she's on her game.</P>
        <P>The first time I met her, she gave me a Dolce &amp; Gabbana coat because it was too small on her extremely toned arms.</P>
        <P>Of course she did.</P>
        <P>She's also one of the few women from the industry who continued checking on me during my hiatus.</P>
        <Quote>“Katherine, I know you're okay. But come back, okay? We miss you.”</Quote>
        <P>God, I missed her too.</P>
        <P>I happily send favorite clients her way because giving somebody a 10/10 recommendation only makes me look smarter in the end.</P>
        <P>That's another thing people outside escorting sometimes misunderstand.</P>
        <P>The best relationships in this industry aren't necessarily competitive.</P>
        <P>There are women I admire enormously.</P>
        <P>There are clients I adore.</P>
        <P>There are people worth crossing the country to see.</P>
        <P>Once you've been here long enough, the world becomes surprisingly small.</P>
      </Chapter>

      <Chapter id="discretion-heading" heading="What Discretion Actually Means" cream>
        <P>Discretion is not pretending laws don't exist.</P>
        <P>It's knowing exactly what belongs to somebody else's private life and treating it accordingly.</P>
        <P>Over the years, I've had wives call from a client's actual phone.</P>
        <P>Those are particularly alarming because you see his number and think something happened.</P>
        <P>You answer:</P>
        <P>“Richard, are you okay?”</P>
        <P>And then:</P>
        <P>Oh.</P>
        <P>Holy fuck.</P>
        <P>That is not Richard.</P>
        <P>This is one of many reasons I generally do not answer unexpected calls anymore.</P>
        <P>I've also been offered substantial money by media outlets and other people who wanted to know who my clients were.</P>
        <P>They don't find out from me.</P>
        <P>A client's business, family, finances and private life are not entertaining material for strangers simply because somebody is curious.</P>
        <P>I did, however, learn an important limit firsthand after receiving lawful compulsory process in connection with an investigation.</P>
        <P>Privacy has legal boundaries.</P>
        <P>So does an NDA.</P>
        <P>My loyalty to a client's privacy is enormous.</P>
        <P>It is not a promise to obstruct the law.</P>
        <P>That distinction matters.</P>
      </Chapter>

      <Chapter id="sac-escort-heading" heading="Searching for a “Sac Escort”? Start With the Person, Not the Pin">
        <P>I understand why people search “Sac escort.”</P>
        <P>I understand why they search “Sacramento escort.”</P>
        <P>And I certainly understand why so many people type “escorts near me” into Google.</P>
        <P>Location matters.</P>
        <P>It simply isn't what creates the experience people return for.</P>
        <P>Compatibility does.</P>
        <P>Memory does.</P>
        <P>Presence does.</P>
        <P>Discretion does.</P>
        <P>Social fluency does.</P>
        <P>Genuine interest does.</P>
        <P>Enough financial breathing room that neither person spends the evening staring at the clock does.</P>
        <P>And eventually the strange accumulation of tiny details does.</P>
        <P>That's what turns:</P>
        <P>
          <em>Hi, it's Jim. We met once several years ago...</em>
        </P>
        <P>into:</P>
        <P>
          <em>Jim. I know. How are the grandkids?</em>
        </P>
      </Chapter>

      <Chapter id="california-heading" heading="A Note About California Escorts, From Someone Who Stayed" cream>
        <P>Escorting in California has introduced me to some of the smartest, funniest, strangest, most generous and most memorable people I've ever met.</P>
        <P>Clients.</P>
        <P>Providers.</P>
        <P>Founders.</P>
        <P>Housewives.</P>
        <P>Executives.</P>
        <P>Women who can race a sports car and still remember to call because they noticed you've disappeared.</P>
        <P>Men who can bring companies public and still spend forty-five minutes explaining a concept because they genuinely want you to understand it.</P>
        <P>The public version of this industry tends to flatten everybody involved into caricatures.</P>
        <P>My experience has been much stranger, warmer and more human than that.</P>
        <P>That's part of why I came back.</P>
      </Chapter>

      <Chapter id="back-heading" heading="Why I'm Back">
        <P>I left escorting because I believed I wanted a normal life.</P>
        <P>Sacramento gave me the chance to try one.</P>
        <P>I dated.</P>
        <P>I stayed home.</P>
        <P>I built passive income.</P>
        <P>I imagined marriage.</P>
        <P>I relaxed.</P>
        <P>And relaxation was wonderful.</P>
        <P>For a while.</P>
        <P>Then I remembered something about myself.</P>
        <P>I'd spent more than a decade becoming extremely good at a very unusual job.</P>
        <P>I didn't leave before building a legacy.</P>
        <P>But I also didn't leave the right way.</P>
        <P>I disappeared.</P>
        <P>Now I'd like to get reacquainted with the men and women who sharpened me into the person I became.</P>
        <P>The people who remembered that capacity wasn't danger.</P>
        <P>The people who looked at everything I knew how to do and said:</P>
        <Strong>Good. Do more.</Strong>
        <P>So here I am.</P>
        <P>
          If you arrived by searching <strong className="font-medium text-luxury-black">“escorts near me,”</strong> Google did its part.
        </P>
        <P>Whether we're actually right for each other is the more interesting question.</P>
        <P className="text-luxury-black">—Katherine Taylor</P>
      </Chapter>

      <section
        aria-labelledby="next-heading"
        className="border-t border-gray-200 bg-luxury-gray-50 py-20 md:py-28"
      >
        <div className="container mx-auto max-w-2xl space-y-8 px-6 text-center md:px-8">
          <h2
            id="next-heading"
            className="text-3xl font-extralight tracking-[-0.02em] text-luxury-black md:text-4xl"
            style={{ fontWeight: 200 }}
          >
            Sacramento, San Francisco &amp; Beyond
          </h2>
          <P>I'm based in Sacramento and frequently in San Francisco, with travel considered throughout California and beyond.</P>
          <P>If this sounds aligned, you already know what to do next.</P>
          <nav aria-label="Katherine Taylor booking links" className="flex flex-wrap items-center justify-center gap-3 pt-4 text-[14px] font-light text-luxury-black">
            <a href="/inquire" className="underline-offset-[4px] transition-colors duration-300 hover:text-gray-600 hover:underline">Inquire</a>
            <a href="/rates" className="underline-offset-[4px] transition-colors duration-300 hover:text-gray-600 hover:underline">Rates</a>
            <a href="/faq" className="underline-offset-[4px] transition-colors duration-300 hover:text-gray-600 hover:underline">FAQ</a>
            <a href="/journal/memoirs-in-the-city" className="underline-offset-[4px] transition-colors duration-300 hover:text-gray-600 hover:underline">Why I Left San Francisco</a>
          </nav>
        </div>
      </section>
    </div>
  );
};

export default SacramentoLongVersion;
