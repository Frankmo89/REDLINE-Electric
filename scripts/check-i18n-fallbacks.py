#!/usr/bin/env python3
"""Verify every data-i18n fallback matches its English value in i18n.js.

WHAT THE INVARIANT IS
Each translated element carries inline English in the markup:

    <p data-i18n="privacy_s13_p">Questions about this policy...</p>

i18n.js then overwrites it via textContent on load. So the page holds the same
sentence twice, and nothing keeps the two in step. Edit the copy in one place
and the other silently goes stale.

WHY THAT MATTERS EVEN THOUGH THE SCRIPT WINS
In a normal browser the inline text is replaced almost immediately, so a
mismatch is invisible to whoever made it -- the same "looks fine to you" trap
the styles.css version rule exists for. It becomes visible when:

  - a crawler reads the pre-JS HTML, and indexes text the site no longer shows;
  - i18n.js fails to load or is blocked, and the stale copy is what renders;
  - someone views source or archives the page.

That last one is why this started as a legal-page problem. privacy.html and
terms.html make commitments, and a page whose source states one thing while its
rendered form states another is a genuinely bad position to defend. But the
invariant is site-wide, so this checks all of it.

WHAT IT DELIBERATELY DOES NOT DO
It compares EXACTLY -- no trimming. A leading space is real: opens_new_tab is
' (opens in a new tab)' precisely so a screen reader does not run it into the
preceding link text, and a check that trimmed would happily let that regress.

Anything it cannot read unambiguously is SKIPPED and counted, never guessed at.
The count is printed so the coverage loss is visible rather than silent. This
matters more than catching every last case: a false positive here blocks a
commit, and a hook that cries wolf gets bypassed with --no-verify, which would
take the styles.css check down with it. Being trusted is worth more than being
exhaustive.

USAGE
    python scripts/check-i18n-fallbacks.py              # staged content
    python scripts/check-i18n-fallbacks.py --worktree   # files on disk

Staged is the default so what is verified is exactly what would land in the
commit -- the same principle hooks/pre-commit states for its own two checks.
Use --worktree while editing, before staging.

Exit status: 0 clean, 1 mismatch found, 2 could not run.
"""

import html as html_mod
import os
import re
import subprocess
import sys

I18N_PATH = 'assets/js/i18n.js'


def read_staged(path):
    """File as it sits in the index, or None if not tracked/staged."""
    try:
        out = subprocess.run(['git', 'show', ':' + path],
                             capture_output=True, check=True)
        return out.stdout.decode('utf-8')
    except (subprocess.CalledProcessError, UnicodeDecodeError):
        return None


def read_worktree(path):
    if not os.path.exists(path):
        return None
    with open(path, encoding='utf-8') as fh:
        return fh.read()


def list_html(read):
    """Tracked HTML files, in a stable order."""
    out = subprocess.run(['git', 'ls-files', '*.html'],
                         capture_output=True, check=True)
    files = [p for p in out.stdout.decode('utf-8').splitlines() if p.strip()]
    return [(p, read(p)) for p in sorted(files)]


def read_js_string(src, i):
    """Parse the JS string literal starting at src[i]. Returns (value, end).

    Hand-rolled because the values carry apostrophes, em dashes and the odd
    <span>, and both quote styles are in use. Handles backslash escapes so an
    escaped quote does not terminate the literal early.
    """
    quote = src[i]
    assert quote in '"\'', quote
    buf = []
    i += 1
    while i < len(src):
        c = src[i]
        if c == '\\':
            nxt = src[i + 1]
            buf.append({'n': '\n', 't': '\t', 'r': '\r'}.get(nxt, nxt))
            i += 2
            continue
        if c == quote:
            return ''.join(buf), i + 1
        buf.append(c)
        i += 1
    raise ValueError('unterminated string literal at offset %d' % i)


