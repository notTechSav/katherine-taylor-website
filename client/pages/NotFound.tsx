import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import SeoHead from "@/components/site/SeoHead";
import { pageSeo } from "@/lib/page-seo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 pt-24 text-center md:pt-28">
      <SeoHead
        title={pageSeo.notFound.title}
        description={pageSeo.notFound.description}
        noIndex
      />
      <span className="text-[0.7rem] uppercase tracking-[0.4em] text-muted-foreground">
        Page unavailable
      </span>
      <h1 className="font-serif text-6xl text-foreground">404</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        This address isn't on the site. The rest of the house is.
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center border border-gray-200 px-8 py-3 text-[0.68rem] uppercase tracking-[0.38em] text-luxury-black transition hover:border-gray-300"
      >
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
