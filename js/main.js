(function () {
  'use strict';

  /* ---------- scroll reveal ---------- */
  var reveals = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- gentle parallax ---------- */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var px = document.querySelectorAll('.px');
  var ticking = false;
  function parallax() {
    px.forEach(function (el) {
      var r = el.getBoundingClientRect();
      var sp = parseFloat(el.getAttribute('data-speed') || '0');
      var c = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.transform = 'translate3d(0,' + (-c * sp).toFixed(1) + 'px,0)';
    });
    ticking = false;
  }
  if (!reduce) {
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(parallax); }
    }, { passive: true });
    parallax();
  }

  /* ---------- before / after ---------- */
  var range = document.getElementById('compare-range');
  var beforeLayer = document.getElementById('before-layer');
  var handle = document.getElementById('handle-line');
  var imgBefore = document.getElementById('img-before');
  var imgAfter = document.getElementById('img-after');
  var tabs = document.querySelectorAll('.tab');

  function setPos(v) {
    beforeLayer.style.clipPath = 'inset(0 ' + (100 - v) + '% 0 0)';
    handle.style.left = v + '%';
  }
  range.addEventListener('input', function () { setPos(Number(range.value)); });

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var room = tab.getAttribute('data-room');
      var label = tab.getAttribute('data-label');
      tabs.forEach(function (t) { t.setAttribute('aria-pressed', t === tab ? 'true' : 'false'); });
      /* Swap these file names if your real photos use a different naming/extension */
      imgBefore.src = 'images/' + room + '-before.svg';
      imgAfter.src = 'images/' + room + '-after.svg';
      imgBefore.alt = label + ' before cleaning';
      imgAfter.alt = label + ' after cleaning';
      range.value = 50; setPos(50);
    });
  });

  /* ---------- testimonials ---------- */
  var quotes = document.querySelectorAll('.quote');
  var people = document.querySelectorAll('.person');
  var current = 0;
  var timer;
  function showQuote(i) {
    current = i;
    quotes.forEach(function (q, n) { q.classList.toggle('is-active', n === i); });
    people.forEach(function (p, n) { p.setAttribute('aria-pressed', n === i ? 'true' : 'false'); });
  }
  function startTimer() {
    clearInterval(timer);
    if (reduce) return;
    timer = setInterval(function () { showQuote((current + 1) % quotes.length); }, 6500);
  }
  people.forEach(function (p, i) {
    p.addEventListener('click', function () { showQuote(i); startTimer(); });
  });
  startTimer();

  /* ---------- FAQ ---------- */
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.parentElement;
      var open = item.classList.contains('is-open');
      document.querySelectorAll('.faq-item').forEach(function (it) {
        it.classList.remove('is-open');
        it.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!open) { item.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); }
    });
  });

  /* ---------- service cards pre-select the booking service ---------- */
  var chips = document.querySelectorAll('#service-chips .chip-btn');
  function pickService(label) {
    chips.forEach(function (c) { c.setAttribute('aria-pressed', c.textContent === label ? 'true' : 'false'); });
  }
  chips.forEach(function (c) {
    c.addEventListener('click', function () { pickService(c.textContent); });
  });
  document.querySelectorAll('.card[data-service]').forEach(function (card) {
    card.addEventListener('click', function () { pickService(card.getAttribute('data-service')); });
  });

  /* ---------- booking form ---------- */
  var form = document.getElementById('booking-form');
  var done = document.getElementById('form-done');
  var err = document.getElementById('form-error');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.elements.name.value.trim();
    var email = form.elements.email.value.trim();
    if (!name) { showError('Add your name so we know who to contact.'); return; }
    if (!/^\S+@\S+\.\S+$/.test(email)) { showError('Enter a valid email address, for example you@email.com.'); return; }
    err.hidden = true;

    /* -------------------------------------------------------------
       HOOK UP YOUR BACKEND HERE.
       Right now the form only validates and shows the thank-you card.
       Send `data` to Formspree, Web3Forms, EmailJS, your own API, etc.
       ------------------------------------------------------------- */
    var data = {
      service: (document.querySelector('#service-chips [aria-pressed="true"]') || {}).textContent,
      name: name,
      phone: form.elements.phone.value.trim(),
      email: email,
      address: form.elements.address.value.trim(),
      date: form.elements.date.value,
      frequency: form.elements.frequency.value,
      notes: form.elements.notes.value.trim()
    };
    console.log('Booking request', data);

    document.getElementById('done-title').textContent = 'Request received, ' + name.split(' ')[0] + '.';
    document.getElementById('done-text').textContent =
      'We’ll be in touch about your ' + String(data.service || 'cleaning').toLowerCase() +
      ' quote. Need us sooner? Call (614) 302-9652.';
    form.hidden = true;
    done.hidden = false;
  });

  function showError(msg) { err.textContent = msg; err.hidden = false; }

  document.getElementById('form-again').addEventListener('click', function () {
    form.reset();
    pickService('Home cleaning');
    done.hidden = true;
    form.hidden = false;
  });
})();
