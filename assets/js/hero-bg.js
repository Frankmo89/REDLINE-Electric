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

  // The hero box, in CSS pixels, measured on the rendered page. The two
  // shapes are genuinely different crops, not one image at two scales: the
  // mobile box is portrait and the desktop box is a wide band, and the
  // sources are 3:4 portrait phone photos. Cropping to the box on the CDN
  // rather than in CSS is where most of the saving comes from — on the LCP
  // photo, 1600x730 is 41 KB where an uncropped 1200-wide render is 210 KB.
  //
  // Safe against the Ken Burns drift because that animation only ever zooms
  // IN (scale 1 -> 1.08), so it cannot reach past the cropped frame.
  var NARROW_MAX_WIDTH = 700;

  // Fixed pixel target for mobile, not a CSS box multiplied by the visitor's
  // real devicePixelRatio. This is what scripts/bake-hero-preload.py bakes
  // into a static <link rel=preload> in the HTML, so the mobile slides have
  // to resolve to this SAME url on every device for that preload to ever be
  // reused rather than wasted — see the note on sizedFixed() in
  // image-url.js. The trade is a touch soft on 3x-DPR phones and a few
  // unneeded bytes on 1x, in exchange for the LCP photo's bytes already
  // being in flight before hero-bg.js itself has even run.
  var NARROW_FIXED_PX = { w: 750, h: 1110 };
  var BOX_WIDE = { w: 1600, h: 730 };

  function heroUrl(rawUrl) {
    if (!window.RedlineImageUrl) return rawUrl;
    if (window.innerWidth <= NARROW_MAX_WIDTH) {
      return window.RedlineImageUrl.sizedFixed(rawUrl, NARROW_FIXED_PX.w, NARROW_FIXED_PX.h);
    }
    return window.RedlineImageUrl.sized(rawUrl, BOX_WIDE.w, BOX_WIDE.h);
  }

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

    // hero-preload.js fired this query from <head>, before supabase-js was
    // even requested. Fall back to querying through the client if that file
    // is absent or its fetch failed, so the hero never depends on it.
    var rows = window.RedlineHeroQuery
      ? window.RedlineHeroQuery.then(function (data) {
          if (data) return data;
          return queryViaClient();
        })
      : queryViaClient();

    function queryViaClient() {
      return supabaseClient
        .from('projects')
        .select('image_url, title, category, is_featured')
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .then(function (res) { return res.error ? null : res.data; });
    }

    rows
      .then(function (data) {
        if (!data || data.length === 0) return;

        var photos = pick(data, opts.category).slice(0, 10);
        if (photos.length === 0) return;

        var bgWrap = document.createElement('div');
        bgWrap.className = 'hero-bg';
        bgWrap.setAttribute('aria-hidden', 'true');

        var overlay = document.createElement('div');
        overlay.className = 'hero-overlay';
        overlay.setAttribute('aria-hidden', 'true');

        var slides = photos.map(function (photo, i) {
          var img = document.createElement('img');
          var url = heroUrl(photo.image_url);
          img.className = 'hero-bg-img';
          img.alt = '';
          img.decoding = 'async';
          // If the render endpoint errors, fall back to the original file
          // rather than leaving a gap where the hero photo should be.
          img.setAttribute('data-original-src', photo.image_url);
          if (i === 0) {
            // First frame is the LCP candidate — load it eagerly and at
            // priority. The rest are lazy until preloaded one step ahead.
            img.loading = 'eager';
            img.setAttribute('fetchpriority', 'high');
            img.src = url;
          } else {
            img.loading = 'lazy';
          }
          bgWrap.appendChild(img);
          return { el: img, url: url, loaded: i === 0 };
        });

        hero.insertBefore(bgWrap, hero.firstChild);
        hero.insertBefore(overlay, bgWrap.nextSibling);
        hero.classList.add('has-hero-bg');

        if (window.RedlineImageUrl) window.RedlineImageUrl.attachFallbacks(bgWrap);

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
