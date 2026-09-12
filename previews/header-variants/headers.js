(() => {
  document.querySelectorAll('[data-device]').forEach(button => {
    button.addEventListener('click', () => {
      document.body.classList.toggle('preview-mobile', button.dataset.device === 'mobile');
      document.querySelectorAll('[data-device]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    });
  });
  const params = new URLSearchParams(location.search);
  if (params.has('clean')) document.documentElement.classList.add('clean-view');
  const button = document.querySelector('.study-menu-toggle');
  const nav = document.querySelector('.feature-nav');
  const mega = document.querySelector('.mega-menu');
  const close = (focus = false) => {
    if (button) {
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', 'Abrir navegación');
      nav.classList.remove('is-open');
      if (focus) button.focus();
    }
    if (mega?.open) {
      mega.open = false;
      if (focus) mega.querySelector('summary').focus();
    }
  };
  button?.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Cerrar navegación' : 'Abrir navegación');
    nav.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && (mega?.open || nav?.classList.contains('is-open'))) close(true);
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.study-header')) close();
  });
  window.matchMedia('(max-width:900px)').addEventListener('change', () => close());
  if (mega && params.has('menu')) mega.open = true;
  if (params.has('clean')) {
    document.querySelectorAll('a[href]').forEach(link => {
      const url = new URL(link.href);
      if (url.origin === location.origin && /\/(1|2|3|4)\/[^/]*\.html$/.test(url.pathname)) {
        url.searchParams.set('clean', '1');
        link.href = url.href;
      }
    });
  }
})();
