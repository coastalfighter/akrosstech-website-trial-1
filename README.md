# Akrostech — Website

Production website for **Akrostech Consulting LLC** (akrosstech.com): IT outsourcing plus the new
**Website Development** service. It's built with Next.js 16 (App Router), React 19, Tailwind CSS v4,
GSAP, Framer Motion and Lenis, and it deploys to Vercel.

- All content from the previous WordPress site is preserved verbatim (see
  [`docs/CONTENT_INVENTORY.md`](docs/CONTENT_INVENTORY.md)), and old URLs 301-redirect to the new routes.
- **"Editorial" design:** monochrome paper (`#f1efe9`) and ink (`#0b0b0a`), Instrument Serif
  display type with italic accents, Inter Tight for UI, tiny numbered `( labels )` and hairline
  rules. Inspired by the storytelling of rebrandgurus.com, scfo.de and noth.in.
- **Tone-shifting page:** each section declares `data-tone="paper" | "ink"` and the whole page
  inverts as sections cross the middle of the viewport.
- **Real photography** (Unsplash licence) graded to black and white. Photos warm to full colour on
  hover.
- Effects: counter preloader that wipes up, a full-bleed AKROSTECH wordmark that rises in and
  spreads apart on scroll (moving the pointer stirs a WebGL fluid simulation — a port of the noth.in hero — whose dye reveals a colour photo, `FluidReveal`), a
  scroll-expanding image, scroll-scrubbed manifesto text, tilted marquee
  ribbons, hover-flood service rows with a cursor-following photo, a spreading "WORKS" title over an
  asymmetric parallax grid, a horizontal principles accordion, a pinned process timeline, a
  rotating circular CTA, rolling hover labels, a difference-blend cursor, page-name transitions,
  smooth scrolling and animated counters.
- Contact and newsletter forms send email through Resend to **gaurang@akrosstech.com**.

---

## Tech stack

| Concern    | Choice                                                                        |
| ---------- | ----------------------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack, static prerendering)                       |
| UI         | React 19, Tailwind CSS v4, lucide-react                                       |
| Motion     | GSAP 3 (ScrollTrigger, SplitText), Framer Motion (`motion` via `LazyMotion`)  |
| Imagery    | next/image (AVIF/WebP), static imports, `sharp` grading script                |
| Scroll     | Lenis (driven by the GSAP ticker)                                             |
| Content    | Typed TS modules (`src/content`) + MDX (`content/`) via `next-mdx-remote/rsc` |
| Forms      | `zod/mini` validation (shared client/server), Resend email API                |
| Testing    | Vitest + Testing Library (unit/component/API), Playwright (e2e)               |
| Deployment | Vercel                                                                        |

## Project structure

```
.
├── content/
│   ├── blog/*.mdx                 # 3 posts migrated from WordPress
│   └── legal/*.mdx                # Privacy Policy, Terms & Conditions
├── docs/CONTENT_INVENTORY.md      # Everything extracted from the old site
├── scripts/grade-images.mjs       # Bakes the photo grade into background variants
├── e2e/smoke.spec.ts              # Playwright end-to-end tests
├── src/
│   ├── assets/images/             # Photography (+ graded/ background variants)
│   ├── app/                       # Routes (App Router)
│   │   ├── page.tsx               # Home
│   │   ├── about/  contact/  blog/  blog/[slug]/
│   │   ├── services/              # Services index
│   │   ├── services/[slug]/       # 4 outsourcing services (SSG)
│   │   ├── services/website-development/   # NEW flagship service page
│   │   ├── privacy-policy/  terms-and-conditions/
│   │   ├── api/contact/  api/newsletter/   # Form endpoints (Node runtime)
│   │   ├── layout.tsx  globals.css  not-found.tsx  error.tsx
│   │   └── sitemap.ts  robots.ts  manifest.ts  opengraph-image.tsx  icon.svg  apple-icon.tsx
│   ├── components/
│   │   ├── effects/               # Preloader, cursor, page transition, noise overlay
│   │   ├── forms/                 # ContactForm, NewsletterForm
│   │   ├── layout/                # Header (+ full-screen menu), Footer, Logo, Wordmark
│   │   ├── mdx/                   # MDX renderer
│   │   ├── motion/                # Reveal, TextReveal, Parallax, TiltCard, Counter, Marquee,
│   │   │                          # Scroll (ScrubText, ImageReveal, SpreadWord), Intro
│   │   │                          # + MotionController (single client driver, tone switching)
│   │   ├── providers/             # SmoothScroll (Lenis), MotionProvider (LazyMotion)
│   │   ├── sections/              # home/, services/, webdev/, shared/
│   │   └── ui/                    # Button, SectionHeading, Accordion, Badge, Icon
│   ├── content/                   # ← Edit site copy here (typed)
│   ├── hooks/                     # useMediaQuery, usePrefersReducedMotion, …
│   └── lib/                       # validation, email, rate-limit, api guard, seo, content loader,
│                                  # logo geometry, gsap registration, utils (+ __tests__)
├── .env.example
├── next.config.ts                 # Security headers (CSP, HSTS…) + legacy redirects
├── vercel.json
├── playwright.config.ts
└── vitest.config.mts
```

