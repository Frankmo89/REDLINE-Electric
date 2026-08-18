# Pending Items

Running list of open work that spans sessions. Anything not finished in a
single sitting belongs here so it doesn't get lost.

**Convention:** when an item is done, move it to the **Resolved** section at the
bottom with the date it closed — don't delete it. Add new open items as they
come up.

Last updated: 2026-08-17

---

## Open

Item numbers are stable — when something resolves it moves to the bottom and
its number is retired, so a gap in this list means "resolved", not "missing".

### 1. Domain — redlinesd.com transfer

Transfer from Wix to Namecheap is still in progress; Wix hasn't released the
domain yet.

Once the transfer completes:

- Point nameservers at Cloudflare: `fay.ns.cloudflare.com` /
  `moura.ns.cloudflare.com`
- Connect the domain to the `redline-electric` Worker (see `wrangler.jsonc`)

**Current state:** `https://redlinesd.com/` resolves to a Wix "this domain is
not connected to a site" parking page.

**Note — the repo does not use a workers.dev URL anywhere.** Every canonical,
`og:url`, `sitemap.xml` entry, and the `Sitemap:` line in `robots.txt` already
points at `https://redlinesd.com`. So there is nothing to find-and-replace once
the domain is live — but until then those URLs advertise a domain that serves a
parking page. Worth re-verifying they resolve correctly the moment DNS cuts
over.

Files that reference the domain: `index.html`, `work.html`, `404.html`,
`services/*.html`, `sitemap.xml`, `robots.txt`.

### 2. Email alias — info@redlinesd.com

Blocked on item 1.

Once the domain is live:

- Set up Cloudflare Email Routing for `info@redlinesd.com` (or similar)
  forwarding to Joe's Gmail
- Re-add the email to `business_info.email` in Supabase — the contact block on
  the site reveals itself automatically when that field is non-empty
  (`assets/js/business-info.js:51-57`); no code change needed either way

**Why it's empty right now:** `joe.britt1979@gmail.com` was rendering publicly
next to the C-10 license number, which undercut the credibility the license is
there to establish. Rather than ship a personal Gmail, the field was cleared on
2026-08-17 so the contact block shows phone + WhatsApp only until a proper
alias exists.

### 3. Resend — verified domain required

Lead-notification and customer-confirmation emails currently only deliver to
the verified sandbox address `alonsosky617@gmail.com`, because Resend won't
send to arbitrary recipients until a custom domain is verified.

Once `redlinesd.com` is verified in Resend:

- Switch the lead-notification recipient back to `joe.britt1979@gmail.com`
- Confirm customer confirmation emails actually deliver to real submitted
  addresses (the quote form already promises this — see the
  `form_success_with_email` string shown when a visitor supplies an email)

**Where this lives:** the `lead-notification` Supabase Edge Function
(project `hvesaitxkwlufbljnupy`, currently version 4). It is **not** in this
repo — it can't be edited from the working tree and has to be changed via
Supabase.

### 4. About section profile photo — new upload needs a look

**A new photo was uploaded on 2026-08-17 at 22:57 UTC**, during the Tier 2
session, via the dashboard. This is a genuinely new file
(`profile/1787007447803-3ngdooad0ng.jpg`), not a revert of the clear —
`profile_photo_url` had been null and `email` is still null.

**Worth a look before launch:** the new image reads as another mirror-selfie
style shot — a figure holding a phone, reflected in an illuminated mirror.
That was the concern that got the previous photo pulled. Left in place because
photo choice is Joe's call, not ours. Not touched.

The redesigned About block (Tier 2 item 6) is built to hold either way, so
swapping the photo later needs no code change.

The section degrades gracefully in the meantime: the `<img>` stays hidden, the
320px wrapper collapses, and the heading, bio, and credential lines still
render. See `css/styles.css` (`.about-us-photo-wrap:not(:has(...))`) and
`assets/js/business-info.js:68-85`.

### 5. Service area list — unverified

