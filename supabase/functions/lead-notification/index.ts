import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// Sends emails whenever a new row lands in the "leads" table (quote
// form submission): an internal notification to Joe, and a branded
// HTML confirmation to the customer (only if they provided an email
// -- it's an optional field on the form). Triggered by a Postgres
// AFTER INSERT trigger on public.leads via pg_net -- see the
// notify_new_lead() migration for the trigger side.
//
// Requires a RESEND_API_KEY secret to be set on this function
// (Project Settings > Edge Functions > lead-notification > Secrets,
// or `supabase secrets set RESEND_API_KEY=re_xxx`). Until that secret
// is set, this function responds with a clear 500 instead of silently
// failing, and never blocks the lead insert itself (the trigger fires
// pg_net asynchronously).
//
// SENDING DOMAIN: redlinesd.com is verified in Resend (DKIM + SPF both
// pass), so both emails below send from a real redlinesd.com address
// and deliver to any recipient. The earlier sandbox restriction --
// where an unverified account could only deliver to the account's own
// signup address -- no longer applies. (Resend's inbound Receiving MX
// record is a separate feature and is not required for sending.)

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const NOTIFY_TO = "joe.britt1979@gmail.com";
// Verified sending domain in Resend -- used as the From for both the
// internal notification and the customer confirmation below.
const FROM_ADDRESS = "Redline Electric Website <leads@redlinesd.com>";
// Must be an absolute, publicly reachable URL: email clients can't resolve
// relative paths, and many fetch images without a session. Points at the live
// domain (verified serving 200 image/png since 2026-08-21).
const LOGO_URL = "https://redlinesd.com/assets/redline-electric-logo.png";
const PHONE_DISPLAY = "(619) 748-0662";
const PHONE_TEL = "tel:+16197480662";

