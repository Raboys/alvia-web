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
let syncTourPlayback = () => {};
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
  syncTourPlayback();
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

// Seven seconds per screen leaves time for the complete authorization video.
// Use one visible-time clock for both the shrinking bar and the next screen.
const tourPlayback = document.querySelector('.tour-playback');
if (tour && tourPlayback) {
  const screens = [...tour.querySelectorAll('[name="app-screen"]')];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const duration = 7000;
  let paused = reducedMotion.matches;
  let visible = false;
  let remaining = duration;
  let previousTime = null;
  let frame = null;

  const drawProgress = () => tour.style.setProperty('--tour-progress', Math.max(0, remaining / duration));
  const reading = () => !!document.activeElement?.closest('.tour-panel') || screens.some(input => input.matches(':focus-visible'));
  const canPlay = () => visible && !paused && !document.hidden && !dialog?.open && !reading();
  const tick = now => {
    frame = null;
    if (!canPlay()) { previousTime = null; return; }
    if (previousTime !== null) remaining -= now - previousTime;
    previousTime = now;
    if (remaining <= 0) {
      const next = screens[(screens.findIndex(input => input.checked) + 1) % screens.length];
      next.checked = true;
      next.dispatchEvent(new Event('change', { bubbles: true }));
    }
    drawProgress();
    if (frame === null) frame = requestAnimationFrame(tick);
  };
  syncTourPlayback = () => {
    if (canPlay()) {
      if (frame === null) frame = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(frame);
      frame = null;
      previousTime = null;
    }
  };
  const reset = () => { remaining = duration; previousTime = null; drawProgress(); syncTourPlayback(); };
  const selectManually = () => { paused = true; reset(); updateButton(); };
  screens.forEach(input => {
    input.addEventListener('change', event => { if (event.isTrusted) selectManually(); else reset(); });
    // Selecting even the current screen stops autoplay until explicitly resumed.
    input.addEventListener('click', selectManually);
  });
  const updateButton = () => {
    tourPlayback.querySelector('.tour-playback-icon').textContent = paused ? '▶' : 'Ⅱ';
    tourPlayback.querySelector('.tour-playback-label').textContent = paused ? 'Reproducir recorrido' : 'Pausar recorrido';
    syncTourPlayback();
  };
  tourPlayback.addEventListener('click', () => { paused = !paused; updateButton(); });
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) { paused = true; updateButton(); } });
  tour.addEventListener('focusin', syncTourPlayback);
  tour.addEventListener('focusout', () => queueMicrotask(syncTourPlayback));
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting && entries[0].intersectionRatio >= .25;
    syncTourPlayback();
  }, { threshold: [0, .25] }).observe(tour.querySelector('.tour-panels'));
  tour.classList.add('tour-autoplay');
  tourPlayback.hidden = false;
  drawProgress();
  updateButton();
}

// The illustrative note uses real, selectable text and a working copy action.
const copyNote = document.querySelector('.notes-copy');
const noteSummary = document.querySelector('.notes-summary');
if (copyNote && noteSummary) {
  copyNote.hidden = false;
  let resetCopy;
  copyNote.addEventListener('click', async () => {
    const text = [...noteSummary.querySelectorAll('p')].map(p => p.textContent.trim()).join('\n\n');
    const status = document.querySelector('.notes-copy-status');
    clearTimeout(resetCopy);
    let copied = false;
    if (navigator.clipboard?.writeText) {
      try { await navigator.clipboard.writeText(text); copied = true; } catch { /* Try the HTTP-compatible copy path. */ }
    }
    if (!copied) {
      const field = document.createElement('textarea');
      field.value = text;
      field.setAttribute('readonly', '');
      field.className = 'sr-only';
      document.body.append(field);
      field.select();
      try { copied = document.execCommand('copy'); } catch { /* Show an honest failure message. */ }
      field.remove();
      copyNote.focus({ preventScroll: true });
    }
    copyNote.querySelector('span').textContent = copied ? 'Copiado' : 'Copiar';
    status.textContent = copied ? 'Resumen copiado.' : 'No se pudo copiar. Podés seleccionar el texto del resumen.';
    resetCopy = setTimeout(() => { copyNote.querySelector('span').textContent = 'Copiar'; status.textContent = ''; }, 2400);
  });
}

// Local document examples: switching files works through native radios; the
// enlarged reader displays the selected example without uploading or fetching.
const studyDialog = document.querySelector('.study-dialog');
const enlargeStudy = document.querySelector('.study-enlarge');
if (studyDialog && enlargeStudy && typeof studyDialog.showModal === 'function') {
  enlargeStudy.hidden = false;
  enlargeStudy.addEventListener('click', () => {
    const selected = document.querySelector('[name="study-file"]:checked');
    const documentExample = document.querySelector(`[data-study="${selected.value}"]`);
    studyDialog.querySelector('h3').textContent = selected.value === 'lab' ? 'Laboratorio.pdf' : 'Informe.pdf';
    studyDialog.querySelector('.study-dialog-body').replaceChildren(documentExample.cloneNode(true));
    studyDialog.showModal();
    studyDialog.querySelector('.study-close').focus();
  });
  studyDialog.querySelector('.study-close').addEventListener('click', () => studyDialog.close());
  studyDialog.addEventListener('click', event => {
    const r = studyDialog.getBoundingClientRect();
    if (event.target === studyDialog && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) studyDialog.close();
  });
  studyDialog.addEventListener('close', () => enlargeStudy.focus({ preventScroll: true }));
}
