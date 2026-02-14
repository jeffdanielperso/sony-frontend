import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/types/strapi";
import { getDictionary } from "@/i18n/config";
import { getActivityBySlug, getAllActivitySlugs, getStrapiMedia } from "@/lib/strapi";
import { getAlternateSlug } from "@/lib/i18n-helpers";
import { SITE_URL } from "@/lib/constants";
import { AlternateUrlSetter } from "@/components/AlternateUrlContext";
import { ServiceCard } from "@/components/ServiceCard";
import { MoonDivider } from "@/components/MoonDivider";

export async function generateStaticParams() {
  const slugs = await getAllActivitySlugs();
  const params: { lang: string; slug: string }[] = [];

  for (const { slug } of slugs.en) {
    params.push({ lang: "en", slug });
  }
  for (const { slug } of slugs.fr) {
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
  const activity = await getActivityBySlug(slug, lang);

  if (!activity) {
    return { title: "Not Found" };
  }

  const seo = activity.seo;
  const imageUrl = getStrapiMedia(seo?.metaImage?.url ?? activity.Image?.url);

  const targetLang = lang === "en" ? "fr" : "en";
  const altSlug = getAlternateSlug(activity.localizations, lang);
  const currentUrl = `${SITE_URL}/${lang}/activities/${slug}`;
  const altUrl = altSlug ? `${SITE_URL}/${targetLang}/activities/${altSlug}` : null;

  const twitterMeta = seo?.metaSocial?.find((s) => s.socialNetwork === "Twitter");

  return {
    title: seo?.metaTitle ?? activity.Title,
    description: seo?.metaDescription ?? activity.Description?.slice(0, 160),
    ...(seo?.keywords
      ? { keywords: seo.keywords.split(",").map((k) => k.trim()) }
      : {}),
    ...(seo?.metaRobots ? { robots: seo.metaRobots } : {}),
    openGraph: {
      type: "article",
      locale: lang,
      title: seo?.metaTitle ?? activity.Title,
      description: (seo?.metaDescription ?? activity.Description)?.slice(0, 65),
      url: currentUrl,
      ...(imageUrl ? { images: [{ url: imageUrl }] } : {}),
    },
    ...(twitterMeta
      ? {
          twitter: {
            card: "summary_large_image" as const,
            title: twitterMeta.title,
            description: twitterMeta.description,
            ...(getStrapiMedia(twitterMeta.image?.url)
              ? { images: [getStrapiMedia(twitterMeta.image?.url)!] }
              : imageUrl
                ? { images: [imageUrl] }
                : {}),
          },
        }
      : {}),
    alternates: {
      ...(seo?.canonicalUrl
        ? { canonical: seo.canonicalUrl }
        : { canonical: currentUrl }),
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

export default async function ActivityDetailPage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}) {
  const { lang, slug } = await params;
  const [dict, activity] = await Promise.all([
    getDictionary(lang),
    getActivityBySlug(slug, lang),
  ]);

  if (!activity) {
    notFound();
  }

  const targetLang = lang === "en" ? "fr" : "en";
  const altSlug = getAlternateSlug(activity.localizations, lang);
  const alternateUrl = altSlug ? `/${targetLang}/activities/${altSlug}` : null;

  const imageUrl = getStrapiMedia(
    activity.Image?.formats?.large?.url ?? activity.Image?.url,
  );

  const intensity = activity.Intensity_Level ?? 0;

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      <AlternateUrlSetter url={alternateUrl} />
      <Link
        href={`/${lang}/activities`}
        className="mb-8 inline-block text-sm font-medium text-accent transition-colors hover:text-accent-hover"
      >
        &larr; {dict.activities.backToActivities}
      </Link>

      {imageUrl ? (
        <div className="relative mb-8 aspect-16/9 overflow-hidden rounded-2xl">
          <Image
            src={imageUrl}
            alt={activity.Image?.alternativeText ?? activity.Title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>
      ) : (
        <div
          className="mb-8 aspect-16/9 rounded-2xl bg-linear-to-br from-accent/15 via-accent-soft to-background"
          role="img"
          aria-label={activity.Title}
        />
      )}

      <div className="flex flex-wrap items-center gap-4">
        <h1 className="font-heading text-3xl font-light tracking-tight sm:text-4xl text-foreground">
          {activity.Title}
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted">{dict.activities.intensity}</span>
          <div className="flex gap-1" role="img" aria-label={`${dict.activities.intensity} ${intensity} / 5`}>
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={`inline-block h-2.5 w-2.5 rounded-full ${
                  i < intensity
                    ? "bg-accent shadow-[0_0_4px_var(--accent)]"
                    : "bg-border"
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert text-muted leading-relaxed whitespace-pre-wrap">
        {activity.Description}
      </div>

      {activity.services?.length > 0 && (
        <section className="mt-16">
          <MoonDivider />
          <h2 className="mb-6 font-heading text-2xl font-light tracking-tight text-foreground">
            {dict.activities.tryThisStyle}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2" role="list">
            {activity.services.map((service) => (
              <ServiceCard
                key={service.documentId}
                service={service}
                lang={lang}
                viewDetailsLabel={dict.services.viewDetails}
              />
            ))}
          </div>
        </section>
      )}

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: activity.Title,
            description: activity.seo?.metaDescription ?? activity.Description?.slice(0, 160),
            url: `${SITE_URL}/${lang}/activities/${slug}`,
            ...(imageUrl ? { image: imageUrl } : {}),
            provider: {
              "@type": "LocalBusiness",
              name: "Sony Yoga",
              url: SITE_URL,
            },
            inLanguage: lang,
            ...(activity.Intensity_Level
              ? {
                  educationalLevel:
                    activity.Intensity_Level <= 2
                      ? "Beginner"
                      : activity.Intensity_Level <= 4
                        ? "Intermediate"
                        : "Advanced",
                }
              : {}),
          }),
        }}
      />
    </article>
  );
}
