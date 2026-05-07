let activeToast;

export function showToast(message, type = 'success') {
  if (activeToast) {
    activeToast.remove();
  }

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.setAttribute('role', 'status');
  toast.textContent = message;

  document.body.append(toast);
  activeToast = toast;

  window.setTimeout(() => {
    toast.classList.add('toast--visible');
  }, 20);

  window.setTimeout(() => {
    toast.classList.remove('toast--visible');
    window.setTimeout(() => toast.remove(), 250);
  }, 2400);
}

