import type { StrapiLocalization, Locale } from "@/types/strapi";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export function getAlternateSlug(
  localizations: StrapiLocalization[] | undefined,
  currentLang: Locale,
): string | null {
  if (!localizations?.length) return null;
  const targetLocale = currentLang === "en" ? "fr" : "en";
  const alt = localizations.find((l) => l.locale === targetLocale);
  return alt?.Slug ?? null;
}

export function buildStaticAlternates(lang: Locale, path: string) {
  const enUrl = `${SITE_URL}/en${path}`;
  const frUrl = `${SITE_URL}/fr${path}`;
  return {
    canonical: lang === "en" ? enUrl : frUrl,
    languages: {
      en: enUrl,
      fr: frUrl,
      "x-default": enUrl,
    },
  };
}
