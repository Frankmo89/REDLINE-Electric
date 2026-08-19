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


### 8. Accessibility — three contrast decisions that need a human call

From the 2026-08-18 WCAG 2.1 AA pass. Everything mechanical was fixed in that
batch; these three need a decision because the fix changes how the site looks,
and the audit brief said not to guess on those.

**8a. The brand red fails as text on dark — this is the big one.**
`--accent` `#CC2029` on `--bg` `#23262F` is **2.74:1**. AA needs 4.5:1 for body
text and 3.0:1 even for large text, so it fails both. It is used as text in 22
places in `css/styles.css` — section eyebrows, `.card .num`, the hero's
`POWER YOU CAN **TRUST.**`, list markers, and every `:hover` colour change.

Measured options, keeping the brand hue and saturation and raising lightness:

| candidate | on `--bg` | on `--bg2` | on light panel | verdict |
|---|---|---|---|---|
| `#CC2029` (today) | 2.74 | 2.45 | 5.04 | fails on dark |
| `#DF353E` | 3.39 | 3.04 | 4.07 | passes **large text only** |
| `#E97379` | 5.18 | 4.64 | 2.67 | passes on dark, **now fails on light** |

There is no single red that passes 4.5:1 on the dark surfaces and still works on
the light panel, so this cannot be solved by editing one token. The realistic
choices are:

1. **Two tokens** — keep `#CC2029` for fills, logo and light-panel text; add an
   `--accent-text-dark` at `#E97379` used only for accent text sitting on dark.
   Fixes it properly; the small red text turns noticeably salmon.
2. **`#DF353E` everywhere** — closest to the current red, and enough for the
   large hero word, but small accent text still fails.
3. **Stop using red for small text on dark** — keep the palette, switch eyebrows
   and `.card .num` to `--ink-dim` (6.84:1, already used elsewhere) and keep red
   for fills and large display only.

Option 3 changes the palette not at all and is probably the least invasive, but
it changes where red appears, which is a brand-feel call.

*Already fixed without waiting for this:* the quote form's error text, which was
this same red. It now uses `#F1808A` — the red the admin already uses for error
text — at 5.90:1. That one was not worth leaving broken: it is the message a
visitor must read when a submission fails.

**8b. Focus ring is 2.74:1 against the page background.**
`:focus-visible` draws `2px solid var(--accent)`. WCAG 2.1 does not set an
explicit ratio for focus indicators (that is 2.4.11 in WCAG 2.2), but 1.4.11
Non-text Contrast is commonly read as covering focus state, and 2.74:1 is under
3.0 either way. The ring is clearly visible in practice — verified by real
keyboard tabbing — so this is a "meets the spirit, misses a strict reading"
case. Options: switch the ring to `--ink` (13.82:1, but invisible on the light
panel), or use a two-tone ring (dark inner, light outer) that works on any
background. The file already switches to `--ink` for elements sitting on accent
fills, so a per-surface rule has precedent.

**8c. Form field borders are 1.41:1.**
`--line` `#3A3E48` on `--bg` is 1.41:1, and the field fill `--bg2` differs from
the page by only 1.12:1 — so the boundary of every input is essentially
invisible to a low-vision user. 1.4.11 wants 3.0:1 for the boundary of a control
that needs one to be identified. Reaching it needs roughly `#6B7280` (3.13:1),
which visibly lightens every field outline on the site and in the admin. Real
issue, visible change, so it is logged rather than guessed at.

---

## Resolved

### 2026-08-18 — WCAG 2.1 AA audit and remediation, public site + admin

Full pass over `index.html`, `work.html`, `404.html`, the six service pages and
both admin pages. Contrast was computed from the tokens rather than eyeballed;
structure was checked with a script over all nine files; keyboard behaviour was
driven with real input in the browser, not simulated clicks.

