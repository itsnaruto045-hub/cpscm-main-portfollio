# CPSCM — Neon + Nebula Single-Page Site

## What you have
This repository contains a single-page site for CPSCM with a Nebula + Neon theme.

## Files
- `index.html` — main HTML file (Bangla copy visible). Contains hero, about, academic, admissions form (front-end validation), faculty, gallery (lightbox), events/accordion, contact, footer credit.
- `css/style.css` — styles, responsive layout, print stylesheet, accessibility focused.
- `js/main.js` — small JS for nebula init, counters, smooth scroll, form validation, lightbox, accordion.
- `assets/` — placeholder images (replace with real images).

## How to run
1. Open `index.html` in any modern browser. No build step required.
2. For production, serve via a static server (Netlify, GitHub Pages, nginx, etc.).

## Replace images
- Replace files under `assets/` with real images. Keep filenames or update paths in `index.html`.
- Replace `assets/og-image.png` for social sharing.

## Hook the admission form to backend
- Find the form in `index.html` with id `admission-form`.
- Remove the client-only demo code in `js/main.js` and uncomment or implement a `fetch('/api/admissions', {method:'POST', body:formData})` to submit to your server.
- Validate server-side on backend.

## Nebula / Performance tuning
- The nebula uses `three.js` CDN by default. To tweak intensity, edit `js/main.js`:
  - `starCount` controls number of stars.
  - `renderer` options (powerPreference) can be set to `'high-performance'` or `'low-power'`.
- For low-power devices, CSS fallback and prefers-reduced-motion are already present.

## Accessibility notes
- Aria attributes and focus styles included.
- Ensure alt text on replaced images is descriptive.

## Footer credit (DO NOT MODIFY unless required)
The footer contains the required credits:
```
© SadaF — Copyright by SadaF
TEAM % SDF>_ — Owner: Sadaf — Portfolio: https://my.oninon.qzz.io
```

## License
Replace with your preferred license.
