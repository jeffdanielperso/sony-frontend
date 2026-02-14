import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/types/strapi";
import { getDictionary } from "@/i18n/config";
import { getServiceBySlug, getAllServiceSlugs } from "@/lib/strapi";
import { BundleCard } from "@/components/BundleCard";

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  const params: { lang: string; slug: string }[] = [];

  for (const slug of slugs.en) {
    params.push({ lang: "en", slug });
  }
  for (const slug of slugs.fr) {
    params.push({ lang: "fr", slug });
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const service = await getServiceBySlug(slug, lang);

  if (!service) {
    return { title: "Not Found" };
  }

  return {
    title: service.seo?.metaTitle ?? service.Title,
    description: service.seo?.metaDescription ?? service.Description?.slice(0, 160),
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}) {
  const { lang, slug } = await params;
  const [dict, service] = await Promise.all([
    getDictionary(lang),
    getServiceBySlug(slug, lang),
  ]);

  if (!service) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      <Link
        href={`/${lang}/services`}
        className="mb-8 inline-block text-sm font-medium text-accent transition-colors hover:text-accent-hover"
      >
        &larr; {dict.services.backToServices}
      </Link>

      <div className="mb-8 aspect-[16/9] rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5" />

      <div className="flex flex-wrap items-center gap-4">
        <h1 className="text-3xl font-light tracking-tight sm:text-4xl text-foreground">
          {service.Title}
        </h1>
        <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          {service.Service_Type}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted">
        <span>
          <strong className="text-foreground">{dict.services.price}:</strong>{" "}
          {service.Base_Price.toFixed(2)} &euro;
        </span>
        {service.Duration_Minutes != null && (
          <span>
            <strong className="text-foreground">{dict.services.duration}:</strong>{" "}
            {service.Duration_Minutes} min
          </span>
        )}
        {service.Location != null && (
          <span>
            <strong className="text-foreground">{dict.services.location}:</strong>{" "}
            {service.Location}
          </span>
        )}
      </div>

      <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert text-muted leading-relaxed whitespace-pre-wrap">
        {service.Description}
      </div>

      {service.activities?.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-4 text-2xl font-light tracking-tight text-foreground">
            {dict.services.availableStyles}
          </h2>
          <div className="flex flex-wrap gap-2">
            {service.activities.map((activity) => (
              <Link
                key={activity.documentId}
                href={`/${lang}/activities/${activity.Slug}`}
                className="rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
              >
                {activity.Title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {service.bundles?.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-light tracking-tight text-foreground">
            {dict.services.saveWithBundle}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {service.bundles.map((bundle) => (
              <BundleCard
                key={bundle.documentId}
                bundle={bundle}
                sessionsLabel={dict.services.sessions}
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
