import type { Metadata } from "next";
import type { Locale } from "@/types/strapi";
import { getDictionary } from "@/i18n/config";
import { getOffers } from "@/lib/strapi";
import { OfferCard } from "@/components/OfferCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.offers.title,
    description: dict.offers.subtitle,
  };
}

export default async function OffersPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const { data: offers } = await getOffers(lang);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-light tracking-tight sm:text-5xl text-foreground">
          {dict.offers.title}
        </h1>
        <p className="mt-4 text-lg text-muted">{dict.offers.subtitle}</p>
      </div>

      {offers.length === 0 ? (
        <p className="text-center text-muted">{dict.offers.noOffers}</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <OfferCard
              key={offer.documentId}
              offer={offer}
              lang={lang}
              viewDetailsLabel={dict.offers.viewDetails}
            />
          ))}
        </div>
      )}
    </section>
  );
}
