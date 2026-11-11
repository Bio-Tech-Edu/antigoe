document.addEventListener('DOMContentLoaded', () => {
  const checklistRoot = document.body.getAttribute('data-checklist') || 'checklist';
  const storageKey = `enem2026-${checklistRoot}-v1`;
  const listEls = document.querySelectorAll('ul.cb');

  if (!listEls.length) return;

  const saved = (() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || '{}');
    } catch (error) {
      return {};
    }
  })();

  const items = [];

  listEls.forEach((list, listIndex) => {
    Array.from(list.querySelectorAll('li')).forEach((item, itemIndex) => {
      const marker = item.querySelector('.box');
      if (!marker) return;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'box';
      checkbox.id = `ck-${listIndex}-${itemIndex}`;
      checkbox.setAttribute('aria-label', (item.textContent || '').trim().slice(0, 120));
      marker.parentNode.replaceChild(checkbox, marker);
      items.push(checkbox);

      checkbox.addEventListener('change', () => {
        item.classList.toggle('revisado', checkbox.checked);
        updateProgress();
      });
    });
  });

  const progressWrap = document.getElementById('progresso');
  const progressBar = document.getElementById('progressFill');
  const progressText = document.getElementById('progressTexto');
  const clearButton = document.getElementById('limpar');

  if (progressWrap) progressWrap.hidden = false;

  const updateProgress = () => {
    let checked = 0;
    const data = {};

    items.forEach((checkbox) => {
      if (checkbox.checked) checked += 1;
      data[checkbox.id] = checkbox.checked;
    });

    if (progressBar) {
      const percent = items.length ? Math.round((checked * 100) / items.length) : 0;
      progressBar.style.width = `${percent}%`;
    }

    if (progressText) {
      const completeMessage = checked === items.length && items.length ? ' — checklist completo!' : '';
      progressText.textContent = `${checked} de ${items.length} itens revisados${completeMessage}`;
    }

    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (error) {
      // Ignore storage failures in browser privacy modes.
    }
  };

  items.forEach((checkbox) => {
    if (saved[checkbox.id]) {
      checkbox.checked = true;
      const item = checkbox.closest('li');
      if (item) item.classList.add('revisado');
    }
  });

  if (clearButton) {
    clearButton.addEventListener('click', () => {
      items.forEach((checkbox) => {
        checkbox.checked = false;
        const item = checkbox.closest('li');
        if (item) item.classList.remove('revisado');
      });
      try {
        localStorage.removeItem(storageKey);
      } catch (error) {}
      updateProgress();
    });
  }

  updateProgress();
});
