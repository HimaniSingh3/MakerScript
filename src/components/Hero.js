import { showcaseItems } from '../data/showcase.js';

export function renderHero() {
  const section = document.createElement('section');
  section.className = 'hero section-shell';
  section.id = 'top';

  section.innerHTML = `
    <div class="hero__content reveal">
      <p class="eyebrow">JavaScript project maker</p>
      <h1>Build elegant starter scripts without staring at a blank file.</h1>
      <p class="hero__copy">
        MakerScript helps makers generate clean JavaScript starters for automation,
        creative tools, productivity apps, games, data utilities, and web widgets.
      </p>
      <div class="hero__actions">
        <a class="button button--primary" href="#generator">Start making</a>
        <a class="button button--ghost" href="#templates">Explore templates</a>
      </div>
    </div>

    <div class="hero-card reveal" aria-label="MakerScript preview card">
      <div class="hero-card__bar">
        <span></span><span></span><span></span>
      </div>
      <pre><code>const maker = new MakerScript({
  author: 'Himani Singh',
  style: 'beautiful',
  responsive: true
});

maker.generate('working project');</code></pre>
    </div>

    <div class="stats-grid">
      ${showcaseItems.map((item) => `
        <article class="stat-card reveal">
          <strong>${item.metric}</strong>
          <span>${item.label}</span>
          <small>${item.note}</small>
        </article>
      `).join('')}
    </div>
  `;

  return section;
}
