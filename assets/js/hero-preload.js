// Redline Electric — starts the hero photo query during HTML parse.
//
// THE PROBLEM THIS SOLVES. The hero image URL is not in the HTML; it comes out
// of the projects table. So the browser's preload scanner cannot see it, and
// the request sat at the end of a four-hop chain. Measured on production,
// warm cache, desktop, fast connection — the best case that exists:
//
//     76 ms   HTML first byte
//     80 ms   supabase-js requested from jsDelivr (a third origin)
//     81 ms   hero-bg.js requested
//    202 ms   projects query starts — first contact with the Supabase origin
//    462 ms   query returns, hero URL finally known
//    468 ms   image request begins
//
// Nothing about the image could start before 468 ms, and on a cold mobile
// connection every step inflates: jsDelivr is a separate DNS lookup, TCP
// connection and TLS handshake for ~120 KB of library the hero does not need.
//
// This file is loaded synchronously in <head>, ahead of the stylesheet, and
// issues the same query as a plain fetch(). No supabase-js, no client
// construction, no waiting on a third-party CDN — the request leaves during
// HTML parse instead of after two script downloads. hero-bg.js then awaits
// this promise instead of issuing its own query.
//
// The URL and anon key are repeated from supabase-client.js rather than
// imported. That file builds a supabase-js client, so it cannot run until the
// UMD bundle has downloaded — which is precisely the wait being removed here.
// The key is the public anon key, already served in supabase-client.js and in
// every page's CSP; RLS is what actually gates access.
(function () {
  var SUPABASE_URL = 'https://hvesaitxkwlufbljnupy.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2ZXNhaXR4a3dsdWZibGpudXB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3MzkyNzksImV4cCI6MjEwMjMxNTI3OX0.Pcdzxa-eWUrtBRblXRJ156EOG--7KPAHiKFTiHpFMS0';

  // Same columns, filter and ordering hero-bg.js used when it ran the query
  // itself. If these drift apart the hero silently changes, so they are kept
  // in one place: hero-bg.js no longer has a copy.
  var QUERY = '/rest/v1/projects' +
    '?select=image_url,title,category,is_featured' +
    '&is_published=eq.true' +
    '&order=created_at.desc';

  // Resolves to an array of rows, or null on any failure. hero-bg.js treats
  // null as "fall back to querying through supabaseClient", so a blocked or
  // failed fetch here costs a little time and never costs the hero.
  window.RedlineHeroQuery = fetch(SUPABASE_URL + QUERY, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: 'Bearer ' + SUPABASE_ANON_KEY
    }
  })
    .then(function (res) { return res.ok ? res.json() : null; })
    .catch(function () { return null; });
})();
