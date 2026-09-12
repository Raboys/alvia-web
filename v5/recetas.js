/* Illustrative emission only. The native state selector also works without JS. */
(() => {
  'use strict';
  const button = document.querySelector('.rx-emit');
  const pending = document.querySelector('#rx-preparing');
  const ready = document.querySelector('#rx-ready');
  const original = button.innerHTML;
  let timer;
  button.disabled = false;
  const reset = () => {
    clearTimeout(timer);
    button.innerHTML = original;
    button.disabled = false;
    delete button.dataset.emitting;
    delete button.dataset.issued;
  };
  [pending, ready].forEach(radio => {
    radio.addEventListener('change', reset);
    radio.addEventListener('click', reset);
  });
  button.addEventListener('click', () => {
    pending.checked = true;
    delete button.dataset.issued;
    button.disabled = true;
    button.dataset.emitting = '';
    button.textContent = 'Preparando documento…';
    timer = setTimeout(() => {
      ready.checked = true;
      delete button.dataset.emitting;
      button.dataset.issued = '';
      button.textContent = 'Documento listo ✓';
      button.disabled = false;
    }, 800);
  });
})();
