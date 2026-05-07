import { downloadTextFile, slugify } from '../utils/helpers.js';
import { showToast } from './Toast.js';

export function renderCodePreview(initialCode) {
  const panel = document.createElement('aside');
  panel.className = 'code-panel reveal';

  panel.innerHTML = `
    <div class="code-panel__header">
      <div>
        <span class="eyebrow">Generated output</span>
        <h3>Your script</h3>
      </div>
      <div class="code-panel__actions">
        <button class="icon-button copy-button" type="button" aria-label="Copy code">📋</button>
        <button class="icon-button download-button" type="button" aria-label="Download code">⬇️</button>
      </div>
    </div>
    <pre class="code-output"><code></code></pre>
    <div class="terminal-preview" aria-live="polite">
      <div class="terminal-preview__bar">
        <span></span><span></span><span></span>
      </div>
      <p class="terminal-line">$ makerscript generate</p>
      <p class="terminal-result">Ready to create something useful.</p>
    </div>
  `;

  const codeElement = panel.querySelector('.code-output code');
  const resultElement = panel.querySelector('.terminal-result');
  const copyButton = panel.querySelector('.copy-button');
  const downloadButton = panel.querySelector('.download-button');

  let currentCode = initialCode;
  let currentTitle = 'makerscript-project';

  function setCode(code, title = currentTitle) {
    currentCode = code;
    currentTitle = title;
    codeElement.textContent = code;
    resultElement.textContent = `${title} generated successfully.`;
  }

  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      showToast('Code copied to clipboard.');
    } catch (error) {
      console.error(error);
      showToast('Copy failed. Select and copy manually.', 'error');
    }
  });

  downloadButton.addEventListener('click', () => {
    downloadTextFile(`${slugify(currentTitle)}.js`, currentCode);
    showToast('JavaScript file downloaded.');
  });

  setCode(initialCode);

  return {
    element: panel,
    setCode
  };
}