The 20 San Diego County cities and neighborhoods have never been checked
against where Joe actually takes work. Confirm with him and trim if needed.

The same list appears in **three** places and all three must be updated
together:

- `business_info.service_areas` in Supabase (renders into `[data-service-areas-text]`)
- The hardcoded `<li>` pills under "Areas We Serve" — `index.html`
- The `areaServed` block in the `Electrician` JSON-LD — `index.html`

Also flagged in the design audit: the list renders three times within ~600px of
scroll, which is a separate visual problem tracked under Tier 2 item 7.

### 6. Google Business Profile

Suspended-profile issue, being handled in a **different conversation**. Not
part of this codebase — listed here only so it isn't forgotten.

### 7. Visual elevation — Tier 3

Tier 1 and Tier 2 are complete (see Resolved). Tier 3 is on hold pending
review.

Full audit and reasoning: https://claude.ai/code/artifact/0494a80d-9dcd-4328-b76d-aeb18094754a

**Tier 3 — depth pages and closing**

- Photography on the six service page heroes
- **Needs a decision:** EV Chargers, Retrofits, and Service Calls have zero
  matching project photos, so those pages currently end on a bare "No photos in
  this category yet." Design a real empty state, broaden the category mapping,
  or hide the section when empty
- Per-page eyebrows (all six service pages share one string today)
- Footer as a closing brand statement
- Retire the 01–06 numerals on services (a set, not a sequence); keep them on
  How It Works

### 9. Hero eyebrow contrast over photography

Noticed during Tier 1 verification, not yet addressed.

The hero eyebrow (`San Diego · License C-10 #1153394`) is accent red
`#CC2029` at 13px with wide tracking, sitting directly on the cycling hero
photograph. On lighter frames — the bathroom shot currently in rotation has a
pale beige wall right behind it — it drops to a low contrast ratio and is hard
to read.

This predates the Tier 1 overlay retune and wasn't caused by it; the new
two-layer scrim improved the headline and CTA area but the eyebrow sits high
enough in the frame to still catch bright content. Options: raise the scrim in
the eyebrow band, give the eyebrow a lighter colour over photo heroes only, or
constrain which photos are eligible for hero rotation. Worth folding into Tier
2 rather than patching in isolation.

---

## Resolved

### 2026-08-17 — Tier 2 visual elevation (items 5–8)

CSS plus markup only. No schema, RLS, or backend changes. FAQPage JSON-LD
verified untouched — zero changed lines across all 8 HTML files match any
schema key.

**5. Spacing scale.** Replaced the single 88px with three tiers driven by a
`--section-pad` custom property each section sets for itself. Desktop
40/56/76 → 56/88/128 (compact/standard/marquee). Verified: Our Work and
`#contact` at 128px; Services, Why Us, About, Testimonials at 88px; FAQ,
How It Works, Related Services at 56px; hero (120px) and emergency band
(24px) untouched. `work.html`'s badge-only `.trust` strip has no id, so it
correctly stays standard rather than inheriting marquee.

**6. About section.** Asymmetric founder block — photo runs large on the left
(46%, non-shrinking, 5:6), text panel bites 88px into it with a hairline cut
and the section's cream background. Short accent rule above the heading,
echoing `.eyebrow::before`. **No circular mask or red ring** — deliberately
not the redlineelectricoc.com page-builder default. The overlap is gated
behind `:has(.about-us-photo:not([hidden]))` so the empty state falls back to
a centred 760px statement block instead of pulling text off the left edge.
Both states verified at desktop and mobile.

**7. Trust badges + service-area triplication.** `.trust-badges` is now a real
grid (1 / 2 / 3 columns) instead of `space-between`, which had pinned badges
to opposite edges and wrapped the widest onto its own row. The 20-city list
now renders **once**, in the footer (`.footer-areas`), still driven by
`business_info.service_areas` via `[data-service-areas-text]`. Removed the
`.areas-served` pill block from index.html and the Service Area badge from all
8 pages — one hook per page now, down from two.

