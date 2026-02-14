# /new-component

Scaffold a new component with TypeScript props interface, following existing patterns.

## Model

sonnet

## User-invocable

true

## Instructions

When the user runs `/new-component [name]`:

1. **Validate name** — Must be PascalCase
2. **Ask the user**:
   - What props does the component need?
   - Server component (default) or client component (`"use client"`)?
   - Does it use Strapi data types from `src/types/strapi.ts`?
3. **Reference existing patterns** — Read similar components first:
   - Card pattern: `src/components/ActivityCard.tsx`, `ServiceCard.tsx`, `BundleCard.tsx`
   - Layout pattern: `src/components/Header.tsx`, `src/components/Footer.tsx`
   - Client pattern: `src/components/LanguageSwitcher.tsx`
4. **Create the component** at `src/components/[Name].tsx` with:
   - TypeScript props interface (`[Name]Props`)
   - Named export (NOT default export)
   - Tailwind CSS for styling
   - Gradient fallback for missing images (if image-related)
   - Proper null-guarding for optional Strapi fields
5. **Verify** TypeScript compiles: `npx tsc --noEmit`
