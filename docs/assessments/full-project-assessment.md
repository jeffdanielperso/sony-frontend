# Project Assessment — All Architect Domains

**Date:** 2026-02-14
**Assessed by:** frontend-architect, seo-architect, ui-ux-architect, devops-architect

## Overall Verdict

The application code is well-structured — strong TypeScript discipline (zero `any` types), proper server/client component boundaries, clean data-fetching patterns, good i18n foundations, and a coherent design system. The gaps are in production readiness, SEO completeness, error resilience, and accessibility polish.

---

## P0 — Critical (Quick Wins) — FIXED in Phase 1

All P0 items resolved in Phase 1 (2026-02-14):

| # | Issue | Domain | Status |
|---|-------|--------|--------|
| 1 | ~~**No `sitemap.ts` or `robots.txt`**~~ — Added dynamic `sitemap.ts` and `robots.ts` | SEO | Fixed |
| 2 | ~~**No JSON-LD structured data**~~ — Added Course (activities), Service+Offer (services), LocalBusiness (home) | SEO | Fixed |
| 3 | ~~**No `not-found.tsx`**~~ — Added `src/app/[lang]/not-found.tsx` | Frontend + UI/UX | Fixed |
| 4 | ~~**No `error.tsx`**~~ — Added `src/app/[lang]/error.tsx` with retry | Frontend + UI/UX | Fixed |
| 5 | ~~**No `loading.tsx`**~~ — Added `src/app/[lang]/loading.tsx` with spinner | Frontend + UI/UX | Fixed |
| 6 | ~~**No lockfile**~~ — Generated `package-lock.json` | DevOps | Fixed |
| 7 | ~~**No `.env.example`**~~ — Created with all 3 required vars | DevOps | Fixed |
| 8 | ~~**`remotePatterns` only allows localhost**~~ — Dynamic production hostname from env var | Frontend + DevOps | Fixed |
| 9 | ~~**Invalid locale params not validated**~~ — `isValidLocale()` guard + `notFound()` in layout | Frontend | Fixed |
| 10 | ~~**Light-mode muted text fails WCAG AA**~~ — `--muted` changed to `#665a73` (~4.8:1) | UI/UX | Fixed |

