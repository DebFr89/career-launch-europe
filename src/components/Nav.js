import { $, $$, on } from '../lib/dom.js';

export function initNav() {
  const nav = $('#nav');
  const toggle = $('#navToggle');
  if (!nav || !toggle) return;

  // Hairline border + denser bg once scrolled.
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
  on(window, 'scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu toggle.
  const setOpen = (open) => {
    nav.setAttribute('data-open', String(open));
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  on(toggle, 'click', () => setOpen(nav.getAttribute('data-open') !== 'true'));
  $$('#navLinks a').forEach((a) => on(a, 'click', () => setOpen(false)));
  on(window, 'keydown', (e) => { if (e.key === 'Escape') setOpen(false); });

  // Scroll-spy: highlight the nav link for the section in view.
  const linkBydId = new Map();
  $$('#navLinks a[href^="#"]').forEach((a) => linkBydId.set(a.getAttribute('href').slice(1), a));
  const sections = ['problem', 'method', 'services', 'readiness', 'faq']
    .map((id) => document.getElementById(id)).filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const link = linkBydId.get(e.target.id);
        if (!link) continue;
        linkBydId.forEach((l) => l.classList.remove('active'));
        link.classList.add('active');
      }
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach((s) => spy.observe(s));
  }
}
