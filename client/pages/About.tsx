import { useEffect } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

const ABOUT_HERO_IMAGE =
  "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2F555456e693aa4baea56d46da819d34af?format=webp&width=1600";
const ABOUT_SECONDARY_IMAGE = ABOUT_HERO_IMAGE;

const About = () => {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-animate]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.visible = "true";
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-[#fafaf9] text-[#4a4a4a]">
      <div className="relative">
        <AspectRatio ratio={16 / 9}>
          <img
            src={ABOUT_HERO_IMAGE}
            alt="Katherine Taylor reclining beside a sunlit pool"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#fafaf9] via-transparent to-transparent" />
        </AspectRatio>
      </div>
      <div className="mx-auto max-w-[680px] px-6 py-24 md:py-28">
        <header
          data-animate
          className="space-y-6 opacity-0 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100 data-[visible=true]:delay-100"
        >
          <h1 className="font-serif text-4xl font-light tracking-[-0.01em] text-[#1a1a1a] md:text-[48px]">
            Katherine Taylor
          </h1>
          <p className="text-[17px] leading-[1.9]">
            Seven years later, he still signs his texts "J, The Wine Man" — as if I
            could forget the man who loves his grandkids more than his favorite
            Bordeaux, or the hotel in Miami where we met. I remember everything.
          </p>
        </header>

        <div className="my-16 flex justify-center" aria-hidden="true">
          <span className="h-24 w-px bg-gradient-to-b from-transparent via-[#8b7355]/60 to-transparent opacity-40" />
        </div>

        <main className="space-y-16">
          <section
            data-animate
            className="space-y-7 opacity-0 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100"
          >
            <h2 className="font-serif text-[clamp(28px,4vw,36px)] font-light tracking-[-0.01em] text-[#1a1a1a]">
              What I Do
            </h2>
            <p>
              I've been told I have an unusual memory for details. Not the
              performative kind — I don't take notes or set reminders. I just
              remember. The way someone pauses before saying their father "passed
              away" instead of "died" because the grief is still close enough to
              need gentle words. The fact that your favorite chair isn't about
              comfort, it's about the woman-owned business that taught you what
              understated luxury actually means.
            </p>
            <p>
              Some of my clients have been in my life for nearly a decade. We've
              watched each other's worlds shift — IPOs, twin daughters, cancer
              survivals, heart attacks. I was there the night one of my longtime
              regulars died next to me. I spent months after that asking myself
              what I could have done differently, until someone older and wiser
              reminded me that some things happen regardless of what we say or do.
            </p>
            <div
              data-animate
              className="relative overflow-hidden rounded-sm bg-gradient-to-br from-[#d4cfc9] via-[#e8e4e0] to-[#d4cfc9] opacity-0 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100"
            >
              <AspectRatio ratio={16 / 9}>
                <img
                  src={ABOUT_SECONDARY_IMAGE}
                  alt="San Francisco atmosphere"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#fafaf9]/80 via-transparent to-transparent" />
              </AspectRatio>
            </div>
            <h3 className="font-serif text-[clamp(22px,3vw,26px)] font-normal tracking-[-0.005em] text-[#1a1a1a]">
              The Men Who Shaped Me
            </h3>
            <p>
              There's the one who apologizes every time he texts me at 4am, not
              realizing I live for those messages. The strategist who told me my
              million-dollar cash real estate purchase would be "one expensive
              learning lesson" — and he was right, as always. The accountant who
              spent hours talking me off ledges when I bought my first business,
              even though he had other clients and I had other obligations.
            </p>
            <p>
              My favorite terrorizer in San Francisco, the man who beat cancer by
              creating his own vaccine because he didn't like his doctor's
              prescription. He once moved our date because I recommended a
              provider who never showed — I'm still mad about that, because I
              missed an evening of him calling my every action "mediocre." When I
              asked him for a comfortable chair recommendation, he said "Herman
              Miller" and I walked in expecting furniture. What I got was a
              masterclass in why the brand works, why the woman who owns it
              understands value. The chair cost two thousand dollars. I didn't buy
              the chair. I bought the wisdom.
            </p>
            <h3 className="font-serif text-[clamp(22px,3vw,26px)] font-normal tracking-[-0.005em] text-[#1a1a1a]">
              What Luxury Actually Means
            </h3>
            <p>
              There was the evening a client showed up in Lululemon joggers
              instead of his usual suit. I teased him — "Jakob, we're on a date.
              Why are you wearing pajamas?" He looked at my Louboutins and said,
              "Why are you wearing shoes that hurt? You don't have to impress
              anyone, at least not with me. Next time, wear something that makes
              you feel like you. I want to see the real you."
            </p>
            <p>
              I told him my overly successful clientele expected the Louboutins.
              He said, "Your overly successful clientele don't care what you wear.
              Trust me." That's when he mentioned his two IPOs.
            </p>
            <p>
              Then there's the one I joke will be my next husband if he ever gets
              divorced. It's not actually a joke, but I don't think he knows that.
              He's flown across the country for two hours with me and flown home
              the same day. We walk down Brooklyn streets holding hands under
              string lights at bistros at 7pm in summer, and I feel like I'm in
              heaven. Price doesn't matter with this man. Time matters.
            </p>
            <h3 className="font-serif text-[clamp(22px,3vw,26px)] font-normal tracking-[-0.005em] text-[#1a1a1a]">
              What You Should Know
            </h3>
            <p>
              I don't tour anymore in the traditional sense. But I'll always go to
              Chicago, because that's where my accountant is. I have one client who
              genuinely believes my rate increases will affect his time with me,
              even though I've told him a hundred times that if he didn't have a
              penny to his name, I'd still see him. He saved my life in a way no one
              knows about.
            </p>
            <p>
              I once met a couple in Sacramento and ended up having drinks with
              them in San Francisco at Left Door on Union, talking business
              strategy. When I mentioned I wanted to invest in a specific laundromat
              I was obsessed with, they went quiet. Turns out they owned the entire
              chain. I got to see those P&Ls after all.
            </p>
            <p>
              This work has given me access to people who don't follow rulebooks —
              the rulebooks follow them. They've molded me far more than I've ever
              molded them. And somewhere along the way, I stopped being the girl in
              the Louboutins trying to look the part, and became someone who knows
              the difference between what's expensive and what's actually
              valuable.
            </p>
            <p>
              If you're reading this, you probably already understand that
              distinction. And if we meet, I promise I'll remember everything about
              you — not because I'm trying to, but because I actually care.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default About;
