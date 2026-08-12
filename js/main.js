/* ==========================================================================
   Stride — shared site behaviour
   Theme (dark/light), RTL, reveal-on-scroll, toast, accordion, countdown,
   cross-page search + cart fallback.
   ========================================================================== */

(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var currentFile = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var root = currentFile === 'index.html' ? './' : '../';

  var OBSERVED = new Set();
  var observer = null;

  /* -----------------------------------------------------------------------
     Theme — dark / light with system preference detection
     ----------------------------------------------------------------------- */
  var mediaDark = window.matchMedia('(prefers-color-scheme: dark)');

  function getSystemTheme() {
    return mediaDark.matches ? 'dark' : 'light';
  }

  function syncThemeButtons(theme) {
    $$('[data-theme-toggle]').forEach(function (btn) {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  function setTheme(theme, persist) {
    document.documentElement.setAttribute('data-theme', theme);
    if (persist !== false) {
      try { localStorage.setItem('stride-theme', theme); } catch (e) { /* ignore */ }
    }
    syncThemeButtons(theme);
  }

  function initTheme() {
    var stored = null;
    try { stored = localStorage.getItem('stride-theme'); } catch (e) { /* ignore */ }
    setTheme(stored || getSystemTheme(), stored !== null);

    $$('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(next, true);
      });
    });

    if (mediaDark.addEventListener) {
      mediaDark.addEventListener('change', function (e) {
        var saved = null;
        try { saved = localStorage.getItem('stride-theme'); } catch (err) { /* ignore */ }
        if (!saved) setTheme(e.matches ? 'dark' : 'light', false);
      });
    }
  }

  /* -----------------------------------------------------------------------
     RTL — toggle with language-based system detection
     ----------------------------------------------------------------------- */
  function detectSystemRtl() {
    try {
      var lang = (navigator.languages && navigator.languages[0]) || navigator.language || '';
      return /^(ar|he|fa|ur|dv|ku|ckb)/i.test(lang);
    } catch (e) {
      return false;
    }
  }

  function syncRtlButtons(dir) {
    $$('[data-rtl-toggle]').forEach(function (btn) {
      btn.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      btn.setAttribute('aria-label', dir === 'rtl' ? 'Switch to LTR layout' : 'Switch to RTL layout');
    });
  }

  function setDir(dir, persist) {
    document.documentElement.setAttribute('dir', dir);
    if (persist !== false) {
      try { localStorage.setItem('stride-dir', dir); } catch (e) { /* ignore */ }
    }
    syncRtlButtons(dir);
  }

  function initRtl() {
    var stored = null;
    try { stored = localStorage.getItem('stride-dir'); } catch (e) { /* ignore */ }
    setDir(stored || (detectSystemRtl() ? 'rtl' : 'ltr'), stored !== null);

    $$('[data-rtl-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = document.documentElement.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
        setDir(next, true);
      });
    });
  }

  /* -----------------------------------------------------------------------
     Reveal-on-scroll (idempotent — safe to call after dynamic renders)
     ----------------------------------------------------------------------- */
  function initReveal() {
    var items = $$('[data-reveal]').filter(function (el) { return !OBSERVED.has(el); });
    if (!items.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    if (!observer) {
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    }

    items.forEach(function (el) {
      OBSERVED.add(el);
      observer.observe(el);
    });
  }

  /* -----------------------------------------------------------------------
     Toast notifications
     ----------------------------------------------------------------------- */
  function ensureToastWrap() {
    var wrap = document.querySelector('[data-toast-wrap]');
    if (wrap) return wrap;
    wrap = document.createElement('div');
    wrap.setAttribute('data-toast-wrap', '');
    wrap.className = 'toast-wrap';
    document.body.appendChild(wrap);
    return wrap;
  }

  function showToast(message, type) {
    var wrap = ensureToastWrap();
    var toast = document.createElement('div');
    toast.className = 'toast toast--' + (type || 'success');
    var icon = type === 'error'
      ? '<svg viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>'
      : '<svg viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 12.5l2.6 2.6L16 9.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    toast.innerHTML = icon + '<span>' + message + '</span>';
    wrap.appendChild(toast);
    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(6px)';
      setTimeout(function () { toast.remove(); }, 250);
    }, 3800);
  }

  window.StrideToast = showToast;

  /* -----------------------------------------------------------------------
     Accordion (FAQ) — idempotent, so dynamic renders can re-init safely
     ----------------------------------------------------------------------- */
  var boundAccordions = new Set();

  function initAccordion(rootEl) {
    $$('[data-accordion]', rootEl).forEach(function (panel) {
      $$('[data-accordion-toggle]', panel).forEach(function (btn) {
        if (boundAccordions.has(btn)) return;
        boundAccordions.add(btn);
        btn.addEventListener('click', function () {
          var isOpen = panel.classList.contains('is-open');
          panel.classList.toggle('is-open', !isOpen);
          btn.setAttribute('aria-expanded', String(!isOpen));
        });
      });
    });
  }

  window.StrideAccordion = initAccordion;

  /* -----------------------------------------------------------------------
     FAQ search — filters accordion groups by question text
     ----------------------------------------------------------------------- */
  function initFaqSearch() {
    var input = document.querySelector('[data-faq-search]');
    if (!input) return;

    var groups = $$('[data-faq-group]');
    var results = document.querySelector('[data-faq-results]');
    var empty = document.querySelector('[data-faq-empty]');

    function apply() {
      var q = input.value.trim().toLowerCase();
      var matches = 0;

      groups.forEach(function (group) {
        var accs = $$('.acc', group);
        var groupMatches = 0;
        accs.forEach(function (acc) {
          var hits = !q || acc.textContent.toLowerCase().indexOf(q) !== -1;
          acc.style.display = hits ? '' : 'none';
          if (hits) {
            groupMatches += 1;
            matches += 1;
          }
        });
        group.style.display = groupMatches ? '' : 'none';
        var heading = group.previousElementSibling;
        if (heading && /^H[1-6]$/.test(heading.tagName)) {
          heading.style.display = groupMatches ? '' : 'none';
        }
      });

      if (results) results.textContent = matches + (matches === 1 ? ' answer found' : ' answers found');
      if (empty) empty.hidden = matches > 0;
    }

    input.addEventListener('input', apply);
    apply();
  }

  /* -----------------------------------------------------------------------
     Pricing billing toggle — monthly / yearly (−20%)
     ----------------------------------------------------------------------- */
  function initBillingToggle() {
    var buttons = $$('[data-billing]');
    if (!buttons.length) return;

    var prices = {
      monthly: ['₹0', '₹199', '₹499'],
      yearly: ['₹0', '₹159', '₹399']
    };
    var periods = {
      monthly: ['forever', 'per month', 'per month'],
      yearly: ['forever', 'per month · billed yearly', 'per month · billed yearly']
    };

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var mode = btn.getAttribute('data-billing');
        buttons.forEach(function (b) { b.classList.toggle('is-active', b === btn); });

        $$('[data-plan-price]').forEach(function (el, i) {
          if (prices[mode] && prices[mode][i]) el.textContent = prices[mode][i];
        });
        $$('[data-plan-period]').forEach(function (el, i) {
          if (periods[mode] && periods[mode][i]) el.textContent = periods[mode][i];
        });
      });
    });
  }

  /* -----------------------------------------------------------------------
     Mobile nav
     ----------------------------------------------------------------------- */
  function initNavToggle() {
    var toggle = $('.nav-toggle');
    var nav = $('#mobile-nav');
    if (!toggle || !nav) return;

    function close() {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    }
    function open() {
      toggle.setAttribute('aria-expanded', 'true');
      nav.classList.add('is-open');
    }

    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      if (expanded) close(); else open();
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', close);
    });
  }

  /* -----------------------------------------------------------------------
     Cart / wishlist fallback on non-shop pages
     ----------------------------------------------------------------------- */
  function initActionFallbacks() {
    document.addEventListener('click', function (e) {
      var cartBtn = e.target.closest('[data-cart-toggle]');
      if (cartBtn && !document.querySelector('[data-cart-drawer]')) {
        e.preventDefault();
        window.location.href = root + 'index.html#shop';
        return;
      }
      var wishBtn = e.target.closest('[data-wishlist-link]');
      if (wishBtn && currentFile !== 'index.html') {
        e.preventDefault();
        window.location.href = root + 'index.html#shop';
      }
    });
  }

  /* -----------------------------------------------------------------------
     Site-wide search — routes to the shop with a q parameter
     ----------------------------------------------------------------------- */
  function initSearch() {
    $$('[data-site-search]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('[data-search-input]');
        var q = input ? input.value.trim() : '';
        if (currentFile === 'products.html') {
          window.dispatchEvent(new CustomEvent('stride:search', { detail: { q: q } }));
          var newUrl = window.location.pathname + (q ? '?q=' + encodeURIComponent(q) : '');
          window.history.pushState(null, '', newUrl);
        } else {
          window.location.href = root + 'pages/products.html' + (q ? '?q=' + encodeURIComponent(q) : '');
        }
      });
    });
  }

  /* -----------------------------------------------------------------------
     Countdown (coming-soon)
     ----------------------------------------------------------------------- */
  function initCountdown() {
    var wrap = document.querySelector('[data-countdown]');
    if (!wrap) return;
    var target = new Date(wrap.getAttribute('data-countdown')).getTime();
    if (isNaN(target)) target = Date.now() + 30 * 24 * 60 * 60 * 1000;

    var boxes = {
      days: $('[data-cd-days]'),
      hours: $('[data-cd-hours]'),
      minutes: $('[data-cd-minutes]'),
      seconds: $('[data-cd-seconds]')
    };

    function pad(n) { return String(n).padStart(2, '0'); }

    function tick() {
      var diff = Math.max(0, target - Date.now());
      boxes.days.textContent = Math.floor(diff / 86400000);
      boxes.hours.textContent = pad(Math.floor((diff % 86400000) / 3600000));
      boxes.minutes.textContent = pad(Math.floor((diff % 3600000) / 60000));
      boxes.seconds.textContent = pad(Math.floor((diff % 60000) / 1000));
    }
    tick();
    setInterval(tick, 1000);
  }

  /* -----------------------------------------------------------------------
     Init
     ----------------------------------------------------------------------- */
  function init() {
    initTheme();
    initRtl();
    initNavToggle();
    initAccordion(document);
    initFaqSearch();
    initBillingToggle();
    initActionFallbacks();
    initSearch();
    initCountdown();
    initReveal();
  }

  window.StrideReveal = initReveal;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
