import type { StrapiResponse, Activity, Service, SocialLink, Homepage, Locale } from "@/types/strapi";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

interface FetchOptions {
  locale?: Locale;
  populate?: string | string[];
  filters?: Record<string, unknown>;
  sort?: string | string[];
  pagination?: { page?: number; pageSize?: number };
}

async function fetchStrapi<T>(
  path: string,
  options: FetchOptions = {},
): Promise<StrapiResponse<T>> {
  const url = new URL(`/api${path}`, STRAPI_URL);

  if (options.locale) {
    url.searchParams.set("locale", options.locale);
  }

  if (options.populate) {
    const pops = Array.isArray(options.populate)
      ? options.populate
      : [options.populate];
    appendPopulate(url.searchParams, pops);
  }

  if (options.sort) {
    const sortVal = Array.isArray(options.sort)
      ? options.sort.join(",")
      : options.sort;
    url.searchParams.set("sort", sortVal);
  }

  if (options.filters) {
    appendFilters(url.searchParams, options.filters, "filters");
  }

  if (options.pagination) {
    if (options.pagination.page) {
      url.searchParams.set("pagination[page]", String(options.pagination.page));
    }
    if (options.pagination.pageSize) {
      url.searchParams.set(
        "pagination[pageSize]",
        String(options.pagination.pageSize),
      );
    }
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (STRAPI_TOKEN) {
    headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
  }

  const res = await fetch(url.toString(), {
    headers,
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(`Strapi ${res.status} ${res.statusText} — ${url.toString()}\n${body}`);
    throw new Error(`Strapi error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/**
 * Converts a list like ["Image", "services", "services.Image"]
 * into Strapi 5 nested bracket params:
 *   populate[0]=Image
 *   populate[services][populate][0]=Image
 *
 * Relations with nested sub-fields use only the object form
 * (no conflicting indexed entry).
 */
function appendPopulate(params: URLSearchParams, fields: string[]) {
  const nested = new Map<string, string[]>();
  const topLevelOnly: string[] = [];

  for (const field of fields) {
    const dotIndex = field.indexOf(".");
    if (dotIndex === -1) {
      // Could be a plain field OR a relation that also appears with sub-fields
      if (!nested.has(field)) topLevelOnly.push(field);
    } else {
      const relation = field.slice(0, dotIndex);
      const sub = field.slice(dotIndex + 1);
      if (!nested.has(relation)) {
        nested.set(relation, []);
        // Remove from topLevelOnly if already added
        const idx = topLevelOnly.indexOf(relation);
        if (idx !== -1) topLevelOnly.splice(idx, 1);
      }
      nested.get(relation)!.push(sub);
    }
  }

  if (nested.size === 0) {
    // No nested relations — safe to use indexed notation
    let i = 0;
    for (const f of topLevelOnly) {
      params.set(`populate[${i}]`, f);
      i++;
    }
  } else {
    // Mix of plain and nested — use object notation for all
    for (const f of topLevelOnly) {
      params.set(`populate[${f}]`, "true");
    }
    for (const [relation, subs] of nested) {
      subs.forEach((sub, j) => {
        params.set(`populate[${relation}][populate][${j}]`, sub);
      });
    }
  }
}

function appendFilters(
  params: URLSearchParams,
  obj: Record<string, unknown>,
  prefix: string,
) {
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = `${prefix}[${key}]`;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      appendFilters(params, value as Record<string, unknown>, fullKey);
    } else {
      params.set(fullKey, String(value));
    }
  }
}

// --- Activity queries ---

export async function getActivities(locale: Locale) {
  return fetchStrapi<Activity[]>("/activities", {
    locale,
    populate: "Image",
    sort: "createdAt:desc",
  });
}

export async function getActivityBySlug(slug: string, locale: Locale) {
  const res = await fetchStrapi<Activity[]>("/activities", {
    locale,
    populate: ["Image", "services", "services.Image", "seo", "seo.metaImage", "seo.metaSocial", "seo.metaSocial.image", "localizations"],
    filters: { Slug: { $eq: slug } },
  });
  return res.data[0] ?? null;
}

export async function getAllActivitySlugs() {
  const [en, fr] = await Promise.all([
    fetchStrapi<Activity[]>("/activities", { locale: "en", populate: "localizations", pagination: { pageSize: 100 } }),
    fetchStrapi<Activity[]>("/activities", { locale: "fr", populate: "localizations", pagination: { pageSize: 100 } }),
  ]);
  return {
    en: en.data.map((a) => ({ slug: a.Slug, localizations: a.localizations })),
    fr: fr.data.map((a) => ({ slug: a.Slug, localizations: a.localizations })),
  };
}

// --- Service queries ---

export async function getServices(locale: Locale) {
  return fetchStrapi<Service[]>("/services", {
    locale,
    populate: "Image",
    sort: "Service_Type:asc",
  });
}

export async function getServiceBySlug(slug: string, locale: Locale) {
  const res = await fetchStrapi<Service[]>("/services", {
    locale,
    populate: ["Image", "activities", "activities.Image", "bundles", "seo", "seo.metaImage", "seo.metaSocial", "seo.metaSocial.image", "localizations"],
    filters: { Slug: { $eq: slug } },
  });
  return res.data[0] ?? null;
}

export async function getAllServiceSlugs() {
  const [en, fr] = await Promise.all([
    fetchStrapi<Service[]>("/services", { locale: "en", populate: "localizations", pagination: { pageSize: 100 } }),
    fetchStrapi<Service[]>("/services", { locale: "fr", populate: "localizations", pagination: { pageSize: 100 } }),
  ]);
  return {
    en: en.data.map((s) => ({ slug: s.Slug, localizations: s.localizations })),
    fr: fr.data.map((s) => ({ slug: s.Slug, localizations: s.localizations })),
  };
}

// --- Social Link queries ---

export async function getSocialLinks() {
  const res = await fetchStrapi<SocialLink[]>("/social-links", {
    populate: "Icon",
    sort: "Order:asc",
    filters: { IsActive: { $eq: true } },
  });
  return res.data;
}

// --- Homepage queries ---

export async function getHomepage(locale: Locale) {
  const res = await fetchStrapi<Homepage>("/homepage", {
    locale,
    populate: [
      "Hero_Image",
      "About_Image",
      "featured_activities",
      "featured_activities.Image",
      "featured_services",
      "featured_services.Image",
      "seo",
      "seo.metaImage",
      "seo.metaSocial",
      "seo.metaSocial.image",
    ],
  });
  return res.data;
}

// --- Helper ---

export function getStrapiMedia(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}
