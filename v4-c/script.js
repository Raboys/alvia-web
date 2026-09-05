// The app explorer uses native radio inputs and works without JavaScript.
// JavaScript only adds a play/pause button to the identity demonstration.
const video = document.querySelector('#identity-video');
const toggle = document.querySelector('.video-toggle');
const status = document.querySelector('.video-status');

if (video && toggle && status) {
  video.controls = false;
  toggle.hidden = false;

  const syncButton = () => {
    toggle.textContent = video.paused
      ? (video.ended ? 'Volver a ver ↻' : 'Ver verificación ▷')
      : 'Pausar video Ⅱ';
  };

  toggle.addEventListener('click', async () => {
    status.textContent = '';
    if (!video.paused) {
      video.pause();
      return;
    }
    try {
      await video.play();
    } catch {
      status.textContent = 'No se pudo reproducir el video. Podés volver a intentarlo.';
    }
    syncButton();
  });
  ['play', 'pause', 'ended'].forEach(event => video.addEventListener(event, syncButton));
  document.querySelectorAll('[name="app-screen"]').forEach(input => {
    input.addEventListener('change', () => {
      if (input.value !== 'identity') video.pause();
    });
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause();
  });
  // No autoplay, including when a visitor selects Identity or prefers reduced motion.
}
