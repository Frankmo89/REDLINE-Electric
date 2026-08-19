# Pending Items

Running list of open work that spans sessions. Anything not finished in a
single sitting belongs here so it doesn't get lost.

**Convention:** when an item is done, move it to the **Resolved** section at the
bottom with the date it closed — don't delete it. Add new open items as they
come up.

Last updated: 2026-08-18

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
2026-08-17 so the contact block shows phone + text only until a proper
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

The redesigned About block (Tier 2 item 6) holds either way — with a photo it
runs the asymmetric overlap layout, without one it collapses the photo column
and becomes a centred statement block. Swapping or removing the photo later
needs no code change.

### 5. Service area list — unverified

The 20 San Diego County cities and neighborhoods have never been checked
against where Joe actually takes work. Confirm with him and trim if needed.

Since Tier 2 the visible list renders in **one** place, so there are now two
things to keep in sync:

- `business_info.service_areas` in Supabase — the single source of truth,
  rendered into the footer's Areas We Serve band via `[data-service-areas-text]`
- The `areaServed` block in the `Electrician` JSON-LD — `index.html`

The markup also carries the full list as a static fallback inside
`.footer-areas-list`, for when Supabase is unreachable. Update that too if the
list changes.


### 6. Google Business Profile

Suspended-profile issue, being handled in a **different conversation**. Not
part of this codebase — listed here only so it isn't forgotten.

### 8. Admin dashboard audit — remaining items (held)

From the 2026-08-17 audit, deferred until batches 1–4 and 5 land. Numbered as in
the audit, so a gap means resolved (7 shipped as batch 6, 8 as batch 7, 9 as
batch 8 — all 2026-08-18):

- **6.** Business Info race guard — *mostly closed already* by batch 4: the form
  is now gated behind its load, so the fetch can no longer overwrite mid-edit.
  What remains is an unsaved-changes guard when switching tabs.
- **10.** Performance: `loading="lazy"` on admin photo `<img>` (the public site
  already does this), Supabase image transforms (full 1920px images render into
  220px cards), per-tab loading instead of four queries on first paint, a
  refresh control, preconnect to jsdelivr and Supabase.
- **11.** Category dropdown instead of free text — `work.html` builds its public
  filter pills from these values, so one typo creates a duplicate pill.
- **12.** Password reset on `admin/login.html`, plus `try/catch` hardening.


---

## Resolved

### 2026-08-18 — Admin dashboard audit, batch 8 (closes audit item 9)

The consistency pass. Everything item 9 listed, plus the mobile ordering nit
batch 7 left behind.

**`window.confirm` is gone — all six call sites.** It is OS chrome: unstyleable,
rendered on a phone as a system sheet that looks nothing like the rest of the
page, and limited to one line, which is why the bulk deletes could never say
what they were about to destroy. The replacement is a promise-returning
`confirmDialog()` in the same visual language as the rest of the admin —
`role="alertdialog"`, `aria-modal`, wired `aria-labelledby`/`describedby`,
Escape and backdrop both cancel, focus trapped between the two buttons and
restored to the trigger on close. **Cancel takes focus, not Confirm**, because
every caller is destructive and a stray Enter should do nothing. A backdrop
*mousedown* cancels but a drag that starts on the panel does not.

Every dialog now names its object and states the consequence:

- `"Bathroom Vanity Lighting" will be removed from the site and its image file
  deleted. This cannot be undone.`
- `The enquiry from <name>, including any notes on it, will be deleted. …`
- `The 2 selected enquiries, including any notes on them, will be deleted. …`

"This cannot be undone." now appears on the **bulk** confirms, which batch 1
deliberately left off pending this batch. Singular and plural both read
correctly (`1 lead` / `2 leads`, `enquiry` / `enquiries`).

**"Feature for Hero" was overclaiming.** Renamed to **`☆ Use in Hero` /
`★ In Hero`**, and the toast now says "Added to the homepage hero rotation."
rather than "Featured on the hero." A hint line under Existing Photos states the
whole truth, which is more layered than item 9 recorded:

- it picks what rotates behind the **homepage** hero;
- **service-page heroes ignore it entirely** when any photo matches that page's
  category — `hero-bg.js` `pick()` returns the category match first and only
  falls back to featured;
