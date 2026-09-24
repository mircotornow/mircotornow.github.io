const year = document.getElementById('year');
const revealElements = document.querySelectorAll('.reveal');

if (year) {
  year.textContent = new Date().getFullYear();
}

const themeToggle = document.querySelector('.theme-toggle');

if (themeToggle) {
  const setTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');

    const logoSrc = theme === 'dark' ? 'resources/logo-light.svg' : 'resources/logo-dark.svg';
    const faviconSrc = theme === 'dark' ? 'resources/favicon-light.svg' : 'resources/favicon-dark.svg';
    document.querySelectorAll('link[rel~="icon"]').forEach((link) => link.setAttribute('href', faviconSrc));
    document.querySelectorAll('.brand-mark-img').forEach((img) => img.setAttribute('src', logoSrc));
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#17151b' : '#f3efe6');
  };

  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
  const systemTheme = () => (systemDark.matches ? 'dark' : 'light');

  setTheme(document.documentElement.dataset.theme || 'light');

  themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    // Toggling back to the device's own theme drops the override, so the site follows the device again.
    if (nextTheme === systemTheme()) {
      localStorage.removeItem('mirco-theme');
    } else {
      localStorage.setItem('mirco-theme', nextTheme);
    }
    setTheme(nextTheme);
  });

  // Follow the device live (e.g. automatic dark mode at sunset) unless the visitor picked a theme.
  systemDark.addEventListener('change', () => {
    if (!localStorage.getItem('mirco-theme')) {
      setTheme(systemTheme());
    }
  });
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

const contactSection = document.getElementById('contact');
const pageLink = document.querySelector(`.nav a[data-nav="${document.body.dataset.page || 'home'}"]`);
const contactLink = document.querySelector('.nav a[data-nav="contact"]');

if (contactSection && pageLink && contactLink) {
  const updateActiveNav = () => {
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    const inContact = atBottom || contactSection.getBoundingClientRect().top < window.innerHeight * 0.5;
    const active = inContact ? contactLink : pageLink;

    [pageLink, contactLink].forEach((link) => {
      link.classList.toggle('is-active', link === active);
      if (link === active) {
        link.setAttribute('aria-current', link === pageLink ? 'page' : 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  updateActiveNav();
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  window.addEventListener('resize', updateActiveNav);
}
