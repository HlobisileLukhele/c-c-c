(function () {
  const path = window.location.pathname;
  const inPages = path.includes('/pages/');
  const root = inPages ? '../' : './';

  const links = [
    { href: `${root}index.html`,         label: 'Home',     key: 'home' },
    { href: `${root}pages/about.html`,   label: 'About',    key: 'about' },
    { href: `${root}pages/services.html`,label: 'Services', key: 'services' },
    { href: `${root}pages/contact.html`, label: 'Contact',  key: 'contact' },
  ];

  function getActive() {
    if (path.includes('about'))    return 'about';
    if (path.includes('services')) return 'services';
    if (path.includes('contact'))  return 'contact';
    return 'home';
  }

  const active = getActive();

  function navItems() {
    return links.map(l => {
      const isActive = l.key === active;
      const attrs = isActive ? ' class="active" aria-current="page"' : '';
      return `<li><a href="${l.href}"${attrs}>${l.label}</a></li>`;
    }).join('\n      ');
  }

  const html = `
  <nav class="navbar" id="navbar" role="navigation" aria-label="Main navigation">
    <a href="${root}index.html" class="logo" aria-label="CustomerCareCentre home">
      <img src="${root}Assets/Customer-care-center-logo.png" alt="Customer Care Centre" class="logo-img" />
    </a>
    <ul class="nav-links" role="list">
      ${navItems()}
    </ul>
    <a href="${root}pages/contact.html" class="btn-cta" aria-label="Get started with CustomerCareCentre">Get Started</a>
    <button class="hamburger" id="hamburger" aria-label="Toggle mobile menu" aria-expanded="false" aria-controls="mobile-menu">
      <span></span><span></span><span></span>
    </button>
  </nav>
  <div class="mobile-menu" id="mobile-menu" role="dialog" aria-label="Mobile navigation">
    <ul role="list">
      ${navItems()}
    </ul>
    <div class="mobile-divider" aria-hidden="true"></div>
    <a href="${root}pages/contact.html" class="btn-cta">Get Started</a>
  </div>`;

  const placeholder = document.getElementById('navbar-placeholder');
  if (placeholder) {
    placeholder.outerHTML = html;
  } else {
    document.body.insertAdjacentHTML('afterbegin', html);
  }
})();
