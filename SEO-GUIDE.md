# PureVida Website — SEO Optimization Guide

This is the working checklist for optimizing purevida-website for search engines. Follow it in order — items are prioritized by impact.

---

## CURRENT AUDIT SUMMARY

**What's working:**
- Title tags on most pages are decent
- Meta descriptions exist on every page
- Open Graph tags are partially set up
- LocalBusiness schema exists in the layout
- Good heading hierarchy on most pages
- Image alt text is present (but weak on product pages)
- Internal linking between pages exists

**What's broken or missing (critical):**
- No `robots.txt`
- No `sitemap.xml` (integration not installed, `site` not set in config)
- No canonical URLs on ANY page (prop exists but no page passes it)
- No Twitter Card meta tags anywhere
- `og:image` points to `/images/og-image.jpg` which doesn't exist
- 5 broken internal links: `/locations/austin`, `/locations/san-antonio`, `/blog`, `/privacy`, `/terms`
- No FAQPage schema on the FAQ page
- No Product schema on product pages
- No BreadcrumbList schema
- Schema address is incomplete (missing street, city, zip)
- All Formspree forms use placeholder `YOUR_FORM_ID`

---

## PHASE 1 — TECHNICAL FOUNDATION (Do First)

### 1.1 Set `site` in Astro config
**File:** `astro.config.mjs`

Add the production URL. This is required for canonical URLs, sitemap, and OG tags to work correctly. Replace with the real domain when ready.

```js
export default defineConfig({
  site: 'https://www.purevidawater.com', // replace with real domain
  trailingSlash: 'never',
  vite: {
    plugins: [tailwindcss()]
  }
});
```

### 1.2 Install sitemap integration
Run: `npx astro add sitemap`

This auto-generates a sitemap at build time. Then update `astro.config.mjs`:
```js
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.purevidawater.com',
  trailingSlash: 'never',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] }
});
```

### 1.3 Create robots.txt
**File:** `public/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://www.purevidawater.com/sitemap-index.xml
```

### 1.4 Fix canonical URLs
**File:** `src/layouts/Layout.astro`

The layout already accepts a `canonicalUrl` prop but no page passes it. Change the layout so it auto-generates a canonical when none is passed:

```astro
// In the frontmatter:
const canonical = canonicalUrl || new URL(Astro.url.pathname, Astro.site).href;

// In the <head>:
<link rel="canonical" href={canonical} />
```

Remove the `{canonicalUrl && ...}` conditional — canonical should ALWAYS render.

### 1.5 Add Twitter Card tags
**File:** `src/layouts/Layout.astro`

