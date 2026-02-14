import Image from "next/image";
import Link from "next/link";
import type { Service, Locale } from "@/types/strapi";
import { getStrapiMedia } from "@/lib/strapi";

interface ServiceCardProps {
  service: Service;
  lang: Locale;
  viewDetailsLabel: string;
}

const typeIcons: Record<Service["Service_Type"], string> = {
  Private: "\u{1F9D8}",
  Group: "\u{1F465}",
  Online: "\u{1F310}",
  Event: "\u{1F4C5}",
  Corporate: "\u{1F3E2}",
};

const typeGradients: Record<Service["Service_Type"], string> = {
  Private: "from-accent/20 via-accent-soft to-background",
  Group: "from-accent/15 via-accent/5 to-background",
  Online: "from-accent/10 via-accent-soft to-accent/5",
  Event: "from-accent/20 to-accent-soft",
  Corporate: "from-accent/15 via-background to-accent-soft",
};

export function ServiceCard({ service, lang, viewDetailsLabel }: ServiceCardProps) {
  const icon = typeIcons[service.Service_Type] ?? "";
  const gradient = typeGradients[service.Service_Type] ?? "from-accent/20 to-accent/5";
  const imageUrl = getStrapiMedia(
    service.Image?.formats?.medium?.url ?? service.Image?.url,
  );

  return (
    <article
      className="card-enter group overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 hover:border-accent/30 hover:-translate-y-1"
      role="listitem"
    >
      {imageUrl ? (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={imageUrl}
            alt={service.Image?.alternativeText ?? service.Title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div
          className={`aspect-[4/3] bg-gradient-to-br ${gradient}`}
          role="img"
          aria-label={service.Title}
        />
      )}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <h3 className="font-heading text-lg font-medium text-foreground">{service.Title}</h3>
          <span className="rounded-full bg-accent-soft px-3 py-0.5 text-xs font-medium text-accent-hover">
            {icon} {service.Service_Type}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-4 text-sm text-muted">
          <span aria-label={`Price: ${service.Base_Price.toFixed(2)} euros`}>
            {service.Base_Price.toFixed(2)} &euro;
          </span>
          {service.Duration_Minutes != null && (
            <span>{service.Duration_Minutes} min</span>
          )}
        </div>
        <Link
          href={`/${lang}/services/${service.Slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
        >
          {viewDetailsLabel}
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
        </Link>
      </div>
    </article>
  );
}
