import { featureOptions, projectTypes, scriptTemplates } from '../data/templates.js';
import { escapeHtml, formatDate, slugify } from '../utils/helpers.js';
import { renderCodePreview } from './CodePreview.js';
import { showToast } from './Toast.js';

const defaultForm = {
  title: 'MakerScript Magic Box',
  type: 'Creative Tool',
  goal: 'Generate useful JavaScript starters with a polished maker experience.',
  author: 'Himani Singh',
  style: 'Modern and friendly',
  features: ['Responsive UI helpers', 'Copy to clipboard', 'Download generated file']
};

function createScript(formData) {
  const safeTitle = formData.title.trim() || defaultForm.title;
  const safeAuthor = formData.author.trim() || defaultForm.author;
  const safeGoal = formData.goal.trim() || defaultForm.goal;
  const features = formData.features.length ? formData.features : defaultForm.features;
  const objectName = slugify(safeTitle).replace(/-/g, '_');

  return `/*
  ${safeTitle}
  Created by ${safeAuthor}
  Generated with MakerScript on ${formatDate()}

  Goal:
  ${safeGoal}
*/

const ${objectName} = {
  title: ${JSON.stringify(safeTitle)},
  type: ${JSON.stringify(formData.type)},
  style: ${JSON.stringify(formData.style)},
  author: ${JSON.stringify(safeAuthor)},
  features: ${JSON.stringify(features, null, 2)},
  createdAt: new Date().toISOString(),

  init() {
    this.printBanner();
    this.runChecklist();
    this.finish();
  },

  printBanner() {
    console.log('==============================');
    console.log(\`🚀 ${safeTitle}\`);
    console.log(\`Made by ${safeAuthor}\`);
    console.log('==============================');
  },

  runChecklist() {
    this.features.forEach((feature, index) => {
      console.log(\`${index + 1}. ${feature}\`);
    });
  },

  finish() {
    console.log('MakerScript output is ready to customize.');
  }
};

${objectName}.init();
`;
}

function readForm(form) {
  const selectedFeatures = Array.from(form.querySelectorAll('input[name="features"]:checked'))
    .map((input) => input.value);

  return {
    title: form.elements.title.value,
    type: form.elements.type.value,
    goal: form.elements.goal.value,
    author: form.elements.author.value,
    style: form.elements.style.value,
    features: selectedFeatures
  };
}

function setFeatureInputs(form, selectedFeatures) {
  form.querySelectorAll('input[name="features"]').forEach((input) => {
    input.checked = selectedFeatures.includes(input.value);
  });
}

export function renderGenerator() {
  const section = document.createElement('section');
  section.className = 'section-shell generator-section';
  section.id = 'generator';

  section.innerHTML = `
    <div class="section-heading reveal">
      <p class="eyebrow">Live generator</p>
      <h2>Create a custom starter script.</h2>
      <p>Fill in your idea, choose features, and export a clean JavaScript file.</p>
    </div>

    <div class="generator-layout">
      <form class="generator-form reveal" aria-label="MakerScript generator form">
        <div class="form-grid">
          <label>
            <span>Project title</span>
            <input name="title" type="text" value="${escapeHtml(defaultForm.title)}" required />
          </label>

          <label>
            <span>Project type</span>
            <select name="type">
              ${projectTypes.map((type) => `<option ${type === defaultForm.type ? 'selected' : ''}>${type}</option>`).join('')}
            </select>
          </label>

          <label>
            <span>Author</span>
            <input name="author" type="text" value="${escapeHtml(defaultForm.author)}" required />
          </label>

          <label>
            <span>Visual style</span>
            <select name="style">
              <option selected>Modern and friendly</option>
              <option>Minimal and clean</option>
              <option>Bold and playful</option>
              <option>Dark futuristic</option>
              <option>Soft creative</option>
            </select>
          </label>
        </div>

        <label>
          <span>Project goal</span>
          <textarea name="goal" rows="4">${escapeHtml(defaultForm.goal)}</textarea>
        </label>

        <fieldset>
          <legend>Features</legend>
          <div class="feature-list">
            ${featureOptions.map((feature) => `
              <label class="feature-option">
                <input type="checkbox" name="features" value="${feature}" ${defaultForm.features.includes(feature) ? 'checked' : ''} />
                <span>${feature}</span>
              </label>
            `).join('')}
          </div>
        </fieldset>

        <div class="form-actions">
          <button class="button button--primary" type="submit">Generate script</button>
          <button class="button button--ghost" type="reset">Reset</button>
        </div>
      </form>
    </div>
  `;

  const form = section.querySelector('.generator-form');
  const initialCode = createScript(defaultForm);
  const preview = renderCodePreview(initialCode);
  section.querySelector('.generator-layout').append(preview.element);

  function updatePreview() {
    const formData = readForm(form);
    preview.setCode(createScript(formData), formData.title || defaultForm.title);
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    updatePreview();
    showToast('Fresh script generated.');
  });

  form.addEventListener('input', updatePreview);

  form.addEventListener('reset', () => {
    window.setTimeout(() => {
      setFeatureInputs(form, defaultForm.features);
      updatePreview();
      showToast('Generator reset.');
    });
  });

  function loadTemplate(template) {
    form.elements.title.value = template.title;
    form.elements.type.value = projectTypes.find((type) => template.title.toLowerCase().includes(type.split(' ')[0].toLowerCase())) || projectTypes[0];
    form.elements.goal.value = template.description;
    form.elements.author.value = defaultForm.author;
    form.elements.style.value = template.accent === 'cyan' ? 'Dark futuristic' : 'Modern and friendly';
    setFeatureInputs(form, template.features.filter((feature) => featureOptions.includes(feature)));

    if (!Array.from(form.querySelectorAll('input[name="features"]:checked')).length) {
      setFeatureInputs(form, defaultForm.features);
    }

    preview.setCode(`${createScript(readForm(form))}\n\n// Template starter idea:\n${template.starter}`, template.title);
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    showToast(`${template.title} loaded into generator.`);
  }

  return {
    element: section,
    loadTemplate
  };
}