Add these in the `<head>`, after the existing OG tags:

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content="/images/og-image.jpg" />
```

### 1.6 Create the OG image
**File:** `public/images/og-image.jpg`

The OG tags reference this file but it doesn't exist. Create a 1200x630px branded image with the PureVida logo and tagline. This shows when the site is shared on social media.

### 1.7 Add missing OG tags
**File:** `src/layouts/Layout.astro`

Add to `<head>`:
```html
<meta property="og:site_name" content="PureVida Water Technologies" />
<meta property="og:locale" content="en_US" />
```

### 1.8 Complete the Schema address
**File:** `src/layouts/Layout.astro`

The LocalBusiness schema has an incomplete address. Update it:

```json
"address": {
  "@type": "PostalAddress",
  "streetAddress": "1607 Falcon Dr, STE 101",
  "addressLocality": "DeSoto",
  "addressRegion": "TX",
  "postalCode": "75115",
  "addressCountry": "US"
}
```

Also add `geo` coordinates and `openingHoursSpecification` if available.

---

## PHASE 2 — FIX BROKEN LINKS

### 2.1 Dead nav/footer links
These links exist in `Layout.astro` but the pages don't exist:

| Broken Link | Action |
|-------------|--------|
| `/blog` | Remove from nav until a blog is created |
| `/privacy` | Create a basic privacy policy page OR remove link |
| `/terms` | Create a basic terms page OR remove link |

### 2.2 Dead location links
These are linked from `locations/index.astro` but the pages don't exist:

| Broken Link | Action |
|-------------|--------|
| `/locations/austin` | Create page (modeled after `dallas.astro`) |
| `/locations/san-antonio` | Create page (modeled after `dallas.astro`) |

Each city page needs unique content — NOT a copy of Dallas with the city name swapped. Include:
- City-specific H1: "Bottleless Water Coolers in Austin, TX"
- Local references (business districts, climate, landmarks)
- Embedded Google Map of the service area
- At least 500 words of unique content
- Service + LocalBusiness schema with `areaServed` set to that city

---

## PHASE 3 — ON-PAGE SEO IMPROVEMENTS

### 3.1 Title tag optimization

| Page | Current Title | Recommended Title |
|------|--------------|-------------------|
| `/` | PureVida Water Technologies \| Bottleless Water, Ice & Coffee Systems | Bottleless Water Coolers, Ice Machines & Coffee Systems for Texas \| PureVida |
| `/about` | FAQs \| PureVida Water Technologies | Bottleless Water Cooler FAQs \| PureVida Water Technologies |
| `/contact` | Contact Us \| PureVida Water Technologies | Contact Us — Free Trial & Consultation \| PureVida Water Technologies |
| `/products` | Systems \| PureVida Water Technologies | Commercial Water Coolers, Ice Machines & Coffee Systems \| PureVida |
| `/products/water-coolers` | Water Systems \| PureVida Water Technologies | Bottleless Water Coolers for Offices \| PureVida Water Technologies |
| `/products/ice-machines` | Ice & Water Systems \| PureVida Water Technologies | Commercial Ice Machines for Texas Businesses \| PureVida |
| `/products/coffee-systems` | Coffee System \| PureVida Water Technologies | Office Coffee Systems — Bean to Cup \| PureVida Water Technologies |
| `/locations` | Service Areas \| PureVida Water Technologies | Service Areas in Texas — DFW, Austin & San Antonio \| PureVida |

**Rules:** Keep under 60 chars. Front-load keywords. Every title must be unique.

### 3.2 H1 improvements

| Page | Current H1 | Recommended H1 |
|------|-----------|----------------|
| `/` | We Run Your Breakroom. You Run Your Business. | Keep as-is (brand statement is fine for homepage) |
| `/about` | Frequently Asked Questions | Bottleless Water Cooler FAQs |
| `/products` | Our Systems | Commercial Water, Ice & Coffee Systems |
| `/locations` | Service Areas | Texas Service Areas |

**Rule:** One H1 per page. Include the primary keyword naturally.

### 3.3 Product image alt text
**Files:** `products/water-coolers.astro`, `products/ice-machines.astro`, `products/coffee-systems.astro`

Current alt text is just model numbers. Fix:

| Current | Recommended |
|---------|-------------|
| `alt="PV1w"` | `alt="PV1w Countertop Bottleless Water Cooler"` |
| `alt="PV3w"` | `alt="PV3w Freestanding Bottleless Water Cooler"` |
| `alt="PV4w"` | `alt="PV4w Hydration Hub Water Cooler"` |
| `alt="PV6i"` | `alt="PV6i Countertop Ice and Water Machine"` |
| `alt="PV8i"` | `alt="PV8i Freestanding Commercial Ice Machine"` |
| `alt="PV12c"` | `alt="PV12c Bean-to-Cup Office Coffee System"` |
| `alt="PVFiltration"` | `alt="PureVida Under-Sink Water Filtration System"` |

**Rule:** Describe what's in the image + include product type. Never keyword-stuff.

### 3.4 Internal cross-linking
Add "Related Products" or "Also Available" links:
- Water coolers page → link to ice machines and coffee systems
- Ice machines page → link to water coolers and coffee systems
- Coffee systems page → link to water coolers and ice machines
- All product pages → link to locations page ("Available in Dallas, Austin & San Antonio")

---

## PHASE 4 — STRUCTURED DATA / SCHEMA

### 4.1 FAQPage schema
**File:** `src/pages/about.astro`

Add a `<script type="application/ld+json">` block with every FAQ question/answer:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What exactly is a bottleless water cooler?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A bottleless water cooler connects directly to your building's water line..."
      }
    }
  ]
}
```

This can generate rich FAQ snippets in Google results — high visibility, zero cost.

### 4.2 Product schema
**Files:** `products/water-coolers.astro`, `products/ice-machines.astro`, `products/coffee-systems.astro`

Add `Product` schema for each model with name, description, image, brand, and offers.

### 4.3 BreadcrumbList schema
**All interior pages**

