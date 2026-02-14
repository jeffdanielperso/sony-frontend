---
name: new-page
description: Scaffold a new [lang] page with generateMetadata, generateStaticParams, dictionary keys, and SEO.
user-invokable: true
---

When the user runs `/new-page [name]`:

1. **Validate name** — Directory should be kebab-case, component should be PascalCase
2. **Ask the user**:
   - Data source: Activity, Service, Bundle, or custom/static?
   - Does it need a `[slug]` dynamic route?
   - What SEO metadata is needed?
   - What i18n dictionary keys are needed?
3. **Reference existing patterns** — Read a similar page first:
   - Static page: `src/app/[lang]/page.tsx`
   - Dynamic list: `src/app/[lang]/activities/page.tsx`
   - Dynamic detail: `src/app/[lang]/activities/[slug]/page.tsx`
4. **Create the page** at `src/app/[lang]/[name]/page.tsx` with:
   - `generateMetadata` with SEO fallback chain
   - `generateStaticParams` if dynamic route
   - `getDictionary(lang)` integration
   - `fetchStrapi<T>()` for CMS data
   - Proper `params: Promise<{ lang: Locale }>` pattern (awaited)
5. **Add dictionary keys** to both `src/i18n/dictionaries/en.json` and `fr.json`
6. **Remind** the user to add a nav link in the Header component if needed
