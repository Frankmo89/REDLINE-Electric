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

  function toWhatsAppHref(raw) {
    var digits = digitsOnly(raw);
    if (digits.length === 10) digits = '1' + digits;
    return 'https://wa.me/' + digits;
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

      if (info.whatsapp) {
        var waHref = toWhatsAppHref(info.whatsapp);
        document.querySelectorAll('[data-whatsapp-link]').forEach(function (el) { el.href = waHref; });
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
        document.querySelectorAll('[data-profile-photo]').forEach(function (el) {
          el.src = info.profile_photo_url;
          el.hidden = false;
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
