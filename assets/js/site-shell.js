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
            <span class="brand-mark">
              <img src="resources/logo-dark.svg" alt="MT" class="brand-mark-img" />
            </span>
            <span class="brand-text">${data.brand.name}</span>
          </a>
          <nav class="nav" aria-label="Primary">
            ${navItems
              .map((item) => {
                const href = item.label === 'Contact' ? contactHref : item.href;
                const key = item.label.toLowerCase();
                const current = key === pageKey ? ' class="is-active" aria-current="page"' : '';
                return `<a href="${href}" data-nav="${key}"${current}>${item.label}</a>`;
              })
              .join('')}
            <button class="theme-toggle" type="button" aria-label="Toggle dark mode" aria-pressed="false">
              <svg class="theme-toggle-icon theme-toggle-moon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
              </svg>
              <svg class="theme-toggle-icon theme-toggle-sun" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            </button>
          </nav>
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