import Link from "next/link";
import type { Service, Locale } from "@/types/strapi";

interface ServiceCardProps {
  service: Service;
  lang: Locale;
  viewDetailsLabel: string;
}

export function ServiceCard({ service, lang, viewDetailsLabel }: ServiceCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-surface transition-shadow hover:shadow-lg">
      <div className="aspect-[4/3] bg-gradient-to-br from-accent/20 to-accent/5" />
      <div className="p-6">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-foreground">{service.Title}</h3>
          <span className="rounded-full bg-accent/10 px-3 py-0.5 text-xs font-medium text-accent">
            {service.Service_Type}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-4 text-sm text-muted">
          <span>{service.Base_Price.toFixed(2)} &euro;</span>
          {service.Duration_Minutes != null && (
            <span>{service.Duration_Minutes} min</span>
          )}
        </div>
        <Link
          href={`/${lang}/services/${service.Slug}`}
          className="mt-4 inline-block text-sm font-medium text-accent transition-colors hover:text-accent-hover"
        >
          {viewDetailsLabel} &rarr;
        </Link>
      </div>
    </article>
  );
}