- the homepage **gallery** only consults it once 6+ photos are featured
  (`index.html`: `featured.length >= 6 ? featured.slice(0,6) : all.slice(0,6)`),
  showing the 6 newest under that.

**Publish control: already at parity, so the fix was elsewhere.** Checked
against Delete and Feature — same base rule, same border, same 44px box, and
batch 5 had already made the text a verb. What all of these actually lacked was
any response to the pointer: no hover, no press state, which is what leaves a
bordered word reading as a badge. Added hover (behind `hover: hover`, so it does
not stick after a tap on touch) and `:active` press feedback across every card
button, the bulk delete, and the dialog.

**Lead status is now a colour chip.** `new` amber, `contacted` blue, `quoted`
purple, `won` green, `lost` neutral grey. Keyed off the existing `data-current`
attribute, which holds the *saved* status — set on render, updated only after a
successful write, untouched on failure — so the colour always reflects the
database rather than an in-flight selection. `option` elements are repainted
explicitly because the OS draws that list on its own light background and would
otherwise inherit the tinted text.

**Deliberately still a native `<select>`.** A custom listbox would look more
like Notion, but on a phone the native control opens the OS picker, which is far
better with work gloves — and batch 1 standardised on native controls at 16px
for exactly that reason. The chip is the closed state; the picker is the open
one. Say so if a full custom dropdown is wanted.

**Batch 7's mobile nit is fixed by moving Delete, not by CSS.** Delete was the
ninth table column, which put it between a lead's details and its notes on a
phone — and because the notes strip is a second `<tr>`, no amount of `order`
could reorder across the two. Delete now lives in the strip, after the notes:
the card reads details → Notes → Delete on mobile, and on desktop the strip
gained a right-aligned action while the table **dropped to 8 columns**
(`min-width` 980px → 900px). Verified no horizontal scroll was reintroduced:
table 1097px, `scrollWidth === clientWidth`.

**Verification.** Five test leads covering all five statuses. Dialog: opens with
correct role and wiring, focus on Cancel, Tab swaps between the two buttons,
Escape and backdrop cancel without deleting (row count held at 5), a press
starting on the panel does not cancel, focus returns to the trigger; confirming
actually deleted (5 → 4, notes rows stayed in step at 4, toast fired). Photo and
review dialogs name their object. Chip recoloured amber → green on save and the
new-lead badge went 1 → 0 and hid itself. At 390px: card order is Received →
Notes → Delete with a 0px seam, Delete full-width, dialog panel 335px with 45px
buttons, no horizontal overflow. At 1200px: 8 columns, no table scroll, Delete
right-aligned in the strip, dialog buttons 38px and right-aligned. All five test
leads deleted afterwards — `leads` back to 0, `projects` 8, `reviews` 3, no
leftovers anywhere.

**Still open after this batch:** items 6 (unsaved-changes guard when switching
tabs), 10 (performance), 11 (category dropdown), 12 (login hardening).

### 2026-08-18 — Admin dashboard audit, batch 7 (closes audit item 8)

Status was the only thing Joe could record against a lead, so the context that
actually decides the follow-up — what was quoted, when to call back — had
nowhere to live.

**Database.** `alter table public.leads add column notes text` — nullable, no
default, with a column comment. Absent stays distinct from empty.

**RLS: verified, not assumed.** The existing `Authenticated users can update
leads` policy is `USING true / WITH CHECK true` for `authenticated`, and RLS
policies are never column-scoped (`pg_policy` holds no column list), so it
covers `notes` as-is. The grant side was the part actually worth checking: a
*column-level* grant would not extend to a column added later. `authenticated`
holds a **table-level** UPDATE grant, which does. Confirmed a third time by the
end-to-end test, which wrote the column through the browser as the signed-in
user. No new policy, no new grant.

**Notes live in a full-width row under the lead, not a tenth column.** The
desktop table is `min-width: 980px` inside a 1160px content area — about 180px
of headroom — so a notes column wide enough to type a sentence into would have
pushed it straight back into the horizontal scroll batch 1 removed. As a
`colspan="9"` strip the textarea gets **1069px** at a 1200px viewport, and the
table measures 1097px with `scrollWidth === clientWidth`: no scroll
reintroduced.

