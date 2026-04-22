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

 // ========================
// SECURE FORM HANDLER – NO reCAPTCHA, EMAIL NOTIFICATION READY
// ========================
(function() {
    // REPLACE WITH YOUR GOOGLE APPS SCRIPT WEB APP URL (CORS-ENABLED)
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxTlqE9VfrmKLhG_o99jY5_6bLOzW5tEJOvRNRuoH_FSiABe5OkUQvx_3tqjdAz81nRzg/exec';

    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    let statusDiv = document.getElementById('form-status');

    if (!statusDiv) {
        statusDiv = document.createElement('div');
        statusDiv.id = 'form-status';
        statusDiv.style.marginTop = '1rem';
        statusDiv.style.fontSize = '0.875rem';
        form.parentNode.insertBefore(statusDiv, form.nextSibling);
    }

    function showMessage(msg, isError) {
        statusDiv.textContent = msg;
        statusDiv.style.color = isError ? '#b91c1c' : '#166534';
        statusDiv.style.backgroundColor = isError ? '#fee2e2' : '#e6f7e6';
        statusDiv.style.padding = '0.75rem';
        statusDiv.style.borderRadius = '0.5rem';
        statusDiv.style.border = `1px solid ${isError ? '#fecaca' : '#bbf7d0'}`;
        statusDiv.style.display = 'block';
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 6000);
    }

    // ---------- RATE LIMITING (client-side) ----------
    const RATE_LIMIT = 3;
    const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

    function isRateLimited() {
        const now = Date.now();
        const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
        const recent = submissions.filter(ts => now - ts < RATE_WINDOW);
        localStorage.setItem('contact_submissions', JSON.stringify(recent));
        return recent.length >= RATE_LIMIT;
    }

    function recordSubmission() {
        const now = Date.now();
        const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
        submissions.push(now);
        localStorage.setItem('contact_submissions', JSON.stringify(submissions));
    }

    // ---------- IMPROVED SANITISATION ----------
    function sanitiseString(raw) {
        if (!raw) return '';
        let cleaned = raw.trim();
        cleaned = cleaned.replace(/javascript:/gi, '');
        cleaned = cleaned.replace(/vbscript:/gi, '');
        let previous;
        do {
            previous = cleaned;
            cleaned = cleaned.replace(/<[^>]*>/g, '');
        } while (cleaned !== previous);
        const div = document.createElement('div');
        div.textContent = cleaned;
        return div.textContent;
    }

    // ---------- MALICIOUS PATTERN DETECTION ----------
    function containsMaliciousPatterns(str) {
        const patterns = [
            /<script/i, /<\/script/i, /on\w+\s*=/i, /eval\(/i,
            /document\.cookie/i, /alert\(/i, /confirm\(/i, /prompt\(/i,
            /expression\(/i, /--\+/, /union\s+select/i, /exec\s*\(/i,
            /\.\.\/|\.\.\\/, /base64,/, /%3Cscript/i, /&#60;script/i,
            /\\u003c/i, /<iframe/i, /<embed/i, /fromCharCode/i
        ];
        return patterns.some(regex => regex.test(str));
    }

    // ---------- FIXED VALIDATOR (factory function) ----------
    function createFieldValidator(fieldName) {
        let value = '';
        const errors = [];
        return {
            validate: function(raw) {
                value = raw;
                return this;
            },
            notEmpty: function(msg) {
                if (!value || value.trim().length === 0) {
                    errors.push(msg || `${fieldName} is required.`);
                }
                return this;
            },
            min: function(len, msg) {
                if (value.length < len) {
                    errors.push(msg || `${fieldName} must be at least ${len} characters.`);
                }
                return this;
            },
            max: function(len, msg) {
                if (value.length > len) {
                    errors.push(msg || `${fieldName} must be at most ${len} characters.`);
                }
                return this;
            },
            email: function(msg) {
                const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errors.push(msg || `Invalid email address.`);
                }
                return this;
            },
            noMalicious: function(msg) {
                if (containsMaliciousPatterns(value)) {
                    errors.push(msg || `${fieldName} contains forbidden content.`);
                }
                return this;
            },
            sanitise: function() {
                value = sanitiseString(value);
                return this;
            },
            getResult: function() {
                return { value, errors: [...errors] };
            }
        };
    }

    function validateFormData(nameRaw, emailRaw, serviceRaw, messageRaw) {
        const nameVal = createFieldValidator('Name')
            .validate(nameRaw)
            .notEmpty()
            .min(2)
            .max(60)
            .noMalicious()
            .sanitise()
            .getResult();

        const emailVal = createFieldValidator('Email')
            .validate(emailRaw)
            .notEmpty()
            .email()
            .max(100)
            .noMalicious()
            .sanitise()
            .getResult();

        const serviceVal = createFieldValidator('Service')
            .validate(serviceRaw)
            .notEmpty('Please select a service.')
            .max(50)
            .noMalicious()
            .sanitise()
            .getResult();

        const msgVal = createFieldValidator('Message')
            .validate(messageRaw)
            .notEmpty()
            .min(10)
            .max(2000)
            .noMalicious()
            .sanitise()
            .getResult();

        const errors = [...nameVal.errors, ...emailVal.errors, ...serviceVal.errors, ...msgVal.errors];
        return {
            valid: errors.length === 0,
            errors,
            sanitised: {
                name: nameVal.value,
                email: emailVal.value,
                service: serviceVal.value,
                message: msgVal.value
            }
        };
    }

    // ---------- STEALTH HONEYPOT ----------
    function isHoneypotFilled() {
        const honeypot = document.getElementById('contact-website');
        return honeypot && honeypot.value.trim() !== '';
    }

    // ---------- MAIN SUBMIT HANDLER (CORS, no reCAPTCHA) ----------
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (isHoneypotFilled()) {
            showMessage('Thank you! Your message has been received.', false);
            form.reset();
            return;
        }

        if (isRateLimited()) {
            showMessage('Too many messages. Please try again in an hour.', true);
            return;
        }

        const nameRaw = document.getElementById('contact-name').value;
        const emailRaw = document.getElementById('contact-email').value;
        const serviceRaw = document.getElementById('contact-service').value;
        const messageRaw = document.getElementById('contact-message').value;

        const validation = validateFormData(nameRaw, emailRaw, serviceRaw, messageRaw);
        if (!validation.valid) {
            showMessage(validation.errors.join(' '), true);
            return;
        }

        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending …';

       // Inside your submit handler, after validation
try {
    // Convert sanitised data to URL-encoded string
    const formData = new URLSearchParams();
    formData.append('name', validation.sanitised.name);
    formData.append('email', validation.sanitised.email);
    formData.append('service', validation.sanitised.service);
    formData.append('message', validation.sanitised.message);

    await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',               // still no-cors, but now no preflight
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'  // simple header
        },
        body: formData.toString()
    });
    // With no-cors, we cannot read response, so assume success
    recordSubmission();
    showMessage('✓ Message sent! We’ll get back to you soon.', false);
    form.reset();
} catch (err) {
    console.error(err);
    showMessage('❌ Failed to send. Please try again later.', true);
}
    });
})();

})();

