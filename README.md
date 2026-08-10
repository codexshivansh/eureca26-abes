# EUREKA '26 — ABES Engineering College Registration Site

A campus landing page for the **Eureka! Zonal Round** (EUREKA '26, E-Cell IIT Bombay) at
ABES Engineering College, Ghaziabad. Built with Vite + React. The hero section explains
what's happening and how to register at a glance; scroll down for stats, timeline, tracks,
global rewards, FAQ, and a working registration form wired to **Forminit**.

## Run locally

```bash
npm install
npm run dev
```

Open the printed localhost URL.

## Build for production

```bash
npm run build
```

Output goes to `dist/` — a static folder you can deploy anywhere (Netlify, Vercel, GitHub
Pages, Cloudflare Pages, or your college server). This project auto-deploys to Vercel on
every push to `main`.

## Forminit setup (already done)

The registration form submits to Forminit — free plan, chosen because it supports real
file attachments (payment screenshots) unlike Web3Forms' free tier. A dedicated form
named **"EUREKA 26 - ABES Registration"** lives at [forminit.com](https://forminit.com)
under the account that signed up during setup — every submission (and payment
screenshot, capped at 100KB) lands straight in that inbox, and you can also view/export
entries from the Forminit dashboard.

The form ID lives in `src/data/eureka.js` as `FORMINIT_FORM_ID`. If you ever need to
point the site at a different form, swap the value there.

## Editing event details

All copy — dates, tracks, stats, FAQs, college name, payment info — lives in one place:
`src/data/eureka.js`. Update that file and every section on the page updates with it.

## Images

- `src/assets/hero-background.jpg` — hero background photo (behind the headline, ~80%
  opacity with a navy overlay). Replace this file to swap the photo.
- `public/payment-qr.jpg` — the UPI QR code shown in the registration form's payment
  section. Replace this file (keep the same name) to swap the QR code.

## Notes

- Dates/timeline are pulled from the official Eureka! site (ecell.in/eureka) as of
  Aug 2026 — double-check closer to the event in case E-Cell updates them.
- This is an unofficial student/campus page, not the official Eureka! portal.