**8. FAQ accordion.** Two-column layout at ≥900px (heading rail left,
accordion right), questions up from 16px to 18px with 24px rows. Answers
animate to real content height via grid rows instead of the hard-coded
`max-height: 600px`. Verified: open panel 132.8px, all others 0, previous item
auto-closes, `aria-expanded` correct. No JS change — `faq-data.js` still only
toggles `.is-open`.

Two CSS traps hit and fixed while building #8, both worth remembering:
- A bare `0fr` grid track takes an automatic minimum from its item, so the
  closed panel sized to the inner element's 24px padding. Needs
  `minmax(0, 0fr)`.
- Padding on a grid item can't compress below its own size, so the inner
  element still spilled out of the 0px track. The container needs
  `overflow: hidden` too.

Also noted: the harness iframe served a **cached** copy of index.html after the
markup edits, briefly showing stale results. Cache-bust with a query string
when verifying HTML changes.

**Mobile verified (390px, screenshots taken).** All four items confirmed
visually at narrow width, not just by measurement:

- **5** — section tiers resolve to 40/56/76px
- **6** — photo stacks above the text, overlap correctly not applied, no
  reserved empty column in the photo-less state
- **7** — trust badges stack to a single column with no wrap; the Service Area
  badge is gone; the footer's Areas We Serve band renders below a hairline
  with all 20 cities wrapping cleanly
- **8** — FAQ collapses to one column (heading above the accordion), questions
  hold 18px and wrap to two lines with the icon still aligned, open panel
  expands to real content height

Method: same-origin iframe at 390px (a real viewport, so `@media` evaluates
genuinely). Still untested by this method: device pixel ratio, touch input,
and anything user-agent specific — a real handset pass is still worth doing
before launch.

### 2026-08-17 — Item 8: mobile breakpoints verified

Both narrow breakpoints and the mobile nav confirmed at real viewport widths.

DevTools device emulation could not be driven from here — CDP-dispatched key
events go to the page, not to browser chrome, so F12 does nothing, and the
automation extension already holds the tab's debugger attachment. Verified
instead by rendering the site inside **same-origin iframes at 390px and
700px**. An iframe establishes its own viewport, so `@media` queries evaluate
against the iframe width — a genuine breakpoint test rather than a simulation.
Anything DPR-, touch-, or UA-specific is still untested by this method.

| | 390px | 700px |
| --- | --- | --- |
| Work grid | 1 column | 2 columns |
| Services grid | 1 column | 2 columns |
| Hero h1 | 41.18px | 53.29px |
| Section h2 | 28.55px | 33.94px |
| Header height | 107px, uncompressed | 107px, uncompressed |
| Mobile nav | `position: fixed`, hamburger shown | same |
| Sticky call button | shown | shown |

The h1 values sit exactly on the fluid curve (`1.62rem + 3.91vw` gives 41.17px
at 390px), so the scale is now verified at five points across its range. The
header correctly stays uncompressed at both — scroll compression is
desktop-only by design, since `.main-nav` is anchored to `var(--header-h)`.

Mobile nav overlay opened and screenshotted: slides to `translateX(0)`,
`left: 0`, full-height, body scroll locked, `aria-expanded="true"`. The
`@media (min-width: 760px)` block correctly reports `matches: false` at 390px.

*(A first reading showed the nav still at `translateX(390px)` — that was a
mid-transition sample, not a bug. It settles at 0.)*

### 2026-08-17 — Service page heroes stepped down from the home hero

The Tier 1 hero work pushed every `.hero h1` to the top step, which made the
longer service headlines run to three lines at 76px. Home hero should stay the
largest as the primary first impression, so the two are now separate steps.

- New token `--fs-h1-page`: `clamp(2.125rem, 1.49rem + 2.83vw, 3.75rem)` — 34 → 60px
- Base `.hero h1` uses it, with `max-width: 780px` (restored from `15ch`)
- `#home h1` overrides up to `--fs-h1` (40 → 76px) with the tighter `15ch`
  measure that stacks it into two strong lines

