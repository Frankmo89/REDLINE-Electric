// Fetches the single business_info row and applies it to any matching
// data-* hooks on the page. Hardcoded values already in the HTML act as
// the fallback if Supabase is unreachable or the row can't be read.
(function () {
  if (typeof supabaseClient === 'undefined') return;

  function digitsOnly(raw) {
    return String(raw).replace(/\D/g, '');
  }

  function toTelHref(raw) {
    var digits = digitsOnly(raw);
    if (digits.length === 10) digits = '1' + digits;
    return 'tel:+' + digits;
  }

  // Plain sms: link with no ?body= — the pre-filled-body separator differs
  // between iOS and Android, so omitting it is the only form that opens the
  // messaging app reliably on both.
  function toSmsHref(raw) {
    var digits = digitsOnly(raw);
    if (digits.length === 10) digits = '1' + digits;
    return 'sms:+' + digits;
  }

  function formatPhoneDisplay(raw) {
    var digits = digitsOnly(raw);
    if (digits.length === 11 && digits.charAt(0) === '1') digits = digits.slice(1);
    if (digits.length !== 10) return raw;
    return '(' + digits.slice(0, 3) + ') ' + digits.slice(3, 6) + '-' + digits.slice(6);
  }

  supabaseClient
    .from('business_info')
    .select('*')
    .limit(1)
    .maybeSingle()
    .then(function (res) {
      if (res.error || !res.data) return;
      var info = res.data;

      if (info.phone) {
        var telHref = toTelHref(info.phone);
        var phoneDisplay = formatPhoneDisplay(info.phone);
        document.querySelectorAll('[data-phone-link]').forEach(function (el) { el.href = telHref; });
        document.querySelectorAll('[data-phone-text]').forEach(function (el) { el.textContent = phoneDisplay; });
      }

      // business_info.whatsapp is the legacy column name for the messaging
      // number; it now drives the sms: link. If it's blank, texts go to the
      // main phone number rather than leaving the hardcoded HTML fallback.
      var smsNumber = info.whatsapp || info.phone;
      if (smsNumber) {
        var smsHref = toSmsHref(smsNumber);
        document.querySelectorAll('[data-sms-link]').forEach(function (el) { el.href = smsHref; });
      }

      if (info.email) {
        document.querySelectorAll('[data-email-link]').forEach(function (el) {
          el.href = 'mailto:' + info.email;
          el.textContent = info.email;
        });
        document.querySelectorAll('[data-email-item]').forEach(function (el) { el.hidden = false; });
      }

      if (info.hours) {
        document.querySelectorAll('[data-hours-text]').forEach(function (el) { el.textContent = info.hours; });
        document.querySelectorAll('[data-hours-item]').forEach(function (el) { el.hidden = false; });
      }

      if (info.service_areas) {
        document.querySelectorAll('[data-service-areas-text]').forEach(function (el) { el.textContent = info.service_areas; });
      }

      var hasPhoto = !!info.profile_photo_url;
      var hasAbout = !!info.about_text;

      if (hasPhoto) {
        // .about-us-photo is a 4:5 box capped at 420px wide. The stored file is
        // 370 KB; the render endpoint serves the same crop at a fraction of it.
        var photoUrl = window.RedlineImageUrl
          ? window.RedlineImageUrl.sized(info.profile_photo_url, 420, 525)
          : info.profile_photo_url;
        document.querySelectorAll('[data-profile-photo]').forEach(function (el) {
          el.src = photoUrl;
          el.setAttribute('data-original-src', info.profile_photo_url);
          el.hidden = false;
          if (window.RedlineImageUrl) {
            window.RedlineImageUrl.attachFallbacks(el.parentNode || document);
          }
        });
      }
      if (hasAbout) {
        document.querySelectorAll('[data-about-text]').forEach(function (el) {
          el.textContent = info.about_text;
          el.hidden = false;
        });
      }
      if (hasPhoto || hasAbout) {
        document.querySelectorAll('[data-profile-block]').forEach(function (el) { el.hidden = false; });
      }
    })
    .catch(function () {
      // Supabase unavailable — hardcoded fallbacks already in the HTML stay as-is.
    });
})();
