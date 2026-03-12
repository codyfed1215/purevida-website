# PureVida Website

## Project Overview
- **Framework**: Astro 5.17.1 with Tailwind CSS 4
- **Dev server**: `npm run dev` → http://localhost:4321 (hot-reloads on save)
- **Layout**: `src/layouts/Layout.astro` (header, nav, footer, modal — shared across all pages)
- **Styling**: Tailwind utility classes + custom theme in `src/styles/global.css`
- **Pages**: All in `src/pages/` — Astro file-based routing

## Supabase Edge Functions (purevida-platform repo)
Base URL: `https://tpqipscwaovlujxolfal.supabase.co/functions/v1`

### POST /ingest-lead
Creates/updates leads in Supabase + Zoho CRM. Used by all forms.
```json
{
  "source": "tech|rep|foxflyer|website|referral",
  "form_type": "flyer|drop|contact",
  "business_name": "Acme Corp",
  "phone": "(214) 555-1234",
  "email": "jane@acme.com",
  "first_name": "Jane",
  "last_name": "Smith",
  "title": "Office Manager",
  "address": "123 Main St",
  "city": "Dallas",
  "state": "TX",
  "zip": "75201",
  "current_solution": "Jugs|Bottles|Unknown|Other",
  "promo_code": "PURE-BK",
  "branch": "DFW|ATX|SAN"
}
```

### POST /score-pricing-tool
Called when prospect completes the pricing calculator (Step 5).
```json
{
  "email": "jane@acme.com",
  "phone": "(214) 555-1234",
  "company": "Acme Corp",
  "contact_name": "Jane Smith",
  "promo_code": "PURE-BK",
  "source": "tech|rep|foxflyer",
  "pricing_data": { "products": {}, "term": 60, "payment": "monthly", "boost": {}, "total": 89 }
}
```

## Landing Pages & Forms
| Page | Purpose | Posts to | `form_type` |
|------|---------|----------|-------------|
| `/lp/flyer` | Prospect scans QR code from flyer | `ingest-lead` | `flyer` |
| `/lp/drop` | FoxFlyer logs an onsite drop | `ingest-lead` | `drop` |
| `/lp/tech` | Tech logs an onsite drop (has name dropdown) | `ingest-lead` | `drop` |
| `/lp/pricing` | 5-step self-serve pricing calculator | `score-pricing-tool` | — |
| `/contact` | Trial request + referral forms | `ingest-lead` | `contact` |

## Redirect Pages (QR destinations)
These redirect to `/lp/flyer` with source UTMs. Must pass through `promo` query param.
- `/tech?promo=PURE-XX` → `/lp/flyer?source=tech&promo=PURE-XX&utm_source=tech_flyer`
- `/rep?promo=PURE-XX` → `/lp/flyer?source=rep&promo=PURE-XX&utm_source=rep_flyer`
- `/foxflyer?promo=PURE-XX` → `/lp/flyer?source=foxflyer&promo=PURE-XX&utm_source=foxflyer`

## Promo Codes
| Code | Person | Role |
|------|--------|------|
| PURE-JO | Justin Owen | Sales Manager |
| PURE-AS | Adam Snead | Sales Rep (DFW) |
| PURE-SH | Steve Hardy | Sales Rep (DFW) |
| PURE-AB | Andrew Bain | Sales Rep (ATX) |
| PURE-DD | Dale Dowlearn | Sales Rep (ATX) |
| PURE-BK | Bobby Knapp | Service Tech (DFW) |
| PURE-JL | Jake Loll | Service Tech (DFW) |
| PURE-CT | Colin Taylor | Service Tech (DFW) |
| PURE-JST | James Seto-Templeton | Service Tech (ATX) |
| PURE-RB | Ron Blaire | Service Tech (SAN) |
| PURE-FF | FoxFlyer | Vendor |

## Theme Colors
| Name | Value | Tailwind class |
|------|-------|---------------|
| Primary | #0ea5e9 | `sky-500` / `primary` |
| Primary Dark | #0284c7 | `sky-600` / `primary-dark` |
| Secondary | #06b6d4 | `cyan-500` / `secondary` |
| Accent | #22d3ee | `cyan-400` / `accent` |
| Text Dark | gray-900 | `text-gray-900` |
| Text Light | gray-600 | `text-gray-600` |
| Backgrounds | gray-50, white | `bg-gray-50`, `bg-white` |

## Rules
1. Always read a file before editing it.
2. Do not refactor or "improve" code beyond what's asked.
3. Do not install, remove, or update npm packages without asking.
4. Do not edit `.astro/` folder contents.
