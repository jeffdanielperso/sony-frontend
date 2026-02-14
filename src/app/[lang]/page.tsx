import Link from "next/link";
import { getDictionary } from "@/i18n/config";
import type { Locale } from "@/types/strapi";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <section className="flex flex-col items-center justify-center px-6 py-32 text-center">
      <h1 className="text-5xl font-light tracking-tight sm:text-7xl text-foreground">
        {dict.home.hero}
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
        {dict.home.subtitle}
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href={`/${lang}/activities`}
          className="inline-block rounded-full bg-accent px-8 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-accent-hover"
        >
          {dict.home.ctaActivities}
        </Link>
        <Link
          href={`/${lang}/services`}
          className="inline-block rounded-full border border-accent px-8 py-3 text-sm font-medium tracking-wide text-accent transition-colors hover:bg-accent hover:text-white"
        >
          {dict.home.ctaServices}
        </Link>
      </div>
    </section>
  );
}
