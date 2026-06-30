// Tiny DOM helpers — no dependencies.

export const $  = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/** Create an element: el('div', {class:'x', html:'…'}, [child, …]) */
export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k === 'text') node.textContent = v;
    else if (k === 'dataset') Object.assign(node.dataset, v);
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v);
    else node.setAttribute(k, v === true ? '' : v);
  }
  for (const c of [].concat(children)) {
    if (c == null) continue;
    node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  return node;
}

export const on = (target, type, handler, opts) => target.addEventListener(type, handler, opts);

export const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
export const lerp  = (a, b, t) => a + (b - a) * t;

let _reduced = null;
/** Respect the user's "reduce motion" OS setting (cached + live). */
export function prefersReducedMotion() {
  if (_reduced === null) {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    _reduced = mq.matches;
    mq.addEventListener?.('change', (e) => { _reduced = e.matches; });
  }
  return _reduced;
}

/**
 * Run `cb` the first time `node` scrolls into view (then disconnect, unless once=false).
 * Returns the observer so callers can disconnect early.
 */
export function onVisible(node, cb, { once = true, threshold = 0.2, rootMargin = '0px 0px -10% 0px' } = {}) {
  if (!('IntersectionObserver' in window)) { cb(node); return null; }
  const io = new IntersectionObserver((entries, obs) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        cb(e.target);
        if (once) obs.unobserve(e.target);
      } else if (!once) {
        cb(e.target, false);
      }
    }
  }, { threshold, rootMargin });
  io.observe(node);
  return io;
}

/** Device pixel ratio capped at 2 so retina phones don't over-render canvases. */
export const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

/** Size a canvas to its CSS box at capped DPR; returns the 2d ctx scaled to CSS px. */
export function fitCanvas(canvas) {
  const ratio = dpr();
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(1, Math.round(rect.width));
  const h = Math.max(1, Math.round(rect.height));
  canvas.width = w * ratio;
  canvas.height = h * ratio;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return { ctx, w, h };
}