**Fixed — landmarks and bypass (2.4.1, 1.3.1).** No page had a `<main>` landmark
and no page had a skip link, so a keyboard user had to tab the whole header and
nav on every page. Added `<main id="main-content">` around the content of all
nine public pages, plus `id` on the admin's existing `<main>`, and a
`.skip-link` as the first focusable element on every page. Safe to wrap because
`body` is not a flex/grid container and nothing uses `body >` selectors —
verified no layout shift and no horizontal scroll afterwards. Confirmed working
with real Shift+Tab input: the link appears top-left on focus and moves focus to
the content.

**Fixed — status messages were silent (4.1.3).** The quote form's error and
success paragraphs had no role, so a failed or successful submission announced
nothing. Error is now `role="alert"` (assertive — a failure should interrupt),
success is `role="status"` (polite). Applied to the seven pages carrying the
form.

**Fixed — filter state was invisible (4.1.2).** `work.html`'s category pills
showed the active filter with a CSS class only. They now carry `aria-pressed`,
verified to keep exactly one pressed as the filter changes. The same problem and
the same fix applied to the admin's four tab buttons.

**Fixed — filtering was silent (4.1.3).** Changing the gallery filter swapped
the contents with no announcement. A visually-hidden `role="status"` line now
reports "2 photos shown, filtered by Remodels."

**Fixed — heading order (1.3.1).** `work.html` and `404.html` jumped h1 → h3,
because their only headings after the h1 were the footer's. Footer headings are
now `h2` across all nine pages. Styling is driven by `.footer-heading`, not the
tag, so this is semantics-only — confirmed the rendered size and family are
unchanged (13px Oswald).

**Fixed — error text contrast (1.4.3).** `.quote-error` was the brand red at
2.74:1; now `#F1808A` at 5.90:1, reusing the admin's existing error colour.

**Checked and already correct** — worth recording so the next pass does not
redo it: every form control has a real label (all wrapping labels); the FAQ
accordion is a real `<button>` with `aria-expanded`, `aria-controls` and a
`role="region"` panel; the language buttons carry `aria-pressed`; the hamburger
toggles `aria-expanded`; the admin toast region is `role="status"`; photo alt
text is the project title, and the hero rotator images correctly use `alt=""`
as decorative; no positive `tabindex` anywhere; no element is focusable while
invisible, at desktop or at 390px; the admin confirm dialog traps and restores
focus (batch 8).

**Not changed, logged instead** — see open item 8: the brand red failing as text
on dark (2.74:1, 22 usages), the focus ring at 2.74:1, and form-field borders at
1.41:1. All three need a visible-design decision.

**Regression check.** FAQ accordion, hero rotator, EN/ES switching, FAQ schema,
quote form and its success copy all verified intact afterwards, with no
horizontal scroll. The skip link is translated (`skip_to_content` added to
`i18n.js` in both languages) and the language was left on EN.

**One self-inflicted bug, caught and fixed in the same pass.** Rewriting the
footer headings changed the opening tags to `h2` but left the closing `</h3>`,
across 26 headings on nine pages. Caught by checking tag pairing rather than
trusting the edit; repaired and re-verified.

### 2026-08-18 — Category field revised: six services plus "Other" (revises item 11)

Batch 9 shipped the category field as a closed dropdown of the six services,
which solved the typo problem but could not express anything outside them. It
now carries an **Other…** option that reveals a required free-text field for a
custom label, in both the upload form and the batch 6 edit form.

- The six services stay clean options, so "Remodels" still cannot become
  "Remodel" by accident — the original problem stays solved.
- Choosing Other reveals a Custom Category field, focuses it, and stores what is
  typed (trimmed) as the category. Choosing Other and leaving it blank is the
  one invalid combination and is blocked in both forms with
  "Type a name for the custom category, or pick one from the list."
- Opening a photo whose stored category is not one of the six — `Lighting` and
  `Commercial` both are — shows **Other pre-selected with that value
  pre-filled**, never forced into one of the six and never silently dropped.
  This replaces batch 9's read-only "(no service page)" option, which preserved
  the value but gave no way to change it.