**No edit-mode toggle.** Unlike the photo and review cards, the textarea is
always live; Save and Cancel reveal themselves only once what is typed differs
from `data-original`. The cards need an explicit Edit because their view mode is
formatted text; a textarea is already its own view. Failure keeps the text on
screen and the buttons live, same contract as batch 6. Clearing the field writes
`NULL` rather than `''`, so "no note" stays one state instead of two that look
identical.

**The badge is a new component — there was no `.admin-tab-badge` to follow.**
Batch 4 produced `.admin-bulk-count`, which is plain text in the bulk bar, not a
pill. The new badge borrows its type scale and the accent pair the tabs already
use, and **inverts on the active tab** (`--accent-ink` ground, `--accent` text),
which it has to: the active tab is itself accent-filled, so an accent badge
would vanish into it. The pill is `aria-hidden`; the count goes into the
button's `aria-label` ("Leads, 3 new") so it is not announced as "Leads 3".
Counts come from the rows already in memory and update on any status change with
no refetch.

**Known nit, not fixed here.** Because the notes strip is a second `<tr>`, the
mobile card renders it *after* the Delete button. The two rows are seamed into
one card (verified: 0px gap), but Delete sits between the lead's details and its
notes. Fixing it would mean either a tenth column or restructuring the row into
non-table markup — both larger than this batch. Worth folding into item 9's
consistency pass.

**Verification.** The leads table was empty, so three test leads were inserted
directly by SQL rather than through the public quote form — the form fires the
`lead-notification` Edge Function, and this did not warrant real email. Two were
`new`, one `contacted`. Badge read 2, `aria-label` "Leads, 2 new". Typing
revealed Save/Cancel; Cancel reverted and re-hid them; Save persisted and
survived a full reload; a save aimed at a non-existent row id left the text and
buttons intact under an error toast; clearing the field stored `NULL`. Status
changes moved the badge 2 → 1 → hidden at zero → back to 1 without a reload, and
the inline "✓ Saved" flag still fires. Checked at 390px (16px field, seamed
card, no horizontal overflow, duplicate `data-label` suppressed) and 1200px
(Save/Cancel 38px, no table scroll). All three test leads deleted afterwards —
`leads` is back to 0 rows, and the empty state clears the badge rather than
leaving a stale count.

### 2026-08-18 — Admin dashboard audit, batch 6 (closes audit item 7, listed under open item 8)

Create and delete were the only operations, so fixing a typo in a photo title
or a miscategorised review meant deleting the row and re-uploading the file.

**Inline editing, in the card.** An `Edit` button on each photo and review card
swaps that card's body for a form pre-filled with the current values; `Save`
writes an `UPDATE` through the existing `runMutation()` helper and `Cancel` puts
the card straight back without writing. The form reuses `.admin-form`, so it
inherits the 16px fields batch 1 established — no separate styling to keep in
sync.

- Photos edit `title`, `description`, `category`. The image is deliberately not
  editable: swapping the stored file is delete + re-upload, a different job.
- Reviews edit `customer_name`, `rating` (a `<select>`, same five options as the
  Add Review form), `review_text`, `location`.
- A failed save keeps the form open with everything still typed in it, and
  re-enables both buttons — the error toast is the only thing that changes.
  Verified by pointing a save at a non-existent row id.
- The row's bulk-select checkbox is replaced by the form while editing, so
  entering and leaving edit mode recounts the bulk bar.

**Judgment call: the publish and feature toggles no longer reload the grid.**
They now re-render only their own card, from the row `runMutation()` already
returns via `.select()`. Without this, tapping Publish on one card would call
`loadProjects()` and silently destroy an edit form open on another card, along
with whatever had been typed into it. This batch created that hazard, so it
fixes it rather than leaving it for item 9.

**Also extracted:** `normalizedRating()`, so the edit form's `<select>`
preselects using the same clamp `starString()` uses — a stored 4.5 shows four
stars and preselects 5, rather than the two disagreeing.

**One CSS trap worth knowing.** `.admin-form button[type="submit"]` is
full-width with `min-height: 48px`, which is right for the page-level Upload and
Add Review forms and wrong for a Save that sits beside Cancel in a card. The
override needs the same selector shape (`.admin-card-edit button[type="submit"]`)
to outrank it — a bare `.admin-save-btn` loses on specificity, which silently
left Save at 44px on desktop while Cancel shrank to 38px.

