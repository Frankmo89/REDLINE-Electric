// Hero photo background — crossfading slides with a slow Ken Burns drift,
// drawn from the projects table.
//
//   RedlineHeroBG.init();                          // home page
//   RedlineHeroBG.init({ category: 'Remodels' });  // service page
//
// A service page prefers photos from its own category. Where that category has
// no photos yet (Retrofits, EV Chargers and Service Calls currently have none)
// it falls back to the featured set — the same photos the home hero uses — so
// the page still opens on Redline's own work instead of a flat panel. Hero
// slides carry no caption and no alt text, so no photo is presented as an
// example of that specific service.
//
// Extracted from the inline block that used to live in index.html so the six
// service pages don't each carry a copy.
(function () {
  var HERO_CYCLE_MS = 6000;

  // Matches the normalize() used by the service pages' photo grids, so the
  // hero and the gallery below it agree on what counts as a category match.
  function normalize(str) {
    return String(str || '').trim().toLowerCase().replace(/s$/, '');
  }

  function pick(projects, category) {
    if (category) {
      var matched = projects.filter(function (p) {
        return normalize(p.category) === normalize(category);
      });
      if (matched.length) return matched;
    }
    var featured = projects.filter(function (p) { return p.is_featured; });
    return featured.length ? featured : projects;
  }

  function init(opts) {
    opts = opts || {};
    var hero = document.querySelector(opts.selector || '.hero');
    if (!hero || typeof supabaseClient === 'undefined') return;

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    supabaseClient
      .from('projects')
      .select('image_url, title, category, is_featured')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .then(function (res) {
        if (res.error || !res.data || res.data.length === 0) return;

        var photos = pick(res.data, opts.category).slice(0, 10);
        if (photos.length === 0) return;

        var bgWrap = document.createElement('div');
        bgWrap.className = 'hero-bg';
        bgWrap.setAttribute('aria-hidden', 'true');

        var overlay = document.createElement('div');
        overlay.className = 'hero-overlay';
        overlay.setAttribute('aria-hidden', 'true');

        var slides = photos.map(function (photo, i) {
          var img = document.createElement('img');
          img.className = 'hero-bg-img';
          img.alt = '';
          img.decoding = 'async';
          if (i === 0) {
            // First frame is the LCP candidate — load it eagerly and at
            // priority. The rest are lazy until preloaded one step ahead.
            img.loading = 'eager';
            img.setAttribute('fetchpriority', 'high');
            img.src = photo.image_url;
          } else {
            img.loading = 'lazy';
          }
          bgWrap.appendChild(img);
          return { el: img, url: photo.image_url, loaded: i === 0 };
        });

        hero.insertBefore(bgWrap, hero.firstChild);
        hero.insertBefore(overlay, bgWrap.nextSibling);
        hero.classList.add('has-hero-bg');

        slides[0].el.classList.add('is-active');

        if (prefersReduced || slides.length === 1) {
          return;
        }

        function preload(index) {
          var slide = slides[index];
          if (!slide.loaded) {
            slide.el.src = slide.url;
            slide.loaded = true;
          }
        }

        preload(1 % slides.length);

        var current = 0;
        setInterval(function () {
          var next = (current + 1) % slides.length;
          preload((next + 1) % slides.length);
          slides[current].el.classList.remove('is-active');
          slides[next].el.classList.add('is-active');
          current = next;
        }, HERO_CYCLE_MS);
      })
      .catch(function () {
        // Supabase unavailable — leave the existing solid hero background.
      });
  }

  window.RedlineHeroBG = { init: init };
})();
