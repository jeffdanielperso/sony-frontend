---
applies_to:
  - "src/**/*.tsx"
  - "src/**/*.css"
---

# Styling Rules

- **Tailwind CSS v4** — Use utility classes for all styling, leveraging v4 features
- **CSS variables for theming** — Light/dark theme colors are defined as CSS variables in `src/app/globals.css`. Reference them via Tailwind utilities
- **Dark mode** — Uses `prefers-color-scheme` media query (automatic), not class-based toggling
- **Path alias** — Always import with `@/*` (maps to `src/*`), never relative paths like `../../`
- **Responsive design** — Use Tailwind breakpoint prefixes (`sm:`, `md:`, `lg:`) for responsive layouts
- **No inline styles** — Prefer Tailwind utilities over `style` props. Exception: dynamic values that can't be expressed as utilities
- **Gradient fallbacks** — For components with optional images, use a CSS gradient as the fallback background
