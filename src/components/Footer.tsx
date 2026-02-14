import Link from "next/link";
import type { Locale } from "@/types/strapi";
import { BrandLogo } from "@/components/BrandLogo";

interface FooterProps {
  lang: Locale;
  dict: {
    nav: { activities: string; services: string; links: string };
    footer: { rights: string; tagline: string; navTitle: string; activitiesTitle: string; socialTitle: string };
  };
}

export function Footer({ lang, dict }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-background">
      {/* Gradient top separator */}
      <div
        className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <BrandLogo size={48} />
            <div>
              <div className="font-heading text-lg font-light tracking-[0.3em] uppercase text-foreground">
                Sony Yoga
              </div>
              <p className="mt-1 text-sm text-muted">{dict.footer.tagline}</p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
              {dict.footer.navTitle}
            </h3>
            <nav className="mt-3 flex flex-col gap-2" aria-label="Footer navigation">
              <Link
                href={`/${lang}/activities`}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {dict.nav.activities}
              </Link>
              <Link
                href={`/${lang}/services`}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {dict.nav.services}
              </Link>
              <Link
                href={`/${lang}/links`}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {dict.nav.links}
              </Link>
            </nav>
          </div>

          {/* Social / Connect */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
              {dict.footer.socialTitle}
            </h3>
            <nav className="mt-3" aria-label="Social links">
              <Link
                href={`/${lang}/links`}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {dict.footer.socialTitle} &rarr;
              </Link>
            </nav>
          </div>
        </div>

        {/* Moon divider */}
        <div className="my-8 flex items-center justify-center gap-3" aria-hidden="true">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
          <div className="h-2 w-2 rounded-full bg-accent/40" />
          <div className="h-2.5 w-2.5 rounded-full bg-accent/60" />
          <div className="h-2 w-2 rounded-full bg-accent/40" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
        </div>

        <p className="text-center text-sm text-muted">
          &copy; {year} Sony Yoga. {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
