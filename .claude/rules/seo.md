---
applies_to: "src/app/**"
---

# SEO Rules

- **generateMetadata on every page** — All `page.tsx` files with CMS data must export `generateMetadata`
- **Fallback chain** — Always use: `seo?.metaTitle ?? Title`, `seo?.metaDescription ?? Description?.slice(0, 160)`
- **Character limits** — metaTitle: 60 chars, metaDescription: 160 chars, OG title: 60 chars, OG description: 65 chars
- **OpenGraph images** — Include `openGraph.images` using `seo?.metaImage?.url ?? Image?.url` with full URL (prepend `NEXT_PUBLIC_STRAPI_URL` if relative)
- **Structured data** — Use JSON-LD via `<script type="application/ld+json">` for content pages (Activity→Course, Service→Service, Bundle→Offer)
- **Populate SEO** — Ensure `fetchStrapi` calls for page data include `"seo"` in the populate parameter
- **hreflang** — Include alternate language links for en/fr versions of each page
- **Canonical URLs** — Use `seo?.canonicalUrl` when available, otherwise construct from the current route
