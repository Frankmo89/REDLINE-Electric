// Redline Electric — GA4 custom event tracking + cookie consent notice.
// gtag.js and the config call live in the snippet in each page's <head>;
// this file wires up the conversion events and the CCPA notice banner.
(function () {
  var CONSENT_KEY = 'redline-analytics-consent';

  function track(eventName, params) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, params || {});
  }

  // ---- Call / WhatsApp clicks ----
  // One delegated listener on document covers every instance of these
  // links (header, hero, emergency band, footer, service pages) with a
  // single binding, so a link that happens to exist in more than one
  // place (or the same nav re-rendered for mobile vs. desktop) never
  // fires twice for one click — each click event is handled exactly once.
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-phone-link]')) {
      track('call_click');
      return;
    }
    if (e.target.closest('[data-whatsapp-link]')) {
      track('whatsapp_click');
    }
  });

  // ---- Language switch ----
  // i18n.js dispatches this event exactly once per call to setLanguage(),
  // regardless of which control triggered it (header EN/ES buttons or
  // the "switch to Spanish" suggestion banner), so this listener can't
  // double-fire for a single language change.
  document.addEventListener('redline:languagechange', function (e) {
    track('language_switch', { language: (e.detail && e.detail.lang) || 'unknown' });
  });

  // ---- Cookie / analytics consent notice (CCPA) ----
  function initConsentBanner() {
    var banner = document.getElementById('cookie-banner');
    if (!banner) return;
    if (localStorage.getItem(CONSENT_KEY)) return;

    banner.hidden = false;

    var acceptBtn = banner.querySelector('[data-cookie-accept]');
    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        localStorage.setItem(CONSENT_KEY, '1');
        banner.hidden = true;
      });
    }
  }
  initConsentBanner();

  window.RedlineAnalytics = { track: track };
})();
