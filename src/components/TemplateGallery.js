import { categories, scriptTemplates } from '../data/templates.js';
import { createTemplateCard } from './TemplateCard.js';
import { debounce } from '../utils/helpers.js';

export function renderTemplateGallery({ favoriteIds, onFavorite, onUseTemplate }) {
  const section = document.createElement('section');
  section.className = 'section-shell template-section';
  section.id = 'templates';

  section.innerHTML = `
    <div class="section-heading reveal">
      <p class="eyebrow">Template library</p>
      <h2>Choose a script direction.</h2>
      <p>Filter, search, favorite, and load a template into the generator.</p>
    </div>

    <div class="toolbar reveal">
      <label class="search-box">
        <span>Search templates</span>
        <input type="search" placeholder="Search by title, feature, or category" />
      </label>
      <div class="filter-list" role="list" aria-label="Template categories">
        ${categories.map((category, index) => `
          <button class="filter-chip ${index === 0 ? 'filter-chip--active' : ''}" type="button" data-category="${category}">${category}</button>
        `).join('')}
      </div>
    </div>

    <div class="template-grid reveal" aria-live="polite"></div>
  `;

  const grid = section.querySelector('.template-grid');
  const searchInput = section.querySelector('input[type="search"]');
  const filterButtons = Array.from(section.querySelectorAll('.filter-chip'));

  let activeCategory = 'All';
  let searchTerm = '';

  function paintCards() {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const filteredTemplates = scriptTemplates.filter((template) => {
      const matchesCategory = activeCategory === 'All' || template.category === activeCategory;
      const haystack = [
        template.title,
        template.category,
        template.description,
        ...template.features
      ].join(' ').toLowerCase();

      return matchesCategory && haystack.includes(normalizedSearch);
    });

    grid.innerHTML = '';

    if (!filteredTemplates.length) {
      grid.innerHTML = `
        <div class="empty-state">
          <strong>No templates found.</strong>
          <span>Try a different category or search term.</span>
        </div>
      `;
      return;
    }

    filteredTemplates.forEach((template) => {
      grid.append(createTemplateCard(template, favoriteIds, {
        onFavorite,
        onUse: onUseTemplate
      }));
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeCategory = button.dataset.category;
      filterButtons.forEach((item) => item.classList.remove('filter-chip--active'));
      button.classList.add('filter-chip--active');
      paintCards();
    });
  });

  searchInput.addEventListener('input', debounce((event) => {
    searchTerm = event.target.value;
    paintCards();
  }, 150));

  paintCards();

  return {
    element: section,
    updateFavorites(nextFavorites) {
      favoriteIds = nextFavorites;
      paintCards();
    }
  };
}
