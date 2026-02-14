import Image from "next/image";
import Link from "next/link";
import type { Offer, Locale } from "@/types/strapi";
import { getStrapiMedia } from "@/lib/strapi";

interface OfferCardProps {
  offer: Offer;
  lang: Locale;
  viewDetailsLabel: string;
}

export function OfferCard({ offer, lang, viewDetailsLabel }: OfferCardProps) {
  const imageUrl = getStrapiMedia(
    offer.Image?.formats?.medium?.url ?? offer.Image?.url,
  );

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-surface transition-shadow hover:shadow-lg">
      {imageUrl && (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={imageUrl}
            alt={offer.Image?.alternativeText ?? offer.Title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {offer.Type && (
            <span className="absolute top-4 left-4 rounded-full bg-accent/90 px-3 py-1 text-xs font-medium text-white">
              {offer.Type}
            </span>
          )}
        </div>
      )}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground">{offer.Title}</h3>
        {offer.Price != null && (
          <p className="mt-2 text-sm font-medium text-accent">
            {offer.Price.toFixed(2)} &euro;
          </p>
        )}
        <Link
          href={`/${lang}/offers/${offer.Slug}`}
          className="mt-4 inline-block text-sm font-medium text-accent transition-colors hover:text-accent-hover"
        >
          {viewDetailsLabel} &rarr;
        </Link>
      </div>
    </article>
  );
}
