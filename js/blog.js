/* ==========================================================================
   Stride — blog behaviour
   1) blog.html: renders cards + client-side search & category filter
   2) blog-details.html?id=...: renders the full article + sidebar
   ========================================================================== */

(function () {
  'use strict';

  var DATA = window.STRIDE_DATA;
  if (!DATA) return;

  /* -----------------------------------------------------------------------
     Helpers
     ----------------------------------------------------------------------- */
  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function prettyDate(iso) {
    try {
      var d = new Date(iso + 'T00:00:00');
      return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) {
      return iso;
    }
  }

  function catHref(cat) {
    return 'blog.html?cat=' + encodeURIComponent(cat);
  }

  /* -----------------------------------------------------------------------
     Shared card markup
     ----------------------------------------------------------------------- */
  function cardMarkup(p) {
    var featuredBadge = p.featured ? '<span class="blog-card__featured">Featured</span>' : '';
    return (
      '<article class="blog-card" data-reveal>' +
        '<a class="blog-card__media" href="blog-details.html?id=' + encodeURIComponent(p.id) + '" aria-label="Read: ' + esc(p.title) + '">' +
          '<img src="' + p.image + '" alt="' + esc(p.imageAlt) + '" loading="lazy" decoding="async" />' +
        '</a>' +
        '<div class="blog-card__body">' +
          '<div class="blog-card__meta">' +
            '<span class="blog-card__cat">' + esc(p.category) + '</span>' +
            '<span aria-hidden="true">·</span>' +
            '<time datetime="' + p.date + '">' + prettyDate(p.date) + '</time>' +
            '<span aria-hidden="true">·</span>' +
            '<span>' + esc(p.readTime) + '</span>' +
          '</div>' +
          '<h3 class="blog-card__title">' +
            '<a href="blog-details.html?id=' + encodeURIComponent(p.id) + '">' + esc(p.title) + '</a>' +
          '</h3>' +
          '<p class="blog-card__excerpt">' + esc(p.excerpt) + '</p>' +
          '<a class="blog-card__readmore" href="blog-details.html?id=' + encodeURIComponent(p.id) + '">' +
            'Read article <span aria-hidden="true">→</span>' +
          '</a>' +
          featuredBadge +
        '</div>' +
      '</article>'
    );
  }

  /* -----------------------------------------------------------------------
     blog.html — list, search + filter
     ----------------------------------------------------------------------- */
  function initBlogList() {
    var grid = document.querySelector('[data-blog-grid]');
    if (!grid) return;
    var DATA = window.STRIDE_DATA;

    var state = { cat: 'all', q: '' };

    /* Featured */
    var featuredWrap = document.querySelector('[data-blog-featured]');
    var featured = DATA.POSTS.find(function (p) { return p.featured; });
    if (featured && featuredWrap) {
      featuredWrap.innerHTML =
        '<a class="blog-featured__media" href="blog-details.html?id=' + encodeURIComponent(featured.id) + '">' +
          '<img src="' + featured.image + '" alt="' + esc(featured.imageAlt) + '" loading="lazy" decoding="async" />' +
        '</a>' +
        '<div class="blog-featured__body">' +
          '<span class="blog-card__cat">' + esc(featured.category) + '</span>' +
          '<h3 class="blog-featured__title">' +
            '<a href="blog-details.html?id=' + encodeURIComponent(featured.id) + '">' + esc(featured.title) + '</a>' +
          '</h3>' +
          '<p class="blog-featured__excerpt">' + esc(featured.excerpt) + '</p>' +
          '<div class="blog-featured__meta">' +
            '<span>By ' + esc(featured.author.name) + '</span>' +
            '<span aria-hidden="true">·</span>' +
            '<time datetime="' + featured.date + '">' + prettyDate(featured.date) + '</time>' +
            '<span aria-hidden="true">·</span>' +
            '<span>' + esc(featured.readTime) + '</span>' +
          '</div>' +
          '<a class="btn btn--primary" href="blog-details.html?id=' + encodeURIComponent(featured.id) + '">' +
            'Read article <span aria-hidden="true">→</span>' +
          '</a>' +
        '</div>';
    }

    /* Category chips + counts */
    var chips = Array.prototype.slice.call(document.querySelectorAll('[data-blog-cat]'));
    var counts = { all: DATA.POSTS.length };
    DATA.POSTS.forEach(function (p) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });

    chips.forEach(function (chip) {
      var key = chip.getAttribute('data-blog-cat');
      var counter = chip.querySelector('[data-count]');
      if (counter && counts[key] != null) counter.textContent = counts[key];
    });

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        state.cat = chip.getAttribute('data-blog-cat');
        chips.forEach(function (c) { c.classList.toggle('is-active', c === chip); });
        render();
      });
    });

    /* Search */
    var search = document.querySelector('[data-blog-search]');
    if (search) {
      search.addEventListener('input', function () {
        state.q = search.value.trim().toLowerCase();
        render();
      });
    }

    var empty = document.querySelector('[data-blog-empty]');
    var results = document.querySelector('[data-blog-results]');

    function render() {
      var list = DATA.POSTS.filter(function (p) {
        var okCat = state.cat === 'all' || p.category === state.cat;
        var hay = (p.title + ' ' + p.excerpt + ' ' + p.tags.join(' ')).toLowerCase();
        var okQ = !state.q || hay.indexOf(state.q) !== -1;
        return okCat && okQ;
      });

      if (empty) empty.hidden = list.length > 0;
      if (results) results.textContent = list.length + (list.length === 1 ? ' article' : ' articles');
      grid.innerHTML = list.map(cardMarkup).join('');

      if (window.StrideReveal) window.StrideReveal();
    }

    /* Honor ?cat= on load */
    try {
      var params = new URLSearchParams(window.location.search);
      var cat = params.get('cat');
      if (cat) {
        var match = chips.find(function (c) { return c.getAttribute('data-blog-cat') === cat; });
        if (match) {
          state.cat = cat;
          chips.forEach(function (c) { c.classList.toggle('is-active', c === match); });
        }
      }
    } catch (e) { /* ignore */ }

    render();
  }

  /* -----------------------------------------------------------------------
     blog-details.html?id=... — full article + sidebar
     ----------------------------------------------------------------------- */
  function renderArticleMeta() { /* meta rendered inline below */ }

  function contentMarkup(content) {
    return content.map(function (block) {
      var heading = block.heading ? '<h2>' + esc(block.heading) + '</h2>' : '';
      var paras = (block.body || []).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
      var quote = block.quote
        ? '<blockquote class="article__quote">' + esc(block.quote) + '</blockquote>'
        : '';
      return '<section>' + heading + paras + quote + '</section>';
    }).join('');
  }

  function recentMarkup(excludeId, limit) {
    var others = DATA.POSTS.filter(function (p) { return p.id !== excludeId; }).slice(0, limit);
    return others.map(function (p) {
      return (
        '<li class="widget__recent-item">' +
          '<a href="blog-details.html?id=' + encodeURIComponent(p.id) + '">' +
            '<img src="' + p.image + '" alt="" loading="lazy" decoding="async" />' +
          '</a>' +
          '<div>' +
            '<a class="widget__recent-title" href="blog-details.html?id=' + encodeURIComponent(p.id) + '">' + esc(p.title) + '</a>' +
            '<span class="widget__recent-date">' + prettyDate(p.date) + ' · ' + esc(p.category) + '</span>' +
          '</div>' +
        '</li>'
      );
    }).join('');
  }

  function initBlogDetails() {
    var wrap = document.querySelector('[data-article]');
    if (!wrap) return;

    var params = new URLSearchParams(window.location.search);
    var id = params.get('id');
    var post = DATA.getPost(id);

    var missing = document.querySelector('[data-article-missing]');

    if (!post) {
      if (missing) missing.hidden = false;
      wrap.innerHTML =
        '<p class="blog-empty">We could not find that article. <a href="blog.html">Browse all articles</a> instead.</p>';
      return;
    }

    document.title = post.title + ' — Stride';

    wrap.innerHTML =
      '<span class="blog-card__cat">' + esc(post.category) + '</span>' +
      '<h1 class="article__title">' + esc(post.title) + '</h1>' +
      '<div class="article__meta">' +
        '<span class="article__author-chip">' +
          '<img src="' + post.author.image + '" alt="" loading="lazy" decoding="async" />' +
          '<span>By <strong>' + esc(post.author.name) + '</strong> · ' + esc(post.author.role) + '</span>' +
        '</span>' +
        '<time datetime="' + post.date + '">' + prettyDate(post.date) + '</time>' +
        '<span aria-hidden="true">·</span>' +
        '<span>' + esc(post.readTime) + '</span>' +
      '</div>' +
      '<figure class="article__hero">' +
        '<img src="' + post.image + '" alt="' + esc(post.imageAlt) + '" />' +
      '</figure>' +
      '<div class="article__body">' + contentMarkup(post.content) + '</div>' +
      '<div class="article__footer">' +
        '<div class="tag-cloud" aria-label="Tags">' +
          post.tags.map(function (t) {
            return '<a class="tag" href="blog.html?cat=' + encodeURIComponent(t) + '">#' + esc(t) + '</a>';
          }).join('') +
        '</div>' +
        '<div class="author-box">' +
          '<img class="author-box__photo" src="' + post.author.image + '" alt="' + esc(post.author.name) + '" loading="lazy" />' +
          '<div>' +
            '<span class="small-caps">Written by</span>' +
            '<h3 class="author-box__name">' + esc(post.author.name) + '</h3>' +
            '<p class="author-box__role">' + esc(post.author.role) + ' at Stride.</p>' +
          '</div>' +
        '</div>' +
      '</div>';

    /* Sidebar */
    var recent = document.querySelector('[data-widget-recent]');
    if (recent) recent.innerHTML = recentMarkup(id, 4);

    var catList = document.querySelector('[data-widget-categories]');
    if (catList) {
      catList.innerHTML = DATA.categories().map(function (c) {
        var n = DATA.POSTS.filter(function (p) { return p.category === c; }).length;
        return (
          '<li class="widget__link"><a href="' + catHref(c) + '">' + esc(c) + '</a><span>' + n + '</span></li>'
        );
      }).join('');
    }

    var tagsWrap = document.querySelector('[data-widget-tags]');
    if (tagsWrap) {
      var allTags = [];
      DATA.POSTS.forEach(function (p) {
        p.tags.forEach(function (t) { if (allTags.indexOf(t) === -1) allTags.push(t); });
      });
      tagsWrap.innerHTML = allTags.map(function (t) {
        return '<a class="tag" href="blog.html?cat=' + encodeURIComponent(t) + '">#' + esc(t) + '</a>';
      }).join('');
    }

    if (window.StrideReveal) window.StrideReveal();
  }

  /* -----------------------------------------------------------------------
     Boot
     ----------------------------------------------------------------------- */
  function init() {
    initBlogList();
    initBlogDetails();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