- Switching away from Other hides the field but keeps what was typed, so
  flipping to a service and back does not lose it.

**One CSS trap worth recording.** `.admin-form label` is `display: flex`, which
beats the `[hidden]` attribute's default `display: none` — so the custom field
stayed on screen while marked hidden. Fixed with an explicit
`.admin-form label[hidden] { display: none; }`.

**Migration.** `Remodel` → `Remodels` was already applied earlier the same day
and needed no repeat; verified there are no `Remodel` rows left. `Lighting` and
`Commercial` are untouched and now reachable through Other for manual
recategorisation.

**Verification.** Upload with a service category stored `Retrofits`; upload with
Other + custom stored `ZZ Trace Category`, trimmed — both confirmed by querying
the server directly, not just by reading the rendered card. Edit form: opened
both real off-list photos and confirmed Other pre-selected with the value
pre-filled, then cancelled, leaving them unchanged; switched a custom category
to a service and back to Other with a new label, both saved correctly; blank
Other blocked. `work.html` pills built from the stored values with no
duplicates, and filtering by the custom pill returned exactly its one photo.
Checked at 390px: both custom fields 16px and 50px tall, no horizontal overflow.
Test photos and their storage objects deleted — `projects` back to 8, 10 files,
category counts unchanged.

**A "vanishing upload" during testing was two sessions colliding, not a bug.**
Two test photos uploaded fine, survived an edit, and were then gone from the
database with no storage object — because test uploads were being deleted from
the dashboard by hand from another session at the same time. The dashboard's delete removes the row
first and the file second, which is exactly the state that was found, and it
explains why an earlier UPDATE returned a row while a later publish reported
"Nothing changed": the row was deleted in between. No fault in the upload path,
and nothing to watch for.

Worth remembering only as a testing note: **two people working the same admin
data at once will produce results that look like data loss.** Use distinctive
test titles and say when a test run is in progress.

### 2026-08-18 — Password reset verified in production (closes items 7 and 12)

Verified manually, end to end, against the real deployment: reset requested from
the live login page, link opened from Gmail, it landed on the live page, a new
password was set, logout, the old password was correctly rejected and the new
one accepted. The flow is fully functional.

**Open item 7 was my error, and is retracted.** I reported that the reset link
"arrives malformed" because the `=` after `token` was wrong in the two emails I
inspected — missing in one, a comma in the other — and because requesting the
URL exactly as I had read it returned 400. Both parts were true of *what I read
back*, and neither was true of the email itself. **The corruption was in the
retrieval path** — reading the message through the Gmail API — not in the
Supabase template and not in what was delivered. The real link, clicked from a
real mail client, works.

The clue was in the evidence at the time and I under-weighted it: a static
template typo produces the *same* wrong character every send, and I saw two
different ones. That should have pointed at the reading rather than the sending
before I wrote it up as a probable template defect. **No change is needed in
Supabase → Email Templates.**

**The `ERR_CONNECTION_REFUSED` was also mine, not a defect.** The two test
emails I generated carried `redirect_to=http://127.0.0.1:8788/admin/login.html`,
because that was the origin they were requested from. Once the local test server
was stopped, clicking those particular links had nothing to connect to. Reset
links point at whatever origin requested them; links generated from the live
site point at the live site.

**Lessons worth keeping:**

- Do not trust a URL read back through an email API for character-exact
  testing. Confirm the click in a real mail client before concluding the link
  is broken.
- Reset emails are origin-bound. A link generated from a local test server is
  only ever openable against that server.
- The built-in SMTP allows **2 reset emails per hour**. Hitting that limit looks
  like a failure and is not one.

**Item 12 stands as shipped in batch 9**, including the `<head>` recovery
detection added afterwards — that race was real and measured (supabase-js clears
the recovery parameters out of the URL during initialisation, before a page
script can read them), and the production run exercised the fixed code.

