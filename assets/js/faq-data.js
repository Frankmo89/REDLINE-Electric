// Redline Electric — shared FAQ content block.
// Question/answer text lives in i18n.js (faq_q_*/faq_a_* keys) so it's
// translated automatically. This file only defines the question set and
// which subset of questions each page shows, then renders the accordion
// into a #faq-list container and re-renders on language change.
(function () {
  var FAQ_ITEMS = [
    { id: 'permit', qKey: 'faq_q_permit', aKey: 'faq_a_permit' },
    { id: 'panel_cost', qKey: 'faq_q_panel_cost', aKey: 'faq_a_panel_cost' },
    { id: 'ev_cost', qKey: 'faq_q_ev_cost', aKey: 'faq_a_ev_cost' },
    { id: 'panel_signs', qKey: 'faq_q_panel_signs', aKey: 'faq_a_panel_signs' },
    { id: 'licensed', qKey: 'faq_q_licensed', aKey: 'faq_a_licensed' },
    { id: 'areas', qKey: 'faq_q_areas', aKey: 'faq_a_areas' },
    { id: 'emergency', qKey: 'faq_q_emergency', aKey: 'faq_a_emergency' },
    { id: 'retrofit_vs_remodel', qKey: 'faq_q_retrofit_vs_remodel', aKey: 'faq_a_retrofit_vs_remodel' }
  ];

  var PAGE_FAQS = {
    home: ['permit', 'panel_cost', 'ev_cost', 'panel_signs', 'licensed', 'areas', 'emergency', 'retrofit_vs_remodel'],
    'new-construction': ['permit', 'licensed', 'areas'],
    remodels: ['retrofit_vs_remodel', 'permit', 'licensed'],
    retrofits: ['retrofit_vs_remodel', 'panel_cost', 'panel_signs'],
    'art-lighting': ['permit', 'licensed', 'areas'],
    'ev-chargers': ['ev_cost', 'permit', 'licensed'],
    'service-calls': ['emergency', 'licensed', 'areas']
  };

  function itemById(id) {
    for (var i = 0; i < FAQ_ITEMS.length; i++) {
      if (FAQ_ITEMS[i].id === id) return FAQ_ITEMS[i];
    }
    return null;
  }

  function tr(key, fallback) {
    return (window.i18n && window.i18n.t(key)) || fallback;
  }

  function renderFAQ(pageKey) {
    var list = document.getElementById('faq-list');
    if (!list) return;

    var ids = PAGE_FAQS[pageKey] || [];
    var items = ids.map(itemById).filter(Boolean);
    if (items.length === 0) return;

    list.innerHTML = '';
    items.forEach(function (item) {
      var qId = 'faq-q-' + item.id;
      var aId = 'faq-a-' + item.id;

      var wrap = document.createElement('div');
      wrap.className = 'faq-item';

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'faq-question';
      btn.id = qId;
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-controls', aId);

      var qText = document.createElement('span');
      qText.textContent = tr(item.qKey, item.id);

      var icon = document.createElement('span');
      icon.className = 'faq-icon';
      icon.setAttribute('aria-hidden', 'true');

      btn.appendChild(qText);
      btn.appendChild(icon);

      var panel = document.createElement('div');
      panel.className = 'faq-answer';
      panel.id = aId;
      panel.setAttribute('role', 'region');
      panel.setAttribute('aria-labelledby', qId);

      var panelInner = document.createElement('div');
      panelInner.className = 'faq-answer-inner';
      panelInner.textContent = tr(item.aKey, '');
      panel.appendChild(panelInner);

      btn.addEventListener('click', function () {
        var isOpen = wrap.classList.contains('is-open');
        list.querySelectorAll('.faq-item.is-open').forEach(function (openItem) {
          if (openItem !== wrap) {
            openItem.classList.remove('is-open');
            var openBtn = openItem.querySelector('.faq-question');
            if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
          }
        });
        wrap.classList.toggle('is-open', !isOpen);
        btn.setAttribute('aria-expanded', String(!isOpen));
      });

      wrap.appendChild(btn);
      wrap.appendChild(panel);
      list.appendChild(wrap);
    });
  }

  function initFAQ(pageKey) {
    renderFAQ(pageKey);
    document.addEventListener('redline:languagechange', function () {
      renderFAQ(pageKey);
    });
  }

  window.RedlineFAQ = {
    FAQ_ITEMS: FAQ_ITEMS,
    PAGE_FAQS: PAGE_FAQS,
    init: initFAQ
  };
})();
