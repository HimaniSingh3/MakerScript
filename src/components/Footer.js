export function renderFooter() {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div>
      <strong>MakerScript</strong>
      <span>Designed and built for Himani Singh.</span>
    </div>
    <a href="#top">Back to top ↑</a>
  `;

  return footer;
}
