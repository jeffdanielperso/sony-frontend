# Homepage Strategy — Sony Yoga

## Overview

The Homepage is powered by a Strapi single type (`Homepage`) that gives the site owner full editorial control over hero content, about section, featured content selection, and SEO metadata. The frontend renders CMS data with dictionary fallbacks for section labels.

**Brand:** Sony Yoga — luxury yoga studio in Dubai
**Hero style:** "Where Yoga Becomes Personal" — direct, differentiating, emphasizes personalization
**Tone:** Confident, intimate, premium. Not generic wellness speak.

---

## Content Assessment

### Current State
The Strapi Homepage single type was created with: Hero (title, subtitle, CTA, image), About (title, description, image), Featured Activities (3 relation items), Featured Services (3 relation items), and an SEO component. Both EN and FR locales are populated.

### Key Findings

| Area | Rating | Issue |
|------|--------|-------|
| Hero copy | 5/10 | "Transform Your Life Through Yoga" is generic — the most overused headline in wellness. Doesn't reflect the luxury positioning or personal approach. |
| About copy | 4/10 | "Yoga is for everyone" undermines luxury positioning. Boilerplate language with no personality or differentiation. |
| CTA structure | 6/10 | Only one CTA field exists, but the page design needs two (explore + book). Missing secondary CTA fields. |
| Featured activities | 7/10 | Good diversity (Pre-natal, Power, Vinyasa). Pre-natal is niche — consider swapping for Hatha/Yin for broader appeal. |
| Featured services | 8/10 | Strong mix: Corporate (B2B), Weekend Retreat (aspirational), Private Session (luxury anchor). |
| SEO | 6/10 | Decent foundation but missing location (Dubai), no metaImage, no metaSocial entries. |
| Missing sections | - | No section titles/subtitles for featured content grids. No secondary CTAs. |

---

## Recommended Page Flow

```
1. HERO
   Title + Subtitle + Primary CTA + Secondary CTA
   Breathing glow animation + subtle Hero_Image background
   Purpose: Immediate brand impression + emotional hook

2. MOON DIVIDER

3. ABOUT / PHILOSOPHY
   Title + Description + About_Image + optional CTA
   2-column layout (text left, image right)
   Purpose: Who is behind this brand? Why trust them?

4. MOON DIVIDER

5. FEATURED ACTIVITIES (3 cards)
   Section title + subtitle (CMS-editable)
   ActivityCards with images, names, intensity
   "View All" link to /activities
   Purpose: Show the breadth of yoga styles

6. MOON DIVIDER

7. FEATURED SERVICES (3 cards)
   Section title + subtitle (CMS-editable)
   ServiceCards with type, price, duration
   "View All" link to /services
   Purpose: Move from "what we teach" to "how you can experience it"

8. JSON-LD STRUCTURED DATA
   LocalBusiness schema for Dubai location
```

### Rationale
- Activities before Services: people search for "what kind of yoga" before "what format"
- Moon dividers between sections maintain the meditative pacing (brand signature)
- Each section has a clear CTA to keep users moving through the funnel

---

## CMS Field Requirements

### Existing Fields (already in Strapi)

| Field | Type | Localized |
|-------|------|-----------|
| `Hero_Title` | Short Text | Yes |
| `Hero_Subtitle` | Text | Yes |
| `Hero_CTA_Text` | Short Text | Yes |
| `Hero_CTA_Link` | Short Text | Yes |
| `Hero_Image` | Media (single) | No (shared) |
| `About_Title` | Short Text | Yes |
| `About_Description` | Text | Yes |
| `About_Image` | Media (single) | No (shared) |
| `featured_activities` | Relation (Activity, many) | Yes |
| `featured_services` | Relation (Service, many) | Yes |
| `seo` | SEO component | Yes |

### New Fields to Add

