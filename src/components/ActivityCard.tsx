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
    <article className="group overflow-hidden rounded-2xl border border-border bg-surface transition-shadow hover:shadow-lg">
      {imageUrl ? (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={imageUrl}
            alt={activity.Image?.alternativeText ?? activity.Title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="aspect-[4/3] bg-gradient-to-br from-accent/20 to-accent/5" />
      )}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground">{activity.Title}</h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs text-muted">{intensityLabel}</span>
          <div className="flex gap-1" aria-label={`${intensityLabel} ${intensity} / 5`}>
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={`inline-block h-2.5 w-2.5 rounded-full ${
                  i < intensity ? "bg-accent" : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>
        <Link
          href={`/${lang}/activities/${activity.Slug}`}
          className="mt-4 inline-block text-sm font-medium text-accent transition-colors hover:text-accent-hover"
        >
          {viewDetailsLabel} &rarr;
        </Link>
      </div>
    </article>
  );
}
