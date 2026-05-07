export function createTemplateCard(template, favoriteIds, handlers) {
  const card = document.createElement('article');
  card.className = `template-card template-card--${template.accent}`;
  card.dataset.category = template.category;
  card.dataset.templateId = template.id;

  const isFavorite = favoriteIds.includes(template.id);

  card.innerHTML = `
    <div class="template-card__topline">
      <span class="pill">${template.category}</span>
      <button class="favorite-button ${isFavorite ? 'favorite-button--active' : ''}" type="button" aria-label="Toggle favorite">
        ${isFavorite ? '★' : '☆'}
      </button>
    </div>
    <h3>${template.title}</h3>
    <p>${template.description}</p>
    <ul>
      ${template.features.map((feature) => `<li>${feature}</li>`).join('')}
    </ul>
    <div class="template-card__meta">
      <span>${template.difficulty}</span>
      <span>${template.duration}</span>
    </div>
    <button class="button button--card" type="button">Use template</button>
  `;

  card.querySelector('.favorite-button').addEventListener('click', () => {
    handlers.onFavorite(template.id);
  });

  card.querySelector('.button--card').addEventListener('click', () => {
    handlers.onUse(template);
  });

  return card;
}
