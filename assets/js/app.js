document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const storageKey = 'enem-theme';

  const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    root.classList.toggle('dark', isDark);
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      const pressed = button.getAttribute('aria-pressed') === 'true';
      if (pressed !== isDark) {
        button.setAttribute('aria-pressed', String(isDark));
      }
      const icon = button.querySelector('[data-lucide]');
      if (icon) {
        const next = isDark ? 'sun' : 'moon';
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
          icon.setAttribute('data-lucide', next);
          window.lucide.createIcons({ nameAttr: 'data-lucide' });
        }
      }
    });
  };

  const savedTheme = localStorage.getItem(storageKey);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      const nextTheme = root.classList.contains('dark') ? 'light' : 'dark';
      localStorage.setItem(storageKey, nextTheme);
      applyTheme(nextTheme);
    });
  });

  document.querySelectorAll('[data-tab]').forEach((button) => {
    const targetId = button.getAttribute('data-tab');
    const panel = document.getElementById(`tab-${targetId}`);
    if (!panel) return;

    button.addEventListener('click', () => {
      document.querySelectorAll('[data-tab]').forEach((btn) => {
        const selected = btn === button;
        btn.setAttribute('aria-selected', String(selected));
        btn.tabIndex = selected ? 0 : -1;
      });

      document.querySelectorAll('.tab-panel').forEach((section) => {
        const isTarget = section.id === `tab-${targetId}`;
        section.classList.toggle('hidden', !isTarget);
        section.classList.toggle('fade-in', isTarget);
      });
    });
  });

  document.querySelectorAll('.cd-strip').forEach((strip) => {
    const dateStr = strip.dataset.date;
    if (!dateStr) return;

    const dateObj = new Date(`${dateStr}T12:00:00`);
    const today = new Date();
    const diffMs = dateObj.getTime() - today.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil(diffMs / 86400000);
    const text = strip.querySelector('.cd-texto');
    const label = strip.dataset.rotulo || 'evento';

    if (!text) return;

    if (diffDays > 0) {
      text.textContent = `Faltam ${diffDays} dia${diffDays === 1 ? '' : 's'} para o ${label}.`;
      strip.classList.remove('is-hoje', 'is-passado');
    } else if (diffDays === 0) {
      text.textContent = `Hoje é o ${label}!`;
      strip.classList.add('is-hoje');
      strip.classList.remove('is-passado');
    } else {
      text.textContent = `${label} encerrado.`;
      strip.classList.add('is-passado');
      strip.classList.remove('is-hoje');
    }

    strip.style.setProperty('--cd', strip.style.getPropertyValue('--cd') || '#3159C9');
  });

  if (window.GALERIA_FOTOS && document.getElementById('galeriaGrid')) {
    const gallery = document.getElementById('galeriaGrid');
    gallery.innerHTML = '';

    if (window.GALERIA_FOTOS.length) {
      window.GALERIA_FOTOS.forEach((photo, index) => {
        const item = document.createElement('button');
        item.type = 'button';
        item.className = 'sg-item';
        item.setAttribute('aria-label', `Abrir imagem ${index + 1}: ${photo.alt || 'Galeria do evento'}`);
        item.innerHTML = `
          <img src="${photo.src}" alt="${photo.alt || ''}" loading="lazy">
          <span class="sg-veil"></span>
          <span class="sg-zoom" aria-hidden="true">+</span>
        `;

        item.addEventListener('click', () => {
          const lightbox = document.getElementById('sgLightbox');
          const img = document.getElementById('sgLightboxImg');
          const caption = document.getElementById('sgLightboxCaption');
          const indexEl = document.getElementById('sgLightboxIndex');
          if (!lightbox || !img || !caption || !indexEl) return;
          img.src = photo.src;
          img.alt = photo.alt || '';
          caption.textContent = photo.alt || '';
          indexEl.textContent = `${index + 1} / ${window.GALERIA_FOTOS.length}`;
          lightbox.classList.add('is-open');
          document.body.classList.add('sg-lock');
        });

        gallery.appendChild(item);
      });
    } else {
      const empty = document.createElement('div');
      empty.className = 'galeria-empty';
      empty.textContent = 'Galeria em construção. Assim que as fotos forem publicadas, elas aparecerão aqui.';
      gallery.appendChild(empty);
    }
  }
});
