---
name: perf-audit
description: Audit bundle size, image optimization, ISR/SSG strategy, and Core Web Vitals readiness.
model: haiku
user_invocable: true
---

When the user runs `/perf-audit`:

1. **Configuration check**:
   - Read `next.config.ts` — React Compiler enabled? Image optimization settings? Standalone output?
   - Check for `experimental` flags that affect performance
2. **ISR/SSG usage**:
   - Scan all `src/app/[lang]/**/page.tsx` for `revalidate` or `generateStaticParams`
   - Verify dynamic routes use `generateStaticParams` for SSG
   - Check that `fetchStrapi` calls include revalidation
3. **Image optimization**:
   - Search for `<Image` imports from `next/image` — should be used everywhere
   - Search for raw `<img` tags — should not exist
   - Check that `<Image>` uses `sizes` prop for responsive images
   - Check for proper `width`/`height` or `fill` prop usage
4. **Client vs Server components**:
   - Find all `"use client"` files
   - Check if any could be server components instead
   - Look for unnecessary client-side state or effects
5. **Bundle optimization**:
   - Check for dynamic imports (`next/dynamic`) where appropriate
   - Look for large dependencies that could be tree-shaken or lazy-loaded
   - Check for barrel exports that might prevent tree-shaking

## Report Format

```
## Performance Audit

| Check                | Status | Details                        |
|----------------------|--------|--------------------------------|
| React Compiler       | PASS   | Enabled                        |
| Image optimization   | WARN   | 2 raw <img> tags found         |
| ISR/SSG              | PASS   | All pages use revalidation     |
| Client components    | PASS   | 1 client component (minimal)   |
| Bundle optimization  | WARN   | No dynamic imports used        |

Overall: PASS / WARN / FAIL

### Recommendations
- [Specific actionable items]
```
