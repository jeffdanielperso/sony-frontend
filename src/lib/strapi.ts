import type { StrapiResponse, Offer, SocialLink, Locale } from "@/types/strapi";

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
    const pop = Array.isArray(options.populate)
      ? options.populate.join(",")
      : options.populate;
    url.searchParams.set("populate", pop);
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
    throw new Error(`Strapi error: ${res.status} ${res.statusText}`);
  }

  return res.json();
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

// --- Offer queries ---

export async function getOffers(locale: Locale) {
  return fetchStrapi<Offer[]>("/offers", {
    locale,
    populate: "Image",
    sort: "createdAt:desc",
  });
}

export async function getOfferBySlug(slug: string, locale: Locale) {
  const res = await fetchStrapi<Offer[]>("/offers", {
    locale,
    populate: "Image",
    filters: { Slug: { $eq: slug } },
  });
  return res.data[0] ?? null;
}

export async function getAllOfferSlugs() {
  const [en, fr] = await Promise.all([
    fetchStrapi<Offer[]>("/offers", { locale: "en", pagination: { pageSize: 100 } }),
    fetchStrapi<Offer[]>("/offers", { locale: "fr", pagination: { pageSize: 100 } }),
  ]);
  return {
    en: en.data.map((o) => o.Slug),
    fr: fr.data.map((o) => o.Slug),
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

// --- Helper ---

export function getStrapiMedia(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}