## Getting started

Requirements: **Node.js 20.9+** (Node 22 LTS recommended).

```bash
npm ci
cp .env.example .env.local   # then fill in RESEND_API_KEY (optional for local dev)
npm run dev                  # http://localhost:3000
```

Without `RESEND_API_KEY`, form submissions in **development** are printed to the terminal rather than
emailed, so you can test the forms locally. In **production** a missing key returns a friendly 503.

### Scripts

| Command                                   | What it does                               |
| ----------------------------------------- | ------------------------------------------ |
| `npm run dev`                             | Start the dev server                       |
| `npm run build` / `npm start`             | Production build / serve it                |
| `npm run lint`                            | ESLint (Next core-web-vitals + TS)         |
| `npm run typecheck`                       | TypeScript, no emit                        |
| `npm test`                                | Vitest unit, component and API tests       |
| `npm run test:e2e`                        | Playwright e2e (run `npm run build` first) |
| `npm run check`                           | typecheck + lint + unit tests              |
| `npm run format` / `npm run format:check` | Prettier (with Tailwind class sorting)     |

For e2e tests, run `npx playwright install chromium` once, or point `PLAYWRIGHT_CHROMIUM_PATH` at
an existing Chromium binary.

## Environment variables

| Variable               | Required       | Default                                     | Purpose                                      |
| ---------------------- | -------------- | ------------------------------------------- | -------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | recommended    | `https://akrosstech.com`                    | Canonical URLs, sitemap, Open Graph          |
| `RESEND_API_KEY`       | **production** | —                                           | Sends contact/newsletter emails              |
| `CONTACT_TO_EMAIL`     | no             | `gaurang@akrosstech.com`                    | Inbox that receives submissions              |
| `CONTACT_FROM_EMAIL`   | **production** | `Akrostech Website <onboarding@resend.dev>` | Sender (must be on a Resend-verified domain) |

## Deploying to Vercel

1. **Import the repo.** In Vercel go to **Add New… → Project**, pick this GitHub repository, and choose the
   branch you want as production. Vercel detects Next.js automatically; `vercel.json` pins the
   install and build commands.