**Verification.** Layout checked in a 390px and a 1200px viewport: fields render
at 16px, Save/Cancel are 45px tall on mobile and 38px on desktop, no horizontal
overflow, and a card entering edit mode leaves its neighbours untouched. Write
path run end-to-end against the live project with a throwaway row in each table:
photo title/description/category edited and confirmed in the database and on the
card, then published and confirmed to carry the *edited* values into the public
`is_published`-filtered query; review name, rating (3 → 5), text and location
edited and confirmed the same way; Cancel confirmed to discard typed text; the
failure path confirmed to hold the form open. Both test rows and the uploaded
storage object were deleted afterwards — `projects` and `reviews` are back to 8
and 3, all published, no leftovers.

### 2026-08-18 — Admin dashboard audit, batch 5 (closes open item 7)

Photos had no publish state: an upload was on `index.html`, `work.html`, and the
hero rotator the instant it finished, and the only way to retract a bad one was
permanent deletion. Reviews had the column but inserted straight to published,
so a typo in a customer's name went live the same way.

**Database.** `projects.is_published boolean NOT NULL DEFAULT true` — the
`DEFAULT true` backfilled all 8 existing rows in the same statement, so nothing
on the site disappeared when this shipped. `reviews.is_published` already
existed with the same default.

**The default is deliberately inconsistent with the insert path.** The column
default stays `true` because that is what performed the backfill; both insert
paths now write `is_published: false` explicitly, so *new* photos and reviews
start as drafts. Anyone changing one should not "fix" the other to match.

- Public reads filter on `.eq('is_published', true)` — `index.html` (photos and
  reviews), `work.html`, `assets/js/hero-bg.js`, and the six service pages.
- Photo and review cards render a `Draft — not on the site` badge and an amber
  card border when unpublished.
- The control is now a verb, not a status label: `Publish` / `Unpublish`. The
  badge carries the state, so the button can say what tapping it does. This
  replaced the reviews `★ Published / ☆ Unpublished` label, which read as a
  description rather than an action — nominally held item 9, done here because
  leaving two different publish affordances side by side was worse.
- Solid fills stay reserved for state (`.is-featured`); the publish button is an
  action, so it stays outlined. Amber (`#D99A2B`, the same one `.admin-warning`
  uses) rather than the accent red, which is spoken for by Delete.
- Success wording dropped "live on the site now" for "Uploaded as a draft — tap
  Publish on the photo below to put it on the site."

**Judgment call not explicitly in scope.** Featuring a *draft* photo is a no-op
on the public hero, because the hero query filters unpublished rows — the toast
said "Featured on the hero.", which was a lie for drafts. It now says "Featured
— it shows on the hero once you publish it." when the card is a draft. The
button is still enabled: pre-setting the flag before publishing is legitimate,
and the toast is now honest about what will happen.

**Verification.** Rendering checked at 390px and 1200px viewports against real
Supabase rows; three action buttons fit one row inside a 303px card at 390px,
all ≥44px tall, no horizontal overflow. Write path then run end-to-end against
the live project with a throwaway row in each table: upload landed
`is_published: false` with the badge; the public query stayed at 8 photos while
the draft existed and went to 9 only after tapping Publish, then back to 8 after
Unpublish; the review path behaved identically (3 → 4 → 3). Both test rows and
the uploaded storage object were deleted afterwards — `projects` and `reviews`
are back to 8 and 3, all published, no leftovers.

### 2026-08-17 — Admin dashboard audit, batches 1–4

Full audit of `admin/dashboard.html` + `admin/login.html` against how Joe
actually uses it (non-technical, on a phone between jobs). Batches 1–4 built
here; batch 5 approved but isolated (open item 7); 6–12 held (open item 8).

**Batch 1 — mobile layout.** `admin/admin.css` had **zero media queries** across
331 lines — the whole admin was a desktop layout being pinch-zoomed. Rewritten
mobile-first, with the site's existing `min-width: 760px` block for desktop.

- Every input and select is now `--fs-body` (16px). Below 16px mobile Safari
  zooms the viewport on focus, so Joe got a page jump on *every field tap*.
