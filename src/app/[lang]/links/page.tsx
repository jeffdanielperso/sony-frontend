import type { Metadata } from "next";
import Image from "next/image";
import type { Locale } from "@/types/strapi";
import { getDictionary } from "@/i18n/config";
import { getSocialLinks, getStrapiMedia } from "@/lib/strapi";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.links.title,
    description: dict.links.subtitle,
  };
}

export default async function LinksPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const links = await getSocialLinks();

  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md text-center">
        <div className="font-heading text-3xl font-light tracking-widest uppercase text-foreground">
          Sony Yoga
        </div>
        <p className="mb-10 text-sm text-muted">{dict.links.subtitle}</p>

        <div className="flex flex-col gap-4">
          {links.map((link) => {
            const iconUrl = getStrapiMedia(link.Icon?.url);
            return (
              <a
                key={link.documentId}
                href={link.URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-border bg-surface px-6 py-4 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-0.5"
              >
                {iconUrl && (
                  <Image
                    src={iconUrl}
                    alt={link.Title}
                    width={24}
                    height={24}
                    className="shrink-0"
                  />
                )}
                <span className="flex-1 text-center font-medium text-foreground">
                  {link.Title}
                </span>
              </a>
            );
          })}
        </div>

        {links.length === 0 && (
          <p className="text-muted">No links available.</p>
        )}
      </div>
    </section>
  );
}
