import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// Returns the aggregate Google rating for Redline Electric, for the reviews
// section header on the home page: the score, the star row, the review count,
// the "as of" date, and the link out to the Business Profile.
//
// WHY THIS IS A FUNCTION AND NOT A DIRECT BROWSER FETCH: the Places key is a
// server-side credential. A key embedded in index.html is readable by anyone
// and usable against our quota from any origin. Google's usual mitigation for
// browser keys -- HTTP referrer restrictions -- does not apply to the Places
// API (New) endpoint used here, so the key has to stay off the client
// entirely. This function is the only thing that ever sees it.
//
// Requires a GOOGLE_PLACES_API_KEY secret on this function:
//   supabase secrets set GOOGLE_PLACES_API_KEY=... --project-ref hvesaitxkwlufbljnupy
// Until that secret is set this responds with a clear 500, and the reviews
// section renders without the aggregate block. The individual testimonial
// cards come from the "reviews" table on a separate query and are unaffected,
// so nothing on the page breaks while this endpoint is down or unconfigured.
//
// COST AND CACHING: `rating` and `userRatingCount` are Places API (New) "Pro"
// SKU fields, billed per request, so every avoided call is money.
//
// This originally cached in a module-level variable. That was measured and it
// does not work: 8 consecutive requests produced 8 misses, because Supabase
// hands each request a fresh isolate and module state never survives. The
// cache therefore lives in the public.places_cache table, which is shared
// across isolates and durable across deploys. Two layers now:
//   1. places_cache, 24h TTL, one row keyed by Place ID.
//   2. A 24h Cache-Control on the response, so a returning visitor's browser
//      does not re-ask at all.
// A stale row is also kept as a fallback: if Google errors we serve the last
// good numbers rather than collapsing the section, and payload.asOf still
// tells the truth about how old they are.
//
// Not handled, deliberately: several simultaneous requests arriving on a cold
// cache can each call Google before the first write lands. Worst case is a
// few duplicate calls after a 24h expiry, which is cheaper than the locking
// that would prevent it.

const GOOGLE_PLACES_API_KEY = Deno.env.get("GOOGLE_PLACES_API_KEY");

// Injected into every Edge Function by the platform. The service role key
// bypasses RLS, which is what lets this read and write places_cache -- that
// table has RLS on and no policies, so nothing else can touch it.
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

// Redline Electric San Diego's Google Business Profile.
//
// Recovered from the Business Profile Manager review link
// https://g.page/r/CdsUpCnG24fyEBE/review -- which 302s to a
// search.google.com/local/writereview URL carrying the place id. Verified
// before use: displayName "Redline Electric San Diego", nationalPhoneNumber
// (619) 748-0662, websiteUri redlinesd.com.
//
// DO NOT try to re-derive this id by searching Places. This is a service-area
// business -- it publishes no formattedAddress, and text, address, and phone
// queries all fail to surface it. Meanwhile the Places index holds at least
// seven unrelated "Redline Electric" businesses, and the closest name match
// (Huntington Beach, 5.0/132 reviews, (714) 855-9575) is a different company.
// If this id ever needs replacing, get it from Business Profile Manager again.
const PLACE_ID = "ChIJh7U97KNN2YAR2xSkKcbbh_I";

// Only the two fields the header actually renders. The field mask is what
// determines the billing SKU, so widening it costs money -- add a field only
// when the UI genuinely needs it. googleMapsUri used to be requested here for
// profileUrl; see below for why it no longer is.
const FIELD_MASK = "rating,userRatingCount";

const CACHE_TABLE = "places_cache";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const BROWSER_CACHE_SECONDS = 86400;

// Where "Read all on Google" goes. Derived from PLACE_ID rather than taken
// from the Places response: googleMapsUri returns a map-pin URL that opens the
// profile card, leaving the reviews another click away, and it arrives carrying
// Google's internal g_mp tracking parameter. This lands straight on the review
// list. Being derived also means it cannot go missing, so the old
// FALLBACK_PROFILE_URL it used to need is gone.
const PROFILE_URL =
  `https://search.google.com/local/reviews?placeid=${encodeURIComponent(PLACE_ID)}`;

interface Aggregate {
  rating: number | null;
  total: number;
  asOf: string;
  profileUrl: string;
}

interface CacheEntry {
  payload: Aggregate;
  fetchedAt: number;
}

// Production origins plus any localhost port, so `wrangler dev` and a plain
// static server both work without editing this list.
const ALLOWED_ORIGINS = new Set([
  "https://redlinesd.com",
  "https://www.redlinesd.com",
]);

function isAllowedOrigin(origin: string): boolean {
  if (ALLOWED_ORIGINS.has(origin)) return true;
  return /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
}

