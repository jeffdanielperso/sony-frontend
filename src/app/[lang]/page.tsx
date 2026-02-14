import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/i18n/config";
import type { Locale } from "@/types/strapi";
import { buildStaticAlternates } from "@/lib/i18n-helpers";
import { getHomepage, getStrapiMedia } from "@/lib/strapi";
import { MoonDivider } from "@/components/MoonDivider";
import { ActivityCard } from "@/components/ActivityCard";
import { ServiceCard } from "@/components/ServiceCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const homepage = await getHomepage(lang);

  const ogImageUrl =
    getStrapiMedia(homepage.seo?.metaImage?.url) ??
    getStrapiMedia(homepage.Hero_Image?.url);

  const seo = homepage.seo;
  const twitterMeta = seo?.metaSocial?.find((s) => s.socialNetwork === "Twitter");
  const fbMeta = seo?.metaSocial?.find((s) => s.socialNetwork === "Facebook");

  return {
    title: seo?.metaTitle ?? homepage.Hero_Title,
    description: seo?.metaDescription ?? homepage.Hero_Subtitle,
    ...(seo?.keywords
      ? { keywords: seo.keywords.split(",").map((k) => k.trim()) }
      : {}),
    ...(seo?.metaRobots ? { robots: seo.metaRobots } : {}),
    openGraph: {
      title: fbMeta?.title ?? seo?.metaTitle ?? homepage.Hero_Title,
      description:
        fbMeta?.description?.slice(0, 65) ??
        seo?.metaDescription?.slice(0, 65) ??
        homepage.Hero_Subtitle.slice(0, 65),
      ...(ogImageUrl ? { images: [{ url: ogImageUrl }] } : {}),
    },
    ...(twitterMeta
      ? {
          twitter: {
            card: "summary_large_image" as const,
            title: twitterMeta.title,
            description: twitterMeta.description,
            ...(getStrapiMedia(twitterMeta.image?.url)
              ? { images: [getStrapiMedia(twitterMeta.image?.url)!] }
              : ogImageUrl
                ? { images: [ogImageUrl] }
                : {}),
          },
        }
      : {}),
    alternates: {
      ...buildStaticAlternates(lang, ""),
      ...(seo?.canonicalUrl ? { canonical: seo.canonicalUrl } : {}),
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const [dict, homepage] = await Promise.all([
    getDictionary(lang),
    getHomepage(lang),
  ]);

  const heroImageUrl = getStrapiMedia(homepage.Hero_Image?.url);
  const aboutImageUrl = getStrapiMedia(
    homepage.About_Image?.formats?.medium?.url ?? homepage.About_Image?.url,
  );

  return (
    <>
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 py-20 text-center sm:py-32">
        {heroImageUrl && (
          <Image
            src={heroImageUrl}
            alt=""
            fill
            priority
            className="-z-20 object-cover opacity-15"
            sizes="100vw"
          />
        )}

        {/* Breathing glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl sm:h-96 sm:w-96"
          style={{ animation: "breathe 8s ease-in-out infinite" }}
          aria-hidden="true"
        />

        <h1 className="font-heading text-4xl font-light tracking-tight text-foreground sm:text-5xl lg:text-7xl">
          {homepage.Hero_Title}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          {homepage.Hero_Subtitle}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={`/${lang}${homepage.Hero_CTA_Link}`}
            className="inline-block min-h-[44px] rounded-full bg-accent px-8 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-accent-hover"
          >
            {homepage.Hero_CTA_Text}
          </Link>
          {homepage.Hero_CTA_Secondary_Text && homepage.Hero_CTA_Secondary_Link && (
            <Link
              href={`/${lang}${homepage.Hero_CTA_Secondary_Link}`}
              className="inline-block min-h-[44px] rounded-full border border-accent px-8 py-3 text-sm font-medium tracking-wide text-accent transition-colors hover:bg-accent hover:text-white"
            >
              {homepage.Hero_CTA_Secondary_Text}
            </Link>
          )}
        </div>
      </section>

      <MoonDivider className="mx-auto max-w-6xl px-6" />

      {/* About */}
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="font-heading text-3xl font-light tracking-tight text-foreground sm:text-4xl">
            {homepage.About_Title}
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            {homepage.About_Description}
          </p>
          {homepage.About_CTA_Text && homepage.About_CTA_Link && (
            <Link
              href={`/${lang}${homepage.About_CTA_Link}`}
              className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              {homepage.About_CTA_Text}
              <span>&rarr;</span>
            </Link>
          )}
        </div>
        <div>
          {aboutImageUrl ? (
            <Image
              src={aboutImageUrl}
              alt={homepage.About_Image?.alternativeText ?? homepage.About_Title}
              width={homepage.About_Image?.formats?.medium?.width ?? homepage.About_Image?.width ?? 600}
              height={homepage.About_Image?.formats?.medium?.height ?? homepage.About_Image?.height ?? 400}
              className="rounded-2xl object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div
              className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-accent/15 via-accent-soft to-background"
              role="img"
              aria-label={homepage.About_Title}
            />
          )}
        </div>
      </section>

      <MoonDivider className="mx-auto max-w-6xl px-6" />

      {/* Featured Activities */}
      {homepage.featured_activities.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-light tracking-tight text-foreground sm:text-4xl">
              {homepage.Featured_Activities_Title ?? dict.home.featuredActivities.title}
            </h2>
            <p className="mt-3 text-muted">
              {homepage.Featured_Activities_Subtitle ?? dict.home.featuredActivities.subtitle}
            </p>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {homepage.featured_activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                lang={lang}
                viewDetailsLabel={dict.activities.viewDetails}
                intensityLabel={dict.activities.intensity}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href={`/${lang}/activities`}
              className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              {dict.home.featuredActivities.cta}
              <span>&rarr;</span>
            </Link>
          </div>
        </section>
      )}

      <MoonDivider className="mx-auto max-w-6xl px-6" />

      {/* Featured Services */}
      {homepage.featured_services.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-light tracking-tight text-foreground sm:text-4xl">
              {homepage.Featured_Services_Title ?? dict.home.featuredServices.title}
            </h2>
            <p className="mt-3 text-muted">
              {homepage.Featured_Services_Subtitle ?? dict.home.featuredServices.subtitle}
            </p>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {homepage.featured_services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                lang={lang}
                viewDetailsLabel={dict.services.viewDetails}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href={`/${lang}/services`}
              className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              {dict.home.featuredServices.cta}
              <span>&rarr;</span>
            </Link>
          </div>
        </section>
      )}

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://sonyyoga.com",
            name: "Sony Yoga",
            description: homepage.seo?.metaDescription ?? homepage.Hero_Subtitle,
            url: "https://sonyyoga.com",
            image: getStrapiMedia(homepage.Hero_Image?.url) ?? undefined,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Dubai",
              addressCountry: "AE",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 25.2048,
              longitude: 55.2708,
            },
            priceRange: "$$",
            additionalType: "https://schema.org/HealthAndBeautyBusiness",
          }),
        }}
      />
    </>
  );
}
