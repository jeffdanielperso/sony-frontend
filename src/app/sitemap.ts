import type { MetadataRoute } from "next";
import { getAllActivitySlugs, getAllServiceSlugs } from "@/lib/strapi";
import { getAlternateSlug } from "@/lib/i18n-helpers";
import { SITE_URL } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [activitySlugs, serviceSlugs] = await Promise.all([
    getAllActivitySlugs(),
    getAllServiceSlugs(),
  ]);

  const staticPaths = ["", "/activities", "/services", "/links"];
  const staticEntries = staticPaths.flatMap((path) =>
    (["en", "fr"] as const).map((lang) => ({
      url: `${SITE_URL}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1.0 : 0.8,
      alternates: {
        languages: {
          en: `${SITE_URL}/en${path}`,
          fr: `${SITE_URL}/fr${path}`,
        },
      },
    }))
  );

  // Build activity entries from English, resolving French alternate slugs
  const activityEntries = activitySlugs.en.flatMap(({ slug, localizations }) => {
    const frSlug = getAlternateSlug(localizations, "en");
    const enUrl = `${SITE_URL}/en/activities/${slug}`;
    const frUrl = frSlug ? `${SITE_URL}/fr/activities/${frSlug}` : null;

    const entries: MetadataRoute.Sitemap = [
      {
        url: enUrl,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: frUrl
          ? { languages: { en: enUrl, fr: frUrl } }
          : undefined,
      },
    ];

    if (frUrl) {
      entries.push({
        url: frUrl,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: { languages: { en: enUrl, fr: frUrl } },
      });
    }

    return entries;
  });

  // Add any French-only activities (no English counterpart)
  const linkedFrSlugs = new Set(
    activitySlugs.en.flatMap(({ localizations }) => {
      const frSlug = getAlternateSlug(localizations, "en");
      return frSlug ? [frSlug] : [];
    })
  );
  const frOnlyActivityEntries: MetadataRoute.Sitemap = activitySlugs.fr
    .filter(({ slug }) => !linkedFrSlugs.has(slug))
    .map(({ slug }) => ({
      url: `${SITE_URL}/fr/activities/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  // Build service entries from English, resolving French alternate slugs
  const serviceEntries = serviceSlugs.en.flatMap(({ slug, localizations }) => {
    const frSlug = getAlternateSlug(localizations, "en");
    const enUrl = `${SITE_URL}/en/services/${slug}`;
    const frUrl = frSlug ? `${SITE_URL}/fr/services/${frSlug}` : null;

    const entries: MetadataRoute.Sitemap = [
      {
        url: enUrl,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: frUrl
          ? { languages: { en: enUrl, fr: frUrl } }
          : undefined,
      },
    ];

    if (frUrl) {
      entries.push({
        url: frUrl,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: { languages: { en: enUrl, fr: frUrl } },
      });
    }

    return entries;
  });

  // Add any French-only services
  const linkedFrServiceSlugs = new Set(
    serviceSlugs.en.flatMap(({ localizations }) => {
      const frSlug = getAlternateSlug(localizations, "en");
      return frSlug ? [frSlug] : [];
    })
  );
  const frOnlyServiceEntries: MetadataRoute.Sitemap = serviceSlugs.fr
    .filter(({ slug }) => !linkedFrServiceSlugs.has(slug))
    .map(({ slug }) => ({
      url: `${SITE_URL}/fr/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  return [
    ...staticEntries,
    ...activityEntries,
    ...frOnlyActivityEntries,
    ...serviceEntries,
    ...frOnlyServiceEntries,
  ];
}
