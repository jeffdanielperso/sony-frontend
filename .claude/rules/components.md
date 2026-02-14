---
applies_to: "src/components/**"
---

# Component Rules

- **Server by default** — Only add `"use client"` when the component needs browser APIs, hooks, or event handlers
- **Named exports only** — Use `export function ComponentName()`, never `export default`
- **Props interface** — Define a `ComponentNameProps` interface above the component
- **Gradient fallback** — When an image might be missing (optional Strapi Image), render a CSS gradient placeholder instead of broken images
- **Null-guard Strapi fields** — Always use optional chaining for optional CMS fields (`Image?.url`, `seo?.metaTitle`)
- **Tailwind for styling** — Use utility classes, CSS variables from `globals.css` for theming
- **No inline styles** — Prefer Tailwind utilities over `style` props
- **Image component** — Always use `next/image` `<Image>`, never raw `<img>` tags