Additional fixes in Phase 1:
- Added `output: "standalone"` to `next.config.ts` (was P1 #17)
- Made `dangerouslyAllowLocalIP` conditional on `NODE_ENV`
- Fixed hardcoded "No links available." string with `dict.links.noLinks` (was P1 #20, partial)
- Added dictionary keys: `notFound.*`, `error.*`, `links.noLinks` in both en/fr

---

## P1 — High Priority

| # | Issue | Domain | Effort |
|---|-------|--------|--------|
| 11 | ~~**No OpenGraph locale, type, or Twitter Cards**~~ — Added og:type, og:locale on all pages; Twitter cards from metaSocial | SEO | Fixed |
| 12 | ~~**Detail page canonical/hreflang URLs are relative**~~ — Now absolute via `SITE_URL` constant | SEO + Frontend | Fixed |
| 13 | ~~**Home page has no title or description in `generateMetadata`**~~ — Wired from Strapi SEO | SEO | Fixed |
| 14 | **No Dockerfile or docker-compose** — Can't containerize | DevOps | Medium |
| 15 | **No CI/CD pipeline** (GitHub Actions) | DevOps | Medium |
| 16 | **No security headers** (CSP, HSTS, X-Frame-Options, etc.) | DevOps | Medium |
| 17 | ~~**`output: "standalone"` not set**~~ — Fixed in Phase 1 | DevOps | Fixed |
| 18 | **MobileNav lacks focus trap** — WCAG 2.4.3 violation | UI/UX | Small |
| 19 | **No `aria-current="page"` on nav links** — No active page indication | UI/UX | Small |
| 20 | **Hardcoded English strings** — ~~"No links available."~~ fixed; untranslated `Service_Type` remaining | Frontend + i18n | Small |
| 21 | **Middleware doesn't persist locale preference** (no cookie) | Frontend | Small |
| 22 | **`sharp` dependency missing** — Slow image optimization in production | DevOps | Trivial |

---

## P2 — Medium Priority

| # | Issue | Domain | Effort |
|---|-------|--------|--------|
| 23 | **No shared `Dictionary` type** — Components define inline dict shapes | Frontend | Small |
| 24 | **Duplicated intensity dots + hero image patterns** — Extract components | Frontend + UI/UX | Small |
| 25 | **BrandLogo downloads both light+dark images** — Double network request | Frontend | Small |
| 26 | ~~**Activity detail ignores `seo?.metaImage` fallback**~~ — Fixed, now uses `seo?.metaImage?.url ?? Image?.url` | SEO | Fixed |
| 27 | ~~**No `seo?.canonicalUrl` override or `metaRobots` support**~~ — Both wired into generateMetadata | SEO | Fixed |
| 28 | **Emoji service type icons** — Inconsistent rendering across platforms | UI/UX | Small |
| 29 | **External links on Links page lack "opens in new tab" indication** | UI/UX | Trivial |
| 30 | **No error tracking** (Sentry or similar) | DevOps | Medium |
| 31 | **No health check API endpoint** | DevOps | Small |
| 32 | **Pre-commit hooks** (husky + lint-staged) | DevOps | Small |
| 33 | ~~**`NEXT_PUBLIC_SITE_URL` defaults to empty string**~~ — Centralized in `src/lib/constants.ts`, defaults to production domain | Frontend + SEO | Fixed |
| 34 | **Locale constants duplicated** in middleware and i18n/config | Frontend | Trivial |

---

## P3 — Nice to Have

| # | Issue | Domain | Effort |
|---|-------|--------|--------|
| 35 | MobileNav open/close animation | UI/UX | Small |
| 36 | Intermediate heading size (`md:text-6xl`) on home page | UI/UX | Trivial |
| 37 | Footer grid 2-column intermediate step | UI/UX | Trivial |
| 38 | CDN configuration (CloudFront) | DevOps | Large |
| 39 | Bundle analyzer | DevOps | Small |
| 40 | Web Vitals reporting | DevOps + SEO | Small |
| 41 | Page transition animations | UI/UX | Medium |
| 42 | Dynamic imports for below-the-fold content | Frontend | Small |
| 43 | Docker Compose for local dev | DevOps | Medium |
| 44 | Structured logging | DevOps | Medium |
| 45 | Move breathing animation to CSS class (inline style violation) | UI/UX | Trivial |

---

## Recommended Implementation Phases

### Phase 1 — Foundation (P0) — COMPLETED 2026-02-14

Lockfile, `.env.example`, standalone output, production image patterns, locale validation, contrast fix, `not-found.tsx`, `error.tsx`, `loading.tsx`.

### Phase 2 — SEO (P0-P1 SEO) — COMPLETED 2026-02-14

`sitemap.ts`, `robots.ts`, JSON-LD structured data (Course, Service+Offer, LocalBusiness), OpenGraph type/locale on all pages, Twitter cards from metaSocial, absolute canonical/hreflang URLs, all Strapi SEO fields wired (keywords, metaRobots, canonicalUrl, metaSocial), `SITE_URL` centralized in `src/lib/constants.ts`.

### Phase 3 — Accessibility (P1 a11y)

Focus trap, `aria-current`, contrast fixes, external link indicators, intensity dots roles.

### Phase 4 — DevOps (P1 infra)

Dockerfile, GitHub Actions CI, security headers, `sharp` dependency.

### Phase 5 — Polish (P2-P3)

Component extraction, dictionary type safety, locale cookie, animations, CDN.

---

## Detailed Findings by Domain

### Frontend Architecture

**Strengths:**
- Correct Next.js 16 App Router patterns with `params: Promise<{...}>` throughout
- Excellent server/client boundary discipline (only 4 client components, all justified)
- Single data-fetching entry point via `fetchStrapi<T>()` with strong generic typing
- Zero `any` types, `strict: true` in tsconfig
- Clean file structure with `@/*` path alias used consistently
- ISR with 60s revalidation, `generateStaticParams()` on detail pages
- React Compiler enabled for automatic memoization
- Minimal runtime dependencies (only next, react, react-dom)

**Key gaps:**
- No error recovery on `fetchStrapi` — pages throw unhandled on Strapi failure
- Double data fetch in `generateMetadata` + page component (deduplicated by Next.js `fetch`, but fragile)
- `lang` param cast with `as Locale` without runtime validation
- Dictionary return type untyped — components redefine partial shapes inline
- Pagination capped at 100 items with no loop
- `getStrapiMedia` embeds `NEXT_PUBLIC_STRAPI_URL` in HTML (may not be public in production)
- Locale constants duplicated between middleware and i18n/config
- No `dynamicParams = false` export on detail pages

### SEO Architecture

**Strengths:**
- All 6 pages export `generateMetadata` with proper fallback chains
- Layout-level `title.template` (`%s | Sony Yoga`) composes correctly
- hreflang with `x-default` implemented on all pages via `buildStaticAlternates()` and detail page logic
- All images use `next/image` with proper `alt` text fallbacks and `sizes` attributes
- `priority` set on hero images for LCP optimization
- `display: "swap"` on fonts prevents FOIT
- `prefers-reduced-motion` respected globally

**Key gaps:**
- Zero JSON-LD structured data (Course, Service, LocalBusiness, BreadcrumbList all missing)
- No `sitemap.ts` or `robots.ts`
- No `og:type`, `og:locale`, `og:locale:alternate` set anywhere
- No Twitter Card metadata despite Strapi `metaSocial` support
- OG description inherits from meta description (160 chars) instead of the 65-char OG limit
- Listing pages and home page have no OpenGraph images
- Activity detail ignores `seo?.metaImage` fallback (service detail does it correctly)
- Detail page canonical/hreflang URLs are relative, not absolute
- Home page `generateMetadata` returns only `alternates` — no title or description
- No `metaRobots` usage; links page is fully indexable when it probably shouldn't be
- `NEXT_PUBLIC_SITE_URL` defaults to empty string, breaking absolute URLs

### UI/UX Architecture

**Strengths:**
- Coherent luxury design language with purple accent palette
- Two-font system (Cormorant Garamond + DM Sans) well-suited to brand
- Semantic HTML with proper landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`)
- Skip-to-content link with proper focus reveal
- Global `:focus-visible` styling with accent-colored outline
- `prefers-reduced-motion` kills all animations
- MobileNav dialog has `role="dialog"`, `aria-modal`, Escape dismissal, body scroll lock
- Touch targets meet 44×44px minimum across all interactive elements
- Consistent card styling with shared hover treatment
- Dark mode with blocking script prevents FOUC
- CSS variable theming enables clean light/dark swap

**Key gaps:**
- Light-mode `--muted` color (#7d7488) fails WCAG AA contrast (≈3.7:1, needs 4.5:1)
- MobileNav has no focus trap — Tab escapes the modal dialog
- No `aria-current="page"` on navigation links
- Intensity dots lack `role="img"` on container div
- External links on Links page lack "opens in new tab" indication
- "Sony Yoga" brand name hardcoded in 4 places instead of dictionary
- Emoji service type icons render inconsistently across platforms
- BrandLogo downloads both light+dark images regardless of theme
- No loading, error, or 404 states
- Duplicated card hover classes and intensity dot rendering
- Footer jumps from 1 to 3 columns with no intermediate step
- MobileNav has no open/close animation

### DevOps Architecture

**Strengths:**
- Stateless application design — no server-side sessions or in-memory state
- ISR reduces compute load with filesystem caching
- `STRAPI_API_TOKEN` properly server-only
- `.gitignore` correctly excludes `.env*` files and `*.pem`
- TypeScript strict mode and incremental compilation
- ESLint flat config with core-web-vitals + typescript rulesets
- Well-organized Claude Code agents/skills/rules for AI-assisted development

**Key gaps:**
- No lockfile (`package-lock.json`) — builds not reproducible, `npm ci` will fail
- No `.env.example` documenting required variables
- No Dockerfile, docker-compose, or .dockerignore
- `output: "standalone"` not set in next.config.ts
- No CI/CD pipeline (GitHub Actions or otherwise)
- No security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- `dangerouslyAllowLocalIP: true` should be conditional on environment
- No `sharp` dependency for production image optimization
- No error tracking (Sentry), APM, or structured logging
- No health check endpoint for container orchestrators
- No pre-commit hooks (husky + lint-staged)
- No bundle analyzer tooling
- No Web Vitals reporting
- ISR cache is filesystem-based — not shared across multiple container instances
- `remotePatterns` only allows localhost:1337
