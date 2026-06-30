# Career Launch Europe — Debanjan Patra

A single-page marketing site for Debanjan Patra's career-coaching practice, helping
internationals land roles in **France & Europe**. Brand program: **The Europe Launch Method**.

Vanilla **HTML + CSS + ES6 modules** — no build step, no framework, no npm. Mirrors the
conventions of the `sky-career` PWA.

## Run locally
```bash
cd career-launch-europe
python3 -m http.server 8000
# open http://localhost:8000  (service worker registers on localhost — a secure context)
```

## Edit the important things (no code knowledge needed)
| What | File |
|---|---|
| **Your Microsoft Bookings link** | `src/config.js` → `BOOKINGS_URL` (replace the `REPLACE_ME` placeholder) |
| **Contact / LinkedIn / email** | `src/config.js` |
| **Prices, package names, deliverables** | `src/data/pricing.js` |
| **FAQ questions & answers** | `src/data/faq.js` |
| **Career-timeline milestones (the chart)** | `src/data/journey.js` |
| **Headline numbers (counters)** | `src/data/stats.js` |
| **All visible text (for translation)** | `src/data/i18n.js` |

> Prices and testimonials ship as clearly-marked **placeholders** — edit them before going public.

## Booking
The site embeds your **Microsoft Bookings** page in an iframe and always shows a fallback
"Open the booking page ↗" button. Until you paste your real `BOOKINGS_URL` in `src/config.js`,
the booking section shows the button + a setup note instead of a broken iframe.

If your Microsoft tenant blocks iframing (Conditional Access / `X-Frame-Options`), the page
detects the empty frame and the fallback button still works.

## Regenerate icons
```bash
python3 tools/gen_icons.py   # rasterizes icons/icon.svg → PNGs (macOS qlmanage + sips)
```

## Deploy (GitHub Pages)
```bash
git init && git add -A && git commit -m "Launch site"
# create a GitHub repo named e.g. career-launch-europe, then:
git remote add origin git@github.com:<you>/career-launch-europe.git
git push -u origin main
```
Repo → **Settings → Pages → Deploy from a branch → `main` / root**. The `.nojekyll` file
makes GitHub serve `src/` verbatim. Site: `https://<you>.github.io/career-launch-europe/`.
All paths are relative, so it works under the repo subpath with no changes.

**Bump `CACHE_VERSION` in `sw.js` on every deploy** so visitors get the new version.

## Fonts (optional zero-dependency mode)
Type uses Google Fonts via `<link>`. For full offline parity, download the woff2 files into
`assets/fonts/`, swap the `<link>` for `@font-face` in `index.html`, and add those files to the
`SHELL` array in `sw.js`. Fallback font stacks are already in place if the CDN is blocked.

---
*Independent coaching practice. Career biography references (Aera Technology, NEOMA, PepsiCo,
Saint-Cyr, Politecnico di Milano, NIT Warangal) are factual and not endorsements.*