- All interactive targets ≥44px. Checkboxes are 22px but each sits inside a
  ≥44px `<label>`, so the effective target passes — verified programmatically
  across all four tabs (0 inputs under 16px, 0 effective targets under 44px).
- Leads was a 9-column table with `min-width: 760px`: on a phone it scrolled
  sideways and **Status and Delete — the only two columns Joe acts on — sat
  furthest right**. Below 760px the same markup now lays out as stacked cards
  via `data-label` on each cell, and empty optional fields drop out entirely
  instead of printing "Email —".
- Tabs are a 2×2 grid on mobile (all four visible — a scroll strip would hide
  "Reviews" from a non-technical user) and sticky, so switching tabs doesn't
  mean scrolling back to the top.
- The "Dashboard" `<h1>` is visually hidden on mobile; it cost a third of the
  header and said nothing the tab bar didn't. Still in the DOM for the outline.
- `.admin-main` widened 960px → 1200px on desktop so the table fits without a
  horizontal scroll.

**Batch 2 — tappable contact + relative time.** Lead phone numbers were plain
text Joe had to copy by hand, and calling back is the most common action in the
whole dashboard. Each lead now renders **Call** and **Text** buttons
(`tel:+1…` / `sms:+1…`, mirroring `assets/js/business-info.js` — plain `sms:`
with no `?body=`, since the separator differs between iOS and Android).
Timestamps were `toLocaleDateString` month/day/year, so a lead from 20 minutes
ago and one from this morning both read "Aug 17, 2026". Now "25 mins ago" /
"5 hours ago" / "3 days ago", with the exact time in `title`.

**Batch 3 — delete ordering + mutation verification.** Two real data bugs:

- Deletes removed the **storage object first**, then the DB row. A failed row
  delete left a record pointing at a dead URL — a broken `<img>` on the
  homepage, work page, and hero rotator. The row now goes first, so the worst
  case is an orphaned file: costs a little storage, breaks nothing publicly. The
  storage call's own error was also discarded entirely; it's now surfaced.
- PostgREST returns **no error when an UPDATE or DELETE matches zero rows**, so
  a write that RLS filtered out (expired login) was indistinguishable from
  success — the list re-rendered unchanged and nothing was said. Joe tapped
  Delete, nothing happened, no message. Every mutation now runs through
  `runMutation()`, which asks for the affected rows back and treats "none" as a
  failure with a plain-language session hint. Verified by simulating a zero-row
  delete.

**Batch 4 — loading states + consistent feedback.**

- All four tabs rendered blank until Supabase answered, so an empty screen meant
  "loading", "empty", or "broken" indistinguishably. Each list now has a
  labelled spinner, and bulk bars stay hidden until there's something to act on.
- Business Info is gated behind its own load, with the load error placed
  *outside* the form (an error inside a hidden form is invisible). **Side
  effect: this also closes most of held item 6** — the fetch can no longer land
  mid-edit and overwrite what Joe is typing.
- Every `window.alert()` is gone (9 call sites), replaced by non-blocking toasts
  in an `aria-live` region: successes auto-dismiss after 4s, errors stay until
  dismissed. Crucially, **successful deletes and toggles now speak at all** —
  previously only failures did.
- Lead status changes reported nothing on success, and on failure left the
  select showing the new value while the row held the old one. Now: an inline
  "✓ Saved" tick, and a failed save reverts the control.
- Inline form messages scroll into view and retire on a timer instead of sitting
  below the fold indefinitely.

**Judgment calls made that weren't explicitly in scope:**

- Widened `.admin-main` to 1200px. Without it the improved table scrolled
  horizontally on desktop — a regression against what was there before.
- Moved the Leads select-all out of the `<th>` into the bulk bar, matching
  Photos and Reviews. Nominally held item 9, but forced by batch 1: a checkbox
  inside a visually-hidden `<thead>` is unreachable in the card layout.
- Upload and Add Review success messages now say the item is **live on the site
  now**. That is currently true and the honest thing to tell Joe; the wording
  comes out when batch 5 adds drafts. *(It did — see 2026-08-18 below.)*
- Added "This cannot be undone." to the single-lead delete confirm, matching
  photos and reviews. The *bulk* confirms still lack it — left deliberately for
  item 9, which replaces `window.confirm` wholesale.
