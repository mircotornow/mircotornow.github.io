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
    themeToggle.querySelector('.theme-toggle-icon').textContent = theme === 'dark' ? '☀' : '☾';
  };

  setTheme(document.documentElement.dataset.theme || 'light');

  themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('mirco-theme', nextTheme);
    setTheme(nextTheme);
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
