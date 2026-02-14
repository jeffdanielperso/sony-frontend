---
applies_to: "src/lib/**"
---

# Data Fetching Rules

- **Single entry point** — All Strapi queries go through `fetchStrapi<T>()` in `src/lib/strapi.ts`
- **Never call Strapi directly** — No raw `fetch()` calls to the Strapi API from pages or components
- **Populate syntax** — Use Strapi 5 bracket notation via `appendPopulate` helper for nested relations
- **Locale codes** — Strapi is configured with `"en"` and `"fr"` locale codes — no `fr-FR` mapping is needed. Pass `Locale` values directly
- **Localizations** — Detail queries (`getActivityBySlug`, `getServiceBySlug`) populate `localizations` for cross-locale slug resolution. Listing queries don't need this
- **ISR revalidation** — `fetchStrapi` uses `revalidate: 60` by default. Do not override without good reason
- **Type safety** — Always provide a generic type parameter: `fetchStrapi<Activity[]>(...)`, never untyped
- **Bearer token** — `STRAPI_API_TOKEN` is server-only. Never expose it in `NEXT_PUBLIC_*` variables or client components
- **Error handling** — `fetchStrapi` returns typed data. Handle cases where the API returns empty arrays or null relations
