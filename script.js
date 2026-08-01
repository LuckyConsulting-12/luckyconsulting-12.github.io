(() => {
  const cfg = window.LUCKY_CONFIG;
  if (!cfg) return;

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  $$('[data-brand-name]').forEach(el => el.textContent = cfg.brand.name);
  $('[data-eyebrow]').textContent = cfg.brand.eyebrow;
  $('[data-headline]').textContent = cfg.brand.headline;
  $('[data-description]').textContent = cfg.brand.description;
  $('[data-brand-note]').textContent = cfg.brand.note;
  $('#year').textContent = new Date().getFullYear();

  const trackingLinks = $$('[data-track-link]');
  trackingLinks.forEach(link => {
    link.href = cfg.links.tracking || '#';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });

  function whatsappUrl() {
    const number = String(cfg.links.whatsappNumber || '').replace(/\D/g, '');
    if (!number || String(cfg.links.whatsappNumber).includes('X')) return '#';
    return `https://wa.me/${number}?text=${encodeURIComponent(cfg.links.whatsappMessage || '')}`;
  }

  ['#whatsappCta', '#mobileWhatsapp'].forEach(selector => {
    const el = $(selector);
    el.href = whatsappUrl();
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
    el.addEventListener('click', event => {
      if (el.getAttribute('href') === '#') {
        event.preventDefault();
        alert('Ganti whatsappNumber di file data.js dengan nomor WhatsApp admin. Gunakan format 628xxxxxxxxxx.');
      }
    });
  });

  const icons = {
    document: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>',
    presentation: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4h16v12H4zM8 20l4-4 4 4M12 16v4"/><path d="M8 12l3-3 2 2 3-4"/></svg>',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4"/></svg>',
    layout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 9v12"/></svg>',
    design: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3a9 9 0 1 0 0 18h1.5a2.5 2.5 0 0 0 0-5H12a1.5 1.5 0 0 1 0-3h2a7 7 0 0 0-2-10z"/><circle cx="7.5" cy="10" r=".8" fill="currentColor"/><circle cx="9" cy="6.8" r=".8" fill="currentColor"/></svg>'
  };

  const statsGrid = $('#statsGrid');
  cfg.stats.forEach(stat => {
    const card = document.createElement('div');
    card.className = 'stat-card';
    card.innerHTML = `<span class="stat-number" data-target="${Number(stat.value) || 0}" data-suffix="${stat.suffix || ''}">0${stat.suffix || ''}</span><span class="stat-label">${stat.label}</span>`;
    statsGrid.appendChild(card);
  });

  const servicesGrid = $('#servicesGrid');
  cfg.services.forEach(service => {
    const card = document.createElement('article');
    card.className = 'service-card reveal';
    card.innerHTML = `<div class="service-icon">${icons[service.icon] || icons.document}</div><h3>${service.title}</h3><p>${service.description}</p>`;
    servicesGrid.appendChild(card);
  });

  const filters = ['Semua', ...new Set(cfg.portfolio.map(item => item.category))];
  const filterRow = $('#portfolioFilters');
  filters.forEach((name, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `filter-button${index === 0 ? ' active' : ''}`;
    button.textContent = name;
    button.addEventListener('click', () => {
      $$('.filter-button', filterRow).forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      renderPortfolio(name);
    });
    filterRow.appendChild(button);
  });

  const portfolioGrid = $('#portfolioGrid');
  const modal = $('#portfolioModal');
  const modalClose = $('.modal-close', modal);

  function renderPortfolio(filter = 'Semua') {
    portfolioGrid.innerHTML = '';
    const items = cfg.portfolio.filter(item => filter === 'Semua' || item.category === filter);
    items.forEach((item, index) => {
      const card = document.createElement('article');
      const portrait = item.image.includes('price-list');
      card.className = `portfolio-card reveal${portrait ? ' portrait' : ''}`;
      card.style.transitionDelay = `${Math.min(index * 0.05, 0.2)}s`;
      card.innerHTML = `
        <div class="portfolio-media">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
          ${item.demo ? '<span class="demo-badge">Placeholder</span>' : ''}
          <span class="portfolio-overlay">↗</span>
        </div>
        <div class="portfolio-body">
          <span class="portfolio-category">${item.category}</span>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <div class="tag-row">${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
        </div>`;
      card.addEventListener('click', () => openPortfolio(item));
      portfolioGrid.appendChild(card);
    });
    observeReveals();
  }

  function openPortfolio(item) {
    $('#modalImage').src = item.image;
    $('#modalImage').alt = item.title;
    $('#modalCategory').textContent = item.category;
    $('#modalTitle').textContent = item.title;
    $('#modalDescription').textContent = item.description;
    $('#modalTags').innerHTML = item.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    modal.showModal();
    document.body.classList.add('modal-open');
  }
  function closeModal() { modal.close(); document.body.classList.remove('modal-open'); }
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });

  const testimonialsGrid = $('#testimonialsGrid');
  cfg.testimonials.forEach(review => {
    const card = document.createElement('article');
    card.className = 'testimonial-card reveal';
    card.innerHTML = `<div class="quote-mark">“</div><div class="stars" aria-label="${review.rating} dari 5 bintang">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</div><blockquote>${review.text}</blockquote><div class="reviewer"><div><b>${review.name}</b><small>${review.role}</small></div>${review.demo ? '<span class="review-demo">Contoh</span>' : ''}</div>`;
    testimonialsGrid.appendChild(card);
  });

  const faqList = $('#faqList');
  cfg.faq.forEach((item, index) => {
    const wrapper = document.createElement('article');
    wrapper.className = `faq-item reveal${index === 0 ? ' open' : ''}`;
    wrapper.innerHTML = `<button class="faq-question" type="button" aria-expanded="${index === 0}"><span>${item.question}</span><span>+</span></button><div class="faq-answer"><div><p>${item.answer}</p></div></div>`;
    const button = $('.faq-question', wrapper);
    button.addEventListener('click', () => {
      const open = wrapper.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
    });
    faqList.appendChild(wrapper);
  });

  renderPortfolio();

  const header = $('.site-header');
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 15), { passive: true });

  const menuToggle = $('.menu-toggle');
  const mainNav = $('#mainNav');
  menuToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  $$('#mainNav a').forEach(link => link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));

  var revealObserver;
  function observeReveals() {
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: .12 });
    }
    $$('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
  }
  observeReveals();

  const statsObserver = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    $$('.stat-number').forEach(el => animateNumber(el));
    statsObserver.disconnect();
  }, { threshold: .35 });
  statsObserver.observe(statsGrid);

  function animateNumber(el) {
    const target = Number(el.dataset.target) || 0;
    const suffix = el.dataset.suffix || '';
    const duration = 900;
    const start = performance.now();
    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = `${Math.round(target * eased).toLocaleString('id-ID')}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
})();