interface LeadPayload {
  name?: string;
  phone?: string;
  email?: string;
  service_interest?: string;
  message?: string;
  // TCPA consent, captured by the checkbox on the quote form. Surfaced in
  // the internal email because this is where Joe decides how to respond,
  // and "may I text this person back" has to be answerable without opening
  // the dashboard. Absent or false means CALL ONLY.
  sms_consent?: boolean;
  sms_consent_at?: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendEmail(to: string, subject: string, text: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({ from: FROM_ADDRESS, to: [to], subject, text, html }),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

// Table-based layout with inline CSS throughout -- required for
// consistent rendering across Gmail, Outlook, and Apple Mail, which
// don't support <style> blocks or modern CSS (flexbox/grid) reliably.
function buildCustomerConfirmationEmail(name: string, serviceInterest: string) {
  const requestedThing = serviceInterest || "project";

  const text =
    `Hi ${name},\n\n` +
    `Thanks for reaching out to Redline Electric. We received your request and will reach out shortly to discuss your ${requestedThing}.\n\n` +
    `Need it sooner? Call or text us directly at ${PHONE_DISPLAY}.\n\n` +
    `Redline Electric\n` +
    `C-10 License #1153394\n` +
    `San Diego County\n`;

  const safeName = escapeHtml(name);
  const safeRequestedThing = escapeHtml(requestedThing);
  const introLine = serviceInterest
    ? `Thanks for reaching out to Redline Electric about <strong>${escapeHtml(serviceInterest)}</strong>.`
    : `Thanks for reaching out to Redline Electric.`;

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>We got your request — Redline Electric</title>
  </head>
  <body style="margin:0; padding:0; background-color:#EDEDE8;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#EDEDE8; padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%; background-color:#FFFFFF; border-collapse:collapse;">
            <tr>
              <td align="center" style="background-color:#23262F; padding:28px 24px;">
                <img src="${LOGO_URL}" alt="Redline Electric" width="180" style="display:block; width:180px; max-width:180px; height:auto; border:0;">
              </td>
            </tr>
            <tr>
              <td style="background-color:#FFFFFF; padding:36px 32px; font-family:Arial, Helvetica, sans-serif;">
                <h1 style="margin:0 0 16px 0; font-size:24px; line-height:1.3; color:#CC2029; font-weight:700;">We've got your request</h1>
                <p style="margin:0 0 16px 0; font-size:16px; line-height:1.6; color:#23262F;">Hi ${safeName},</p>
                <p style="margin:0 0 16px 0; font-size:16px; line-height:1.6; color:#23262F;">${introLine}</p>
                <p style="margin:0 0 24px 0; font-size:16px; line-height:1.6; color:#23262F;">We received your request and will reach out shortly to discuss your ${safeRequestedThing}. Need it sooner? Call or text us directly.</p>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px 0;">
                  <tr>
                    <td align="center" bgcolor="#CC2029" style="border-radius:4px;">
                      <a href="${PHONE_TEL}" style="display:inline-block; padding:14px 32px; font-family:Arial, Helvetica, sans-serif; font-size:16px; font-weight:700; color:#F5F5F0; text-decoration:none; border-radius:4px;">Call Now</a>
                    </td>
                  </tr>
                </table>
                <p style="margin:0; font-size:14px; line-height:1.6; color:#6B6F78;">Prefer to reach us another way? Call or text ${PHONE_DISPLAY} anytime.</p>
              </td>
            </tr>
            <tr>
              <td style="background-color:#23262F; padding:20px 24px; text-align:center; font-family:Arial, Helvetica, sans-serif;">
                <p style="margin:0 0 4px 0; font-size:12px; line-height:1.5; color:#A9AFB7;">Redline Electric &middot; C-10 License #1153394</p>
                <p style="margin:0; font-size:12px; line-height:1.5; color:#A9AFB7;">San Diego County</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { text, html };
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  if (!RESEND_API_KEY) {
    console.error("lead-notification: RESEND_API_KEY secret is not set");
    return new Response(
      JSON.stringify({ error: "Email sending is not configured (missing RESEND_API_KEY secret)" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  let lead: LeadPayload;
  try {
    lead = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const name = lead.name || "Unknown";
  const phone = lead.phone || "Not provided";
  const email = (lead.email || "").trim();
  const serviceInterest = lead.service_interest || "Not specified";
  const message = lead.message || "(no message)";

  // Stated explicitly in both directions. Omitting the line when consent is
  // absent would read as "this email predates the consent field" rather
  // than "this person did not consent", and that is the one ambiguity this
  // must not have.
  const smsConsent = lead.sms_consent === true;
  const consentText = smsConsent
    ? `Yes -- consented ${lead.sms_consent_at || "(time not recorded)"}`
    : "NO -- DO NOT TEXT. Call only.";

  const subject = `New quote request from ${name}`;

  const text =
    `New quote request from the Redline Electric website:\n\n` +
    `Name: ${name}\n` +
    `Phone: ${phone}\n` +
    `Email: ${email || "Not provided"}\n` +
    `Service Interested In: ${serviceInterest}\n` +
    `Call/text consent: ${consentText}\n` +
    `Message: ${message}\n`;

  const html =
    `<h2>New quote request</h2>` +
    `<p><strong>Name:</strong> ${escapeHtml(name)}</p>` +
    `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` +
    `<p><strong>Email:</strong> ${escapeHtml(email || "Not provided")}</p>` +
    `<p><strong>Service Interested In:</strong> ${escapeHtml(serviceInterest)}</p>` +
    `<p><strong>Call/text consent:</strong> <span style="color:${smsConsent ? "#1B7F3B" : "#B3161F"}; font-weight:700;">${escapeHtml(consentText)}</span></p>` +
    `<p><strong>Message:</strong><br>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`;

  const internalResult = await sendEmail(NOTIFY_TO, subject, text, html);

  if (!internalResult.ok) {
    console.error("lead-notification: Resend API error (internal notification)", internalResult.status, internalResult.data);
  }

  // Customer confirmation is best-effort and optional (email isn't a
  // required form field): failures here are logged but never affect
  // the response status or block the internal notification above.
  let customerEmailSent = false;
  if (email) {
    try {
      const confirmation = buildCustomerConfirmationEmail(
        (lead.name || "").trim() || "there",
        (lead.service_interest || "").trim()
      );
      const customerResult = await sendEmail(
        email,
        "We got your request — Redline Electric",
        confirmation.text,
        confirmation.html
      );
      customerEmailSent = customerResult.ok;
      if (!customerResult.ok) {
        console.error("lead-notification: Resend API error (customer confirmation)", customerResult.status, customerResult.data);
      }
    } catch (err) {
      console.error("lead-notification: failed to send customer confirmation email", err);
    }
  }

  if (!internalResult.ok) {
    return new Response(
      JSON.stringify({ error: "Failed to send internal notification email", details: internalResult.data, customerEmailSent }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ success: true, id: internalResult.data.id, customerEmailSent }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
});
