(() => {
  const key = 'atable-theme';
  const system = matchMedia('(prefers-color-scheme: dark)');
  const root = document.documentElement;
  let preference = 'system';

  try {
    const saved = localStorage.getItem(key);
    if (saved === 'light' || saved === 'dark') preference = saved;
  } catch {
    // The current page can still switch themes when storage is unavailable.
  }

  function applyTheme() {
    const theme = preference === 'system' ? (system.matches ? 'dark' : 'light') : preference;
    root.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#1b231f' : '#f7f4ec';
  }

  applyTheme();
  system.addEventListener('change', applyTheme);

  document.addEventListener('DOMContentLoaded', () => {
    const picker = document.querySelector('#theme');
    picker.value = preference;
    picker.addEventListener('change', () => {
      preference = picker.value;
      try {
        localStorage.setItem(key, preference);
      } catch {
        // The selected theme still applies for the current page.
      }
      applyTheme();
    });
  });
})();