Verified: EV Chargers hero now 60px / 780px / **2 lines**, section height 558px
(down from 656px). Home hero unchanged at 76px.

`#home` is the nav's own anchor target, so it's a stable hook. Note the
consequence for the cascade: an id selector outranks `.hero h1` from anywhere
in the file, so the desktop `line-height` override had to be rewritten as
`#home h1` — a generic `.hero h1` rule in the media query would have been
silently dead.

### 2026-08-17 — Tier 1 visual elevation, verified on desktop

All four approved Tier 1 items shipped in `css/styles.css`. No HTML, JS, or
schema changes. Measured at a 1528px viewport unless noted.

| Item | Confirmed |
| --- | --- |
| Type scale | h1 76px, section h2 44px at the ceiling; 40px / 28px at the floor. Card title 21px over card body 15px (was 19/14). 44 hardcoded sizes swept onto tokens. |
| `.trust h2` outlier | 44px — now identical to every other section heading at both ends of the scale |
| Header compression | 143px → **83px** on scroll (padding 32→14px, logo 78→48px) |
| Hero min-height | Hero 611px vs the old 474px; header + hero now overfills the viewport instead of leaking the next section |
| Work grid | Three equal 346.66px columns. Home teaser's 6 photos = exactly 2 rows, no orphan. `work.html`'s 8 = 3+3+2. |
| Captions | `position: static`, no gradient, `#23262F` on cream — the neon and RGB-mirror tiles are legible for the first time |
| About empty state | 503px tall, no reserved photo column, text aligned to the page margin |

Behaviour confirmed intact: hero photo crossfade, 6 teaser tiles, 8 FAQ items,
3 testimonials, and EN↔ES switching (`setLanguage('es')` → "Servicios" /
"La energía en la que puedes confiar.", sets `html[lang]`, persists, reverses).

Mobile layout verification remains open — see item 8.

### 2026-08-17 — Hero wrap collapsed after the grid change (found and fixed)

Making `.hero` a grid container silently broke the hero's horizontal
alignment. `.wrap` carries `margin: 0 auto`, and auto margins suppress grid's
default `stretch`, so the wrap shrink-wrapped to its content (627px instead of
1080px) and centred itself — the copy sat 227px right of the header logo.

Fixed by adding `width: 100%` to `.hero .wrap`. Verified: hero wrap and header
wrap now both report `left: 216px, width: 1080px`.

Recorded because it's a non-obvious trap: any future rule that turns a
container holding `.wrap` into a grid or flex parent will hit the same thing.

### 2026-08-17 — Test project row deleted

Removed the published placeholder project that was rendering as the first tile
in Our Work.

```
id        37a45c85-7b0c-4e3d-bb64-fb61bfe7e39f
title     TEST DELETE ME
category  Test
image_url https://picsum.photos/seed/redlinetest/400/300
```

It was the only row in the `Test` category, and its image was a picsum
placeholder, so no storage file was orphaned. Confirmed afterwards: the `Test`
filter pill no longer appears on `work.html` (the pill list is derived from
categories actually present), and 8 real projects render.

### 2026-08-17 — About photo cleared + empty state handled

Set `business_info.profile_photo_url = null` to take the bathroom mirror selfie
off the public site.

**The storage file was not deleted** — it remains at
`job-photos/profile/1786913358618-9i3cqgkrusq.jpg` if it's ever wanted back.

Added one rule to `css/styles.css` so the empty 320px photo wrapper collapses
instead of leaving a hole beside the text:

```css
.about-us-photo-wrap:not(:has(.about-us-photo:not([hidden]))) {
  display: none;
}
```

Ongoing state tracked under open item 4.

### 2026-08-17 — Personal email hidden from public site

Set `business_info.email = null`. The contact block now shows phone + WhatsApp
only. Follow-up tracked under open item 2.
