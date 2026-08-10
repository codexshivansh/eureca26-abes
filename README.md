# EURECA '26 — ABES Engineering College Registration Site

A campus landing page for the **Eureka! Zonal Round** (EURECA '26, E-Cell IIT Bombay) at
ABES Engineering College, Ghaziabad. Built with Vite + React. The hero section explains
what's happening and how to register at a glance; scroll down for stats, timeline, tracks,
global rewards, FAQ, and a working registration form wired to **Web3Forms**.

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
Pages, Cloudflare Pages, or your college server).

## Web3Forms setup (already done)

The registration form submits to Web3Forms using an access key tied to
**helloteviq@gmail.com**. A dedicated form named **"EURECA 26 - ABES Registration"** was
created at [web3forms.com](https://web3forms.com) — every submission lands straight in
that inbox, and you can also view/export entries from the Web3Forms dashboard
(Login → Submissions).

The key lives in `src/data/eureca.js` as `WEB3FORMS_ACCESS_KEY`. If you ever need to
rotate it, generate a new key in the Web3Forms dashboard and swap the value there.

## Editing event details

All copy — dates, tracks, stats, FAQs, college name — lives in one place:
`src/data/eureca.js`. Update that file and every section on the page updates with it.

## Notes

- Dates/timeline are pulled from the official Eureka! site (ecell.in/eureka) as of
  Aug 2026 — double-check closer to the event in case E-Cell updates them.
- This is an unofficial student/campus page, not the official Eureka! portal.
