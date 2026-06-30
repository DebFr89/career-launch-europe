import { $$ } from '../lib/dom.js';

// Fade/slide elements in as they scroll into view. CSS handles the transition
// (and the reduced-motion override that shows them instantly).
export function initReveal() {
  const els = $$('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach((e) => e.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries, obs) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        obs.unobserve(e.target);
      }
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  els.forEach((e) => io.observe(e));
}
