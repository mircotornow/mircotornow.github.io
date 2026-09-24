(() => {
  const data = window.SITE_DATA;
  if (!data) {
    return;
  }

  const pageKey = document.body.dataset.page || 'home';
  const page = data.pages[pageKey] || data.pages.home;
  const navItems = data.nav[pageKey] || data.nav.home;
  const contactHref = pageKey === 'experience' ? '#contact' : page.contactHref;

  const headerHost = document.querySelector('[data-site-header]');
  if (headerHost) {
    headerHost.outerHTML = `
      <header class="site-header" role="banner">
        <div class="shell topbar topbar-inner">
          <a class="brand" href="${page.homeHref}" aria-label="Home">
            <span class="brand-mark">${data.brand.initials}</span>
            <span class="brand-text">${data.brand.name}</span>
          </a>
          <nav class="nav" aria-label="Primary">
            ${navItems
              .map((item) => {
                const href = item.label === 'Contact' ? contactHref : item.href;
                return `<a href="${href}">${item.label}</a>`;
              })
              .join('')}
          </nav>
          <button class="theme-toggle" type="button" aria-label="Toggle dark mode" aria-pressed="false">
            <span class="theme-toggle-icon" aria-hidden="true">☾</span>
          </button>
        </div>
      </header>
    `;
  }

  const contactHost = document.querySelector('[data-site-contact]');
  if (contactHost) {
    contactHost.outerHTML = `
      <section id="contact" class="shell section reveal contact-block">
        <div class="section-heading">
          <p class="eyebrow">${data.contact.eyebrow}</p>
          <h2>${data.contact.title}</h2>
        </div>
        <div class="contact-details">
          <p><a href="mailto:${data.contact.email}">${data.contact.email}</a></p>
          <p>${data.contact.text}</p>
        </div>
        <div class="actions">
          ${data.contact.actions
            .map(
              (action) =>
                `<a class="button button-${action.variant}" href="${action.href}" rel="noreferrer"><img class="button-icon" src="${action.icon}" alt="" aria-hidden="true" />${action.label}</a>`
            )
            .join('')}
        </div>
      </section>
    `;
  }
})();