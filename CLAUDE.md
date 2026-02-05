# PureVida Website - Session Rules

## WHO THIS IS FOR
You are helping a beginner make **cosmetic edits only**. Do NOT make structural, architectural, or functional changes.

## PROJECT OVERVIEW
- **Framework**: Astro 5.17.1 with Tailwind CSS 4
- **Dev server**: `npm run dev` → http://localhost:4321 (hot-reloads on save)
- **Layout**: `src/layouts/Layout.astro` (header, nav, footer, modal — shared across all pages)
- **Styling**: Tailwind utility classes + custom theme in `src/styles/global.css`
- **Pages**: All in `src/pages/` — Astro file-based routing

## SAFE TO EDIT (cosmetic changes)
These are the ONLY types of changes allowed:

- **Text content**: Headings, paragraphs, button labels, descriptions on any page
- **Colors**: Tailwind color classes (e.g. changing `text-sky-600` to `text-blue-600`)
- **Font sizes**: Tailwind text sizing (e.g. `text-lg` to `text-xl`)
- **Spacing/padding**: Tailwind spacing (e.g. `p-4` to `p-6`, `gap-8` to `gap-12`)
- **Images**: Swapping image paths in `<img>` tags (new images go in `public/images/`)
- **Show/hide sections**: Adding or removing `hidden` class on a section
- **Border radius, shadows**: Tailwind utilities like `rounded-xl`, `shadow-lg`

### Files safe for cosmetic edits:
| File | What's there |
|------|-------------|
| `src/pages/index.astro` | Homepage — hero, products, benefits, comparison, service areas |
| `src/pages/about.astro` | FAQ accordion, contact CTA |
| `src/pages/contact.astro` | 4 tabbed contact forms, map, contact info |
| `src/pages/products/index.astro` | Product category grid |
| `src/pages/products/water-coolers.astro` | Water cooler product selector + specs |
| `src/pages/products/ice-machines.astro` | Ice machine product selector + specs |
| `src/pages/locations/index.astro` | Service areas overview |
| `src/styles/global.css` | Theme colors and font (keep the `@import "tailwindcss"` line) |

## DO NOT TOUCH — OFF LIMITS
- `src/layouts/Layout.astro` — the master layout (nav, footer, modal, SEO schema). Breaking this breaks every page.
- `astro.config.mjs` — framework config
- `tsconfig.json` — TypeScript config
- `package.json` / `package-lock.json` — dependencies
- Any `<script>` blocks inside pages — these control interactivity (tabs, accordions, mobile menu, modal)
- Do NOT install, remove, or update npm packages
- Do NOT create new pages or delete existing pages
- Do NOT modify file names or move files
- Do NOT change `<head>`, `<meta>`, or SEO-related tags
- Do NOT edit anything inside `.astro/` folder

## THEME COLORS (reference)
| Name | Value | Tailwind class |
|------|-------|---------------|
| Primary | #0ea5e9 | `sky-500` / `primary` |
| Primary Dark | #0284c7 | `sky-600` / `primary-dark` |
| Secondary | #06b6d4 | `cyan-500` / `secondary` |
| Accent | #22d3ee | `cyan-400` / `accent` |
| Text Dark | gray-900 | `text-gray-900` |
| Text Light | gray-600 | `text-gray-600` |
| Backgrounds | gray-50, white | `bg-gray-50`, `bg-white` |

## RULES FOR CLAUDE
1. **Always read a file before editing it.** Never guess at content.
2. **One small change at a time.** Make a single edit, confirm it works visually, then move on.
3. **Never batch large changes.** If the user asks for multiple edits, do them one by one.
4. **If a request could break layout or functionality, explain why and refuse.** Suggest a safe alternative.
5. **Do not refactor, reorganize, or "improve" code.** Only change what is explicitly asked for.
6. **If unsure whether something is cosmetic, ask before editing.**
7. **Never run `npm install`, `npm update`, or add dependencies.**
8. **Never modify or delete `<script>` tags or JavaScript logic.**
9. **Keep all Tailwind classes — only swap values, don't remove utility patterns.**
10. **If something breaks, immediately undo the last edit with Ctrl+Z guidance or revert the change.**
