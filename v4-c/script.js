// Warm all tab images and video posters before the visitor switches panels.
// HTML preload links and eager images also work without JavaScript.
const previews = [...document.querySelectorAll('.tour-phone img')];
const videos = [...document.querySelectorAll('.tour-phone video')];
videos.forEach(video => {
  const poster = new Image();
  poster.src = video.poster;
  previews.push(poster);
});
previews.forEach(image => image.decode().catch(() => {}));

// Each visible demonstration plays automatically and loops. Keep inactive or
// offscreen videos paused, then resume as soon as their panel becomes visible.
const tour = document.querySelector('.app-tour');
const dialog = document.querySelector('.tour-dialog');
let inView = false;
const syncVideos = () => {
  videos.forEach(video => {
    const active = dialog?.open
      ? dialog.contains(video)
      : !!video.closest('.tour-panel')?.getClientRects().length;
    if (active && (inView || dialog?.open) && !document.hidden) {
      video.muted = true;
      video.play().then(() => { video.controls = false; }).catch(() => {
        // Browser policies may reject autoplay; retain a native playback fallback.
        video.controls = true;
      });
    } else {
      video.pause();
    }
  });
};
document.querySelectorAll('[name="app-screen"]').forEach(input => {
  input.addEventListener('change', () => {
    videos.forEach(video => { video.currentTime = 0; });
    syncVideos();
  });
});
document.addEventListener('visibilitychange', syncVideos);
if (tour) {
  new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting;
    syncVideos();
  }, { threshold: 0 }).observe(tour);
}
syncVideos();

// Enlarge the existing media, preserving its loaded buffer and playback position.
// The original links remain usable in browsers without dialog support or JavaScript.
if (dialog && typeof dialog.showModal === 'function') {
  let origin;
  let phone;
  let trigger;
  document.querySelectorAll('.tour-expand').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      trigger = link;
      const panel = link.closest('.tour-panel');
      phone = panel.querySelector('.tour-phone');
      origin = document.createComment('Expanded app preview');
      phone.before(origin);
      dialog.querySelector('h2').textContent = panel.querySelector('h3').textContent;
      dialog.querySelector('.tour-dialog-content').append(phone);
      dialog.showModal();
      dialog.querySelector('.tour-close').focus();
      syncVideos();
    });
  });
  dialog.querySelector('.tour-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    if (origin && phone) origin.replaceWith(phone);
    trigger?.focus({ preventScroll: true });
    syncVideos();
  });
}
