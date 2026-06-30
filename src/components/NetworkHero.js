import { $, fitCanvas, prefersReducedMotion } from '../lib/dom.js';
import { addTick } from '../lib/raf.js';

// Decorative "decision graph" — drifting nodes + proximity edges behind the hero.
export function initNetworkHero() {
  const canvas = $('#hero-net');
  if (!canvas) return;

  let view = fitCanvas(canvas);
  const coarse = window.matchMedia('(pointer:coarse)').matches;
  const THRESH = coarse ? 100 : 132;
  const pointer = { x: -1e4, y: -1e4, active: false };
  let nodes = [];

  function build() {
    const { w, h } = view;
    const count = coarse ? 28 : Math.min(64, Math.round((w * h) / 16000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.14,
      vy: (Math.random() - 0.5) * 0.14,
      r: Math.random() * 1.6 + 1,
      accent: Math.random() < 0.16,
      phase: Math.random() * Math.PI * 2,
    }));
  }

  function draw() {
    const { ctx, w, h } = view;
    ctx.clearRect(0, 0, w, h);
    // edges
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d >= THRESH) continue;
        ctx.strokeStyle = `rgba(52,225,255,${(1 - d / THRESH) * 0.18})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
    // nodes
    for (const n of nodes) {
      const pulse = n.accent ? 0.5 + 0.5 * Math.sin(n.phase) : 0;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r + (n.accent ? pulse * 1.6 : 0), 0, Math.PI * 2);
      if (n.accent) {
        ctx.fillStyle = `rgba(124,92,255,${0.5 + pulse * 0.4})`;
        ctx.shadowColor = 'rgba(124,92,255,.7)';
        ctx.shadowBlur = 8 + pulse * 8;
      } else {
        ctx.fillStyle = 'rgba(52,225,255,.55)';
        ctx.shadowBlur = 0;
      }
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  let acc = 0;
  function step(dt) {
    // throttle to ~30fps on touch devices to save battery
    if (coarse) { acc += dt; if (acc < 1 / 30) return; }
    const used = coarse ? acc : dt;
    acc = 0;
    const { w, h } = view;
    const k = used * 60;
    for (const n of nodes) {
      if (pointer.active) {
        const dx = pointer.x - n.x;
        const dy = pointer.y - n.y;
        if (dx * dx + dy * dy < 150 * 150) { n.vx += dx * 0.00002 * k; n.vy += dy * 0.00002 * k; }
      }
      n.vx = Math.max(-0.4, Math.min(0.4, n.vx * 0.999));
      n.vy = Math.max(-0.4, Math.min(0.4, n.vy * 0.999));
      n.x += n.vx * k;
      n.y += n.vy * k;
      if (n.x < -20) n.x = w + 20; else if (n.x > w + 20) n.x = -20;
      if (n.y < -20) n.y = h + 20; else if (n.y > h + 20) n.y = -20;
      n.phase += used * 1.4;
    }
    draw();
  }

  build();
  draw();
  if (prefersReducedMotion()) return;

  const host = canvas.parentElement;
  host.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    pointer.x = e.clientX - r.left;
    pointer.y = e.clientY - r.top;
    pointer.active = true;
  }, { passive: true });
  host.addEventListener('pointerleave', () => { pointer.active = false; });

  // Animate only while the hero is on screen.
  let unsub = null;
  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !unsub) unsub = addTick(step);
    else if (!e.isIntersecting && unsub) { unsub(); unsub = null; }
  }, { threshold: 0 });
  io.observe(canvas);

  let rt;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => { view = fitCanvas(canvas); build(); draw(); }, 150);
  }, { passive: true });
}
