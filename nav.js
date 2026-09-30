// Boozy Estate — shared navigation + lightbox

document.addEventListener('DOMContentLoaded', () => {

  // ── Mobile menu ──
  const nav = document.querySelector('.nav');
  const btn = document.querySelector('.menu-btn');
  if (nav && btn) {
    btn.addEventListener('click', () => {
      btn.setAttribute('aria-expanded', String(nav.classList.toggle('open')));
    });
    nav.querySelectorAll('.nav-links a').forEach(a =>
      a.addEventListener('click', () => { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); })
    );
  }

  // ── Active link ──
  const page = location.pathname.split('/').filter(Boolean)[0] || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').replace(/^\//, '');
    if (href === page || (page === 'decanters' && href === 'decanters.html')) a.classList.add('active');
  });

  // ── Lightbox: any <img data-zoom> (optionally data-zoom="full-size-url") ──
  // Built on first use so there's no empty <img> in the page until someone zooms.
  let lb = null;
  const openZoom = (img) => {
    if (!lb) {
      lb = document.createElement('div');
      lb.className = 'lightbox';
      lb.addEventListener('click', () => lb.classList.remove('open'));
      document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('open'); });
      document.body.appendChild(lb);
    }
    const big = new Image();
    big.src = img.dataset.zoom || img.currentSrc || img.src;
    big.alt = img.alt;
    lb.replaceChildren(big);
    lb.classList.add('open');
  };
  document.querySelectorAll('img[data-zoom]').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openZoom(img));
  });
});
