# Affordable Dryer Vent & Gutter Specialists: website build brief

Owner: Nick. Business: Affordable Dryer Vent & Gutter Specialists, Ocean & Monmouth County, NJ.
Phone (732) 966-6914 · affordabledvgc@gmail.com · NJ LIC# 13VH1031470 · Production domain: https://www.affordabledvgc.com

## Stack
Plain static HTML + CSS + minimal vanilla JS. No framework, no build step. Hosted as a Render static site (publish directory = repo root). Fast, accessible, mobile-first.

## Design = Option 1 (owner picked it)
Match `_reference/design/option1.png` (Option 1 = top-left of `_reference/design/options-grid.png`).
- Dark charcoal/black with orange accent (see `_reference/design/BRAND.md`), dusk-sky photo feel, heavy condensed bold headlines, clean sans body.
- Header (NOT sticky): logo left, nav (Home, Dryer Vent Services, Gutter Services, Gallery, Reviews, About, Service Areas, Contact), orange pill phone button right.
- Hero: eyebrow "CLEANER. SAFER. A SAFER HOME."; H1 where "Dryer Vent" and "Specialists" are orange and "and Gutter" is white (owner's request); subtext "Professional cleaning, repair and installation for a safer, more efficient home."; company van photo on the right; trust row (stars + review count, Certified Dryer Exhaust Technician badge, NJ Lic#, Family Owned & Operated); buttons "Call Now (732) 966-6914" (tel:) and "Get a Free Quote – It's fast and easy".
- Dryer vents lead the site; gutters stay fully present (never cut gutter content).

## Phase 1 (this session): homepage + shared design system
Build `index.html`, `assets/css/site.css`, `assets/js/site.js` as the foundation every other page will reuse. Below the hero, use the section order and copy from `_reference/v3-preview/index.html` and `_reference/content/home.md` (owner's wording), restyled to Option 1: services (dryer vent first, then gutters), why us / trust, before-after photos, reviews, service-area teaser, FAQ teaser, lead form, footer.
- Lead form is top priority: name, phone, email, service tap-buttons, Town/ZIP, message. Leave the form `action` as a clearly marked TODO (backend chosen later).
- Mobile bottom bar: Call, Text Us (sms:+17329666914), Free Quote.
- Use the real photos in `assets/img/` (Hero.jpg, van/truck, before/after). Don't use stock-looking placeholders when a real photo fits.
- SEO: keep title/meta description/H1 intent from the current site (see the head of `_reference/v3-preview/index.html`), canonical https://www.affordabledvgc.com/, LocalBusiness JSON-LD. Add `<meta name="robots" content="noindex">` for now (preview until launch).
- Don't state a review count that can't be verified: put `{{REVIEW_COUNT}}` in the HTML with a TODO comment.

## Phase 2 (later sessions): all other pages
Same slugs as the live site, each as `/slug/index.html`: /about, /contact, /dryer-vent-services, /dryer-vent-products, /gutter-cleaning, /gutter-products, /gallery, /reviews, /frequently-asked-questions, /request-callback-form, /service-areas, /thank-you. Then a /gutter-guards page and town pages (Toms River, Freehold, Brick, Middletown first) per `_reference/seo/`.

`_reference/` is source material only. Never link to it from the site.