def parse_en_values(js):
    """{key: english string} for every entry in the TRANSLATIONS object."""
    try:
        body = js.split('var TRANSLATIONS = {', 1)[1]
    except IndexError:
        raise ValueError('could not find "var TRANSLATIONS = {" in ' + I18N_PATH)

    values = {}
    for m in re.finditer(r'^\s{4}([A-Za-z0-9_]+):\s*\{', body, re.M):
        key = m.group(1)
        # Scan forward for this entry's `en:` literal. Bounded by the next
        # top-level key so a malformed entry cannot swallow its neighbour.
        nxt = re.search(r'^\s{4}[A-Za-z0-9_]+:\s*\{', body[m.end():], re.M)
        blob = body[m.end():m.end() + (nxt.start() if nxt else len(body))]
        em = re.search(r'\ben:\s*[\'"]', blob)
        if not em:
            continue
        try:
            values[key], _ = read_js_string(blob, em.end() - 1)
        except (ValueError, IndexError):
            continue
    return values


# One element, one line, one plain-text body. Anything else is skipped below.
ELEMENT_RE = re.compile(
    r'<(\w+)[^>]*\sdata-i18n(-html)?="([A-Za-z0-9_]+)"[^>]*>(.*?)</\1>', re.S)


def check_file(path, src, en):
    """Returns (mismatches, skipped, checked)."""
    src = re.sub(r'<!--.*?-->', '', src, flags=re.S)
    mismatches, skipped, checked = [], 0, 0

    for m in ELEMENT_RE.finditer(src):
        is_html, key, inline = m.group(2), m.group(3), m.group(4)

        # Wrapped across lines: the whitespace is the author's formatting, not
        # content, and guessing which is which is how false positives start.
        if '\n' in inline:
            skipped += 1
            continue

        expect = en.get(key)
        if expect is None:
            mismatches.append((key, inline, '<no en value in %s>' % I18N_PATH))
            continue

        # data-i18n sets textContent, so entities resolve to characters.
        # data-i18n-html sets innerHTML, so the markup is compared as written.
        actual = inline if is_html else html_mod.unescape(inline)
        checked += 1
        if actual != expect:
            mismatches.append((key, actual, expect))

    return mismatches, skipped, checked


def main():
    worktree = '--worktree' in sys.argv[1:]
    read = read_worktree if worktree else read_staged

    js = read(I18N_PATH)
    if js is None:
        # Nothing to check against. Not an error: a commit touching only HTML
        # still has i18n.js in the index, so this means the repo layout moved.
        print('check-i18n-fallbacks: %s not found (%s); skipping.'
              % (I18N_PATH, 'worktree' if worktree else 'index'))
        return 0

    try:
        en = parse_en_values(js)
    except ValueError as exc:
        print('check-i18n-fallbacks: %s' % exc, file=sys.stderr)
        return 2

    total_bad = total_skipped = total_checked = 0
    failures = []

    for path, src in list_html(read):
        if src is None:
            continue
        bad, skipped, checked = check_file(path, src, en)
        total_skipped += skipped
        total_checked += checked
        if bad:
            total_bad += len(bad)
            failures.append((path, bad))

    if failures:
        where = 'working tree' if worktree else 'staged changes'
        print('', file=sys.stderr)
        print('check-i18n-fallbacks: inline English does not match %s (%s).'
              % (I18N_PATH, where), file=sys.stderr)
        print('', file=sys.stderr)
        for path, bad in failures:
            for key, actual, expect in bad:
                print('  %s  [%s]' % (path, key), file=sys.stderr)
                print('    markup: %s' % actual, file=sys.stderr)
                print('    i18n:   %s' % expect, file=sys.stderr)
                print('', file=sys.stderr)
        print('  The inline text is the fallback: it is what crawlers index and'
              ' what', file=sys.stderr)
        print('  renders if i18n.js does not load. Update whichever side is'
              ' stale so the', file=sys.stderr)
        print('  two read identically, then stage it again.', file=sys.stderr)
        print('', file=sys.stderr)
        print('  Genuinely need to skip this? git commit --no-verify',
              file=sys.stderr)
        print('', file=sys.stderr)
        return 1

    note = ' (%d skipped: multi-line)' % total_skipped if total_skipped else ''
    print('check-i18n-fallbacks: %d fallbacks match%s.' % (total_checked, note))
    return 0


if __name__ == '__main__':
    sys.exit(main())
