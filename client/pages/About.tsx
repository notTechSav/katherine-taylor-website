import { AspectRatio } from "@/components/ui/aspect-ratio";

const ABOUT_HERO_IMAGE =
  "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2F555456e693aa4baea56d46da819d34af?format=webp&width=1600";

const About = () => {
  return (
    <div className="bg-white">
      <div className="relative">
        <AspectRatio ratio={16 / 9}>
          <img
            src={ABOUT_HERO_IMAGE}
            alt="Katherine Taylor reclining beside a sunlit pool"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
        </AspectRatio>
      </div>
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="text-4xl font-light uppercase tracking-[0.35em] text-gray-900">
          About
        </h1>
        <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-gray-600">
          Learn about the heritage, vision, and philosophy that shape our maison.
          This space will share the stories that define our craft.
        </p>
      </section>
    </div>
  );
};

export default About;
