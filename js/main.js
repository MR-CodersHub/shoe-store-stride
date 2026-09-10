/* ==========================================================================
   Stride — shared site behaviour
   Theme (dark/light), RTL, reveal-on-scroll, toast, accordion, countdown,
   cross-page search + cart fallback.
   ========================================================================== */

(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function escHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatRupees(n) {
    var v = Number(n);
    if (!isFinite(v)) return '₹0';
    return '₹' + v.toLocaleString('en-IN');
  }

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

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
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

  function showOrderPlacedToast(order) {
    var wrap = ensureToastWrap();
    var toast = document.createElement('div');
    toast.className = 'toast toast--order-placed';

    var orderNum = 'STR-' + Math.floor(100000 + Math.random() * 900000);
    var firstItemName = order.items && order.items[0] && order.items[0].name ? order.items[0].name : 'Shoe Store order';
    var itemCountText = order.totalQty === 1 ? firstItemName : (order.totalQty + ' items');

    toast.innerHTML =
      '<div class="toast-order__header">' +
        '<div class="toast-order__icon">' +
          '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 4L12 14.01l-3-3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '</div>' +
        '<div class="toast-order__title-wrap">' +
          '<strong class="toast-order__title">Order Placed</strong>' +
          '<span class="toast-order__badge">Confirmed · #' + orderNum + '</span>' +
        '</div>' +
        '<button type="button" class="toast-order__close" aria-label="Close notification">&times;</button>' +
      '</div>' +
      '<div class="toast-order__body">' +
        '<p class="toast-order__text">Your order for <strong>' + esc(itemCountText) + '</strong> (' + formatRupees(order.subtotal) + ') has been confirmed.</p>' +
        '<div class="toast-order__meta">' +
          '<span>Free Express Shipping</span>' +
          '<span>Est. Delivery in 2–3 Days</span>' +
        '</div>' +
      '</div>';

    wrap.appendChild(toast);

    var closeBtn = toast.querySelector('.toast-order__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        dismiss();
      });
    }

    function dismiss() {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px) scale(0.95)';
      setTimeout(function () { toast.remove(); }, 300);
    }

    setTimeout(dismiss, 7000);
  }

  window.StrideToast = showToast;
  window.StrideOrderPlacedToast = showOrderPlacedToast;

  /* -----------------------------------------------------------------------
     Shared cart — drawer, badge and persistence for every page
     ----------------------------------------------------------------------- */
  var CART_KEY = 'stride-cart';
  var cartItems = [];
  var cartResolver = null;
  var cartOpen = false;

  function loadCart() {
    try {
      var raw = localStorage.getItem(CART_KEY);
      var arr = raw ? JSON.parse(raw) : [];
      cartItems = Array.isArray(arr) ? arr.filter(function (c) { return c && c.id; }) : [];
    } catch (e) {
      cartItems = [];
    }
  }

  function saveCart() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cartItems)); } catch (e) { /* ignore */ }
  }

  function cartLookup(id) {
    return cartResolver ? cartResolver(id) : null;
  }

  function renderCart() {
    var badge = $('[data-cart-count]');
    var total = cartItems.reduce(function (sum, c) { return sum + (Number(c.qty) || 0); }, 0);
    if (badge) {
      badge.hidden = total === 0;
      badge.textContent = total;
    }

    var items = $('[data-drawer-items]');
    var subtotalEl = $('[data-drawer-subtotal]');
    var countEl = $('[data-drawer-count]');
    if (!items) return;

    if (!cartItems.length) {
      items.innerHTML = '<p class="drawer__empty">Your bag is empty. Add a pair to get started.</p>';
      if (subtotalEl) subtotalEl.textContent = formatRupees(0);
      if (countEl) countEl.textContent = '(0)';
      return;
    }

    items.innerHTML = cartItems.map(function (line) {
      var p = cartLookup(line.id);
      if (!p) return '';
      var lineTotal = (Number(p.price) || 0) * line.qty;
      return (
        '<div class="drawer-item">' +
          '<img class="drawer-item__image" src="' + escHtml(p.image) + '" alt="" loading="lazy" />' +
          '<div>' +
            '<div class="drawer-item__brand">' + escHtml(p.brand) + '</div>' +
            '<div class="drawer-item__name">' + escHtml(p.name) + '</div>' +
            '<div class="drawer-item__qty" role="group" aria-label="Quantity for ' + escHtml(p.name) + '">' +
              '<button type="button" data-qty-dec="' + escHtml(line.id) + '" aria-label="Decrease quantity">−</button>' +
              '<span>' + line.qty + '</span>' +
              '<button type="button" data-qty-inc="' + escHtml(line.id) + '" aria-label="Increase quantity">+</button>' +
            '</div>' +
          '</div>' +
          '<div style="text-align:right;">' +
            '<div class="drawer-item__price">' + formatRupees(lineTotal) + '</div>' +
            '<button class="drawer-item__remove" type="button" data-remove="' + escHtml(line.id) + '">Remove</button>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    var subtotal = cartItems.reduce(function (sum, line) {
      var p = cartLookup(line.id);
      return sum + (p ? (Number(p.price) || 0) * line.qty : 0);
    }, 0);
    if (subtotalEl) subtotalEl.textContent = formatRupees(subtotal);
    var totalQty = cartItems.reduce(function (sum, c) { return sum + c.qty; }, 0);
    if (countEl) countEl.textContent = '(' + totalQty + ')';
  }

  function openCart() {
    var drawer = $('[data-cart-drawer]');
    if (!drawer) return;
    cartOpen = true;
    drawer.hidden = false;
    document.body.style.overflow = 'hidden';
    renderCart();
  }

  function closeCart() {
    var drawer = $('[data-cart-drawer]');
    if (!drawer) return;
    cartOpen = false;
    drawer.hidden = true;
    document.body.style.overflow = '';
  }

  function initDrawer() {
    $$('[data-cart-toggle]').forEach(function (btn) {
      btn.addEventListener('click', openCart);
    });
    $$('[data-drawer-close]').forEach(function (btn) {
      btn.addEventListener('click', closeCart);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && cartOpen) closeCart();
    });

    var items = $('[data-drawer-items]');
    if (items) {
      items.addEventListener('click', function (e) {
        var inc = e.target.closest('[data-qty-inc]');
        var dec = e.target.closest('[data-qty-dec]');
        var rem = e.target.closest('[data-remove]');
        if (inc) cartChangeQty(inc.getAttribute('data-qty-inc'), 1);
        else if (dec) cartChangeQty(dec.getAttribute('data-qty-dec'), -1);
        else if (rem) cartRemove(rem.getAttribute('data-remove'));
      });
    }

    var checkout = $('[data-drawer-checkout]');
    if (checkout) {
      checkout.addEventListener('click', function () {
        if (!cartItems.length) {
          showToast('Your bag is empty.', 'error');
          return;
        }
        var totalQty = cartItems.reduce(function (s, c) { return s + c.qty; }, 0);
        var subtotal = cartItems.reduce(function (sum, line) {
          var p = cartLookup(line.id);
          return sum + (p ? (Number(p.price) || 0) * line.qty : 0);
        }, 0);

        var purchasedItems = cartItems.map(function (line) {
          var p = cartLookup(line.id);
          return {
            id: line.id,
            qty: line.qty,
            name: p ? p.name : 'Footwear',
            price: p ? p.price : 0
          };
        });

        showOrderPlacedToast({
          totalQty: totalQty,
          subtotal: subtotal,
          items: purchasedItems
        });

        cartItems = [];
        saveCart();
        renderCart();
        closeCart();
      });
    }
  }

  function cartAdd(id) {
    if (!cartLookup(id)) return;
    var existing = cartItems.filter(function (c) { return c.id === id; })[0];
    if (existing) existing.qty += 1;
    else cartItems.push({ id: id, qty: 1 });
    saveCart();
    renderCart();
  }

  function cartRemove(id) {
    cartItems = cartItems.filter(function (c) { return c.id !== id; });
    saveCart();
    renderCart();
  }

  function cartChangeQty(id, delta) {
    var item = cartItems.filter(function (c) { return c.id === id; })[0];
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      cartRemove(id);
      return;
    }
    saveCart();
    renderCart();
  }

  window.StrideCart = {
    setResolver: function (fn) {
      cartResolver = fn;
      renderCart();
    },
    items: function () { return cartItems.slice(); },
    totalQty: function () {
      return cartItems.reduce(function (s, c) { return s + c.qty; }, 0);
    },
    add: cartAdd,
    remove: cartRemove,
    changeQty: cartChangeQty,
    open: openCart,
    close: closeCart,
    render: renderCart
  };

  /* -----------------------------------------------------------------------
     Quick-view product modal (used by product cards on every page)
     ----------------------------------------------------------------------- */
  var quickViewEl = null;
  var quickViewContent = null;

  function quickViewStars(rating) {
    var r = Math.max(0, Math.min(5, Number(rating) || 0));
    var full = Math.round(r);
    var out = '';
    for (var i = 1; i <= 5; i += 1) {
      out += i <= full
        ? '<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path d="M12 3.4l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9l-5.2 2.7 1-5.9-4.3-4.1 5.9-.8z" fill="currentColor"/></svg>'
        : '<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path d="M12 3.4l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9l-5.2 2.7 1-5.9-4.3-4.1 5.9-.8z" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>';
    }
    return out;
  }

  function quickViewMarkup(p) {
    var badge = p.badge
      ? '<span class="product-card__badge product-card__badge--' + escHtml(p.badge) + '">' +
          (p.badge === 'new' ? 'New' : p.badge === 'sale' && (p.compareAt || p.oldPrice) ? '-' + Math.round((1 - p.price / (p.compareAt || p.oldPrice)) * 100) + '%' : '') +
        '</span>'
      : '';

    var rating = p.rating
      ? '<span class="product-card__rating" aria-label="Rated ' + escHtml(p.rating) + ' out of 5">' +
          '<span class="stars" aria-hidden="true">' + quickViewStars(p.rating) + '</span>' +
          '<span class="product-card__rating-value">' + escHtml(p.rating) + '</span>' +
          (p.reviewCount ? '<span class="product-card__review-count">(' + escHtml(p.reviewCount) + ')</span>' : '') +
        '</span>'
      : '';

    var oldPrice = p.compareAt || p.oldPrice
      ? '<span class="product-card__price-old">' + formatRupees(p.compareAt || p.oldPrice) + '</span>'
      : '';

    var lede = p.lede || p.tagline
      ? '<p class="modal__lede">' + escHtml(p.lede || p.tagline) + '</p>'
      : '';

    var sizes = (p.sizes || []).length
      ? p.sizes.map(function (s, idx) {
          var isSel = idx === 0 ? ' is-selected' : '';
          return '<button type="button" class="detail-chip detail-chip--selectable' + isSel + '" data-size-chip="' + escHtml(s) + '" aria-pressed="' + (idx === 0 ? 'true' : 'false') + '">' + escHtml(s) + '</button>';
        }).join('')
      : '<span class="detail-chip">One size</span>';

    var features = (p.features || []).slice(0, 3);
    var featureList = features.length
      ? '<ul class="modal__features">' + features.map(function (f) {
          return '<li><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' + escHtml(f.title) + '</li>';
        }).join('') + '</ul>'
      : '';

    var specs = (p.specs || []).slice(0, 4);
    var specList = specs.length
      ? '<dl class="modal__specs">' + specs.map(function (s) {
          return '<div><dt>' + escHtml(s.title) + '</dt><dd>' + escHtml(s.text) + '</dd></div>';
        }).join('') + '</dl>'
      : '';

    return (
      '<div class="modal__media">' + badge +
        '<img src="' + escHtml(p.image) + '" alt="' + escHtml(p.imageAlt || p.name) + '" loading="lazy" decoding="async" />' +
      '</div>' +
      '<div class="modal__body">' +
        '<span class="product-card__brand">' + escHtml(p.brand) + (p.category ? ' · ' + escHtml(p.category) : '') + '</span>' +
        '<h3 class="modal__title">' + escHtml(p.name) + '</h3>' +
        rating +
        lede +
        '<div class="product-card__price-row">' +
          '<span class="product-card__price">' + formatRupees(p.price) + '</span>' + oldPrice +
        '</div>' +
        '<div class="modal__block">' +
          '<span class="modal__label">Sizes</span>' +
          '<div class="modal__sizes">' + sizes + '</div>' +
        '</div>' +
        featureList +
        specList +
        '<button class="btn btn--primary btn--block modal__add" type="button" data-modal-add="' + escHtml(p.id) + '">Add to cart <span aria-hidden="true">→</span></button>' +
        '<p class="modal__footnote">30-day fit guarantee · Free 3D fitting</p>' +
      '</div>'
    );
  }

  function ensureQuickView() {
    if (quickViewEl) return;
    quickViewEl = document.createElement('div');
    quickViewEl.className = 'modal';
    quickViewEl.setAttribute('data-quick-view', '');
    quickViewEl.hidden = true;
    quickViewEl.innerHTML =
      '<div class="modal__overlay" data-quick-view-close></div>' +
      '<div class="modal__panel" role="dialog" aria-modal="true" aria-labelledby="quick-view-title">' +
        '<button class="modal__close" type="button" data-quick-view-close aria-label="Close details">' +
          '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' +
        '</button>' +
        '<div class="modal__content" data-quick-view-content></div>' +
      '</div>';
    document.body.appendChild(quickViewEl);

    quickViewContent = quickViewEl.querySelector('[data-quick-view-content]');

    quickViewEl.querySelectorAll('[data-quick-view-close]').forEach(function (el) {
      el.addEventListener('click', closeQuickView);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && quickViewEl && !quickViewEl.hidden) closeQuickView();
    });

    quickViewEl.addEventListener('click', function (e) {
      var sizeBtn = e.target.closest('[data-size-chip]');
      if (sizeBtn) {
        var siblings = sizeBtn.parentElement.querySelectorAll('[data-size-chip]');
        siblings.forEach(function (btn) {
          btn.classList.remove('is-selected');
          btn.setAttribute('aria-pressed', 'false');
        });
        sizeBtn.classList.add('is-selected');
        sizeBtn.setAttribute('aria-pressed', 'true');
        return;
      }

      var addBtn = e.target.closest('[data-modal-add]');
      if (!addBtn) return;
      var id = addBtn.getAttribute('data-modal-add');
      var product = cartLookup(id) || (window.STRIDE_DATA && window.STRIDE_DATA.getProduct(id));
      
      var selectedSizeEl = quickViewEl.querySelector('[data-size-chip].is-selected');
      var selectedSize = selectedSizeEl ? selectedSizeEl.getAttribute('data-size-chip') : null;

      cartAdd(id);

      var sizeText = selectedSize ? ' (Size ' + selectedSize + ')' : '';
      showToast((product && product.name ? product.name : 'Item') + sizeText + ' added to your bag.');

      addBtn.classList.add('is-added');
      addBtn.innerHTML = 'Added <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      setTimeout(function () {
        addBtn.classList.remove('is-added');
        addBtn.innerHTML = 'Add to cart <span aria-hidden="true">→</span>';
      }, 1400);
    });
  }

  function openQuickView(product) {
    if (!product) return;
    ensureQuickView();
    quickViewContent.innerHTML = quickViewMarkup(product);
    var title = quickViewEl.querySelector('.modal__title');
    if (title) title.id = 'quick-view-title';
    quickViewEl.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeQuickView() {
    if (!quickViewEl) return;
    quickViewEl.hidden = true;
    if (!cartOpen) document.body.style.overflow = '';
  }

  window.StrideQuickView = { open: openQuickView, close: closeQuickView };

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
     Mobile Nav Toggle
     ----------------------------------------------------------------------- */
  function initNavToggle() {
    var btn = $('.nav-toggle');
    var nav = $('#mobile-nav');
    if (!btn || !nav) return;

    btn.addEventListener('click', function () {
      var open = nav.classList.contains('is-open');
      if (open) {
        nav.classList.remove('is-open');
        btn.classList.remove('is-active');
        btn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      } else {
        nav.classList.add('is-open');
        btn.classList.add('is-active');
        btn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        btn.classList.remove('is-active');
        btn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
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
    loadCart();
    initDrawer();
    renderCart();
    initReveal();
  }

  window.StrideReveal = initReveal;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
