import type { Metadata } from "next";
import type { Locale } from "@/types/strapi";
import { getDictionary } from "@/i18n/config";
import { getActivities } from "@/lib/strapi";
import { buildStaticAlternates } from "@/lib/i18n-helpers";
import { ActivityCard } from "@/components/ActivityCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.activities.title,
    description: dict.activities.subtitle,
    alternates: buildStaticAlternates(lang, "/activities"),
  };
}

export default async function ActivitiesPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const { data: activities } = await getActivities(lang);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-12 text-center">
        <h1 className="font-heading text-4xl font-light tracking-tight sm:text-5xl text-foreground">
          {dict.activities.title}
        </h1>
        <p className="mt-4 text-lg text-muted">{dict.activities.subtitle}</p>
      </div>

      {activities.length === 0 ? (
        <p className="text-center text-muted">{dict.activities.noActivities}</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {activities.map((activity) => (
            <ActivityCard
              key={activity.documentId}
              activity={activity}
              lang={lang}
              viewDetailsLabel={dict.activities.viewDetails}
              intensityLabel={dict.activities.intensity}
            />
          ))}
        </div>
      )}
    </section>
  );
}
