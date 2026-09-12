(() => {
  'use strict';
  document.documentElement.classList.add('js');

  const calculator = document.querySelector('#capacity-form');
  calculator.hidden = false;
  const total = document.querySelector('#capacity-total');
  const description = document.querySelector('#capacity-description');
  const numberFormat = new Intl.NumberFormat('es-AR');
  const calculateCapacity = () => {
    calculator.querySelectorAll('[data-field]').forEach((button) => {
      const input = calculator.elements[button.dataset.field];
      button.disabled = input.value !== '' && (Number(button.dataset.direction) < 0
        ? input.valueAsNumber <= Number(input.min)
        : input.valueAsNumber >= Number(input.max));
    });
    const fields = [calculator.elements.professionals, calculator.elements.hours];
    if (!fields.every((field) => field.validity.valid)) {
      total.value = '—';
      description.textContent = 'Completá los valores para calcular';
      return;
    }
    const professionals = calculator.elements.professionals.valueAsNumber;
    const hours = calculator.elements.hours.valueAsNumber;
    const duration = Number(calculator.elements.duration.value);
    // Count complete slots per professional per week, then multiply by four weeks.
    const capacity = professionals * Math.floor(hours * 60 / duration) * 4;
    total.value = numberFormat.format(capacity);
    total.classList.toggle('long-value', total.value.length > 6);
    description.textContent = 'turnos estimados por mes';
  };
  calculator.addEventListener('click', (event) => {
    const button = event.target.closest('[data-field]');
    if (!button) return;
    const input = calculator.elements[button.dataset.field];
    if (!input.validity.valid) input.value = input.min;
    else if (Number(button.dataset.direction) > 0) input.stepUp();
    else input.stepDown();
    calculateCapacity();
  });
  calculator.addEventListener('input', calculateCapacity);
  calculator.addEventListener('change', calculateCapacity);
  calculator.addEventListener('submit', (event) => event.preventDefault());
  calculateCapacity();

  const tabList = document.querySelector('.organization-tabs');
  const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));
  const activateTab = (selected) => {
    tabs.forEach((tab) => {
      const active = tab === selected;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      panel.hidden = !active;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', tab.id);
      panel.tabIndex = 0;
    });
  };
  tabList.hidden = false;
  activateTab(tabs[0]);
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', (event) => {
      let nextIndex;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;
      if (nextIndex === undefined) return;
      event.preventDefault();
      activateTab(tabs[nextIndex]);
      tabs[nextIndex].focus();
    });
  });
})();
