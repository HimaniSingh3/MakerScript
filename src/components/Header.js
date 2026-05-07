export function renderHeader({ theme, onThemeToggle, onMenuToggle }) {
  const header = document.createElement('header');
  header.className = 'site-header';

  header.innerHTML = `
    <a class="brand" href="#top" aria-label="MakerScript home">
      <img src="/logo.svg" alt="" class="brand__logo" />
      <span>
        <strong>MakerScript</strong>
        <small>by Himani Singh</small>
      </span>
    </a>

    <nav class="nav" aria-label="Primary navigation">
      <a href="#generator">Generator</a>
      <a href="#templates">Templates</a>
      <a href="#workflow">Workflow</a>
    </nav>

    <div class="header-actions">
      <button class="icon-button theme-toggle" type="button" aria-label="Toggle theme">
        ${theme === 'dark' ? '☀️' : '🌙'}
      </button>
      <button class="icon-button menu-toggle" type="button" aria-label="Open menu" aria-expanded="false">
        ☰
      </button>
    </div>
  `;

  const themeButton = header.querySelector('.theme-toggle');
  const menuButton = header.querySelector('.menu-toggle');
  const nav = header.querySelector('.nav');

  themeButton.addEventListener('click', onThemeToggle);
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav--open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    onMenuToggle?.(isOpen);
  });

  nav.addEventListener('click', (event) => {
    if (event.target.matches('a')) {
      nav.classList.remove('nav--open');
      menuButton.setAttribute('aria-expanded', 'false');
    }
  });

  return header;
}