2. **Set up email (Resend).**
   1. Create a free account at [resend.com](https://resend.com).
   2. Go to **Domains → Add Domain → `akrosstech.com`** and add the DNS records Resend shows you (SPF/DKIM) at
      your DNS provider. Wait until the domain shows **Verified**.
   3. Go to **API Keys → Create API Key** with "Sending access".
3. **Add environment variables.** In Vercel, open **Project → Settings → Environment Variables** and add the
   variables above for **Production** and **Preview**. Use
   `CONTACT_FROM_EMAIL="Akrostech Website <noreply@akrosstech.com>"`.
4. **Deploy.** Click **Deploy**. Every push to the production branch redeploys automatically, and pull
   requests get preview URLs.
5. **Connect the domain.** Go to **Project → Settings → Domains** and add `akrosstech.com` and
   `www.akrosstech.com`. Update DNS as Vercel instructs (an `A` record `76.76.21.21` for the apex and a
   `CNAME` `cname.vercel-dns.com` for `www`), and choose which one redirects to the other.
6. **Check after launch.**
   - Submit the contact form and confirm the email reaches gaurang@akrosstech.com.
   - Open `/sitemap.xml` and `/robots.txt`, then submit the sitemap in Google Search Console.
   - Confirm old links redirect, e.g. `/about-akrostech/` → `/about` and `/contact-us/` → `/contact`.

## Editing content

- **Contact details, stats and social links:** `src/content/site.ts`
- **Navigation:** `src/content/navigation.ts`
- **Home page copy:** `src/content/home.ts`
- **About page:** `src/content/about.ts`
- **Outsourcing services (4):** `src/content/services.ts`
- **Website Development (services, stack, process, pricing, FAQs):** `src/content/website-development.ts`
- **Portfolio / testimonials (sample content):** `src/content/portfolio.ts`, `src/content/testimonials.ts`
- **Blog posts:** add `content/blog/<slug>.mdx` with frontmatter
  (`title`, `description`, `date: YYYY-MM-DD`, `category`, `tags`). It shows up in the blog index,
  sitemap and JSON-LD automatically.
- **Legal pages:** `content/legal/*.mdx`

## Architecture notes

- **Tones.** Colours are tone-aware tokens (`bg-bg`, `text-fg`, `text-muted`, `border-line`) that
  read CSS variables set on `html[data-tone]`. The `ToneController` in `MotionController` flips the
  `html` tone with ScrollTrigger as each `[data-tone]` section passes mid-viewport. Add
  `data-tone-scope` to pin a subtree to its own tone (the menu overlay does this).
- **Italic accents.** Headline strings in `src/content` and page props accept `*word*` markup, which
  renders as serif italic (`src/lib/rich.tsx`).
- **Rendering.** Every page is statically prerendered; only `/api/*` runs on demand.
- **Motion without hydration cost.** `Reveal`, `TextReveal`, `Parallax` and `TiltCard` are _server_
  components that only render `data-*` attributes. One client `MotionController` sets them up lazily
  as they near the viewport, and tears them down on route change.
- **Fast first paint.** The preloader and hero entrances are pure CSS (including an `@property` counter),
  so they don't wait for JavaScript. The preloader shows once per session and is skipped for
  reduced-motion users.
- **Imagery pipeline.** Photos are statically imported (intrinsic sizes, AVIF/WebP via
  `next/image`). Cards apply the grade live with CSS so they can warm to colour on hover. Full-bleed
  backgrounds use pre-graded files from `npm run images:grade`, with no runtime filters and no blur
  placeholder, which keeps them cheap to paint. To use your own photos, replace a file in
  `src/assets/images/` with the same name, then run `npm run images:grade`.
- **Accessibility.** Skip link, semantic landmarks, one `h1` per page, ARIA disclosure accordion,
  accessible form errors (focus moves to the first invalid field), and keyboard-friendly menus. All
  motion respects `prefers-reduced-motion`.
- **Security.** Strict CSP and security headers (`next.config.ts`). Form endpoints check origin,
  content type, body size, rate limits and schema, and use a silent honeypot. User input is
  HTML-escaped in emails and secrets stay server-side.
- **SEO.** Metadata API, canonical URLs, Open Graph/Twitter cards, a generated OG image, sitemap,
  robots, and JSON-LD (Organization, Service, OfferCatalog, FAQPage, BlogPosting, BreadcrumbList).

### Rate limiting

The form rate limiter lives in memory, so each serverless instance keeps its own counters. That's
enough to deter casual abuse. For strict global limits, back `createRateLimiter` in
`src/lib/rate-limit.ts` with a shared store such as Upstash Redis.

## Quality results (production build, Lighthouse 13, home page)

| Profile | Performance | Accessibility | Best practices | SEO |
| ------- | ----------- | ------------- | -------------- | --- |
| Desktop | 99          | 100           | 100            | 100 |
| Mobile  | 90          | 100           | 100            | 100 |

Mobile uses Lighthouse's simulated slow-4G / 4× CPU profile.

## Content status

- **Confirmed by the business:** the Website Development figures in `src/content/site.ts`
  (`webStats`: 50+ websites, 6+ years), the pricing and maintenance tiers in
  `src/content/website-development.ts`, and the stock photography (see `docs/IMAGE_CREDITS.md`).
- **Portfolio and testimonials** stay labelled as sample content until real case studies and
  approved quotes replace them. Swapping them in needs no code changes.
- **Terms & Conditions §1** still lists only the outsourcing services (kept verbatim). Consider adding
  Website Development and updating the "Last Updated" date.
