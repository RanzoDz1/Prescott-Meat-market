/* ═══════════════════════════════════════════════════
   PRESCOTT MEAT MARKET — MAIN SCRIPT
   Vanilla JS: header, mobile menu, scroll reveal,
   reviews marquee (rAF smooth scroll), FAQ accordion
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ══════════════════════════════════════════
     STICKY HEADER
  ══════════════════════════════════════════ */
  const header = $('#site-header');
  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  /* ══════════════════════════════════════════
     MOBILE MENU
  ══════════════════════════════════════════ */
  const hamburger  = $('#hamburger');
  const mobileMenu = $('#mobile-menu');
  const mobileClose = $('#mobile-close');
  const overlay    = $('#mobile-overlay');

  function openMenu() {
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    overlay.classList.add('show');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('show');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger)   hamburger.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  if (overlay)     overlay.addEventListener('click', closeMenu);
  $$('.mobile-nav-link').forEach(l => l.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  /* ══════════════════════════════════════════
     SCROLL REVEAL
  ══════════════════════════════════════════ */
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => obs.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ══════════════════════════════════════════
     REVIEWS MARQUEE — rAF smooth infinite scroll
  ══════════════════════════════════════════ */
  const marqueeTrack = $('#reviews-marquee-track');
  const marqueeOuter = marqueeTrack ? marqueeTrack.parentElement : null;

  if (marqueeTrack && marqueeOuter) {
    /* Clone cards */
    const origCards = [...marqueeTrack.children];
    origCards.forEach(card => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('a').forEach(a => a.setAttribute('tabindex', '-1'));
      marqueeTrack.appendChild(clone);
    });

    marqueeTrack.style.animation = 'none';

    let scrollPos  = 0;
    const SPEED    = 0.6; // px per frame
    let   paused   = false;
    let   rafId    = null;
    let   halfWidth = 0;

    function measureHalf() { halfWidth = marqueeTrack.scrollWidth / 2; }

    function step() {
      if (!paused && halfWidth > 0) {
        scrollPos += SPEED;
        if (scrollPos >= halfWidth) scrollPos -= halfWidth;
        marqueeTrack.style.transform = `translateX(-${scrollPos}px)`;
      }
      rafId = requestAnimationFrame(step);
    }

    marqueeOuter.addEventListener('mouseenter', () => { paused = true;  });
    marqueeOuter.addEventListener('mouseleave', () => { paused = false; });

    let touchTimer = null;
    marqueeOuter.addEventListener('touchstart', () => {
      paused = true;
      clearTimeout(touchTimer);
    }, { passive: true });
    marqueeOuter.addEventListener('touchend', () => {
      touchTimer = setTimeout(() => { paused = false; }, 2000);
    }, { passive: true });

    window.addEventListener('load', () => {
      measureHalf();
      step();
    });

    if (document.readyState === 'complete') {
      measureHalf();
      if (!rafId) step();
    }

    window.addEventListener('resize', measureHalf, { passive: true });
  }

  /* ══════════════════════════════════════════
     FAQ ACCORDION
  ══════════════════════════════════════════ */
  $$('.faq-item').forEach(item => {
    const btn = $('.faq-question', item);
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      $$('.faq-item').forEach(fi => {
        fi.classList.remove('open');
        const q = $('.faq-question', fi);
        if (q) q.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) { item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    });
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
    });
  });

  /* ══════════════════════════════════════════
     SMOOTH SCROLL
  ══════════════════════════════════════════ */
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const hH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 80;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - hH - 8, behavior: 'smooth' });
    });
  });

  /* ══════════════════════════════════════════
     ACTIVE NAV HIGHLIGHT
  ══════════════════════════════════════════ */
  const sections = $$('section[id]');
  const navLinks = $$('.nav-link');
  window.addEventListener('scroll', () => {
    const hH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 80;
    const pos = window.scrollY + hH + 40;
    let activeId = null;
    sections.forEach(s => { if (s.offsetTop <= pos) activeId = s.id; });
    navLinks.forEach(l => {
      if (l.getAttribute('href') === '#' + activeId) {
        l.style.color = 'var(--primary)';
        l.style.setProperty('--pseudo-width', '100%'); 
      } else {
        l.style.color = '';
        l.style.setProperty('--pseudo-width', '0');
      }
    });
  }, { passive: true });

})();
