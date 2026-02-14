import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/types/strapi";
import { getDictionary } from "@/i18n/config";
import { getOfferBySlug, getAllOfferSlugs, getStrapiMedia } from "@/lib/strapi";

export async function generateStaticParams() {
  const slugs = await getAllOfferSlugs();
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
  const offer = await getOfferBySlug(slug, lang);

  if (!offer) {
    return { title: "Not Found" };
  }

  const imageUrl = getStrapiMedia(offer.Image?.url);

  return {
    title: offer.Title,
    description: offer.Description?.slice(0, 160),
    openGraph: imageUrl
      ? {
          images: [{ url: imageUrl, width: offer.Image.width, height: offer.Image.height }],
        }
      : undefined,
  };
}

export default async function OfferDetailPage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}) {
  const { lang, slug } = await params;
  const [dict, offer] = await Promise.all([
    getDictionary(lang),
    getOfferBySlug(slug, lang),
  ]);

  if (!offer) {
    notFound();
  }

  const imageUrl = getStrapiMedia(
    offer.Image?.formats?.large?.url ?? offer.Image?.url,
  );

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      <Link
        href={`/${lang}/offers`}
        className="mb-8 inline-block text-sm font-medium text-accent transition-colors hover:text-accent-hover"
      >
        &larr; {dict.offers.backToOffers}
      </Link>

      {imageUrl && (
        <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl">
          <Image
            src={imageUrl}
            alt={offer.Image?.alternativeText ?? offer.Title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <h1 className="text-3xl font-light tracking-tight sm:text-4xl text-foreground">
          {offer.Title}
        </h1>
        {offer.Type && (
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            {offer.Type}
          </span>
        )}
      </div>

      {offer.Price != null && (
        <p className="mt-4 text-2xl font-semibold text-accent">
          {offer.Price.toFixed(2)} &euro;
        </p>
      )}

      <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert text-muted leading-relaxed whitespace-pre-wrap">
        {offer.Description}
      </div>
    </article>
  );
}
