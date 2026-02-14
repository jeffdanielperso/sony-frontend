---
applies_to: "src/lib/**"
---

# Data Fetching Rules

- **Single entry point** — All Strapi queries go through `fetchStrapi<T>()` in `src/lib/strapi.ts`
- **Never call Strapi directly** — No raw `fetch()` calls to the Strapi API from pages or components
- **Populate syntax** — Use Strapi 5 bracket notation via `appendPopulate` helper for nested relations
- **Locale mapping** — The app uses `"en" | "fr"` but Strapi uses `"fr-FR"` for French. The mapping is handled inside `fetchStrapi` — never pass `"fr-FR"` from outside
- **ISR revalidation** — `fetchStrapi` uses `revalidate: 60` by default. Do not override without good reason
- **Type safety** — Always provide a generic type parameter: `fetchStrapi<Activity[]>(...)`, never untyped
- **Bearer token** — `STRAPI_API_TOKEN` is server-only. Never expose it in `NEXT_PUBLIC_*` variables or client components
- **Error handling** — `fetchStrapi` returns typed data. Handle cases where the API returns empty arrays or null relations
