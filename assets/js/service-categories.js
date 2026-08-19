// Redline Electric — canonical job-photo categories.
//
// These are STORED values, not display copy. They go into
// `projects.category`, and `work.html` builds its public filter pills straight
// from whatever distinct values exist in that column — so one typo ("Remodel"
// instead of "Remodels") puts a second pill on the live site forever. The
// admin category control is built from this list for exactly that reason.
//
// Deliberately NOT derived from assets/js/i18n.js, even though it holds the
// same six names under service_1_title..service_6_title. Those are translated:
// i18n.t() returns "Remodelaciones" when the site is in Spanish, and a stored
// category must not change with the viewer's language. i18n.js says the same
// thing at the top of its own file — translations are never used for
// Supabase-sourced content, categories included.
//
// These strings must stay identical to the `value=""` attributes on the quote
// form's service <select> in index.html and services/*.html, which are the
// other place the same six names are written down.
(function () {
  window.RedlineServiceCategories = [
    'New Construction',
    'Remodels',
    'Retrofits',
    'Art Lighting',
    'EV Chargers',
    'Service Calls'
  ];
})();
