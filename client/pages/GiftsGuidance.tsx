import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const body =
  "max-w-[62ch] text-[16px] font-light leading-[1.75] text-gray-600";

const P = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <p className={cn(body, className)}>{children}</p>;

const Heading = ({ id, children }: { id: string; children: ReactNode }) => (
  <h2
    id={id}
    className="pt-6 text-[24px] font-extralight leading-[1.25] tracking-[-0.02em] text-luxury-black sm:text-[28px]"
    style={{ fontWeight: 200 }}
  >
    {children}
  </h2>
);

const extLinkClass =
  "text-luxury-black underline decoration-gray-300 underline-offset-[4px] transition-colors hover:decoration-luxury-black";

const ExternalLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={extLinkClass}>
    {children}
  </a>
);

const InternalLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => (
  <a href={href} className={extLinkClass}>
    {children}
  </a>
);

const List = ({ children }: { children: ReactNode }) => (
  <ul className="max-w-[62ch] list-disc space-y-3 pl-5 text-[16px] font-light leading-[1.75] text-gray-600">
    {children}
  </ul>
);

const GiftsGuidance = () => {
  return (
    <div id="gifts-guidance" className="space-y-6 border-t border-gray-200 pt-10">
      <section className="space-y-6" aria-labelledby="gifts-title">
        <h2
          id="gifts-title"
          className="text-[28px] font-extralight leading-[1.25] tracking-[-0.02em] text-luxury-black"
          style={{ fontWeight: 200 }}
        >
          Ways to Delight Me
        </h2>
        <P>I love being known.</P>
        <P>
          Gifts are never expected, but I have an enormous soft spot for the little evidence that someone has been paying attention. The best ones rarely stay just “things”—they become something I wear, somewhere I go, a ritual I enjoy, or a story I get to tell later.
        </P>
        <P>
          After more than a decade of escorting in California, I've learned that attention to detail is one of the loveliest forms of generosity. Consider this your little cheat sheet.
        </P>
      </section>

      <section className="space-y-6" aria-labelledby="favorites-heading">
        <Heading id="favorites-heading">A Few of This Sacramento Escort's Favorite Things</Heading>
        <P>
          There are a handful of things that are almost impossible to get wrong: perfume, cigars, beautiful lingerie, spa treatments, and experiences that give me somewhere to go.
        </P>
        <P>Some are permanent favorites. Others change constantly.</P>
      </section>

      <section className="space-y-6" aria-labelledby="perfume-heading">
        <Heading id="perfume-heading">Perfume Is Almost Always a Good Idea</Heading>
        <P>Fragrance may be my easiest weakness.</P>
        <P>A few I already adore:</P>
        <List>
          <li>
            <ExternalLink href="https://www.jomalone.com/product/25946/18848/colognes/wild-bluebell-cologne">
              Jo Malone Wild Bluebell
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://www.jomalone.com/product/25778/10066/new-products/red-roses-cologne">
              Jo Malone Red Roses
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://www.dior.com/en_us/beauty/products/j%E2%80%99adore-eau-de-parfum-Y0998031.html">
              Dior J'adore Eau de Parfum
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://www.isseymiyakeparfums.com/en/women/fragrances/l-eau-d-issey">
              Issey Miyake L'Eau d'Issey
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://www.ralphlaurenfragrances.com/en_US/women/ralph/ralph-eau-de-toilette/RLFE018.html">
              Ralph by Ralph Lauren
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://us.louisvuitton.com/eng-us/products/attrape-reves-nvprod1160017v/LP0083">
              Louis Vuitton Attrape-Rêves
            </ExternalLink>
          </li>
        </List>
        <P>I also love discovering something I haven't worn before.</P>
      </section>

      <section className="space-y-6" aria-labelledby="cigars-heading">
        <Heading id="cigars-heading">Cigars — Surprise Me</Heading>
        <P>I love cigars. A lot.</P>
        <P>
          A beautiful cigar, something interesting I haven't tried, or an excellent cigar accessory will always have a happy home with me.
        </P>
        <P>This is one category where I genuinely enjoy being surprised.</P>
        <P>
          <ExternalLink href="https://www.cigarsinternational.com/cigars.html">
            Browse Cigars International
          </ExternalLink>
        </P>
        <P>
          <ExternalLink href="https://us.st-dupont.com/products/cigar-stand-slim-black-003481">
            S.T. Dupont Slim Cigar Cutter
          </ExternalLink>
        </P>
      </section>

      <section className="space-y-6" aria-labelledby="details-heading">
        <Heading id="details-heading">Beautiful Shoes, Lingerie & the Details</Heading>
        <P>Getting dressed is half ritual, half construction project for me.</P>
        <P>
          I tend to begin with the lingerie and build outward—dress, shoes, fragrance, jewelry, the works. Give me one beautiful piece and there's a very good chance I'll construct an entire look around it.
        </P>
        <P>
          I have a soft spot for beautiful shoes, pedicures, and anyone observant enough to notice the details.
        </P>
        <List>
          <li>
            <ExternalLink href="https://www.dior.com/en_us/fashion/products/KCV510NVA_S900">
              Dior J'Adior Low Slingback
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://fleurdumal.com/products/flared-corset-dress-black">
              Fleur du Mal Flared Corset Dress
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://www.agentprovocateur.com/us_en/ap12532001001-mercy-corset-dress-in-black-black-32043">
              Agent Provocateur Mercy Corset Dress
            </ExternalLink>
          </li>
        </List>
      </section>

      <section className="space-y-6" aria-labelledby="spa-heading">
        <Heading id="spa-heading">Spa Days Are Never the Wrong Answer</Heading>
        <P>There has never been a bad massage at a beautiful spa.</P>
        <P>
          Massages, scrubs, facials, hotel spas and full spa days are all exceptionally safe territory.
        </P>
        <P>
          Bonus points when I can bring a friend. Half the fun is informing one of my best friends that apparently we have plans now.
        </P>
      </section>

      <section className="space-y-6" aria-labelledby="experiences-heading">
        <Heading id="experiences-heading">Give Me Somewhere to Go</Heading>
        <P>Some of my favorite gifts aren't objects at all.</P>
        <P>
          Napa. Dinner somewhere wonderful. Six Flags. A hotel. A concert. A strange little class. An afternoon neither of us would otherwise have thought to plan.
        </P>
        <P>Luxury is lovely, but novelty counts too.</P>
        <P>
          If the gift gives me an excuse to put on something beautiful, grab someone I adore and go have a day, you've probably won.
        </P>
      </section>

      <section className="space-y-6" aria-labelledby="currently-heading">
        <Heading id="currently-heading">Currently Tempting Me</Heading>
        <P>These change.</P>
        <P>
          A perfume I've been thinking about. An unreasonable pair of shoes. A corset dress. A beautiful watch. Something completely unnecessary that has somehow convinced me it belongs in my life.
        </P>
        <P>Consider this the rotating portion of the cheat sheet.</P>
        <List>
          <li>
            <ExternalLink href="https://us.louisvuitton.com/eng-us/products/attrape-reves-nvprod1160017v/LP0083">
              Louis Vuitton Attrape-Rêves
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://www.dior.com/en_us/fashion/products/KCV510NVA_S900">
              Dior J'Adior Low Slingback
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://fleurdumal.com/products/flared-corset-dress-black">
              Fleur du Mal Flared Corset Dress
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://www.cartier.com/en-us/watches/collections/tank/">
              Cartier Tank Collection
            </ExternalLink>
          </li>
        </List>
      </section>

      <section className="space-y-6" aria-labelledby="noticed-heading">
        <Heading id="noticed-heading">The Best Gifts Usually Say “I Noticed”</Heading>
        <P>Price isn't really the interesting part.</P>
        <P>
          The best gift is usually the one that makes me think: <em>“Oh—you noticed.”</em>
        </P>
        <P>
          Nothing here is expected, and generosity never creates an obligation. This is simply a little guide for anyone who happens to find joy in giving.
        </P>
      </section>

      <hr className="border-gray-200" />

      <section className="space-y-6" aria-label="Related reading">
        <P>
          New here? You may enjoy my rather opinionated take on what an{" "}
          <InternalLink href="/sacramento-escorts">escorts near me</InternalLink> search leaves out when choosing someone.
        </P>
        <P>
          Learn more about me, my approach, and what more than a decade as a{" "}
          <InternalLink href="/about">Sacramento escort</InternalLink> has taught me.
        </P>
        <P>
          My travels and years working as a{" "}
          <InternalLink href="/memoirs-in-the-city">California escort</InternalLink> have taken me well beyond Sacramento.
        </P>
      </section>
    </div>
  );
};

export default GiftsGuidance;
