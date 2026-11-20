# Doctor At Home – Delhi NCR

Multi-page, statically prerendered Vite + React website for **https://delhidoctorathome.com/** – a doctor home-visit service across Delhi, Gurgaon, Noida, Greater Noida, Ghaziabad and Faridabad.

Stack: Vite · React 19 (JavaScript only) · React Router · Tailwind CSS v4 · Framer Motion · Lucide React · Inter (self-hosted).

## Run

```bash
npm install
npm run dev                                   # development
node scripts/prerender.mjs && npm run build   # production (prerender + build) → dist/
npm run preview
```

> **Important – prerendering.** Every route (42 pages + 404) is rendered to static HTML by `scripts/prerender.mjs`.
> The generated files live in `public/<route>/index.html` (+ `public/app/main.js|css`, `public/sitemap.xml`, `public/robots.txt`)
> and the home page is injected into `index.html`. **Re-run the prerender script after changing anything in `src/`**
> (content, data, components) – otherwise the static HTML and the `/app` bundle will be stale.
> To make this automatic, change the `build` script in `package.json` to:
>
> `"build": "node scripts/prerender.mjs && vite build"`

QA helpers: `node scripts/check-dist.mjs` (after build) checks broken links/images, remote image URLs, unique titles/descriptions, one `<h1>` per page.

## Things to configure before launch

| What | Where |
| --- | --- |
| Phone, WhatsApp, e-mail, address (currently **placeholders**) | `src/config/siteConfig.js` |
| Optional booking backend (POST JSON). Empty = WhatsApp message flow | `siteConfig.bookingEndpoint` |
| Payment label on the booking page (only after the policy is confirmed) | `siteConfig.paymentInfoLabel` |
| Verified doctor profiles (currently **placeholders**) | `src/data/doctors.js` |
| Cities, neighbourhoods, SEO copy, FAQs, nearby links | `src/data/locations.js` |
| Services | `src/data/services.js` |
| Legal text (drafts – review with counsel) | `src/data/legal.js` |

### Brand logo

`public/brand/doctor-at-home-logo.png` and `doctor-at-home-icon.png` are **stand-in files** recreated to match the supplied artwork,
because the original image file was not available inside the project. **Replace both files with the official logo PNG/icon (same file names)** –
no code change is needed; the logo is only ever scaled by height so proportions are preserved. Then run `node scripts/make-assets.mjs --force-brand`
only if you want the stand-ins regenerated; otherwise regenerate favicons by exporting them from the official icon.

## Adding a location / neighbourhood

Add an object to `cities` or `localities` in `src/data/locations.js`. Routes, sitemap, selectors, footer links, structured data and prerendering are derived from it.
URLs: `/doctor-at-home-in-{city}/` and `/doctor-at-home-in-{locality}-{city}/`.

## Structure

```
src/
  components/   Header, Footer, Hero, LocationModal, LocationSelector, ServiceCard, DoctorCard, FAQ,
                BookingForm, StickyMobileActions, SEO, … (ui/ holds Button, Container, Icon, …)
  pages/        Home, Services, ServiceDetail, Doctors, Locations, LocationDetail, LocalityDetail,
                Booking, Contact, About, Legal, NotFound
  data/         locations, services, doctors, faqs, navigation, legal
  config/       siteConfig.js
  hooks/        useSelectedLocation (localStorage-backed city context)
  utils/        seo (meta + JSON-LD), routes, contact (tel/WhatsApp), validation, cn
  styles/       index.css (Tailwind theme with brand tokens, Inter)
scripts/        prerender.mjs, make-assets.mjs, check-dist.mjs
public/         brand/, images/{hero,doctors,services,home-visits,locations,general}/, favicons
```

## Notes

- All imagery is local (`/public/images`, WebP). No remote image URLs.
- Photography was AI-generated; doctor profile illustrations are neutral placeholders, not real people.
- The selected city is the only thing stored in `localStorage`. Patient details are never persisted.
- Canonical URLs always match each page's own path – selecting a location never changes them.
- Static hosting: serve `dist/` as-is; unknown URLs should fall back to `dist/404.html`.
