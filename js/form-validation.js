/* ==========================================================================
   Stride — client-side form validation + success acknowledgements
   Handles any form marked with [data-form] (contact, newsletter, subscribe).
   ========================================================================== */

(function () {
  'use strict';

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var PHONE_RE = /^[+]?[\d][\d\s\-().]{6,14}$/;

  function clean(value) {
    return (value || '').trim();
  }

  function ruleViolations(field) {
    var value = clean(field.value);
    var errors = [];

    var isRequired = field.hasAttribute('required') || field.hasAttribute('data-required');
    var isEmpty = value === '';

    if (isRequired && isEmpty) {
      errors.push('This field is required.');
    }

    if (isEmpty) return errors;

    if (field.type === 'email' || field.getAttribute('data-type') === 'email') {
      if (!EMAIL_RE.test(value)) errors.push('Please enter a valid email address.');
    }
    if (field.getAttribute('data-type') === 'phone') {
      if (!PHONE_RE.test(value)) errors.push('Please enter a valid phone number.');
    }

    var min = parseInt(field.getAttribute('data-min'), 10);
    if (!isNaN(min) && value.length < min) {
      errors.push('Please enter at least ' + min + ' characters.');
    }

    var max = parseInt(field.getAttribute('data-max'), 10);
    if (!isNaN(max) && value.length > max) {
      errors.push('Please keep this under ' + max + ' characters.');
    }

    return errors;
  }

  function setFieldError(field, message) {
    field.classList.toggle('is-invalid', !!message);
    var wrap = field.closest('.field') || field.parentElement;
    var err = wrap ? wrap.querySelector('.field-error') : null;
    if (err) {
      err.textContent = message || '';
      err.hidden = !message;
    }
    return !message;
  }

  function validateField(field) {
    var errors = ruleViolations(field);
    return setFieldError(field, errors[0] || '');
  }

  function validateAll(form) {
    var allValid = true;
    Array.prototype.forEach.call(form.querySelectorAll('input, select, textarea'), function (field) {
      if (field.disabled || field.type === 'hidden' || field.type === 'submit') return;
      if (!validateField(field)) allValid = false;
    });
    return allValid;
  }

  function showSuccess(form) {
    var success = form.querySelector('[data-form-success]');
    var wasHidden = success && success.hidden;

    if (success) {
      success.hidden = false;
      if (wasHidden && typeof form.scrollIntoView === 'function') {
        var rect = success.getBoundingClientRect();
        if (rect.top < 0 || rect.bottom > window.innerHeight) {
          success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }

    if (window.StrideToast) {
      window.StrideToast(
        success
          ? 'Thank you! Your details have been received.'
          : 'Thanks — you are all set. We will be in touch.',
        'success'
      );
    }

    if (form.reset) form.reset();
    setTimeout(function () {
      Array.prototype.forEach.call(form.querySelectorAll('.is-invalid'), function (el) {
        el.classList.remove('is-invalid');
      });
    }, 120);
  }

  function showErrorSummary(form, message) {
    var summary = form.querySelector('[data-form-error]');
    if (summary) {
      summary.textContent = message;
      summary.hidden = false;
    }
    if (window.StrideToast) window.StrideToast(message, 'error');
  }

  function bindField(form, field) {
    var event = 'input';
    if (field.type === 'select-one') event = 'change';
    field.addEventListener(event, function () { validateField(field); });
    field.addEventListener('blur', function () { validateField(field); });
  }

  function initForm(form) {
    Array.prototype.forEach.call(form.querySelectorAll('input, select, textarea'), function (field) {
      if (field.type === 'hidden' || field.type === 'submit') return;
      bindField(form, field);
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateAll(form)) {
        showErrorSummary(form, 'Please fix the highlighted fields and try again.');
        var firstInvalid = form.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }
      showSuccess(form);
    });
  }

  function init() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-form]'), initForm);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
