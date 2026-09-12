(() => {
  const menu = document.querySelector('.product-menu');
  if (!menu) return;
  const summary = menu.querySelector('summary');
  const close = (restoreFocus = false) => {
    if (!menu.open) return;
    menu.open = false;
    if (restoreFocus) summary.focus();
  };
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.open) {
      event.preventDefault();
      close(true);
    }
  });
  document.addEventListener('click', event => {
    if (!menu.contains(event.target)) close();
  });
  document.addEventListener('focusin', event => {
    if (!menu.contains(event.target)) close();
  });
  menu.addEventListener('click', event => {
    if (event.target.closest('a')) close();
  });
  window.matchMedia('(max-width:900px)').addEventListener('change', () => close());
  window.addEventListener('pageshow', () => close());
})();
