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
  // The <head> snippet on every page sets Consent Mode v2 defaults to DENIED,
  // and re-grants on load if this key is already stored. Accepting here is what
  // actually flips analytics_storage to granted for the current page view —
  // before this, the banner only hid itself and GA4 tracked regardless.
  function grantConsent() {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
    }
  }

  function initConsentBanner() {
    var banner = document.getElementById('cookie-banner');
    if (!banner) return;

    var stored = null;
    try { stored = localStorage.getItem(CONSENT_KEY); } catch (e) { /* private mode */ }
    if (stored) return;

    banner.hidden = false;

    var acceptBtn = banner.querySelector('[data-cookie-accept]');
    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        try { localStorage.setItem(CONSENT_KEY, '1'); } catch (e) { /* private mode */ }
        grantConsent();
        banner.hidden = true;
      });
    }
  }
  initConsentBanner();

  window.RedlineAnalytics = { track: track };
})();
