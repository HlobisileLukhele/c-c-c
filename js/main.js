/* ═══════════════════════════════════════════════════════════
   CCC — main.js
   1. Navbar scroll effect
   2. Mobile menu toggle
   3. Smooth scroll with navbar offset
   4. Intersection Observer — active nav link highlighting
   5. Scroll-reveal animations
   6. Contact form simulation
════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 1. ELEMENT REFERENCES ─────────────────────────────── */
  const navbar      = document.getElementById('navbar');
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobile-menu');
  const contactForm = document.getElementById('contact-form');
  const submitBtn   = document.getElementById('submit-btn');
  const formWrapper = document.getElementById('contact-form-wrapper');
  const formSuccess = document.getElementById('form-success');

  /* ── 2. NAVBAR SCROLL EFFECT ────────────────────────────── */
  const handleNavScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // initialise on load

  /* ── 3. MOBILE MENU ─────────────────────────────────────── */
  function openMenu() {
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Close when any mobile link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) closeMenu();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
      hamburger.focus();
    }
  });

  /* ── 4. SMOOTH SCROLL WITH NAVBAR OFFSET ───────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── 5. ACTIVE NAV LINK — INTERSECTION OBSERVER ─────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('active', isActive);
            isActive
              ? link.setAttribute('aria-current', 'page')
              : link.removeAttribute('aria-current');
          });
        }
      });
    },
    {
      // triggers when section crosses middle-ish of viewport
      rootMargin: '-35% 0px -60% 0px',
      threshold: 0,
    }
  );

  sections.forEach(section => sectionObserver.observe(section));

  /* ── 6. SCROLL-REVEAL ANIMATIONS ─────────────────────────── */
  const revealEls = document.querySelectorAll('.scroll-reveal');

  if (revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ── 7. CONTACT FORM SIMULATION ──────────────────────────── */
  if (contactForm && submitBtn && formWrapper && formSuccess) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name    = document.getElementById('contact-name')?.value.trim();
      const email   = document.getElementById('contact-email')?.value.trim();
      const message = document.getElementById('contact-message')?.value.trim();

      if (!name || !email || !message) {
        // Highlight empty fields
        [
          { id: 'contact-name',    val: name },
          { id: 'contact-email',   val: email },
          { id: 'contact-message', val: message },
        ].forEach(({ id, val }) => {
          const el = document.getElementById(id);
          if (el && !val) {
            el.style.borderColor = '#ef4444';
            el.addEventListener('input', () => { el.style.borderColor = ''; }, { once: true });
          }
        });
        return;
      }

      // Step 1 — disable & show loading
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      // Step 2 — after 1.5s, swap form for success message
      setTimeout(() => {
        formWrapper.style.display = 'none';
        formSuccess.style.display = 'flex';
      }, 1500);
    });
  }

})();
