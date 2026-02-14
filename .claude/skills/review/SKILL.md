---
name: review
description: Review staged git changes for quality, security, Next.js best practices, SEO, and Strapi integration.
user-invokable: true
disable-model-invocation: true
---

When the user runs `/review`:

1. **Get changes** — Run `git diff --staged` (fall back to `git diff` if nothing staged)
2. **Review each changed file** for:
   - **TypeScript**: Proper types, no `any`, strict null checks
   - **Next.js conventions**: Correct file conventions, async params pattern, proper metadata exports
   - **Strapi integration**: Correct `fetchStrapi` usage, proper populate syntax, type-safe responses
   - **SEO**: `generateMetadata` present on pages, fallback chain correct, character limits
   - **i18n**: Dictionary keys in both en.json and fr.json, `getDictionary` usage
   - **Tailwind**: Proper utility usage, CSS variables for theming, responsive patterns
   - **Security**: No API tokens in client code, no `STRAPI_API_TOKEN` in `NEXT_PUBLIC_*`, XSS prevention (dangerouslySetInnerHTML only for JSON-LD)
   - **Performance**: No unnecessary client components, proper image optimization, dynamic imports where appropriate
3. **Report**:

```
## Summary
[Brief description of changes]

## Findings
[CRITICAL] ...
[HIGH] ...
[MEDIUM] ...
[LOW] ...
[INFO] ...

## Verdict
Approved / Changes Requested
```
