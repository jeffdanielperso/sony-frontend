import Image from "next/image";
import Link from "next/link";
import type { Activity, Locale } from "@/types/strapi";
import { getStrapiMedia } from "@/lib/strapi";

interface ActivityCardProps {
  activity: Activity;
  lang: Locale;
  viewDetailsLabel: string;
  intensityLabel: string;
}

export function ActivityCard({ activity, lang, viewDetailsLabel, intensityLabel }: ActivityCardProps) {
  const imageUrl = getStrapiMedia(
    activity.Image?.formats?.medium?.url ?? activity.Image?.url,
  );

  const intensity = activity.Intensity_Level ?? 0;

  return (
    <article
      className="card-enter group overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 hover:border-accent/30 hover:-translate-y-1"
      role="listitem"
    >
      {imageUrl ? (
        <div className="relative aspect-4/3 overflow-hidden">
          <Image
            src={imageUrl}
            alt={activity.Image?.alternativeText ?? activity.Title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div
          className="aspect-4/3 bg-linear-to-br from-accent/15 via-accent-soft to-background"
          role="img"
          aria-label={activity.Title}
        />
      )}
      <div className="p-6">
        <h3 className="font-heading text-lg font-medium text-foreground">{activity.Title}</h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs text-muted">{intensityLabel}</span>
          <div className="flex gap-1" aria-label={`${intensityLabel} ${intensity} / 5`}>
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={`inline-block h-2.5 w-2.5 rounded-full ${
                  i < intensity
                    ? "bg-accent shadow-[0_0_4px_var(--accent)]"
                    : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>
        <Link
          href={`/${lang}/activities/${activity.Slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
        >
          {viewDetailsLabel}
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
        </Link>
      </div>
    </article>
  );
}
