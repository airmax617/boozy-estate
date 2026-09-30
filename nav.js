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
  const zoomables = document.querySelectorAll('img[data-zoom]');
  if (zoomables.length) {
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = '<img alt="">';
    document.body.appendChild(lb);
    const big = lb.querySelector('img');
    const close = () => lb.classList.remove('open');
    zoomables.forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        big.src = img.dataset.zoom || img.currentSrc || img.src;
        big.alt = img.alt;
        lb.classList.add('open');
      });
    });
    lb.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }
});
