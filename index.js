(function () {
    const cards = document.querySelectorAll('.mv-card');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -40px 0px'
    });

    cards.forEach(card => observer.observe(card));
  })();

  //About vision and mission cards animation end

  (function () {
    // Header
    const headerEls = document.querySelectorAll('.values-eyebrow, .values-title');
    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          headerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    headerEls.forEach(el => headerObserver.observe(el));

    // Value items — staggered 220ms apart (slower)
    const items = document.querySelectorAll('.value-item');
    const itemObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(items).indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 220);
          itemObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });
    items.forEach(item => itemObserver.observe(item));
  })();

  //Our journey
(function () {
    const items = document.querySelectorAll('.timeline-item');
    let triggered = false;

    function animateSequence() {
      if (triggered) return;
      triggered = true;

      items.forEach((item, index) => {
        const year = item.querySelector('.tl-year');
        const card = item.querySelector('.tl-card-box');

        // Each item starts 900ms after the previous one
        const baseDelay = index * 900;

        // Year bubble pops in first
        setTimeout(() => {
          if (year) year.classList.add('visible');
        }, baseDelay);

        // Card unfolds 400ms after its year bubble
        setTimeout(() => {
          if (card) card.classList.add('visible');
        }, baseDelay + 400);
      });
    }

    // Trigger when the first timeline item enters the viewport
    const firstItem = items[0];
    if (!firstItem) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSequence();
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -40px 0px'
    });

    observer.observe(firstItem);
  })();

  //Navigation bar animation

  const navbar     = document.getElementById('navbar');
    const hamburger  = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    // ── Scroll effect ───────────────────────────────────────────
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── Mobile menu toggle ──────────────────────────────────────
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      // prevent body scroll when menu open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // ── Close mobile menu on link click ────────────────────────
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // ── Close on outside click ──────────────────────────────────
    document.addEventListener('click', (e) => {
      if (
        mobileMenu.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // ── Close on Escape key ─────────────────────────────────────
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        hamburger.focus();
      }
    });

    // ── Active link on scroll (for multi-section pages) ─────────
    // Replace section IDs with your actual page section IDs
    const sections = document.querySelectorAll('section[id]');
    const allLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

    if (sections.length) {
      const activateLink = () => {
        let current = '';
        sections.forEach(sec => {
          if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
        });
        allLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
          if (link.classList.contains('active')) {
            link.setAttribute('aria-current', 'page');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      };
      window.addEventListener('scroll', activateLink, { passive: true });
    }

  // ── Scroll animation helper ──────────────────────────────────
  function observe(selector, opts, stagger) {
    const els = document.querySelectorAll(selector);
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const delay = stagger ? Array.from(els).indexOf(entry.target) * stagger : 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        obs.unobserve(entry.target);
      });
    }, opts || { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => obs.observe(el));
  }

  // ── About page animations ────────────────────────────────────
  observe('.about-text, .about-image', { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }, 0);

  // ── Contact page animations ──────────────────────────────────
  observe('.contact-eyebrow, .contact-title, .contact-subtitle', { threshold: 0.2 }, 150);
  observe('.cinfo-col, .cform-col', { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }, 0);

  // ── Services page animations ─────────────────────────────────
  observe('.services-banner-eyebrow, .services-banner-title, .services-banner-subtitle', { threshold: 0.2 }, 150);
  observe('.loyalty-text, .loyalty-image', { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }, 0);
  observe('.learn-image, .learn-text', { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }, 0);
  observe('.scorecard-eyebrow, .scorecard-title, .scorecard-subtitle', { threshold: 0.2 }, 150);
  observe('.scorecard-card', { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }, 150);
  observe('.build-title, .build-subtitle, .build-btn', { threshold: 0.2 }, 150);

//Table animation on model page
   (function() {
      // Intersection Observer for fade-in animations (heading + table)
      const heading = document.getElementById('modelHeading');
      const tableWrap = document.getElementById('tableWrap');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      
      if (heading) observer.observe(heading);
      if (tableWrap) observer.observe(tableWrap);
    })();