function corsHeaders(origin: string | null): Record<string, string> {
  if (!origin || !isAllowedOrigin(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Vary": "Origin",
  };
}

function isoDate(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

// Places returns e.g. 4.8333333. The header shows one decimal, and rounding
// here keeps the client from having to know that.
function roundToOneDecimal(n: number): number {
  return Math.round(n * 10) / 10;
}

function cacheConfigured(): boolean {
  return Boolean(SUPABASE_URL && SERVICE_ROLE_KEY);
}

function restHeaders(): Record<string, string> {
  return {
    apikey: SERVICE_ROLE_KEY!,
    Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
    "Content-Type": "application/json",
  };
}

// PostgREST rather than supabase-js: this is two trivial HTTP calls, and it
// keeps the function dependency-free like lead-notification.
async function readCache(): Promise<CacheEntry | null> {
  if (!cacheConfigured()) return null;

  const url =
    `${SUPABASE_URL}/rest/v1/${CACHE_TABLE}` +
    `?place_id=eq.${encodeURIComponent(PLACE_ID)}` +
    `&select=payload,fetched_at&limit=1`;

  const res = await fetch(url, { headers: restHeaders() });
  if (!res.ok) {
    throw new Error(`places_cache read failed: HTTP ${res.status}`);
  }

  const rows = await res.json();
  if (!Array.isArray(rows) || rows.length === 0) return null;

  const fetchedAt = Date.parse(rows[0].fetched_at);
  if (!rows[0].payload || Number.isNaN(fetchedAt)) return null;

  return { payload: rows[0].payload as Aggregate, fetchedAt };
}

async function writeCache(payload: Aggregate): Promise<void> {
  if (!cacheConfigured()) return;

  const res = await fetch(`${SUPABASE_URL}/rest/v1/${CACHE_TABLE}`, {
    method: "POST",
    headers: {
      ...restHeaders(),
      // Upsert on the place_id primary key.
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify({
      place_id: PLACE_ID,
      payload,
      fetched_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    throw new Error(`places_cache write failed: HTTP ${res.status}`);
  }
}

async function fetchAggregate(): Promise<Aggregate> {
  const res = await fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(PLACE_ID)}`,
    {
      headers: {
        "X-Goog-Api-Key": GOOGLE_PLACES_API_KEY!,
        "X-Goog-FieldMask": FIELD_MASK,
      },
    },
  );

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // Google puts the useful part in error.message -- an invalid key, a key
    // not restricted to Places API (New), or billing not enabled all land
    // here with distinguishable text.
    const detail = data?.error?.message ?? `HTTP ${res.status}`;
    throw new Error(`Places API error: ${detail}`);
  }

  const rawRating = typeof data.rating === "number" ? data.rating : null;
  const total = typeof data.userRatingCount === "number" ? data.userRatingCount : 0;

  // A profile with no reviews yet reports no rating. Surfacing total: 0 lets
  // the client hide the whole aggregate block, per the spec's "total 0 is
  // treated as absent" rule, instead of rendering a meaningless zero.
  const rating = rawRating !== null && total > 0 ? roundToOneDecimal(rawRating) : null;

  return {
    rating,
    total,
    asOf: isoDate(Date.now()),
    profileUrl: PROFILE_URL,
  };
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  const cors = corsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }

  // supabase-js `functions.invoke` sends POST by default; a hand-rolled fetch
  // would use GET. Both are reads here, so accept either rather than forcing
  // callers into one shape.
  if (req.method !== "GET" && req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: cors });
  }

  const json = (body: unknown, status: number, extra: Record<string, string> = {}) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json", ...cors, ...extra },
    });

  if (!GOOGLE_PLACES_API_KEY) {
    console.error("google-reviews: GOOGLE_PLACES_API_KEY secret is not set");
    return json(
      { error: "Google reviews are not configured (missing GOOGLE_PLACES_API_KEY secret)" },
      500,
    );
  }

  if (!cacheConfigured()) {
    console.error("google-reviews: SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing, cache disabled");
  }

  // Read first, and keep the result even when it is expired: it doubles as the
  // fallback if the Google call below fails.
  let cached: CacheEntry | null = null;
  try {
    cached = await readCache();
  } catch (err) {
    console.error("google-reviews: cache read failed, continuing without it", err);
  }

  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return json(cached.payload, 200, {
      "Cache-Control": `public, max-age=${BROWSER_CACHE_SECONDS}`,
      "X-Cache": "HIT",
    });
  }

  try {
    const payload = await fetchAggregate();

    // A failed write costs a duplicate Google call next request. It must not
    // cost the caller the response it already paid for.
    try {
      await writeCache(payload);
    } catch (err) {
      console.error("google-reviews: cache write failed", err);
    }

    return json(payload, 200, {
      "Cache-Control": `public, max-age=${BROWSER_CACHE_SECONDS}`,
      "X-Cache": "MISS",
    });
  } catch (err) {
    console.error("google-reviews: failed to fetch from Places API", err);

    if (cached) {
      return json(cached.payload, 200, {
        "Cache-Control": "public, max-age=300",
        "X-Cache": "STALE",
      });
    }

    return json({ error: "Failed to fetch Google rating" }, 502);
  }
});
