document.addEventListener('DOMContentLoaded', () => {
  const themeKey = 'enem-theme';
  const root = document.documentElement;

  const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    root.classList.toggle('dark', isDark);
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      button.setAttribute('aria-pressed', String(isDark));
      const icon = button.querySelector('[data-lucide]');
      if (icon && window.lucide && typeof window.lucide.createIcons === 'function') {
        const nextIcon = isDark ? 'sun' : 'moon';
        icon.setAttribute('data-lucide', nextIcon);
        window.lucide.createIcons({ nameAttr: 'data-lucide' });
      }
    });
  };

  const savedTheme = localStorage.getItem(themeKey);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      const nextTheme = root.classList.contains('dark') ? 'light' : 'dark';
      localStorage.setItem(themeKey, nextTheme);
      applyTheme(nextTheme);
    });
  });

  document.querySelectorAll('[data-tab]').forEach((button) => {
    const target = button.getAttribute('data-tab');
    const targetPanel = document.getElementById(`tab-${target}`);
    if (!targetPanel) return;

    button.addEventListener('click', () => {
      document.querySelectorAll('[data-tab]').forEach((tab) => {
        const selected = tab === button;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
      });

      document.querySelectorAll('.tab-panel').forEach((panel) => {
        const isSelected = panel.id === `tab-${target}`;
        panel.classList.toggle('hidden', !isSelected);
        if (isSelected) {
          panel.classList.add('fade-in');
        }
      });
    });
  });

  document.querySelectorAll('.cd-strip').forEach((strip) => {
    const dateText = strip.dataset.date;
    if (!dateText) return;

    const date = new Date(`${dateText}T12:00:00`);
    const current = new Date();
    current.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((date.getTime() - current.getTime()) / 86400000);
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
  });

  if (window.GALERIA_FOTOS && document.getElementById('galeriaGrid')) {
    const gallery = document.getElementById('galeriaGrid');
    gallery.innerHTML = '';

    if (window.GALERIA_FOTOS.length) {
      window.GALERIA_FOTOS.forEach((photo, index) => {
        const item = document.createElement('button');
        item.type = 'button';
        item.className = 'sg-item';
        item.setAttribute('aria-label', `Abrir imagem ${index + 1}: ${photo.alt || 'Foto do evento'}`);
        item.innerHTML = `
          <img src="${photo.src}" alt="${photo.alt || ''}" loading="lazy">
          <span class="sg-veil"></span>
          <span class="sg-zoom" aria-hidden="true">+</span>
        `;

        item.addEventListener('click', () => {
          const lightbox = document.getElementById('sgLightbox');
          const image = document.getElementById('sgLightboxImg');
          const caption = document.getElementById('sgLightboxCaption');
          const counter = document.getElementById('sgLightboxIndex');
          if (!lightbox || !image || !caption || !counter) return;

          image.src = photo.src;
          image.alt = photo.alt || '';
          caption.textContent = photo.alt || '';
          counter.textContent = `${index + 1} / ${window.GALERIA_FOTOS.length}`;
          lightbox.classList.add('is-open');
          document.body.classList.add('sg-lock');
        });

        gallery.appendChild(item);
      });
    } else {
      gallery.innerHTML = '<div class="galeria-empty">Galeria em construção. Assim que as fotos forem publicadas, elas aparecerão aqui.</div>';
    }
  }
});
