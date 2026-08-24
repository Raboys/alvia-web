const masthead = document.querySelector('.masthead');
const menuButton = document.querySelector('.menu-button');
const mainNav = document.querySelector('.main-nav');

const syncHeader = () => masthead?.classList.toggle('is-scrolled', window.scrollY > 8);
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  mainNav?.classList.toggle('is-open', !open);
});

mainNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('is-open');
  });
});

document.querySelectorAll('.live-consultation video').forEach((video) => {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
});
