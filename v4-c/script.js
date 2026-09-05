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
let inView = false;
const syncVideos = () => {
  videos.forEach(video => {
    const active = video.closest('.tour-panel').getClientRects().length > 0;
    if (active && inView && !document.hidden) {
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
