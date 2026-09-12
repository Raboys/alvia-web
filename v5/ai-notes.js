(() => {
  'use strict';
  const button = document.querySelector('.copy-example');
  const narrative = document.querySelector('#example-narrative');
  const feedback = document.querySelector('.copy-feedback');
  if (!button || !narrative || !feedback) return;
  button.hidden = false;

  button.addEventListener('click', async () => {
    const text = Array.from(narrative.querySelectorAll('p'), p => p.textContent.trim()).join('\n\n');
    button.disabled = true;
    feedback.textContent = '';
    let copied = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        copied = true;
      }
    } catch {
      // Keep the text available for manual selection if clipboard access is denied.
    }
    if (copied) {
      feedback.textContent = 'Resumen del ejemplo copiado.';
    } else {
      narrative.focus();
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(narrative);
      selection.removeAllRanges();
      selection.addRange(range);
      feedback.textContent = 'No se pudo copiar automáticamente. Seleccionamos el resumen para que lo copies desde tu navegador.';
    }
    button.disabled = false;
  });
})();
