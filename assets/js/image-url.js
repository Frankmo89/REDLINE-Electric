// Redline Electric — Supabase Storage image transformation URLs.
//
// Every job photo in storage is the untouched camera original: the eight
// uploaded on 2026-08-14 measure 12.2 to 19.7 megapixels and 1.24 to 2.53 MB
// each. image-compress.js caps new uploads at a 1920px long edge, but it
// shipped on 2026-08-16, two days after those files landed, so it has never
// touched any of them.
//
// Rather than re-encode and re-upload (which would replace Joe's originals and
// still leave the next uncompressed upload unprotected — image-compress.js
// cannot decode HEIC in Chrome or Firefox and falls back to the original by
// design), every <img> now points at Supabase's render endpoint. That resizes,
// crops and re-encodes to WebP on demand, caches the result on the CDN, and
// applies to whatever is in the bucket — including files the compressor was
// never able to touch.
//
// MEASURED, and the reason both dimensions are always sent: `width` alone does
// NOT preserve the aspect ratio. On the 3024x4032 hero source,
// `?width=1200&resize=cover` returns 1200x4032 — 4.8 megapixels and 210 KB,
// because only the width is scaled and the original height is kept. Passing
// width AND height returns a real cover-crop: 1125x1665 at 76 KB, 1600x730 at
// 41 KB. Never call the render endpoint with one dimension.
//
// Image transforms are a paid Supabase feature, enabled on this project. If
// that ever lapses the endpoint starts erroring, so attachFallbacks() swaps
// each image back to its untransformed original rather than showing a broken
// grid — the same guard admin/dashboard.html uses on its thumbnails.
(function () {
  var PUBLIC_MARKER = '/storage/v1/object/public/';
  var RENDER_MARKER = '/storage/v1/render/image/public/';

  // Above 3x the extra pixels are not perceptible on a photographic
  // background, and the byte cost keeps climbing, so the ratio is capped.
  function pixelRatio() {
    return Math.min(window.devicePixelRatio || 1, 3);
  }

  // cssWidth/cssHeight are the box the image actually renders into, in CSS
  // pixels; the device pixel ratio is applied here. Quality 68 was chosen by
  // measurement: on the hero source, 50 shows banding in the darker wall
  // gradients, 80 costs roughly 40% more bytes for no visible gain behind the
  // hero scrim.
  function sized(url, cssWidth, cssHeight, quality) {
    if (!url || url.indexOf(PUBLIC_MARKER) === -1) return url;
    var r = pixelRatio();
    return url.replace(PUBLIC_MARKER, RENDER_MARKER) +
      '?width=' + Math.round(cssWidth * r) +
      '&height=' + Math.round(cssHeight * r) +
      '&resize=cover' +
      '&quality=' + (quality || 68);
  }

  // Wires the render-endpoint fallback for every image under `root` that
  // carries data-original-src. Called after innerHTML rather than baked into
  // the markup so no inline onerror handler is needed.
  function attachFallbacks(root) {
    if (!root) return;
    root.querySelectorAll('img[data-original-src]').forEach(function (img) {
      img.addEventListener('error', function onError() {
        img.removeEventListener('error', onError);
        var original = img.getAttribute('data-original-src');
        if (original && img.src !== original) img.src = original;
      });
    });
  }

  // The work grid renders 4:3 tiles that top out near 400 CSS px wide (three
  // columns inside the content max-width). One size covers the work page, the
  // home page teaser and the six service-page grids — they all use .work-photo.
  var GALLERY_W = 400;
  var GALLERY_H = 300;

  function gallery(url) {
    return sized(url, GALLERY_W, GALLERY_H);
  }

  window.RedlineImageUrl = {
    sized: sized,
    gallery: gallery,
    attachFallbacks: attachFallbacks
  };
})();
