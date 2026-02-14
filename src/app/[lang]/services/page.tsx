import type { Metadata } from "next";
import type { Locale } from "@/types/strapi";
import { getDictionary } from "@/i18n/config";
import { getServices } from "@/lib/strapi";
import { buildStaticAlternates } from "@/lib/i18n-helpers";
import { ServiceCard } from "@/components/ServiceCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.services.title,
    description: dict.services.subtitle,
    alternates: buildStaticAlternates(lang, "/services"),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const { data: services } = await getServices(lang);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-12 text-center">
        <h1 className="font-heading text-4xl font-light tracking-tight sm:text-5xl text-foreground">
          {dict.services.title}
        </h1>
        <p className="mt-4 text-lg text-muted">{dict.services.subtitle}</p>
      </div>

      {services.length === 0 ? (
        <p className="text-center text-muted">{dict.services.noServices}</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {services.map((service) => (
            <ServiceCard
              key={service.documentId}
              service={service}
              lang={lang}
              viewDetailsLabel={dict.services.viewDetails}
            />
          ))}
        </div>
      )}
    </section>
  );
}
