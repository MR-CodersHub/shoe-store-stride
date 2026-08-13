/* ==========================================================================
   Stride — products behaviour
   products.html: renders the product listing grid with filter chips + search
   "View details" opens a quick-view modal (StrideQuickView) instead of a
   dedicated detail page.
   ========================================================================== */

(function () {
  'use strict';

  var DATA = window.STRIDE_DATA;
  if (!DATA) return;

  function esc(str) {
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

  function starsMarkup(rating) {
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

  function ratingMarkup(p) {
    return (
      '<span class="product-card__rating" aria-label="Rated ' + esc(p.rating) + ' out of 5">' +
        '<span class="stars" aria-hidden="true">' + starsMarkup(p.rating) + '</span>' +
        '<span class="product-card__rating-value">' + esc(p.rating) + '</span>' +
        '<span class="product-card__review-count">(' + esc(p.reviewCount) + ')</span>' +
      '</span>'
    );
  }

  function badgeMarkup(p) {
    if (!p.badge) return '';
    var label = p.badge === 'new' ? 'New' : '';
    if (p.badge === 'sale' && p.compareAt) {
      var off = Math.round((1 - p.price / p.compareAt) * 100);
      label = '-' + off + '%';
    }
    return '<span class="product-card__badge product-card__badge--' + esc(p.badge) + '">' + label + '</span>';
  }

  function priceMarkup(p) {
    var old = p.compareAt
      ? '<span class="product-card__price-old">' + formatRupees(p.compareAt) + '</span>'
      : '';
    return '<div class="product-card__price-row"><span class="product-card__price">' + formatRupees(p.price) + '</span>' + old + '</div>';
  }

  function colorsMarkup(p) {
    var colors = (p.colors || []).slice(0, 3);
    if (!colors.length) return '';
    return (
      '<div class="product-card__colors" aria-label="Colour options">' +
        colors.map(function (c) {
          return '<span class="product-card__swatch" style="background:' + esc(c) + '"></span>';
        }).join('') +
      '</div>'
    );
  }

  function cardMarkup(p) {
    var id = 'data-details="' + esc(p.id) + '"';
    return (
      '<article class="product-card" data-reveal>' +
        '<button type="button" class="product-card__media" ' + id + ' aria-label="View details for ' + esc(p.name) + '">' +
          badgeMarkup(p) +
          '<img src="' + esc(p.image) + '" alt="' + esc(p.imageAlt) + '" loading="lazy" decoding="async" />' +
        '</button>' +
        '<div class="product-card__body">' +
          '<span class="product-card__brand">' + esc(p.brand) + '</span>' +
          '<h3 class="product-card__name"><button type="button" ' + id + '>' + esc(p.name) + '</button></h3>' +
          colorsMarkup(p) +
          ratingMarkup(p) +
          priceMarkup(p) +
          '<button class="product-card__cta" type="button" ' + id + '>View details <span aria-hidden="true">→</span></button>' +
        '</div>' +
      '</article>'
    );
  }

  function openDetails(id) {
    var product = DATA.getProduct(id);
    if (!product) return;
    if (window.StrideQuickView) {
      window.StrideQuickView.open(product);
    }
  }

  /* -----------------------------------------------------------------------
     products.html — listing grid, filter chips + search
     ----------------------------------------------------------------------- */
  function initProductList() {
    var grid = document.querySelector('[data-products-grid]');
    if (!grid) return;

    var chipsBox = document.querySelector('[data-products-chips]');
    var searchInput = document.querySelector('[data-products-search]');
    var countEl = document.querySelector('[data-products-count]');
    var emptyEl = document.querySelector('[data-products-empty]');

    var params = new URLSearchParams(window.location.search);
    var urlCat = params.get('cat') || 'all';
    var urlQ = params.get('q') || '';

    var all = DATA.PRODUCTS;
    var state = { cat: urlCat.toLowerCase(), q: urlQ };

    function matches(p) {
      if (state.cat !== 'all') {
        var c = state.cat.toLowerCase();
        var pCat = (p.category || '').toLowerCase();
        var pGender = (p.gender || '').toLowerCase();

        if (c === 'sale') {
          if (p.badge !== 'sale' && !p.compareAt && !p.discount && !p.oldPrice) return false;
        } else if (c === 'sports') {
          if (pCat !== 'sports' && pCat !== 'running') return false;
        } else if (c === 'men') {
          if (pCat === 'kids' || pCat === 'women' || pGender === 'women' || pGender === 'kids') return false;
        } else if (c === 'women') {
          if (pCat === 'kids' || pGender === 'men' || pCat === 'men') return false;
        } else if (c === 'kids') {
          if (pCat !== 'kids' && pGender !== 'kids') return false;
        } else {
          if (pCat !== c && pGender !== c) return false;
        }
      }
      var q = state.q.trim().toLowerCase();
      if (!q) return true;
      var kw = Array.isArray(p.keywords) ? p.keywords.join(' ') : (p.keywords || '');
      return (p.name + ' ' + p.brand + ' ' + p.category + ' ' + kw).toLowerCase().indexOf(q) !== -1;
    }

    function chipMarkup(label, cat, n) {
      return (
        '<button class="chip' + (cat === state.cat ? ' is-active' : '') + (cat === 'sale' ? ' chip--accent' : '') + '" type="button" data-cat="' + esc(cat) + '" data-reveal>' +
          label +
          '<span class="chip__count">' + n + '</span>' +
        '</button>'
      );
    }

    function renderChips() {
      if (!chipsBox) return;

      var categoriesList = [
        { label: 'All', key: 'all' },
        { label: 'Men', key: 'men' },
        { label: 'Women', key: 'women' },
        { label: 'Kids', key: 'kids' },
        { label: 'Sports', key: 'sports' },
        { label: 'Sale', key: 'sale' }
      ];

      var html = categoriesList.map(function (item) {
        var count = all.filter(function (p) {
          var savedCat = state.cat;
          var savedQ = state.q;
          state.cat = item.key;
          state.q = '';
          var isMatch = matches(p);
          state.cat = savedCat;
          state.q = savedQ;
          return isMatch;
        }).length;

        return chipMarkup(item.label, item.key, count);
      }).join('');

      chipsBox.innerHTML = html;
      chipsBox.querySelectorAll('[data-cat]').forEach(function (chip) {
        chip.addEventListener('click', function () {
          state.cat = chip.getAttribute('data-cat');
          renderChips();
          renderGrid();
        });
      });
    }

    function renderGrid() {
      var items = all.filter(matches);
      grid.innerHTML = items.map(cardMarkup).join('');

      if (countEl) countEl.textContent = items.length;
      if (emptyEl) emptyEl.hidden = items.length !== 0;
      if (window.StrideReveal) window.StrideReveal();
    }

    grid.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-details]');
      if (!btn) return;
      e.preventDefault();
      openDetails(btn.getAttribute('data-details'));
    });

    if (searchInput) {
      if (urlQ) searchInput.value = urlQ;
      searchInput.addEventListener('input', function () {
        state.q = searchInput.value;
        renderGrid();
      });
    }

    window.addEventListener('stride:search', function (e) {
      if (e.detail && e.detail.q !== undefined) {
        state.q = e.detail.q;
        if (searchInput) searchInput.value = e.detail.q;
        renderGrid();
      }
    });

    renderChips();
    renderGrid();
  }

  /* -----------------------------------------------------------------------
     Boot
     ----------------------------------------------------------------------- */
  function init() {
    if (window.StrideCart) {
      window.StrideCart.setResolver(function (id) {
        return DATA.getProduct(id);
      });
    }
    initProductList();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
