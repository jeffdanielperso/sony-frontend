import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/types/strapi";
import { getDictionary } from "@/i18n/config";
import { getServiceBySlug, getAllServiceSlugs, getStrapiMedia } from "@/lib/strapi";
import { getAlternateSlug } from "@/lib/i18n-helpers";
import { AlternateUrlSetter } from "@/components/AlternateUrlContext";
import { BundleCard } from "@/components/BundleCard";
import { MoonDivider } from "@/components/MoonDivider";

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

  const imageUrl = getStrapiMedia(
    service.seo?.metaImage?.url ?? service.Image?.url,
  );

  const targetLang = lang === "en" ? "fr" : "en";
  const altSlug = getAlternateSlug(service.localizations, lang);
  const currentUrl = `/${lang}/services/${slug}`;
  const altUrl = altSlug ? `/${targetLang}/services/${altSlug}` : null;

  return {
    title: service.seo?.metaTitle ?? service.Title,
    description: service.seo?.metaDescription ?? service.Description?.slice(0, 160),
    openGraph: imageUrl
      ? {
          images: [{ url: imageUrl }],
        }
      : undefined,
    alternates: {
      canonical: currentUrl,
      languages: altUrl
        ? {
            en: lang === "en" ? currentUrl : altUrl,
            fr: lang === "fr" ? currentUrl : altUrl,
            "x-default": lang === "en" ? currentUrl : altUrl,
          }
        : undefined,
    },
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

  const targetLang = lang === "en" ? "fr" : "en";
  const altSlug = getAlternateSlug(service.localizations, lang);
  const alternateUrl = altSlug ? `/${targetLang}/services/${altSlug}` : null;

  const heroImage = getStrapiMedia(
    service.Image?.formats?.large?.url ?? service.Image?.url,
  );

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      <AlternateUrlSetter url={alternateUrl} />
      <Link
        href={`/${lang}/services`}
        className="mb-8 inline-block text-sm font-medium text-accent transition-colors hover:text-accent-hover"
      >
        &larr; {dict.services.backToServices}
      </Link>

      {heroImage ? (
        <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl">
          <Image
            src={heroImage}
            alt={service.Image?.alternativeText ?? service.Title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>
      ) : (
        <div
          className="mb-8 aspect-[16/9] rounded-2xl bg-gradient-to-br from-accent/15 via-accent-soft to-background"
          role="img"
          aria-label={service.Title}
        />
      )}

      <div className="flex flex-wrap items-center gap-4">
        <h1 className="font-heading text-3xl font-light tracking-tight sm:text-4xl text-foreground">
          {service.Title}
        </h1>
        <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-hover">
          {service.Service_Type}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted">
        <span aria-label={`Price: ${service.Base_Price.toFixed(2)} euros`}>
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
          <MoonDivider />
          <h2 className="mb-4 font-heading text-2xl font-light tracking-tight text-foreground">
            {dict.services.availableStyles}
          </h2>
          <div className="flex flex-wrap gap-2">
            {service.activities.map((activity) => (
              <Link
                key={activity.documentId}
                href={`/${lang}/activities/${activity.Slug}`}
                className="rounded-full bg-accent-soft px-4 py-1.5 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
              >
                {activity.Title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {service.bundles?.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 font-heading text-2xl font-light tracking-tight text-foreground">
            {dict.services.saveWithBundle}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {service.bundles.map((bundle) => (
              <BundleCard
                key={bundle.documentId}
                bundle={bundle}
                sessionsLabel={dict.services.sessions}
                perSessionLabel={dict.services.perSession}
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