| Field | Type | Required | Localized | Purpose |
|-------|------|----------|-----------|---------|
| `Hero_CTA_Secondary_Text` | Short Text | No | Yes | Second CTA button text |
| `Hero_CTA_Secondary_Link` | Short Text | No | Yes | Second CTA button link |
| `About_CTA_Text` | Short Text | No | Yes | About section CTA text |
| `About_CTA_Link` | Short Text | No | Yes | About section CTA link |
| `Featured_Activities_Title` | Short Text | No | Yes | Section heading above activity cards |
| `Featured_Activities_Subtitle` | Short Text | No | Yes | Section subheading |
| `Featured_Services_Title` | Short Text | No | Yes | Section heading above service cards |
| `Featured_Services_Subtitle` | Short Text | No | Yes | Section subheading |

**CTA link convention:** Store relative paths without locale prefix (e.g., `/services`). The frontend prepends `/{lang}`.

---

## Copywriting Recommendations

### Hero

**EN:**
> **Title:** Where Yoga Becomes Personal
> **Subtitle:** From one-on-one sessions to corporate programs, Sony Yoga offers the depth, attention, and expertise that group apps and crowded studios cannot.
> **Primary CTA:** Explore Our Offerings
> **Secondary CTA:** Book a Private Session

**FR:**
> **Title:** La ou le yoga devient personnel
> **Subtitle:** Des seances individuelles aux programmes d'entreprise, Sony Yoga offre la profondeur, l'attention et l'expertise que les applications et les studios bondes ne peuvent offrir.
> **Primary CTA:** Decouvrir Nos Offres
> **Secondary CTA:** Reserver une Seance Privee

### About

**EN:**
> **Title:** The Sony Yoga Approach
> **Description:** Every body carries a different story. Every practice should honour that. At Sony Yoga, sessions are never one-size-fits-all -- whether you come for the quiet restoration of Yin, the dynamic flow of Vinyasa, or a private session tailored entirely to your goals. This is yoga with intention, guided by years of practice and a genuine commitment to your growth.

**FR:**
> **Title:** L'approche Sony Yoga
> **Description:** Chaque corps porte une histoire differente. Chaque pratique devrait l'honorer. Chez Sony Yoga, les seances ne sont jamais standardisees -- que vous veniez pour la restauration profonde du Yin, le dynamisme du Vinyasa, ou une seance privee entierement adaptee a vos objectifs. C'est du yoga avec intention, guide par des annees de pratique et un engagement sincere envers votre evolution.

### SEO

**EN:**
> **metaTitle:** Sony Yoga -- Luxury Yoga Experiences in Dubai
> **metaDescription:** Premium yoga classes in Dubai. Private sessions, group classes, weekend retreats, and corporate wellness programs led by experienced instructors.

**FR:**
> **metaTitle:** Sony Yoga -- Experiences de Yoga de Luxe a Dubai
> **metaDescription:** Cours de yoga premium a Dubai. Seances privees, cours en groupe, retraites et programmes bien-etre en entreprise encadres par des instructeurs experimentes.

---

## Future Phases

These are not in scope for the initial implementation but should be planned:

### Phase 2 — Social Proof
- **Testimonials:** New `Testimonial` collection type (Quote, Author_Name, Author_Title, Rating, Image). Relation on Homepage: `featured_testimonials`. Display 2-3 quotes between Featured Services and footer.
- **Instructor Spotlight:** Fields on Homepage: `Instructor_Name`, `Instructor_Title`, `Instructor_Bio`, `Instructor_Image`. Builds personal connection for a solo-instructor brand.

### Phase 3 — Engagement
- **Newsletter Signup:** Fields: `Newsletter_Title`, `Newsletter_Subtitle`, `Newsletter_CTA_Text`. Requires backend email integration.
- **Upcoming Events / Schedule Preview:** Requires new `Event` or `Schedule` collection type.

### Phase 4 — Authority
- **Blog / Journal:** Topical authority for SEO, organic traffic.
- **FAQ Section:** Addresses common objections before booking.
