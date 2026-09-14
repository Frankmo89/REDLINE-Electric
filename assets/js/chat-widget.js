// Redline Electric — chat assistant widget (phase 3).
//
// Talks to the chat-assistant Edge Function. All of the judgement lives on the
// server: what the assistant may say, what it must refuse, the emergency path,
// rate limiting. This file renders and wires; it never decides.
//
// WHY THE DOM IS BUILT HERE instead of sitting in each page's markup: the same
// widget ships on eleven pages at two directory depths. Inline markup would
// mean eleven copies to keep in step, and eleven data-i18n fallbacks for the
// pre-commit checker to police. One script tag per page is the smaller
// surface. The cost is that the widget needs JS -- acceptable, because the
// sticky Call Now bar is always present and is the real fallback.
//
// Requires SUPABASE_URL and SUPABASE_ANON_KEY from assets/js/supabase-client.js
// (loaded on every public page) and window.i18n from assets/js/i18n.js.
(function () {
  var ENDPOINT_PATH = '/functions/v1/chat-assistant';
  var SESSION_KEY = 'redline-chat-session';

  // sessionStorage, NOT localStorage. A transcript is tied to one visit: a
  // shared or family device must not reopen a stranger's conversation, and the
  // session id is a bearer secret for that row (see the session_id column
  // comment). Closing the tab should end it.
  var STORE = null;
  try { STORE = window.sessionStorage; } catch (e) { STORE = null; }

  // Slightly longer than the function's own 20s Anthropic timeout, so a slow
  // model call still returns its graceful phone-number reply rather than being
  // cut off here and reported as a network failure.
  var REQUEST_TIMEOUT_MS = 25000;
  var MAX_CHARS = 1000; // matches MAX_MESSAGE_CHARS on the server

  var PHONE_TEL = 'tel:+16197480662';

  if (typeof SUPABASE_URL !== 'string' || typeof SUPABASE_ANON_KEY !== 'string') return;
  if (!window.i18n) return;

  var t = function (key) { return window.i18n.t(key) || ''; };
  var track = function (name, params) {
    if (window.RedlineAnalytics) window.RedlineAnalytics.track(name, params);
  };

  var sessionId = null;
  var opened = false;      // panel has been opened at least once this visit
  var sending = false;
  var lastFocus = null;

  // ---------------------------------------------------------------- helpers
  function getSessionId() {
    if (sessionId) return sessionId;
    var stored = null;
    try { stored = STORE && STORE.getItem(SESSION_KEY); } catch (e) { /* private mode */ }
    if (stored) { sessionId = stored; return sessionId; }

    // crypto.randomUUID is what makes the id unguessable, which is the whole
    // basis of the RLS on chat_conversations -- a session id is only safe
    // because nobody can enumerate or guess one.
    sessionId = (window.crypto && window.crypto.randomUUID)
      ? window.crypto.randomUUID()
      : String(Date.now()) + '-' + Math.random().toString(36).slice(2) +
        Math.random().toString(36).slice(2);
    try { STORE && STORE.setItem(SESSION_KEY, sessionId); } catch (e) { /* private mode */ }
    return sessionId;
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function svg(paths, size) {
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 24 24');
    s.setAttribute('width', size || 22);
    s.setAttribute('height', size || 22);
    s.setAttribute('fill', 'none');
    s.setAttribute('stroke', 'currentColor');
    s.setAttribute('stroke-width', '2');
    s.setAttribute('stroke-linecap', 'round');
    s.setAttribute('stroke-linejoin', 'round');
    s.setAttribute('aria-hidden', 'true');
    s.setAttribute('focusable', 'false');
    paths.forEach(function (d) {
      var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('d', d);
      s.appendChild(p);
    });
    return s;
  }

  var ICON_CHAT = ['M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'];
  var ICON_PHONE = ['M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z'];
  var ICON_CLOSE = ['M18 6 6 18', 'M6 6l12 12'];
  var ICON_SEND = ['M22 2 11 13', 'M22 2l-7 20-4-9-9-4 20-7z'];
  var ICON_ALERT = ['M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z', 'M12 9v4', 'M12 17h.01'];

  // ------------------------------------------------------------------- DOM
  var launcher = el('button', 'chat-launcher');
  launcher.type = 'button';
  launcher.setAttribute('aria-expanded', 'false');
  launcher.setAttribute('aria-controls', 'chat-panel');
  launcher.appendChild(svg(ICON_CHAT, 24));

  var panel = el('div', 'chat-panel');
  panel.id = 'chat-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.hidden = true;

  var head = el('div', 'chat-head');
  var headTitle = el('h2', 'chat-head-title');
  headTitle.id = 'chat-head-title';
  headTitle.setAttribute('data-i18n', 'chat_title');
  panel.setAttribute('aria-labelledby', 'chat-head-title');

  // Permanent escape hatch. A visitor who has decided they want a human should
  // never have to close the chat to find the number -- and on mobile the panel
  // covers the sticky Call Now bar, so without this the number is genuinely
  // unreachable while the panel is open.
  var headCall = el('a', 'chat-head-call');
  headCall.href = PHONE_TEL;
  headCall.setAttribute('data-phone-link', '');
  headCall.appendChild(svg(ICON_PHONE, 20));

  var headClose = el('button', 'chat-head-close');
  headClose.type = 'button';
  headClose.appendChild(svg(ICON_CLOSE, 20));

  head.appendChild(headTitle);
  head.appendChild(headCall);
  head.appendChild(headClose);

  var log = el('div', 'chat-log');
  log.id = 'chat-log';
  log.setAttribute('role', 'log');
  log.setAttribute('aria-live', 'polite');
  log.setAttribute('tabindex', '0');

  var chips = el('div', 'chat-chips');
  var CHIP_KEYS = ['chat_chip_panel', 'chat_chip_ev', 'chat_chip_lights', 'chat_chip_quote'];

  var form = el('form', 'chat-form');
  var input = el('input', 'chat-input');
  input.type = 'text';
  input.autocomplete = 'off';
  input.maxLength = MAX_CHARS;
  input.id = 'chat-input';
  var inputLabel = el('label', 'visually-hidden');
  inputLabel.setAttribute('for', 'chat-input');
  inputLabel.setAttribute('data-i18n', 'chat_placeholder');

  var send = el('button', 'chat-send');
  send.type = 'submit';
  send.appendChild(svg(ICON_SEND, 20));

  form.appendChild(inputLabel);
  form.appendChild(input);
  form.appendChild(send);

  var disclaimer = el('p', 'chat-disclaimer');
  disclaimer.setAttribute('data-i18n-html', 'chat_disclaimer');

  panel.appendChild(head);
  panel.appendChild(log);
  panel.appendChild(chips);
  panel.appendChild(form);
  panel.appendChild(disclaimer);

  // --------------------------------------------------------------- i18n sync
  // applyLanguage() in i18n.js walks [data-i18n] at call time, so the nodes
  // above are picked up on every language change once they are in the
  // document. What it does NOT handle is attributes -- placeholders and
  // aria-labels -- so those are set here and refreshed on the same event.
  function syncText() {
    launcher.setAttribute('aria-label', t('chat_launcher'));
    headCall.setAttribute('aria-label', t('chat_call'));
    headClose.setAttribute('aria-label', t('chat_close'));
    input.setAttribute('placeholder', t('chat_placeholder'));
    send.setAttribute('aria-label', t('chat_send'));
    log.setAttribute('aria-label', t('chat_log_label'));
    headTitle.textContent = t('chat_title');
    disclaimer.innerHTML = t('chat_disclaimer');

    Array.prototype.forEach.call(chips.children, function (btn) {
      btn.textContent = t(btn.getAttribute('data-chip-key'));
    });
    // The intro bubble is the assistant's only untranslated-by-backend line,
    // because no request has been made yet. Every later reply arrives already
    // in the visitor's language and must never be touched here.
    var intro = log.querySelector('[data-chat-intro]');
    if (intro) intro.textContent = t('chat_intro');
  }

  // ----------------------------------------------------------------- render
  function addMessage(role, text, variant) {
    var row = el('div', 'chat-msg chat-msg-' + role + (variant ? ' chat-msg-' + variant : ''));
    var bubble = el('div', 'chat-bubble');

    if (variant === 'emergency') {
      var badge = el('span', 'chat-emergency-badge');
      badge.appendChild(svg(ICON_ALERT, 16));
      badge.appendChild(el('span', null, t('chat_emergency_label')));
      bubble.appendChild(badge);
    }

    // textContent throughout: replies are model output and are never trusted
    // as markup.
    bubble.appendChild(el('p', 'chat-bubble-text', text));
    row.appendChild(bubble);
    log.appendChild(row);
    log.scrollTop = log.scrollHeight;
    return row;
  }

  function showThinking() {
    var row = el('div', 'chat-msg chat-msg-assistant chat-thinking');
    row.setAttribute('data-chat-thinking', '');
    var bubble = el('div', 'chat-bubble');
    var dots = el('span', 'chat-dots');
    dots.appendChild(el('i'));
    dots.appendChild(el('i'));
    dots.appendChild(el('i'));
    bubble.appendChild(dots);
    // The animated dots say nothing to a screen reader; this does.
    bubble.appendChild(el('span', 'visually-hidden', t('chat_thinking')));
    row.appendChild(bubble);
    log.appendChild(row);
    log.scrollTop = log.scrollHeight;
  }

  function clearThinking() {
    var n = log.querySelector('[data-chat-thinking]');
    if (n) n.remove();
  }

  // --------------------------------------------------- Phase 4: lead capture
  // Renders a row of real <button>s in the log (not a chat bubble the
  // assistant "wrote") for a yes/no decision the visitor has to make
  // explicitly. Used for both the initial offer to pass details to Joe and,
  // separately, the SMS-consent step -- two different explicit decisions,
  // never inferred from anything typed in the conversation itself.
  function addActionRow(buttonSpecs) {
    var row = el('div', 'chat-msg chat-msg-assistant');
    var bubble = el('div', 'chat-bubble chat-bubble-actions');
    var actions = el('div', 'chat-actions');
    buttonSpecs.forEach(function (spec) {
      var btn = el('button', 'chat-chip' + (spec.primary ? ' chat-chip-primary' : ''), spec.label);
      btn.type = 'button';
      btn.addEventListener('click', spec.onClick);
      actions.appendChild(btn);
    });
    bubble.appendChild(actions);
    row.appendChild(bubble);
    log.appendChild(row);
    log.scrollTop = log.scrollHeight;
    return row;
  }

  // Builds a plain-text transcript from what is actually in the log right
  // now -- the same visible history a screen reader or a copy-paste would
  // see -- rather than re-fetching chat_conversations. The widget already
  // has this in the DOM; a second read would just be a slower way to get
  // the same text, and one more thing that can fail between the offer and
  // the lead actually being written.
  function buildTranscript() {
    var lines = [];
    Array.prototype.forEach.call(log.querySelectorAll('.chat-msg'), function (row) {
      var textEl = row.querySelector('.chat-bubble-text');
      if (!textEl || !textEl.textContent) return;
      var who = row.classList.contains('chat-msg-user') ? 'Visitor' : 'Assistant';
      lines.push(who + ': ' + textEl.textContent.trim());
    });
    return lines.join('\n');
  }

  // Best-effort link from the conversation row back to the lead it produced,
  // so the admin dashboard can find the full transcript from either side.
  // The lead itself does not depend on this succeeding -- see createLead --
  // it already carries its own copy of the transcript in leads.message.
  function linkConversationToLead(sid, leadId) {
    fetch(SUPABASE_URL + '/rest/v1/chat_conversations?session_id=eq.' + encodeURIComponent(sid), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
        'apikey': SUPABASE_ANON_KEY,
        // Required: the UPDATE policy on chat_conversations compares
        // session_id to this header, same as every call to the Edge
        // Function already does. Without it this PATCH matches zero rows.
        'x-session-id': sid,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ lead_id: leadId })
    }).catch(function () {
      // Logged nowhere visible to the visitor on purpose: the lead already
      // exists and Joe already has the transcript in leads.message. Losing
      // this cross-link is a minor dashboard convenience, not a lost lead.
    });
  }

  // Writes the lead FIRST, exactly like the quote form does, so the lead
  // survives even if the best-effort conversation link above fails. The
  // notification email fires automatically from the same AFTER INSERT
  // trigger the quote form already relies on -- nothing here calls
  // lead-notification directly.
  function createLead(offer, consentGiven) {
    var sid = getSessionId();
    var transcript = buildTranscript();
    var messageBody = 'Via chat assistant.\n\nJob: ' + offer.summary +
      (transcript ? '\n\nConversation:\n' + transcript : '');

    return supabaseClient
      .from('leads')
      .insert({
        name: offer.name,
        phone: offer.phone,
        service_interest: offer.service_interest || null,
        message: messageBody,
        source: 'chat',
        // sms_consent_at is deliberately not sent -- same reason as the quote
        // form: a BEFORE INSERT trigger stamps it server-side so a
        // client-supplied time can never be forged.
        sms_consent: consentGiven
      })
      .select('id')
      .single()
      .then(function (res) {
        if (res.error) throw res.error;
        if (res.data && res.data.id) linkConversationToLead(sid, res.data.id);
        addMessage('assistant', t(consentGiven ? 'chat_lead_created_with_consent' : 'chat_lead_created_call_only'));
        track('chat_lead_created', { sms_consent: consentGiven });
      })
      .catch(function () {
        addMessage('assistant', t('chat_lead_error'), 'notice');
      });
  }

  function showConsentStep(offer) {
    var row = el('div', 'chat-msg chat-msg-assistant');
    var bubble = el('div', 'chat-bubble chat-bubble-actions');
    // Same legal wording the quote form's checkbox shows -- reused, not
    // retyped, so there is exactly one copy of this disclosure to keep
    // current across both surfaces.
    bubble.appendChild(el('p', 'chat-consent-text', t('form_label_sms_consent')));
    var actions = el('div', 'chat-actions');
    bubble.appendChild(actions);
    row.appendChild(bubble);
    log.appendChild(row);
    log.scrollTop = log.scrollHeight;

    function resolve(consentGiven, chosenLabel) {
      row.remove();
      addMessage('user', chosenLabel);
      track('chat_sms_consent', { given: consentGiven });
      createLead(offer, consentGiven);
    }

    [
      { label: t('chat_consent_agree'), primary: true, onClick: function () { resolve(true, t('chat_consent_agree')); } },
      { label: t('chat_consent_decline'), onClick: function () { resolve(false, t('chat_consent_decline')); } }
    ].forEach(function (spec) {
      var btn = el('button', 'chat-chip' + (spec.primary ? ' chat-chip-primary' : ''), spec.label);
      btn.type = 'button';
      btn.addEventListener('click', spec.onClick);
      actions.appendChild(btn);
    });
  }

  // Entry point: called once per assistant reply that carried a lead_offer.
  // Offering is not consent to anything and creates no lead by itself --
  // only reaching showConsentStep, and resolving it, does that.
  function showLeadOffer(offer) {
    var offerRow = addActionRow([
      {
        label: t('chat_offer_yes'),
        primary: true,
        onClick: function () {
          offerRow.remove();
          addMessage('user', t('chat_offer_yes'));
          track('chat_lead_offer_accepted');
          showConsentStep(offer);
        }
      },
      {
        label: t('chat_offer_no'),
        onClick: function () {
          offerRow.remove();
          addMessage('user', t('chat_offer_no'));
          addMessage('assistant', t('chat_offer_declined'));
          track('chat_lead_offer_declined');
        }
      }
    ]);
  }

  function buildChips() {
    chips.innerHTML = '';
    CHIP_KEYS.forEach(function (key) {
      var btn = el('button', 'chat-chip', t(key));
      btn.type = 'button';
      btn.setAttribute('data-chip-key', key);
      btn.addEventListener('click', function () {
        submitMessage(btn.textContent);
      });
      chips.appendChild(btn);
    });
    chips.hidden = false;
  }

  // ------------------------------------------------------------------ network
  function submitMessage(text) {
    text = (text || '').trim();
    if (!text || sending) return;
    if (text.length > MAX_CHARS) text = text.slice(0, MAX_CHARS);

    sending = true;
    input.value = '';
    input.disabled = true;
    send.disabled = true;
    chips.hidden = true;

    addMessage('user', text);
    showThinking();
    track('chat_message_sent');

    var sid = getSessionId();
    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, REQUEST_TIMEOUT_MS);

    fetch(SUPABASE_URL + ENDPOINT_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // The Edge Function has verify_jwt on, so the anon key travels as the
        // bearer token; x-session-id is separately what the RLS policies
        // compare against, and the body must agree with it or the server
        // returns 400.
        'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
        'apikey': SUPABASE_ANON_KEY,
        'x-session-id': sid
      },
      body: JSON.stringify({
        session_id: sid,
        message: text,
        language: window.i18n.getLanguage()
      }),
      signal: controller.signal
    })
      .then(function (res) {
        return res.json().catch(function () { return {}; })
          .then(function (data) { return { status: res.status, data: data }; });
      })
      .then(function (r) {
        clearThinking();

        // 429: show what the server said and stop. Retrying automatically is
        // exactly what a rate limit is asking you not to do, and it would
        // spend the visitor's remaining quota on their behalf.
        if (r.status === 429) {
          addMessage('assistant', r.data.reply || t('chat_error_network'), 'notice');
          return;
        }
        if (r.data && r.data.reply) {
          addMessage('assistant', r.data.reply, r.data.emergency ? 'emergency' : null);
          // The offer is a signal the assistant has enough to hand off, not
          // consent to anything -- showLeadOffer only ever shows a yes/no
          // control, the same standard the quote form's checkbox already
          // set. Emergency replies never carry a lead_offer (the model is
          // never called on that path), but the check costs nothing either way.
          if (r.data.lead_offer) showLeadOffer(r.data.lead_offer);
          return;
        }
        // Any other shape -- a 4xx/5xx with only an error field, or an empty
        // body -- becomes the phone number. The widget never renders a raw
        // error string at a visitor.
        addMessage('assistant', t('chat_error_network'), 'notice');
      })
      .catch(function () {
        // Network down, DNS, CORS, or our own abort. Same treatment: no
        // technical detail, no retry, just the number.
        clearThinking();
        addMessage('assistant', t('chat_error_network'), 'notice');
      })
      .then(function () {
        clearTimeout(timer);
        sending = false;
        input.disabled = false;
        send.disabled = false;
        input.focus();
      });
  }

  // -------------------------------------------------------------- open/close
  function focusables() {
    return Array.prototype.filter.call(
      panel.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      function (n) { return n.offsetParent !== null || n === document.activeElement; }
    );
  }

  function openPanel() {
    if (!panel.hidden) return;
    lastFocus = document.activeElement;
    panel.hidden = false;
    launcher.setAttribute('aria-expanded', 'true');
    document.documentElement.classList.add('chat-open');

    if (!opened) {
      opened = true;
      var intro = addMessage('assistant', t('chat_intro'));
      intro.querySelector('.chat-bubble-text').setAttribute('data-chat-intro', '');
      buildChips();
    }
    track('chat_open');
    input.focus();
  }

  function closePanel() {
    if (panel.hidden) return;
    panel.hidden = true;
    launcher.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('chat-open');
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
    else launcher.focus();
  }

  launcher.addEventListener('click', function () {
    if (panel.hidden) openPanel(); else closePanel();
  });
  headClose.addEventListener('click', closePanel);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    submitMessage(input.value);
  });

  panel.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      e.stopPropagation();
      closePanel();
      return;
    }
    if (e.key !== 'Tab') return;

    // Focus trap. aria-modal="true" tells assistive tech the rest of the page
    // is inert; without this the keyboard would disagree with that claim and
    // walk out into the page behind.
    var items = focusables();
    if (!items.length) return;
    var first = items[0];
    var last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // --------------------------------------------------- bottom-stack clearance
  // .bottom-stack is position:fixed at bottom:0 with the full-width Call Now
  // bar, and the cookie banner stacks on top of it until it is accepted. The
  // launcher has to clear whatever that is currently worth, so it is measured
  // rather than guessed -- a hardcoded 56px would be wrong for the first visit
  // of every visitor, which is precisely when the banner is showing.
  function trackStackHeight() {
    var stack = document.getElementById('bottom-stack');
    if (!stack) return;
    var apply = function () {
      document.documentElement.style.setProperty(
        '--chat-stack-h', stack.offsetHeight + 'px'
      );
    };
    apply();
    if (window.ResizeObserver) new ResizeObserver(apply).observe(stack);
    else window.addEventListener('resize', apply);
  }

  // ------------------------------------------------------------------- init
  document.body.appendChild(launcher);
  document.body.appendChild(panel);
  syncText();
  trackStackHeight();

  document.addEventListener('redline:languagechange', syncText);
})();
