import Link from "next/link";
import { getDictionary } from "@/i18n/config";
import type { Locale } from "@/types/strapi";
import { MoonDivider } from "@/components/MoonDivider";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <section className="relative flex flex-col items-center justify-center px-6 py-20 text-center sm:py-32">
        {/* Breathing glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl sm:h-96 sm:w-96"
          style={{ animation: "breathe 8s ease-in-out infinite" }}
          aria-hidden="true"
        />

        <h1 className="font-heading text-4xl font-light tracking-tight sm:text-5xl lg:text-7xl text-foreground">
          {dict.home.hero}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          {dict.home.subtitle}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={`/${lang}/activities`}
            className="inline-block min-h-[44px] rounded-full bg-accent px-8 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-accent-hover"
          >
            {dict.home.ctaActivities}
          </Link>
          <Link
            href={`/${lang}/services`}
            className="inline-block min-h-[44px] rounded-full border border-accent px-8 py-3 text-sm font-medium tracking-wide text-accent transition-colors hover:bg-accent hover:text-white"
          >
            {dict.home.ctaServices}
          </Link>
        </div>
      </section>

      <MoonDivider className="mx-auto max-w-6xl px-6" />
    </>
  );
}