Add `BreadcrumbList` structured data. Example for `/products/water-coolers`:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.purevidawater.com/" },
    { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://www.purevidawater.com/products" },
    { "@type": "ListItem", "position": 3, "name": "Water Coolers", "item": "https://www.purevidawater.com/products/water-coolers" }
  ]
}
```

### 4.4 Service schema on product/location pages
Add `Service` schema with `provider` referencing the LocalBusiness `@id`, `areaServed` set to the cities, and `serviceType` describing the offering.

---

## PHASE 5 — PERFORMANCE & CORE WEB VITALS

**Targets:**
| Metric | Target | What It Measures |
|--------|--------|-----------------|
| LCP | < 2.5s | Main content load speed |
| INP | < 200ms | Responsiveness to interaction |
| CLS | < 0.1 | Layout stability |

### 5.1 Self-host fonts
Currently loading Inter from Google Fonts CDN (adds DNS lookup). Download the font files, put in `public/fonts/`, and preload:

```html
<link rel="preload" as="font" href="/fonts/inter-var.woff2" type="font/woff2" crossorigin />
```

### 5.2 Hero image preloading
On the homepage, preload the LCP image:

```html
<link rel="preload" as="image" href="/images/products/pv4w.png" type="image/png" />
```

Do NOT lazy-load the hero/above-the-fold image.

### 5.3 Lazy-load the Google Map iframe
The contact page loads a Google Maps iframe immediately. Wrap it with `loading="lazy"`:

```html
<iframe loading="lazy" src="..." title="PureVida Office Location"></iframe>
```

### 5.4 Image optimization
Consider using Astro's built-in `<Image />` component from `astro:assets` instead of raw `<img>` tags. It auto-generates AVIF/WebP, adds width/height (prevents CLS), and handles responsive sizes.

---

## PHASE 6 — LOCAL SEO (Off-Site)

These are actions outside the codebase but critical for local ranking:

### 6.1 Google Business Profile
- Claim/verify profiles for each service area (DFW, Austin, San Antonio)
- Primary category: "Water Cooler Supplier"
- Secondary: "Ice Machine Supplier", "Coffee Service"
- Complete every field: hours, description, service area, attributes
- Upload 10+ real photos (installs, team, equipment, office)
- Post every 1-2 weeks (seasonal tips, promotions)

### 6.2 Review generation
- Systematically ask happy customers for Google reviews
- Respond to every review within 48 hours
- Mention service type and city naturally in responses

### 6.3 NAP consistency
Ensure Name, Address, Phone are identical everywhere:
- Website header/footer/contact page
- Google Business Profile
- Bing Places, Apple Maps, Yelp
- Industry directories, Chamber of Commerce listings

**PureVida's NAP:**
```
PureVida Water Technologies
1607 Falcon Dr, STE 101
DeSoto, TX 75115
(469) 903-7887
info@purevidawater.com
```

### 6.4 Directory submissions
Submit to relevant directories:
- Yelp, BBB, Angi
- Local Chamber of Commerce (DeSoto, Dallas, Austin, San Antonio)
- Industry-specific directories

---

## PHASE 7 — CONTENT STRATEGY

### 7.1 Target keywords

**High-intent (service pages):**
- commercial water cooler service [city]
- office water cooler rental [city]
- bottleless water cooler [city]
- commercial ice machine [city]
- ice machine lease [city]
- office coffee service [city]

**Long-tail (blog/FAQ content):**
- bottleless water cooler vs bottled delivery
- how much does a commercial ice machine cost per month
- best water cooler for small office
- commercial ice machine maintenance schedule
- health code requirements ice machine Texas
- bean to cup coffee machine for office

### 7.2 Blog content ideas (when /blog is created)
1. "Bottleless vs. Bottled Water Delivery: The Real Cost Comparison"
2. "How to Choose the Right Commercial Ice Machine for Your Restaurant"
3. "5 Reasons Austin Offices Are Switching to Bottleless Water Coolers"
4. "Commercial Ice Machine Maintenance: What Every Business Owner Should Know"
5. "The Complete Guide to Office Coffee Systems in 2026"

Each post should link back to the relevant service page.

### 7.3 FAQ expansion
The current FAQ page has 6 questions. Add city-specific and product-specific FAQs:
- "Do you service ice machines in Austin?"
- "How long does installation take?"
- "What's included in the monthly lease?"
- "Can I try a water cooler before committing?"

---

## QUICK REFERENCE — FILE RESPONSIBILITIES

| File | SEO Role |
|------|----------|
| `astro.config.mjs` | Site URL, sitemap integration, trailing slash |
| `src/layouts/Layout.astro` | Global meta tags, OG, Twitter, canonical, schema, nav links |
| `src/pages/index.astro` | Homepage title, H1, hero image, internal links |
| `src/pages/about.astro` | FAQ content + FAQPage schema |
| `src/pages/contact.astro` | NAP info, forms, ContactPage schema |
| `src/pages/products/*.astro` | Product titles, descriptions, alt text, Product schema |
| `src/pages/locations/*.astro` | City pages, local keywords, Service schema |
| `src/styles/global.css` | No SEO impact |
| `public/robots.txt` | Crawler instructions + sitemap reference |
| `public/images/og-image.jpg` | Social sharing image |

---

## VALIDATION TOOLS

After implementing changes, verify with:
- **Google Rich Results Test** — test structured data markup
- **Schema.org Validator** — validate JSON-LD
- **Google Search Console** — submit sitemap, monitor indexing
- **PageSpeed Insights** — Core Web Vitals scores
- **Open Graph Debugger (Facebook)** — verify social previews
- **Twitter Card Validator** — verify Twitter previews
- **Screaming Frog** (free up to 500 URLs) — crawl for broken links, missing tags
