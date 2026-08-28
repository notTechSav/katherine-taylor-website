import {
  HomepageImageNav,
  HomepageVeil,
} from "@/components/site/homepage-editorial";

export default function AboutSection() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <HomepageVeil tone="center" />
      <HomepageImageNav
        title={
          <>
            About <span className="homepage-h2-break">Katherine Taylor</span>
          </>
        }
        to="/about"
        cta="About Katherine"
      />
    </div>
  );
}