### 2026-08-18 — Admin dashboard audit, batch 9 (closes items 6, 10, 11, 12)

The last of the 2026-08-17 audit. Every item from it is now shipped.

**Item 6 — unsaved-changes guard.** Three things count as unsaved: a photo or
review card in its edit form, a lead note typed but not saved, and the Business
Info form differing from the row it loaded (tracked with a snapshot taken on
load and reset on save). Switching tabs with any of them pending opens the
batch-8 `confirmDialog`; Cancel stays put with everything intact, Discard closes
the editors without writing and then switches.

*One correction to the premise.* Switching tabs only toggles `hidden`, so an
open edit was **not** being lost — the DOM and everything typed into it
survived. What destroys it is a re-render, which until now only happened on
save. The guard's real value is on the Refresh control added in this same batch,
which re-renders on demand; on tab switch it turns a half-typed form silently
lingering on a hidden tab into an explicit choice.

**Item 10 — performance.**

- `loading="lazy"` on admin thumbnails.
- Supabase image transforms at `width=440` (cards render ~300px; 440 covers a
  1.5x display). Measured across all 8 photos: **12.97 MB → 237 KB, a 98.2%
  reduction.** Transforms are a paid feature and are enabled here, verified
  before building on them — but if that ever lapses the render endpoint starts
  erroring, so each `<img>` falls back to the original file on error rather than
  leaving a grid of broken images.
- **Per-tab loading — the audit was right, batch 4 had not done this.** First
  paint fired all four queries; three were for tabs not on screen. Verified by
  network log, not assumption. Now only the active tab loads and the rest load
  on first open — confirmed afterwards that `reviews` and `business_info` are
  never requested until their tab is opened.
- The badge would have gone blank under that change, since it needs the lead
  count before the Leads tab is ever opened. It now issues a count-only query.
  **Deliberately a GET capped at one row rather than the tidier `head: true`:**
  the HEAD form returned **503 on every first paint**, reproducibly, while the
  same query over GET returned 206 and the same HEAD returned 200 once the page
  had warmed up. A retry stays as a safety net, but the badge no longer depends
  on it.
- Refresh control per tab, since nothing short of a full reload showed a lead
  that arrived while the tab was open. It runs the unsaved guard first, because
  re-rendering is exactly what would discard an open editor.
- `preconnect` for jsdelivr and the Supabase origin on both admin pages.

**Item 11 — category is a dropdown.**

*No shared source of truth existed*, so one was created:
`assets/js/service-categories.js`. It is deliberately **not** derived from
`i18n.js`, even though the same six names live there as
`service_1_title..service_6_title` — those are translated, `i18n.t()` returns
"Remodelaciones" in Spanish, and a stored category must not change with the
viewer's language. `i18n.js` says the same thing at the top of its own file.

**The stored data does not match the six services, which matters here.** Of 8
photos: `Art Lighting` (3) and `New Construction` (1) are canonical, but
`Remodel` (2), `Lighting` (1) and `Commercial` (1) are not — and `work.html`
builds its public filter pills straight from those values, so all five are pills
on the live site today. A strict dropdown would have silently reassigned four
photos the first time anyone opened their edit form. Instead the select keeps
an off-list value as a selected option labelled "(no service page)", so editing
never changes a category by accident and the odd ones out are visible.

**Not migrated, deliberately — this needs a decision.** `Remodel` → `Remodels`
looks like a plain typo worth fixing, but `Lighting` and `Commercial` are not
services at all and mapping them is a content call. Renaming any of them
changes the pills on the live site.

**Item 12 — login hardening + password reset.**

- Every path through the login form is now wrapped, with the button re-enabled
  in a `finally`. The bug was specific: a *thrown* error (network down, CDN
  blocked) never produced a returned `{error}`, so the old code skipped its
  error branch entirely and left the button disabled with no message and no way
  out but a page reload. Both shapes verified — returned error and thrown.
