---
paths:
  - "src/app/**"
---

# SEO Rules

- **generateMetadata on every page** — All `page.tsx` files with CMS data must export `generateMetadata`
- **Fallback chain** — Always use: `seo?.metaTitle ?? Title`, `seo?.metaDescription ?? Description?.slice(0, 160)`
- **Character limits** — metaTitle: 60 chars, metaDescription: 160 chars, OG title: 60 chars, OG description: 65 chars
- **All Strapi SEO fields** — Every page with CMS SEO data must use all fields from the `Seo` interface:
  - `metaTitle` / `metaDescription` — Primary metadata with fallbacks to content fields
  - `metaImage` — Used for `openGraph.images`, falls back to the content's `Image` field. Use `getStrapiMedia()` for full URLs
  - `keywords` — Split comma-separated string into array: `seo.keywords.split(",").map(k => k.trim())`
  - `metaRobots` — Pass directly to `robots` in metadata (e.g. `"noindex, follow"`)
  - `canonicalUrl` — Override the default canonical URL when provided by Strapi
  - `metaSocial` — Array with `"Facebook"` and `"Twitter"` entries. Map Twitter entry to `twitter: { card, title, description, images }`. Map Facebook entry to override `openGraph` title/description
- **OpenGraph type and locale** — Every page must set `openGraph.type` (`"website"` for listings/home, `"article"` for detail pages) and `openGraph.locale` (the current `lang`)
- **Structured data** — Use JSON-LD via `<script type="application/ld+json">` for content pages (Activity→Course, Service→Service+Offer, Homepage→LocalBusiness)
- **Populate SEO deeply** — `fetchStrapi` calls must populate `"seo"`, `"seo.metaImage"`, `"seo.metaSocial"`, and `"seo.metaSocial.image"` — not just `"seo"` alone
- **Absolute URLs** — All canonical, hreflang, OG, and JSON-LD URLs must be absolute. Import `SITE_URL` from `@/lib/constants` — never construct site URLs from scratch
- **hreflang** — Include alternate language links for en/fr versions of each page
- **Canonical URLs** — Use `seo?.canonicalUrl` when available, otherwise construct from the current route using `SITE_URL`
- **Sitemap** — `src/app/sitemap.ts` auto-generates from Strapi data. New content types with pages must be added to it. Detail page entries must include `alternates.languages` using `localizations` to resolve cross-locale slugs
- **Robots** — `src/app/robots.ts` allows all crawlers and references the sitemap
