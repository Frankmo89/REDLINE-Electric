#!/usr/bin/env python3
"""Bake a <link rel=preload> for each page's mobile hero photo.

WHAT PROBLEM THIS SOLVES
The hero's first slide is the LCP element on every page that has one (the
home page and the six service pages), but its URL has never been visible in
the raw HTML: hero-preload.js fetches the projects row from <head>, and
hero-bg.js -- loaded near the end of <body> -- is what actually decides which
photo is first and sets an <img src> to it. A Lighthouse run against the live
site (2026-09-12, mobile, post image-transform-pipeline) measured that gap
directly:

    Time to first byte         200 ms
    Resource load delay      1,912 ms   <- the image request had not
                                            started yet; nothing else was
                                            waiting on the network at this
                                            point, just script execution
    Resource load duration     819 ms
    Element render delay       304 ms

and separately flagged: "Request is discoverable in initial document: FAIL".
That is not a fixable-in-JS problem -- by definition, the preload scanner
that "discoverable" refers to only ever reads the raw markup, before any
script runs. The only way to pass that check is to put the real URL in the
HTML.

WHY THIS HAS TO BE A SEPARATE STEP RATHER THAN BAKED BY HAND
The URL is data-dependent: it names one specific file in Supabase Storage,
chosen by the same is_featured / category-match / fallback logic hero-bg.js
runs in the browser (see pick() below, which mirrors it exactly). That
choice changes whenever Joe adds, removes, or re-features a photo in the
admin dashboard. There is no CI in this repo -- deploys are a manual
`wrangler deploy` -- so this script has to be run by hand before each
deploy, the same way the styles.css version bump is.

STALENESS, AND WHY IT IS SAFE TO LEAVE UNENFORCED
Unlike the styles.css version rule, this is NOT wired into hooks/pre-commit,
because there is nothing a commit-time hook could check: correctness depends
on live Supabase state, and a hook that made a network call on every commit
would be exactly the kind of slow, flaky check that gets bypassed with
--no-verify. So the failure mode has to be soft, and it is: if this script is
not re-run before a deploy where the first photo changed,
  - the baked <link> preloads a photo that is no longer first -- one wasted
    fetch, not a broken page;
  - and if that photo is still SOMEWHERE in the page's rotation (common,
    since is_featured sets usually hold more than one photo), the bytes are
    not even wasted -- hero-bg.js's other narrow-mode slides request the
    exact same fixed 750x1110 dimensions (see NARROW_FIXED_PX in
    hero-bg.js), so the preloaded bytes get reused whenever the rotation
    reaches that photo instead.

WHY 750x1110, NOT A DPR-AWARE SIZE
A static <link> can only ever name one URL. hero-bg.js used to multiply the
mobile box by the visitor's real devicePixelRatio, which is a different
number on nearly every real device -- a URL baked for one visitor's DPR
would not match almost anyone else's, and an unmatched preload is worse than
no preload (a second, wasted fetch on top of the real one). So hero-bg.js's
mobile sizing was changed alongside this script to a single fixed pixel
target -- 375x555 at a flat 2x -- and this script has to bake that exact
same target, or the two halves of this diverge silently. If NARROW_FIXED_PX
in hero-bg.js ever changes, update PIXEL_W / PIXEL_H below to match.

Desktop is not baked. The hero box there stays devicePixelRatio-aware (no
preload constrains it), and the LCP number this script exists to move --
2026-09-12, 8.4s -- was measured under Lighthouse's mobile emulation, which
is also Google's ranking signal for Core Web Vitals.

USAGE
    python scripts/bake-hero-preload.py            # bake, report, exit 0
    python scripts/bake-hero-preload.py --check     # exit 1 if any page's
                                                       baked <link> disagrees
                                                       with live data, bake
                                                       nothing

Run before every `wrangler deploy`. --check is for confirming nothing has
drifted since the last bake, without touching the files.

Exit status: 0 baked (or --check found no drift), 1 --check found drift or a
page is missing its marker block, 2 could not run (network, parse error).
"""

import re
import sys
import urllib.request
import urllib.error
import json

SUPABASE_URL = 'https://hvesaitxkwlufbljnupy.supabase.co'
# Public anon key -- the same one already shipped in assets/js/hero-preload.js
# and every page's CSP. RLS on the projects table is what actually gates
# access, not secrecy of this key.
SUPABASE_ANON_KEY = (
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6'
    'Imh2ZXNhaXR4a3dsdWZibGpudXB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3Mzky'
    'NzksImV4cCI6MjEwMjMxNTI3OX0.Pcdzxa-eWUrtBRblXRJ156EOG--7KPAHiKFTiHpFMS0'
)

# Must match NARROW_FIXED_PX in assets/js/hero-bg.js.
PIXEL_W, PIXEL_H = 750, 1110
QUALITY = 68

PUBLIC_MARKER = '/storage/v1/object/public/'
RENDER_MARKER = '/storage/v1/render/image/public/'

