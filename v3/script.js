const masthead = document.querySelector('.masthead');
const menuButton = document.querySelector('.menu-button');
const mainNav = document.querySelector('.main-nav');

const syncHeader = () => masthead?.classList.toggle('is-scrolled', window.scrollY > 8);
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Abrir menú' : 'Cerrar menú');
  mainNav?.classList.toggle('is-open', !open);
});

mainNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Abrir menú');
    mainNav.classList.remove('is-open');
  });
});

document.querySelectorAll('.kyc-feed').forEach((video) => {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
});

const heroScroll = document.querySelector('[data-hero-scroll]');
const heroStage = heroScroll?.querySelector('.hero-stage');
const heroProduct = heroScroll?.querySelector('.hero-product');
const mobileHero = window.matchMedia('(max-width: 720px)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let heroFrame = 0;

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smoothstep = (value) => {
  const progress = clamp(value);
  return progress * progress * (3 - (2 * progress));
};

const clearHeroProgress = () => {
  [
    '--hero-art-opacity', '--hero-art-scale', '--hero-backdrop-opacity',
    '--hero-backdrop-scale', '--hero-app-backdrop-opacity', '--hero-app-backdrop-scale', '--hero-phone-x',
    '--hero-phone-y', '--hero-phone-scale', '--hero-frame-radius', '--hero-screen-radius',
    '--hero-frame-opacity', '--hero-shadow-opacity', '--hero-caption-opacity',
    '--hero-caption-y',
  ].forEach((property) => heroStage?.style.removeProperty(property));
};

const updateHeroProgress = () => {
  heroFrame = 0;
  if (!document.documentElement.classList.contains('hero-scroll-ready') || !heroScroll || !heroStage || !heroProduct) return;

  const stageHeight = heroStage.clientHeight;
  const stageWidth = heroStage.clientWidth;
  const travel = Math.max(1, heroScroll.offsetHeight - stageHeight);
  const headerHeight = masthead?.offsetHeight || 64;
  const progress = clamp((headerHeight - heroScroll.getBoundingClientRect().top) / travel);
  const movement = smoothstep((progress - .04) / .72);
  const finish = smoothstep((progress - .64) / .22);
  const artFade = smoothstep((progress - .18) / .58);
  const captionFade = smoothstep((progress - .02) / .22);

  const productWidth = heroProduct.offsetWidth;
  const productHeight = heroProduct.offsetHeight;
  const productImage = heroProduct.querySelector('img');
  const imageWidth = productImage?.offsetWidth || 0;
  const imageHeight = productImage?.offsetHeight || 0;
  if (!imageWidth || !imageHeight) return;
  const startX = heroProduct.offsetLeft + (productWidth / 2);
  const startY = heroProduct.offsetTop + (productHeight / 2);
  const targetScale = Math.min(stageWidth / imageWidth, stageHeight / imageHeight) * .995;
  const translateX = ((stageWidth / 2) - startX) * movement;
  const translateY = ((stageHeight / 2) - startY) * movement;
  const phoneScale = 1 + ((targetScale - 1) * movement);

  heroStage.style.setProperty('--hero-phone-x', `${translateX.toFixed(2)}px`);
  heroStage.style.setProperty('--hero-phone-y', `${translateY.toFixed(2)}px`);
  heroStage.style.setProperty('--hero-phone-scale', phoneScale.toFixed(4));
  heroStage.style.setProperty('--hero-art-opacity', (1 - (.9 * artFade)).toFixed(3));
  heroStage.style.setProperty('--hero-art-scale', (1 + (.08 * artFade)).toFixed(4));
  heroStage.style.setProperty('--hero-backdrop-opacity', (1 - finish).toFixed(3));
  heroStage.style.setProperty('--hero-backdrop-scale', (1.02 + (.08 * artFade)).toFixed(4));
  heroStage.style.setProperty('--hero-app-backdrop-opacity', (.98 * finish).toFixed(3));
  heroStage.style.setProperty('--hero-app-backdrop-scale', (1.04 - (.02 * finish)).toFixed(4));
  heroStage.style.setProperty('--hero-caption-opacity', (1 - captionFade).toFixed(3));
  heroStage.style.setProperty('--hero-caption-y', `${(-10 * captionFade).toFixed(2)}px`);
  heroStage.style.setProperty('--hero-frame-radius', `${(32 * (1 - finish)).toFixed(2)}px`);
  heroStage.style.setProperty('--hero-screen-radius', `${(26 * (1 - finish)).toFixed(2)}px`);
  heroStage.style.setProperty('--hero-frame-opacity', (1 - finish).toFixed(3));
  heroStage.style.setProperty('--hero-shadow-opacity', (.28 * (1 - finish)).toFixed(3));
};

const requestHeroProgress = () => {
  if (heroFrame) return;
  heroFrame = window.requestAnimationFrame(updateHeroProgress);
};

const syncHeroMode = () => {
  const enabled = Boolean(heroScroll && heroStage && heroProduct && mobileHero.matches && !reducedMotion.matches);
  document.documentElement.classList.toggle('hero-scroll-ready', enabled);
  if (!enabled) clearHeroProgress();
  requestHeroProgress();
};

syncHeroMode();
mobileHero.addEventListener('change', syncHeroMode);
reducedMotion.addEventListener('change', syncHeroMode);
window.addEventListener('scroll', requestHeroProgress, { passive: true });
window.addEventListener('resize', requestHeroProgress, { passive: true });
window.addEventListener('load', requestHeroProgress, { once: true });
