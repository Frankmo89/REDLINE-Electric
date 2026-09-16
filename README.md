# Redline Electric

**Live site:** [https://redlinesd.com](https://redlinesd.com)

Paid client website for a licensed San Diego electrician — bilingual (EN/ES), lead capture, photo gallery, and a small admin dashboard. Built and delivered as a freelance project.

---

## Case study

### Problem

A local contractor needed a fast, mobile-first marketing site that works for English and Spanish customers, collects job leads, and lets the owner update photos without touching code.

### Approach

- **Static front end** on Cloudflare Pages (HTML/CSS/vanilla JS) for speed and low ops cost
- **Supabase** for storage (job photos), business info, and admin auth + RLS
- **Bilingual UI** with an i18n dictionary and fallback checks so strings never go blank
- **Consent-aware analytics** (GA4 Consent Mode v2) — no tracking until the visitor accepts
- **Admin area** (`/admin`) for login + dashboard (photo uploads, profile updates)
- Performance work on LCP: deferred gtag, baked hero preload, image compression helpers

### Outcome

Live production site at [redlinesd.com](https://redlinesd.com). Paid freelance delivery for a real local business (not a tutorial demo).

---

## Stack

| Layer | Choice |
|---|---|
| Hosting | Cloudflare Pages |
| Frontend | HTML, CSS, vanilla JS |
| Backend / data | Supabase (Auth, Storage, Postgres + RLS) |
| i18n | Custom EN/ES dictionary |
| Analytics | GA4 + Consent Mode v2 |

---

## Repo layout (high level)

```
index.html              Marketing home
work.html               Gallery / past work
services/*.html         Service pages
admin/                  Login + dashboard
assets/js/              i18n, Supabase client, analytics, chat widget
css/styles.css
_headers                CSP / security headers for Pages
```

---

## Local preview

Static site — serve the repo root over HTTP (do not open `index.html` via `file://`):

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/`. Admin features need the live Supabase project and credentials configured in the client.

---

## Note

This is client work. The live domain and brand belong to Redline Electric. The repo is shared here as a portfolio case study of the build.
