import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// Server-side gate in front of the quote form's leads insert.
//
// Two layers, cheapest first:
//   1. Honeypot -- an off-screen form field (see .form-honeypot-field in
//      styles.css) real visitors never see or reach. Anything non-empty here
//      fails SILENTLY: this returns the same {success:true} shape a real
//      submission gets, and writes nothing. A visible rejection would tell
//      whatever filled the field in that it was caught, which is exactly the
//      signal it would need to adapt.
//   2. Cloudflare Turnstile, verified here against Cloudflare's siteverify
//      API -- not just checked for presence. A client that never solved the
//      challenge (or replays an old token) gets a generic error. This is the
//      check that actually stops something posting straight to this
//      endpoint with a scraped anon key, which client-side-only verification
//      never could.
//
// Both checks run BEFORE the leads insert. Nothing here creates a lead for a
// request that fails either one.
//
// This is now the ONLY path into leads for the public web form. The former
// "Public can submit leads" anon INSERT policy is dropped (see the
// drop_public_leads_insert_policy migration) specifically so a bot cannot
// route around this by posting straight to PostgREST with the public anon
// key, which was always sitting in the page's own source. Inserts here use
// the service role key instead -- same reasoning as create_chat_lead()'s
// SECURITY DEFINER bypass for the chat path, different mechanism because
// this is a Deno function rather than a Postgres one.
//
// Requires a TURNSTILE_SECRET_KEY secret on this function:
//   supabase secrets set TURNSTILE_SECRET_KEY=0x... --project-ref hvesaitxkwlufbljnupy
// Until that secret is set, this responds with a clear 500 -- same pattern as
// lead-notification's RESEND_API_KEY and chat-assistant's ANTHROPIC_API_KEY --
// rather than silently accepting leads with no real spam protection at all.

const TURNSTILE_SECRET_KEY = Deno.env.get("TURNSTILE_SECRET_KEY");

// Injected into every Edge Function by the platform.
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

interface QuotePayload {
  name?: string;
  phone?: string;
  email?: string;
  service_interest?: string;
  message?: string;
  sms_consent?: boolean;
  // Honeypot. A real visitor cannot see or reach this field -- see
  // .form-honeypot-field in css/styles.css. Any non-empty value here means
  // whatever submitted this filled in every field it could find, which no
  // human visitor does.
  website?: string;
  turnstile_token?: string;
}

// Same allowlist shape as chat-assistant and google-reviews: the two
// production hosts plus any localhost port, so local development works
// without edits here.
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
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

// Cloudflare's own test secrets (used while TURNSTILE_SECRET_KEY is still a
// dummy key during rollout) only accept their matching dummy token shape and
// ignore the visitor's real IP, so remoteip is included but never required.
async function verifyTurnstile(token: string, remoteIp: string): Promise<boolean> {
  try {
    const res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: remoteIp,
      }),
    });
    if (!res.ok) {
      console.error("submit-quote-lead: siteverify HTTP error", res.status);
      return false;
    }
    const data = await res.json();
    return data.success === true;
  } catch (err) {
    console.error("submit-quote-lead: siteverify request failed", err);
    return false;
  }
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  const cors = corsHeaders(origin);

  const json = (body: unknown, status: number) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json", ...cors },
    });

  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405, headers: cors });

  if (!TURNSTILE_SECRET_KEY) {
    console.error("submit-quote-lead: TURNSTILE_SECRET_KEY secret is not set");
    return json({ error: "The quote form is not configured (missing TURNSTILE_SECRET_KEY secret)" }, 500);
  }
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error("submit-quote-lead: SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing");
    return json({ error: "The quote form is not configured (missing Supabase keys)" }, 500);
  }

  let body: QuotePayload;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  // Honeypot check comes first and short-circuits everything else, including
  // Turnstile verification -- no reason to spend a siteverify call on a
  // submission already known to be bogus.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    console.warn("submit-quote-lead: honeypot tripped, discarding without a trace visible to the caller");
    return json({ success: true }, 200);
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const serviceInterest = typeof body.service_interest === "string" ? body.service_interest.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const smsConsent = body.sms_consent === true;
  const turnstileToken = typeof body.turnstile_token === "string" ? body.turnstile_token.trim() : "";

  if (!name || !phone) {
    return json({ error: "Name and phone are required." }, 400);
  }

  if (!turnstileToken) {
    return json({ error: "Verification failed. Please try again." }, 400);
  }

  const rawIp = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim();
  const verified = await verifyTurnstile(turnstileToken, rawIp);
  if (!verified) {
    console.warn("submit-quote-lead: Turnstile verification failed");
    return json({ error: "Verification failed. Please try again." }, 400);
  }

  // Service role key: RLS on leads no longer has a public INSERT policy (see
  // the header comment above), so this is the only way this insert can land.
  const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      name,
      phone,
      email: email || null,
      service_interest: serviceInterest || null,
      message: message || null,
      // sms_consent_at is not sent -- the leads_stamp_sms_consent BEFORE
      // INSERT trigger stamps it server-side regardless of which role
      // performs the insert, so a client-supplied time is neither needed
      // nor trusted here either.
      sms_consent: smsConsent,
    }),
  });

  if (!insertRes.ok) {
    const errText = await insertRes.text().catch(() => "");
    console.error("submit-quote-lead: leads insert failed", insertRes.status, errText);
    return json({ error: "Something went wrong submitting your request. Please try calling us instead." }, 502);
  }

  const rows = await insertRes.json().catch(() => []);
  const lead = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;

  // Notification email is a side effect of the insert itself (trg_notify_new_lead,
  // AFTER INSERT, fires regardless of which role performed it) -- nothing to
  // do here beyond reporting success back to the form.
  return json({ success: true, id: lead ? lead.id : null }, 200);
});
