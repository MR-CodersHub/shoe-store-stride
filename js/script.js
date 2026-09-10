/* ==========================================================================
   Stride — Ecommerce landing page script
   ========================================================================== */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  /* -----------------------------------------------------------------------
       Helpers
       ----------------------------------------------------------------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const formatRupees = (value) =>
    '₹' + Math.round(value).toLocaleString('en-IN');

  const inrSymbol = '₹';

  /* -----------------------------------------------------------------------
       State
       ----------------------------------------------------------------------- */
  const state = {
    catalog: [],
    category: 'all',
    sort: 'featured',
    query: '',
    wishlist: new Set(),
  };

  /* -----------------------------------------------------------------------
       Load catalog from inline JSON
       ----------------------------------------------------------------------- */
  function loadCatalog() {
    const dataEl = document.getElementById('catalog-data');
    if (!dataEl) return [];
    try {
      return JSON.parse(dataEl.textContent);
    } catch (e) {
      console.error('Failed to parse catalog data', e);
      return [];
    }
  }

  /* -----------------------------------------------------------------------
       Counts per category (for chips)
       ----------------------------------------------------------------------- */
  function updateChipCounts() {
    const counts = { all: state.catalog.length };
    state.catalog.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    counts.sale = state.catalog.filter((p) => p.badge === 'sale').length;

    $$('[data-count-for]').forEach((el) => {
      const key = el.getAttribute('data-count-for');
      if (counts[key] != null) el.textContent = counts[key];
    });
  }

  /* -----------------------------------------------------------------------
       Render product grid
       ----------------------------------------------------------------------- */
  function applyFilterAndSort() {
    let list = state.catalog.slice();

    if (state.query) {
      const q = state.query.toLowerCase();
      list = list.filter((p) =>
        (p.name + ' ' + p.brand + ' ' + p.category).toLowerCase().includes(q)
      );
    }

    if (state.category === 'sale') {
      list = list.filter((p) => p.badge === 'sale');
    } else if (state.category !== 'all') {
      list = list.filter((p) => p.category === state.category);
    }

    switch (state.sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        list.sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0));
        break;
      default:
        // featured — keep original order
        break;
    }
    return list;
  }

  function productCardMarkup(p) {
    const badge = p.badge
      ? `<span class="product-card__badge product-card__badge--${p.badge}">${p.badge === 'sale' ? `-${p.discount}%` : 'New'}</span>`
      : '';

    const wishActive = state.wishlist.has(p.id) ? 'is-active' : '';

    const priceOld = p.oldPrice
      ? `<span class="product-card__price-old">${formatRupees(p.oldPrice)}</span>`
      : '';

    const swatches = p.colors
      .slice(0, 3)
      .map(
        (c) =>
          `<span class="product-card__swatch" style="background:${c}" title="${c}"></span>`
      )
      .join('');

    const fallbackUrl = `pages/products.html`;

    return `
      <article class="product-card" data-product-id="${p.id}">
        <a class="product-card__media" href="${fallbackUrl}" data-quickview="${p.id}">
          ${badge}
          <button class="product-card__wish ${wishActive}" type="button" data-wish="${p.id}" aria-label="Add ${p.name} to wishlist" aria-pressed="${wishActive ? 'true' : 'false'}">
            <svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
          </button>
          <img src="${p.image}" alt="${p.brand} ${p.name} in colour" loading="lazy" decoding="async" />
        </a>
        <div class="product-card__body">
          <span class="product-card__brand">${p.brand}</span>
          <h3 class="product-card__name"><a href="${fallbackUrl}" data-quickview="${p.id}">${p.name}</a></h3>
          <div class="product-card__colors" aria-label="Available colours">${swatches}</div>
          <div class="product-card__price-row">
            <span class="product-card__price">${formatRupees(p.price)}</span>
            ${priceOld}
          </div>
          <button class="product-card__cta" type="button" data-add="${p.id}">Add to bag</button>
        </div>
      </article>
    `;
  }

  function renderProducts() {
    const grid = $('[data-product-grid]');
    const empty = $('[data-empty]');
    if (!grid) return;

    const list = applyFilterAndSort();

    grid.innerHTML = list.map(productCardMarkup).join('');
    if (empty) empty.hidden = list.length > 0;

    // Update results label
    const label = $('[data-catalog-label]');
    const count = $('[data-results-count]');
    const catLabels = {
      all: 'All footwear',
      men: "Men's footwear",
      women: "Women's footwear",
      kids: "Kids' footwear",
      sports: 'Sports footwear',
      sale: 'On sale',
    };
    if (label) label.textContent = catLabels[state.category] || 'Footwear';
    if (count)
      count.textContent = `${list.length} style${list.length === 1 ? '' : 's'}`;
  }

  /* -----------------------------------------------------------------------
       Catalog interactions: chips + sort
       ----------------------------------------------------------------------- */
  function initFilter() {
    $$('.chip[data-filter]').forEach((chip) => {
      chip.addEventListener('click', () => {
        const next = chip.getAttribute('data-filter');
        if (state.category === next) return;
        state.category = next;
        $$('.chip').forEach((c) => c.classList.toggle('is-active', c === chip));
        renderProducts();
      });
    });
  }

  function initSort() {
    const sel = $('[data-sort]');
    if (!sel) return;
    sel.addEventListener('change', () => {
      state.sort = sel.value;
      renderProducts();
    });
  }

  /* -----------------------------------------------------------------------
       Search — live header input + cross-page ?q parameter
       ----------------------------------------------------------------------- */
  function initSearch() {
    const input = $('[data-search-input]');
    if (!input) return;

    input.addEventListener('input', () => {
      state.query = input.value.trim();
      renderProducts();
    });

    window.addEventListener('stride:search', (e) => {
      state.query = (e.detail && e.detail.q) || '';
      if (input) input.value = state.query;
      renderProducts();
    });

    let params = null;
    try {
      params = new URLSearchParams(window.location.search);
    } catch (err) {
      /* ignore */
    }
    if (params && params.get('q')) {
      state.query = params.get('q').trim();
      if (input) input.value = state.query;
    }
  }

  /* -----------------------------------------------------------------------
       Grid actions — quick view, add to cart, wishlist (delegated)
       ----------------------------------------------------------------------- */
  function initGridActions() {
    const grid = $('[data-product-grid]');
    if (!grid) return;

    grid.addEventListener('click', (e) => {
      const addBtn = e.target.closest('[data-add]');
      const wishBtn = e.target.closest('[data-wish]');
      const quickBtn = e.target.closest('[data-quickview]');

      if (addBtn) {
        e.preventDefault();
        const id = addBtn.getAttribute('data-add');
        addToCart(id, addBtn);
      } else if (wishBtn) {
        e.preventDefault();
        const id = wishBtn.getAttribute('data-wish');
        toggleWishlist(id, wishBtn);
      } else if (quickBtn) {
        e.preventDefault();
        const id = quickBtn.getAttribute('data-quickview');
        const product = state.catalog.find((p) => p.id === id);
        if (product && window.StrideQuickView) {
          window.StrideQuickView.open(product);
        }
      }
    });
  }

  /* -----------------------------------------------------------------------
       Add to cart — shared drawer (StrideCart from js/main.js)
       ----------------------------------------------------------------------- */
  function addToCart(id, buttonEl) {
    if (!window.StrideCart) return;
    window.StrideCart.add(id);

    // visual confirmation on the card
    if (buttonEl) {
      const original = buttonEl.textContent;
      buttonEl.classList.add('is-added');
      buttonEl.textContent = 'Added ✓';
      setTimeout(() => {
        buttonEl.classList.remove('is-added');
        buttonEl.textContent = original;
      }, 1400);
    }
  }

  /* -----------------------------------------------------------------------
       Wishlist
       ----------------------------------------------------------------------- */
  function toggleWishlist(id, buttonEl) {
    if (state.wishlist.has(id)) {
      state.wishlist.delete(id);
      if (buttonEl) {
        buttonEl.classList.remove('is-active');
        buttonEl.setAttribute('aria-pressed', 'false');
      }
    } else {
      state.wishlist.add(id);
      if (buttonEl) {
        buttonEl.classList.add('is-active');
        buttonEl.setAttribute('aria-pressed', 'true');
      }
    }
    updateWishlistBadge();
  }

  function updateWishlistBadge() {
    const badge = $('[data-wishlist-count]');
    if (!badge) return;
    badge.hidden = state.wishlist.size === 0;
    badge.textContent = state.wishlist.size;
  }

  /* -----------------------------------------------------------------------
       Mobile nav — handled globally by js/main.js (shared navbar)
       ----------------------------------------------------------------------- */

  /* -----------------------------------------------------------------------
       Reveal-on-scroll
       ----------------------------------------------------------------------- */
  function initReveal() {
    const items = $$('[data-reveal]');
    if (!items.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    items.forEach((el) => obs.observe(el));
  }

  /* -----------------------------------------------------------------------
       Init
       ----------------------------------------------------------------------- */
  function init() {
    state.catalog = loadCatalog();
    // Show only 8 products on home page
    state.catalog = state.catalog.slice(0, 8);
    updateChipCounts();
    renderProducts();
    initFilter();
    initSort();
    initSearch();
    initGridActions();
    initReveal();

    if (window.StrideCart) {
      window.StrideCart.setResolver(
        (id) => state.catalog.find((p) => p.id === id) || null
      );
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