- **Deliberately not done** despite being near one-line changes, to keep this
  batch clean and reviewable: `loading="lazy"` on admin images, and lead status
  colour chips. Both belong to held items 10 and 9.

**Verification.** No Supabase credentials available, so the real render and
interaction code was exercised against a temporary mocked client (fixture
leads/photos/reviews, 900ms simulated latency) at 390px and 1180px viewports;
the harness was deleted afterwards. Confirmed: mobile card layout, loading
states mid-fetch, Call/Text hrefs, relative times, empty-field hiding, the
"✓ Saved" tick, success and error toasts, zero-row-mutation handling, desktop
table with no horizontal scroll, 16px inputs on login. No console errors.

**Not yet verified against production Supabase:** `runMutation()` depends on
`.select()` returning rows after UPDATE/DELETE, which needs a SELECT policy
covering the affected rows. All four tables have one (checked `pg_policies`), so
it should hold — but one real delete in the live dashboard is worth doing to
confirm before relying on it.

### 2026-08-17 — WhatsApp replaced with SMS sitewide

Joe doesn't use WhatsApp, so every `wa.me` link became a direct `sms:` link to
the same number. Ten links across `index.html` (hero + footer), `work.html`,
`404.html`, and all six `services/*.html` footers now read
`sms:+16197480662` — no `?body=` pre-fill, because the query separator differs
between iOS and Android and omitting it is the only form that opens the
messaging app reliably on both. The `target="_blank" rel="noopener"` pair came
off with the switch (an `sms:` handoff shouldn't spawn a tab).

- Button label is now translated: `cta_text_us` in `assets/js/i18n.js`
  ("Text Us" / "Envíenos un Mensaje" — formal *usted*, matching `cta_call_now`
  and `contact_call_or_text`). The old links hardcoded "WhatsApp" in both
  languages since it was a brand name.
- Hook attribute renamed `data-whatsapp-link` → `data-sms-link`; GA4 event
  renamed `whatsapp_click` → `sms_click` (`assets/js/analytics.js:23-24`).
  **Historical GA4 data under `whatsapp_click` will not merge with the new
  event name** — expected, and fine.
- `assets/js/business-info.js` builds `sms:+1…` instead of `https://wa.me/…`,
  and falls back to `business_info.phone` when the messaging field is blank.
- The Supabase column is still named `business_info.whatsapp` — renaming it
  needs a migration, so the admin form label was changed to "Text / SMS Number"
  instead (`admin/dashboard.html`). Worth a column rename if a migration
  happens for another reason.
- Checked the `lead-notification` Edge Function: **no WhatsApp reference** —
  its confirmation email already says "Call or text us" with a `tel:` button.
  No change needed or made.

### 2026-08-17 — Per-page service eyebrows (closes item 7)

All six service heroes carried the identical `San Diego · License C-10
#1153394` — the same string the home page uses. Each now names its own service
and location, routed through the existing i18n system rather than hardcoded:

| Page | EN | ES |
| --- | --- | --- |
| New Construction | New Construction · San Diego, CA | Construcción Nueva · San Diego, CA |
| Remodels | Remodels · San Diego, CA | Remodelaciones · San Diego, CA |
| Retrofits | Retrofits · San Diego, CA | Modernización Eléctrica · San Diego, CA |
| Art Lighting | Art Lighting · San Diego, CA | Iluminación para Arte · San Diego, CA |
| EV Chargers | EV Chargers · San Diego, CA | Cargadores para Autos Eléctricos · San Diego, CA |
| Service Calls | Service Calls · San Diego, CA | Llamadas de Servicio · San Diego, CA |

Six new keys in `assets/js/i18n.js` (`svc_*_eyebrow`), each page's `<span
class="eyebrow">` repointed from `hero_eyebrow`. **The home page deliberately
keeps `hero_eyebrow`** — the license line is the right trust signal for a first
impression.

Spanish service names are reused verbatim from the existing `service_N_title`
entries so terminology stays consistent with the nav, the services grid and the
quote form's service dropdown.

Verified: all 237 `data-i18n` keys used across the site resolve (no missing
keys); all six new keys return correct EN and ES; home page eyebrow unchanged;
no console errors. Longest Spanish string ("Cargadores para Autos Eléctricos ·
San Diego, CA") holds a single line at 408px on desktop, and Retrofits' Spanish
holds one line at 331px inside a 390px viewport — no wrapping at either size.
Screenshots taken at 1528px (EN and ES) and 390px.

**Verification gotcha worth remembering:** the browser served a stale cached
`assets/js/i18n.js` even after `location.reload()`, so the new keys resolved to
`null` and every eyebrow silently fell back to its English markup. A query-string
cache-bust does *not* fix this — it updates a different cache entry. What worked
was `fetch('/assets/js/i18n.js', {cache: 'reload'})` on the bare URL, then a
reload. Worth doing after any i18n.js change before concluding a translation is
broken.

### 2026-08-17 — Why Choose Us numerals retired

Follow-up to Tier 3 item 13. The four Why Choose Us cards carried `01`–`04`
with the same flaw the service cards had — a set presented as a sequence — and
removing them only from Services had left the home page inconsistent between
its two card grids.

Removed all four numerals and extended the accent rule to cover both grids:
`.services-grid a.card::before, .why-us .card::before`. The `.num` device now
survives in exactly one place, the service pages' How It Works steps, where the
sequence is real.

Verified desktop (1528px) and mobile (390px): `.why-us .num` and
`.services-grid .num` both 0, accent rule resolving to 22×3px in
`rgb(204, 32, 41)` on both grids. How It Works still renders `01`–`04` and
correctly gets **no** accent rule (`content: none`), so the two treatments stay
visually distinct.

### 2026-08-17 — Tier 3 visual elevation (items 9, 10, 12, 13) + hero eyebrow contrast

CSS, markup and one new JS module. No schema, RLS, or backend changes. All
verified with screenshots at desktop (1528px) and mobile (390px), plus a
console-error check on every page type.

**9. Service-page photography.** The inline hero-background block was extracted
from `index.html` into `assets/js/hero-bg.js` so the six service pages don't
each carry a copy, then wired up with each page's own category. A service page
prefers photos from its own category; where that category has none it falls
back to the featured set — the same photos the home hero uses. Hero slides
carry no caption and empty alt text, so no photo is presented as an example of
that specific service.

Verified: Art Lighting draws its own 3 category photos; EV Chargers (zero
matching) falls back to 7 featured. Home page regression-checked — still 7
slides with `.has-hero-bg`, crossfade and Ken Burns intact.

**Fallback confirmed as intended behaviour (2026-08-17).** It means a page like
EV Chargers currently shows a bathroom remodel behind its headline. Decision:
keep it — showing real quality work beats an empty background, and it resolves
itself as Joe uploads category-specific photos. No code change needed when he
does; the category filter picks them up automatically.

**10. Empty galleries hidden.** `showEmpty()` on the service pages now hides
the whole `<section class="work">` instead of rendering a heading followed by
"No photos in this category yet." `renderGrid()` un-hides it when matches
exist, so the section reappears the moment a photo is categorised. Verified:
EV Chargers `workHidden: true`; Remodels visible with 2 matching tiles.

**12. Footer as closing statement.** The 40px logo image was removed from
`.footer-brand` — the sticky header carries the mark on every page, so the
footer was repeating it rather than closing on anything. In its place, an
oversized `REDLINE ELECTRIC` set in Oswald at `clamp(46px, 13.5vw, 158px)` in
`--bg2`, a quiet lift off the `#1C1E25` footer ground. `aria-hidden`, since the
business name is already in the copyright line. Wraps to two lines at 390px.

**13. Service numerals retired.** Removed `01`–`06` from the six service cards
— a set of services is not a sequence. Replaced with the same short accent rule
used by `.eyebrow::before`, which keeps the red accent and the vertical rhythm
the numerals were providing. The `.num` device is still used on the service
pages' How It Works steps, where the sequence is real.

**Hero eyebrow contrast (was open item 9).** Over photography the accent red
dropped to a low contrast ratio — the bathroom frame has a pale beige wall
directly behind that line. `.hero.has-hero-bg .eyebrow` is now cream
(`var(--ink)`); the short rule stays accent red so the brand mark is unchanged.
Applies to service heroes automatically, since they now get `.has-hero-bg` from
the same module. Verified `rgb(245, 245, 240)` on both home and service pages.

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
