# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Next.js dev server (localhost:3000)
- `npm run build` — Production build
- `npm run lint` — ESLint (flat config, core-web-vitals + typescript)
- `npx tsc --noEmit` — Type-check without emitting
- No test framework is configured

## Architecture

**Next.js 16 App Router** with React 19, TypeScript, Tailwind CSS v4, and React Compiler enabled.

### Routing & i18n

All routes live under `src/app/[lang]/` with `Locale = "en" | "fr"`. Middleware (`src/middleware.ts`) detects the browser locale from `Accept-Language` and redirects bare paths to `/{locale}/...`.

Dictionaries are lazy-loaded JSON files in `src/i18n/dictionaries/`. Every page calls `getDictionary(lang)` to get translated strings. The `Locale` type is defined in `src/types/strapi.ts` and re-used everywhere.

**Important:** Strapi is configured with `"en"` and `"fr"` locale codes — no `fr-FR` mapping is needed. The entire app uses `"en" | "fr"` consistently.

**Cross-locale switching:** Detail pages populate the `localizations` relation from Strapi to get the alternate locale's slug. A React context (`AlternateUrlContext`) bridges this page-level data to the layout-level `LanguageSwitcher`. See `docs/i18n-cross-locale-switching.md` for full details.

### Strapi CMS Integration

`src/lib/strapi.ts` is the sole data-fetching layer. All queries go through `fetchStrapi<T>()` which handles:
- Bearer token auth via `STRAPI_API_TOKEN` env var
- Strapi 5 nested populate syntax (bracket notation via `appendPopulate`)
- ISR with 60-second revalidation

Content types: **Activity**, **Service**, **Bundle**, **SocialLink** (defined in `src/types/strapi.ts`). Services have no Image field in Strapi. Activities have an optional Image. Bundles have no Slug or Image.

### Environment Variables

- `NEXT_PUBLIC_STRAPI_URL` — Strapi base URL (default: `http://localhost:1337`)
- `STRAPI_API_TOKEN` — Bearer token for Strapi API (server-only)

### Rendering

Pages are React Server Components using `async` functions. Dynamic routes use `generateStaticParams()` for SSG. The only client component is `LanguageSwitcher`. Page params follow the Next.js 15+ `params: Promise<{...}>` pattern (must be awaited).

### Styling

Tailwind v4 with custom CSS variables in `src/app/globals.css` for light/dark theming. Path alias `@/*` maps to `src/*`.

## Agents & Skills

### Agents

| Agent | Model | Role |
|-------|-------|------|
| `frontend-architect` | Opus | Plan Next.js architecture, routing, component design, performance |
| `seo-architect` | Opus | Plan SEO strategy — metadata, structured data, OpenGraph, Core Web Vitals |
| `ui-ux-architect` | Opus | Plan UI/UX design, accessibility, responsive strategy, component patterns |
| `devops-architect` | Opus | Plan AWS deployment, CI/CD pipelines, Docker, CDN strategy |
| `frontend-developer` | Sonnet | Implement pages, components, data-fetching, i18n, Strapi integration |
| `seo-engineer` | Sonnet | Implement metadata, structured data, sitemap, robots.txt |
| `docs-writer` | Sonnet | Write technical docs — architecture, setup guides, component catalog |

Opus agents **plan only** (no write/edit/bash). Sonnet agents **implement**.

### Skills (slash commands)

| Command | Model | Description |
|---------|-------|-------------|
| `/new-page [name]` | Sonnet | Scaffold a new `[lang]` page with metadata, SSG, i18n |
| `/new-component [name]` | Sonnet | Scaffold a component with TypeScript props and existing patterns |
| `/seo-audit` | Haiku | Audit all pages for SEO completeness |
| `/review` | Opus | Review staged changes for quality, security, best practices |
| `/health` | Haiku | Project health check — deps, types, lint, Strapi, i18n |
| `/deploy-plan` | Opus | Propose AWS deployment strategy with cost estimates |
| `/docker-check` | Haiku | Validate Docker configuration for Next.js |
| `/perf-audit` | Haiku | Audit bundle size, images, ISR/SSG, Core Web Vitals |

`/review` and `/deploy-plan` are user-invocable only (Opus, not auto-triggered).