# path -> category, matching each page's RedlineHeroBG.init({ category }) call.
# None means the home page's no-category call.
PAGES = [
    ('index.html', None),
    ('services/new-construction.html', 'New Construction'),
    ('services/remodels.html', 'Remodels'),
    ('services/retrofits.html', 'Retrofits'),
    ('services/art-lighting.html', 'Art Lighting'),
    ('services/ev-chargers.html', 'EV Chargers'),
    ('services/service-calls.html', 'Service Calls'),
]

BEGIN_MARKER = '<!-- BEGIN baked hero preload (scripts/bake-hero-preload.py) -->'
END_MARKER = '<!-- END baked hero preload -->'
BLOCK_RE = re.compile(
    re.escape(BEGIN_MARKER) + r'.*?' + re.escape(END_MARKER) + r'\n?', re.S)


def normalize(s):
    """Mirrors hero-bg.js's normalize(): trim, lowercase, drop one trailing 's'."""
    s = (s or '').strip().lower()
    return re.sub(r's$', '', s)


def pick(projects, category):
    """Mirrors hero-bg.js's pick() exactly, including the fallback order."""
    if category:
        matched = [p for p in projects if normalize(p.get('category')) == normalize(category)]
        if matched:
            return matched
    featured = [p for p in projects if p.get('is_featured')]
    return featured if featured else projects


def fetch_projects():
    """Same query hero-preload.js issues from the browser."""
    url = (SUPABASE_URL + '/rest/v1/projects'
           '?select=image_url,title,category,is_featured'
           '&is_published=eq.true'
           '&order=created_at.desc')
    req = urllib.request.Request(url, headers={
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
    })
    with urllib.request.urlopen(req, timeout=20) as res:
        return json.loads(res.read().decode('utf-8'))


def transform_url(raw_url):
    if PUBLIC_MARKER not in raw_url:
        return raw_url
    return (raw_url.replace(PUBLIC_MARKER, RENDER_MARKER)
            + '?width=%d&height=%d&resize=cover&quality=%d' % (PIXEL_W, PIXEL_H, QUALITY))


def link_block(url):
    return (
        BEGIN_MARKER + '\n'
        '<link rel="preload" as="image" fetchpriority="high" '
        'media="(max-width: 700px)" href="' + url + '">\n'
        + END_MARKER + '\n'
    )


def apply_to_page(path, url, check_only):
    with open(path, encoding='utf-8', newline='') as fh:
        src = fh.read()

    new_block = link_block(url)
    if BLOCK_RE.search(src):
        existing = BLOCK_RE.search(src).group(0)
        if existing.replace('\r\n', '\n') == new_block.replace('\r\n', '\n'):
            return 'unchanged'
        if check_only:
            return 'stale'
        src = BLOCK_RE.sub(new_block.replace('\n', src_eol(src)), src, count=1)
    else:
        if check_only:
            return 'missing'
        # Insert right after the viewport meta tag, ahead of everything else
        # in <head> -- same placement convention as the preconnect block Fix
        # 2 added, so every "why is this page fast" answer lives in one spot.
        anchor = '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
        idx = src.find(anchor)
        if idx == -1:
            raise ValueError('viewport meta tag not found in %s' % path)
        idx += len(anchor)
        src = src[:idx] + '\n' + new_block.replace('\n', src_eol(src)) + src[idx:]

    if not check_only:
        with open(path, 'w', encoding='utf-8', newline='') as fh:
            fh.write(src)
    return 'baked'


def src_eol(src):
    return '\r\n' if '\r\n' in src else '\n'


def main():
    check_only = '--check' in sys.argv[1:]

    try:
        projects = fetch_projects()
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as exc:
        print('bake-hero-preload: could not reach Supabase: %s' % exc, file=sys.stderr)
        return 2

    if not projects:
        print('bake-hero-preload: projects query returned no published rows', file=sys.stderr)
        return 2

    problems = []
    for path, category in PAGES:
        chosen = pick(projects, category)
        if not chosen:
            problems.append((path, None, 'no photo matched (should be unreachable: '
                                          'pick() always falls back to the full list)'))
            continue
        first = chosen[0]
        url = transform_url(first['image_url'])
        try:
            status = apply_to_page(path, url, check_only)
        except (OSError, ValueError) as exc:
            problems.append((path, None, str(exc)))
            continue
        problems.append((path, first.get('title', '?'), status))

    print('bake-hero-preload: %s against %d published photos'
          % ('checked' if check_only else 'baked', len(projects)))
    print('')
    drift = False
    for path, title, status in problems:
        if status in ('stale', 'missing') or title is None:
            drift = True
        marker = {'baked': 'BAKED', 'unchanged': 'unchanged',
                   'stale': 'STALE', 'missing': 'MISSING'}.get(status, 'ERROR')
        label = ('%-34s %-9s %s' % (path, marker, title)) if title else \
                ('%-34s %-9s %s' % (path, marker, status))
        print('  ' + label)

    if check_only and drift:
        print('')
        print('  Run without --check to re-bake, then redeploy.', file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
