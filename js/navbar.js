/* ==========================================================================
   Stride — shared navbar, utility bar, cart drawer and footer
   Injected into every public page so the layout is identical site-wide.
   ========================================================================== */

(function () {
  'use strict';

  if (window.StrideNavInjected) return;
  window.StrideNavInjected = true;

  /* -----------------------------------------------------------------------
     Helpers
     ----------------------------------------------------------------------- */
  var currentFile = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var isIndex = currentFile === 'index.html';
  var root = isIndex ? './' : '../';

  var NAV = [
    { label: 'Home', target: 'index.html' },
    { label: 'Home 2', target: 'home-2.html' },
    { label: 'About', target: 'about.html' },
    { label: 'Products', target: 'products.html' },
    { label: 'Blog', target: 'blog.html' },
    { label: 'Contact', target: 'contact.html' }
  ];

  function hrefFor(target, anchor) {
    var base = target === 'index.html' ? root + 'index.html' : root + 'pages/' + target;
    return anchor ? base + '#' + anchor : base;
  }

  function isActive(target) {
    if (currentFile === 'index.html') {
      return target === 'index.html';
    }
    return currentFile === target;
  }

  /* -----------------------------------------------------------------------
     Header markup
     ----------------------------------------------------------------------- */
  var navLinks = NAV.map(function (n) {
    var cls = 'primary-nav__link' + (isActive(n.target) ? ' is-active' : '');
    return '<a href="' + hrefFor(n.target, n.anchor) + '" class="' + cls + '">' + n.label + '</a>';
  }).join('');

  var mobileLinks = NAV.map(function (n) {
    var cls = 'mobile-nav__link' + (isActive(n.target) ? ' is-active' : '');
    return '<a href="' + hrefFor(n.target, n.anchor) + '" class="' + cls + '">' + n.label + '</a>';
  }).join('');

  var headerHTML =

    '<header class="header" data-reveal>' +
    '<div class="header__inner">' +
    '<a href="' + root + 'index.html" class="brand" aria-label="Stride — home">' +
    '<img src="' + root + 'assets/logo.png" alt="STRIDE Logo" class="brand__logo-img" />' +
    '<span class="brand__word">STRIDE</span>' +
    '</a>' +

    '<nav class="primary-nav" aria-label="Primary">' + navLinks + '</nav>' +

    '<div class="header__actions">' +
    '<form class="search" role="search" aria-label="Search products" data-site-search>' +
    '<span class="search__icon" aria-hidden="true">' +
    '<svg viewBox="0 0 24 24" width="16" height="16"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M16 16l4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>' +
    '</span>' +
    '<input type="search" placeholder="Search for shoes, brands…" aria-label="Search products" class="search__input" data-search-input />' +
    '</form>' +

    '<button class="icon-btn icon-btn--theme" type="button" data-theme-toggle aria-label="Toggle dark mode">' +
    '<svg class="icon-sun" viewBox="0 0 24 24" width="18" height="18"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>' +
    '<svg class="icon-moon" viewBox="0 0 24 24" width="18" height="18"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>' +
    '</button>' +

    '<button class="icon-btn icon-btn--rtl" type="button" data-rtl-toggle aria-label="Toggle RTL layout">RTL</button>' +

    '<button class="icon-btn icon-btn--cart" type="button" aria-label="Open cart" data-cart-toggle>' +
    '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M5 8h14l-1.2 11.2A2 2 0 0 1 15.8 21H8.2a2 2 0 0 1-2-1.8L5 8z M9 8V6a3 3 0 1 1 6 0v2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>' +
    '<span class="icon-btn__count" data-cart-count hidden>0</span>' +
    '</button>' +

    '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Toggle navigation">' +
    '<span class="nav-toggle__line"></span>' +
    '<span class="nav-toggle__line"></span>' +
    '<span class="nav-toggle__line"></span>' +
    '</button>' +
    '</div>' +
    '</div>' +

    '<nav id="mobile-nav" class="mobile-nav" aria-label="Mobile">' +
    mobileLinks +
    '<div class="mobile-nav__row">' +
    '</div>' +
    '</nav>' +
    '</header>';

  /* -----------------------------------------------------------------------
     Footer markup
     ----------------------------------------------------------------------- */
  var footerHTML =
    '<footer class="footer">' +
    '<div class="footer__top">' +
    '<div class="footer__col footer__col--wide">' +
    '<a href="' + root + 'index.html" class="brand footer__brand" aria-label="Stride — home" style="margin-bottom: 1rem; display: inline-flex; align-items: center; text-decoration: none;">' +
    '<img src="' + root + 'assets/logo.png" alt="STRIDE Logo" class="brand__logo-img" />' +
    '<span class="brand__word" style="color: #ffffff; font-weight: 800; font-size: 1.25rem; letter-spacing: 0.05em;">STRIDE</span>' +
    '</a>' +
    '<p>' +
    '14 Khader Nawaz Khan Road,<br />' +
    'Nungambakkam, Chennai 600 006' +
    '</p>' +
    '<p>' +
    '<a href="mailto:hello@stride.shop">hello@stride.shop</a><br />' +
    '<a href="tel:+914412345678">+91 44 1234 5678</a>' +
    '</p>' +
    '<div class="footer__social" aria-label="Social media">' +
    '<a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" width="18" height="18"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a>' +
    '<a href="#" aria-label="Twitter"><svg viewBox="0 0 24 24" width="18" height="18"><path d="M4 4l7 9-7 7h2.5l5.5-5.5L17 20h3l-7.5-9.5L19 4h-2.5l-5 5L8 4H4z" fill="currentColor"/></svg></a>' +
    '<a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" width="18" height="18"><path d="M13 22v-8h3l1-4h-4V7.5c0-1.1.4-2 2-2h2V2.2C16.4 2.1 15.2 2 14 2c-3 0-5 1.8-5 5v3H6v4h3v8h4z" fill="currentColor"/></svg></a>' +
    '</div>' +
    '</div>' +
    '<div class="footer__col">' +
    '<h3 class="footer__title">Company</h3>' +
    '<ul>' +
    '<li><a href="' + root + 'index.html">Home</a></li>' +
    '<li><a href="' + root + 'pages/home-2.html">Home 2</a></li>' +
    '<li><a href="' + root + 'pages/about.html">Our story</a></li>' +
    '<li><a href="' + root + 'pages/products.html">Products</a></li>' +
    '<li><a href="' + root + 'pages/blog.html">Journal</a></li>' +
    '</ul>' +
    '</div>' +
    '<div class="footer__col">' +
    '<h3 class="footer__title">Help</h3>' +
    '<ul>' +
    '<li><a href="' + root + 'pages/contact.html">Contact us</a></li>' +
    '<li><a href="' + root + 'pages/pricing.html">Pricing </a></li>' +
    '<li><a href="' + root + 'pages/FAQ.html">FAQs</a></li>' +
    '<li><a href="' + root + 'pages/Terms-of-service.html">Terms & Service</a></li>' +
    '<li><a href="' + root + 'pages/Privacy-policy.html">Privacy Policy</a></li>' +
    '</ul>' +
    '</div>' +
    '<div class="footer__col">' +
    '<h3 class="footer__title">Shop</h3>' +
    '<ul>' +
    '<li><a href="' + root + 'pages/products.html?cat=sale">Sale</a></li>' +
    '<li><a href="' + root + 'pages/products.html?cat=sports">Sports</a></li>' +
    '<li><a href="' + root + 'pages/products.html?cat=kids">Kids</a></li>' +
    '<li><a href="' + root + 'pages/products.html?cat=women">Women</a></li>' +
    '<li><a href="' + root + 'pages/products.html?cat=men">Men</a></li>' +
    '</ul>' +
    '</div>' +
    '</div>' +

    '<div class="footer__bottom">' +
    '<span class="small-caps">Made with care in Chennai</span>' +
    '<div class="footer__pay" aria-label="Payment methods">' +
    '<span>COD</span><span>Rupay</span><span>UPI</span><span>MC</span><span>VISA</span>' +
    '</div>' +
    
    '<span class="small-caps">© 2026 Stride Footwear Pvt. Ltd.</span>' +
    '</div>' +
    '</footer>';

  /* -----------------------------------------------------------------------
     Cart drawer markup (injected on every page — shared by js/main.js)
     ----------------------------------------------------------------------- */
  var drawerHTML =
    '<div class="drawer" data-cart-drawer hidden>' +
    '<div class="drawer__overlay" data-drawer-close></div>' +
    '<aside class="drawer__panel" role="dialog" aria-label="Shopping cart">' +
    '<header class="drawer__header">' +
    '<h2 class="drawer__title">Your bag <span class="drawer__count" data-drawer-count>(0)</span></h2>' +
    '<button class="drawer__close" type="button" data-drawer-close aria-label="Close cart">' +
    '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' +
    '</button>' +
    '</header>' +
    '<div class="drawer__items" data-drawer-items>' +
    '<p class="drawer__empty">Your bag is empty. Add a pair to get started.</p>' +
    '</div>' +
    '<footer class="drawer__footer">' +
    '<div class="drawer__subtotal">' +
    '<span class="small-caps">Subtotal</span>' +
    '<span class="drawer__subtotal-value" data-drawer-subtotal>₹0</span>' +
    '</div>' +
    '<p class="drawer__note">Shipping &amp; taxes calculated at checkout.</p>' +
    '<button class="btn btn--primary btn--block" type="button" data-drawer-checkout>Checkout <span aria-hidden="true">→</span></button>' +
    '</footer>' +
    '</aside>' +
    '</div>';

  /* -----------------------------------------------------------------------
     Inject
     ----------------------------------------------------------------------- */
  document.body.insertAdjacentHTML('afterbegin', headerHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML + drawerHTML);
})();
