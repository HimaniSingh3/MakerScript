import { renderHeader } from './Header.js';
import { renderHero } from './Hero.js';
import { renderGenerator } from './Generator.js';
import { renderTemplateGallery } from './TemplateGallery.js';
import { renderWorkflow } from './Workflow.js';
import { renderFooter } from './Footer.js';
import { getStoredValue, setStoredValue, toggleStoredId } from '../services/storage.js';
import { showToast } from './Toast.js';

export function createApp(root) {
  const savedTheme = getStoredValue('theme', 'dark');
  let favoriteIds = getStoredValue('favorites', []);

  document.documentElement.dataset.theme = savedTheme;

  const appShell = document.createElement('div');
  appShell.className = 'app-shell';

  function handleThemeToggle() {
    const currentTheme = document.documentElement.dataset.theme || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    setStoredValue('theme', nextTheme);
    root.replaceChild(renderHeader({
      theme: nextTheme,
      onThemeToggle: handleThemeToggle,
      onMenuToggle: () => {}
    }), root.querySelector('.site-header'));
    showToast(`${nextTheme === 'dark' ? 'Dark' : 'Light'} theme enabled.`);
  }

  const generator = renderGenerator();
  const gallery = renderTemplateGallery({
    favoriteIds,
    onFavorite(templateId) {
      favoriteIds = toggleStoredId('favorites', templateId);
      gallery.updateFavorites(favoriteIds);
      showToast(favoriteIds.includes(templateId) ? 'Template saved.' : 'Template removed.');
    },
    onUseTemplate(template) {
      generator.loadTemplate(template);
    }
  });

  root.innerHTML = '';
  root.append(
    renderHeader({
      theme: savedTheme,
      onThemeToggle: handleThemeToggle,
      onMenuToggle: () => {}
    }),
    appShell
  );

  appShell.append(
    renderHero(),
    generator.element,
    gallery.element,
    renderWorkflow(),
    renderFooter()
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}
