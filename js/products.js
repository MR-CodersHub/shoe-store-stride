/* ==========================================================================
   Stride — products behaviour
   1) products.html: renders the product listing grid with filter chips + search
   2) product-details.html?id=...: renders the full product detail page
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
    var href = 'product-details.html?id=' + encodeURIComponent(p.id);
    return (
      '<article class="product-card" data-reveal>' +
        '<a class="product-card__media" href="' + href + '" tabindex="-1" aria-hidden="true">' +
          badgeMarkup(p) +
          '<img src="' + esc(p.image) + '" alt="' + esc(p.imageAlt) + '" loading="lazy" decoding="async" />' +
        '</a>' +
        '<div class="product-card__body">' +
          '<span class="product-card__brand">' + esc(p.brand) + '</span>' +
          '<h3 class="product-card__name"><a href="' + href + '">' + esc(p.name) + '</a></h3>' +
          colorsMarkup(p) +
          ratingMarkup(p) +
          priceMarkup(p) +
          '<a class="product-card__cta" href="' + href + '">View details <span aria-hidden="true">→</span></a>' +
        '</div>' +
      '</article>'
    );
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
     product-details.html?id=... — full detail page
     ----------------------------------------------------------------------- */
  function statsMarkup(stats) {
    return stats.map(function (st) {
      return (
        '<div class="stat">' +
          '<div class="stat__value">' + esc(st.value) + '</div>' +
          '<div class="stat__label">' + esc(st.label) + '</div>' +
        '</div>'
      );
    }).join('');
  }

  function featuresMarkup(features) {
    return features.map(function (f) {
      return (
        '<li class="feature-check" data-reveal>' +
          '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          '<div><strong>' + esc(f.title) + '</strong><p>' + esc(f.text) + '</p></div>' +
        '</li>'
      );
    }).join('');
  }

  function specsMarkup(specs) {
    return specs.map(function (row) {
      return (
        '<div class="spec">' +
          '<span class="spec__key">' + esc(row.title) + '</span>' +
          '<span class="spec__value">' + esc(row.text) + '</span>' +
        '</div>'
      );
    }).join('');
  }

  function faqMarkup(faqs) {
    return faqs.map(function (f) {
      return (
        '<div class="acc" data-accordion>' +
          '<button class="acc__btn" type="button" data-accordion-toggle aria-expanded="false">' +
            '<span>' + esc(f.q) + '</span>' +
            '<svg class="acc__icon" viewBox="0 0 24 24" width="18" height="18"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' +
          '</button>' +
          '<div class="acc__panel"><div class="acc__panel-inner">' + esc(f.a) + '</div></div>' +
        '</div>'
      );
    }).join('');
  }

  function relatedMarkup(ids) {
    return ids.map(function (id) {
      var p = DATA.getProduct(id);
      if (!p) return '';
      var href = 'product-details.html?id=' + encodeURIComponent(p.id);
      return (
        '<a class="related-product" href="' + href + '" data-reveal>' +
          '<span class="related-product__media"><img src="' + esc(p.image) + '" alt="' + esc(p.imageAlt) + '" loading="lazy" decoding="async" /></span>' +
          '<span class="related-product__body">' +
            '<span class="related-product__brand">' + esc(p.brand) + '</span>' +
            '<span class="related-product__name">' + esc(p.name) + '</span>' +
            '<span class="related-product__price">' + formatRupees(p.price) + '</span>' +
          '</span>' +
        '</a>'
      );
    }).join('');
  }

  function initProductDetails() {
    var wrap = document.querySelector('[data-product-detail]');
    if (!wrap) return;

    var params = new URLSearchParams(window.location.search);
    var id = params.get('id');
    var product = DATA.getProduct(id);

    var missing = document.querySelector('[data-product-missing]');

    if (!product) {
      if (missing) missing.hidden = false;
      wrap.innerHTML =
        '<p class="blog-empty">We could not find that product. <a href="products.html">Browse all products</a> instead.</p>';
      return;
    }

    document.title = product.name + ' — Stride';

    var hero = document.querySelector('[data-detail-hero]');
    if (hero) {
      var heroStats = statsMarkup(product.stats);
      var sizeLine = product.sizes
        ? '<span class="detail-chip">Sizes ' + esc(product.sizes.join(', ')) + '</span>'
        : '';
      hero.innerHTML =
        '<span class="page-hero__eyebrow">' +
          '<span class="hero__eyebrow-dot" aria-hidden="true"></span>' +
          esc(product.brand) + ' · ' + esc(product.category) +
        '</span>' +
        '<h1 class="page-hero__title">' + esc(product.name) + '</h1>' +
        '<div class="page-hero__lede">' + esc(product.lede) + '</div>' +
        '<div class="page-hero__rating">' + ratingMarkup(product) + '</div>' +
        '<div class="page-hero__price">' + formatRupees(product.price) +
          (product.compareAt ? '<s class="page-hero__price-old">' + formatRupees(product.compareAt) + '</s>' : '') +
        '</div>' +
        '<div class="page-hero__chips">' +
          sizeLine +
          (product.badge === 'new' ? '<span class="detail-chip detail-chip--accent">New arrival</span>' : '') +
        '</div>' +
        '<div class="page-hero__ctas">' +
          '<a href="../index.html#shop" class="btn btn--primary">Shop the collection <span aria-hidden="true">→</span></a>' +
          '<a href="contact.html" class="btn btn--ghost">Ask a fitter</a>' +
        '</div>' +
        (heroStats ? '<div class="page-hero__stats">' + heroStats + '</div>' : '');
    }

    var heroImg = document.querySelector('[data-detail-hero-image]');
    if (heroImg) {
      heroImg.innerHTML =
        '<img src="' + esc(product.image) + '" alt="' + esc(product.imageAlt) + '" loading="eager" decoding="async" />';
    }

    var features = document.querySelector('[data-detail-features]');
    if (features) features.innerHTML = featuresMarkup(product.features);

    var specs = document.querySelector('[data-detail-specs]');
    if (specs) specs.innerHTML = specsMarkup(product.specs);

    var faqs = document.querySelector('[data-detail-faqs]');
    if (faqs) {
      faqs.innerHTML = faqMarkup(product.faqs);
      if (window.StrideAccordion) window.StrideAccordion(faqs);
    }

    var related = document.querySelector('[data-detail-related]');
    if (related) related.innerHTML = relatedMarkup(product.related);

    var name = document.querySelector('[data-detail-name]');
    if (name) name.textContent = product.name;

    if (window.StrideReveal) window.StrideReveal();
  }

  /* -----------------------------------------------------------------------
     Boot
     ----------------------------------------------------------------------- */
  function init() {
    initProductList();
    initProductDetails();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
