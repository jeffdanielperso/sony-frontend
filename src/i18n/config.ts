import type { Locale } from "@/types/strapi";

export const locales: Locale[] = ["en", "fr"];
export const defaultLocale: Locale = "en";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  fr: () => import("./dictionaries/fr.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
