import { workflowSteps } from '../data/showcase.js';

export function renderWorkflow() {
  const section = document.createElement('section');
  section.className = 'section-shell workflow-section';
  section.id = 'workflow';

  section.innerHTML = `
    <div class="section-heading reveal">
      <p class="eyebrow">How it works</p>
      <h2>From idea to script in three steps.</h2>
      <p>MakerScript is designed for quick experiments and beautiful starter files.</p>
    </div>

    <div class="workflow-grid">
      ${workflowSteps.map((step) => `
        <article class="workflow-card reveal">
          <span>${step.number}</span>
          <h3>${step.title}</h3>
          <p>${step.copy}</p>
        </article>
      `).join('')}
    </div>
  `;

  return section;
}