- "Forgot password?" sends a reset through Supabase Auth. The success message
  does not reveal whether the address has an account, matching what Supabase
  itself does, so the form cannot be used to probe for accounts.
- The reset link had to be handled somewhere, so `login.html` handles it: it
  detects `type=recovery`, shows a set-a-new-password form, and **suppresses the
  usual redirect to the dashboard** — a recovery link signs the user in, so
  without that guard it would bounce straight past the password change it was
  sent for. Verified.

**Config still needed when the domain goes live:** the reset `redirectTo` uses
the current origin, so `https://redlinesd.com/admin/login.html` has to be added
to the Supabase Auth redirect allowlist. Until then reset links only work from
whatever origin the admin is served on.

**Verification.** Guard: all three unsaved sources detected, Cancel keeps tab
and content, Discard reverts (business phone confirmed restored to its stored
value), and a clean form does not prompt. Perf: network log shows 2 requests on
first paint instead of 4, `reviews`/`business_info` absent until opened, all 8
thumbnails served from the render endpoint at exactly 440px natural width, and
Refresh surfaced a lead inserted while the tab was open (1 → 2 rows, badge
1 → 2). Categories: uploaded a test photo with `EV Chargers` from the dropdown,
edited it to `Service Calls`, confirmed in the database; `Remodel` confirmed
preserved and flagged. Login: both failure shapes re-enable the button, reset
request exercised against an undeliverable `.invalid` address so no real email
was sent, recovery mode confirmed not to bounce past the password change.

**One real bug caught in testing.** The Refresh button rendered at **38px on a
phone**, under batch 1's 44px floor: its mobile override sat in the
`max-width: 759px` block, which appears *earlier* in `admin.css` than the base
rule, so at equal specificity the base won. Rewritten mobile-first like the rest
of the file, with the desktop block stepping it down. Re-verified at both
widths — 44px at 390px, 38px at 1200px.

Test data cleaned up: `projects` 8, `reviews` 3, `leads` 0, no leftover rows and
no orphaned storage object.

**Follow-ups completed 2026-08-18, after review:**

*Category migration.* `Remodel` → `Remodels` on the two photos holding it, at
request. `Lighting` and `Commercial` were left alone deliberately — they are
to be recategorised by hand after someone has looked at the actual photos. Worth
recording that this changed **less than expected**: `hero-bg.js` `normalize()`
lowercases and strips a trailing `s`, so `Remodel` already matched the Remodels
service page hero. The only thing that moved was `work.html`'s filter pill,
which compares exactly — verified the "Remodel" pill is gone, "Remodels" is
there, and filtering by it returns the right two photos.

*Recovery-mode detection was losing a race.* Testing the real reset link
exposed it: the link verified and redirected to `login.html` correctly, and the
page then bounced straight to the dashboard anyway — past the password change.
The cause was that supabase-js **consumes the recovery parameters and clears
the URL during initialisation**, so the page script reading `location.hash`
afterwards saw nothing. Detection moved into a tiny `<head>` script that runs
before supabase-js is fetched, and the redirect now waits for the
`PASSWORD_RECOVERY` event when the URL carries a PKCE `code` instead. Verified
against a reconstruction of the exact redirect shape: page stays on
`login.html`, the head script reports `isRecovery: true`, and supabase-js is
confirmed to have already cleared the hash by the time the page script runs —
which is precisely why the original check failed. Recovery form checked at
390px: 16px field, 50px tall, no overflow.

*Two test artifacts worth remembering:* an earlier run of this same test
appeared to fail because the browser served a **cached** `login.html` without
the new head script — the fix was already correct, the cache was not, so
force-refresh before re-testing auth redirects. And the "malformed reset link"
reported alongside this turned out to be a fault in how the email was read
back, not in the email; see the 2026-08-18 entry above.

**The 2026-08-17 audit is now fully closed.** Held item 8 is retired with it.

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
