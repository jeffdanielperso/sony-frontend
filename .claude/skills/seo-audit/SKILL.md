# /seo-audit

Audit all pages for SEO completeness — metadata, OpenGraph, structured data, alt text, canonical URLs.

## Model

haiku

## User-invocable

true

## Instructions

When the user runs `/seo-audit`:

1. **Scan all pages** — Find all `src/app/[lang]/**/page.tsx` files
2. **For each page, check**:
   - Has `generateMetadata` export?
   - Uses SEO fallback chain (`seo?.metaTitle ?? Title`)?
   - Has OpenGraph configuration (title, description, image)?
   - Has structured data (JSON-LD `<script>` tag)?
   - Character limits respected (title 60, description 160)?
3. **Check Strapi types** — In `src/types/strapi.ts`:
   - All content types with pages have `seo?: Seo | null` field
4. **Check data fetching** — In `src/lib/strapi.ts`:
   - SEO component is populated in relevant queries (`populate` includes `"seo"`)
5. **Check images** — In all components:
   - Next.js `<Image>` used (not raw `<img>`)
   - `alt` text provided
   - `sizes` prop set for responsive images
6. **Report as table**:

```
| Page | Metadata | OG | Structured Data | SEO Populated | Status |
|------|----------|----|-----------------|---------------|--------|
```

Status: PASS / WARN / FAIL for each page
