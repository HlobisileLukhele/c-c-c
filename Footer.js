(function () {
  const inPages = window.location.pathname.includes('/pages/');
  const root = inPages ? '../' : './';

  const html = `
  <footer class="site-footer">
    <div class="footer-inner">

      <!-- Brand -->
      <div class="footer-brand">
        <img src="${root}Assets/Customer-care-center-logo.png" alt="Customer Care Centre" class="footer-logo-img" />
        <p class="footer-tagline">Empowering businesses through impactful loyalty programmes and accredited learnerships for B-BBEE excellence.</p>
      </div>

      <!-- Quick Links -->
      <div>
        <p class="footer-heading">Quick Links</p>
        <ul class="footer-links">
          <li><a href="${root}index.html">Home</a></li>
          <li><a href="${root}pages/about.html">About Us</a></li>
          <li><a href="${root}pages/services.html">Services</a></li>
          <li><a href="${root}pages/contact.html">Contact</a></li>
        </ul>
      </div>

      <!-- Services -->
      <div>
        <p class="footer-heading">Services</p>
        <ul class="footer-links">
          <li><a href="${root}pages/services.html">Loyalty Programmes</a></li>
          <li><a href="${root}pages/services.html">B-BBEE Learnerships</a></li>
          <li><a href="${root}pages/services.html">Skills Development</a></li>
          <li><a href="${root}pages/services.html">Scorecard Consulting</a></li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <p class="footer-heading">Contact Us</p>
        <div class="footer-contact-list">
          <div class="footer-contact-item">
            <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.61 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.63a16 16 0 0 0 5.76 5.76l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <div>
              <span class="footer-contact-label">Brandon</span>
              <a href="tel:0697896975">069 789 6975</a>
            </div>
          </div>
          <div class="footer-contact-item">
            <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.61 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.63a16 16 0 0 0 5.76 5.76l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <div>
              <span class="footer-contact-label">Neil</span>
              <a href="tel:0836334547">083 633 4547</a>
            </div>
          </div>
          <div class="footer-contact-item">
            <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <a href="mailto:Brandon@c-c-c.co.za">Brandon@c-c-c.co.za</a>
          </div>
          <div class="footer-contact-item">
            <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <a href="mailto:Neil@c-c-c.co.za">Neil@c-c-c.co.za</a>
          </div>
        </div>
      </div>

    </div>

    <hr class="footer-divider" />

    <div class="footer-bottom">
      <p class="footer-copy">© 2026 Customer Care Centre. All rights reserved.</p>
      <nav class="footer-legal">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </nav>
    </div>
  </footer>`;

  const placeholder = document.getElementById('footer-placeholder');
  if (placeholder) {
    placeholder.outerHTML = html;
  } else {
    document.body.insertAdjacentHTML('beforeend', html);
  }
})();
