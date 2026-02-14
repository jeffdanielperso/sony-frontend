import type { MetadataRoute } from "next";
import { getAllActivitySlugs, getAllServiceSlugs } from "@/lib/strapi";
import { SITE_URL } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [activitySlugs, serviceSlugs] = await Promise.all([
    getAllActivitySlugs(),
    getAllServiceSlugs(),
  ]);

  const locales = ["en", "fr"] as const;

  const staticPaths = ["", "/activities", "/services", "/links"];
  const staticEntries = staticPaths.flatMap((path) =>
    locales.map((lang) => ({
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

  const activityEntries = locales.flatMap((lang) =>
    activitySlugs[lang].map((slug) => ({
      url: `${SITE_URL}/${lang}/activities/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  );

  const serviceEntries = locales.flatMap((lang) =>
    serviceSlugs[lang].map((slug) => ({
      url: `${SITE_URL}/${lang}/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  );

  return [...staticEntries, ...activityEntries, ...serviceEntries];
}
