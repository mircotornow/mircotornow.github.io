(() => {
  const savedTheme = localStorage.getItem('mirco-theme');
  const browserPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (browserPrefersDark ? 'dark' : 'light');

  document.documentElement.dataset.theme = theme;
})();