# /health

Project health check — dependencies, env vars, TypeScript, lint, Strapi connectivity, i18n completeness.

## Model

haiku

## User-invocable

true

## Instructions

When the user runs `/health`:

Run these checks and report results:

1. **Runtime** — `node --version`, `npm --version`
2. **Dependencies** — `npm outdated` (check for major version gaps in next, react, typescript)
3. **Environment** — Verify `.env.local` exists, check that `NEXT_PUBLIC_STRAPI_URL` and `STRAPI_API_TOKEN` are configured (do NOT read or display values)
4. **TypeScript** — `npx tsc --noEmit` (should be clean, zero errors)
5. **Lint** — `npm run lint` (should pass)
6. **Strapi connectivity** — `curl -s -o /dev/null -w "%{http_code}" $NEXT_PUBLIC_STRAPI_URL/api/activities` (expect 200 or 401)
7. **i18n completeness** — Compare keys in `src/i18n/dictionaries/en.json` and `fr.json` (all keys should match)
8. **Build** — `npm run build` (optional, note if it succeeds)

## Report Format

```
## Project Health Report

| Check          | Status | Details           |
|----------------|--------|-------------------|
| Node.js        | PASS   | v22.x.x           |
| Dependencies   | WARN   | 2 outdated        |
| Environment    | PASS   | .env.local exists  |
| TypeScript     | PASS   | 0 errors          |
| Lint           | PASS   | Clean             |
| Strapi         | PASS   | HTTP 200          |
| i18n           | WARN   | 1 missing key     |

Overall: PASS / WARN / FAIL
```
