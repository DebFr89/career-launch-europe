import { MILESTONES, YEAR_MIN, YEAR_MAX } from '../data/journey.js';
import { getLang } from '../data/i18n.js';
import { $, fitCanvas, prefersReducedMotion, onVisible, clamp } from '../lib/dom.js';
import { addTick, removeTick } from '../lib/raf.js';
import { easeOutCubic } from '../lib/easing.js';

// The signature animated career-trajectory chart in #story.
export function initTrajectory() {
  const canvas = $('#trajectory');
  if (!canvas) return;

  // Screen-reader equivalent of the chart (rebuilt on language change).
  const tbody = $('#trajectory-data');
  function fillTable() {
    if (!tbody) return;
    const fr = getLang() === 'fr';
    tbody.innerHTML = MILESTONES
      .map((m) => `<tr><td>${Math.floor(m.year)}</td><td>${fr && m.titleFr ? m.titleFr : m.title}</td><td>${m.org}</td></tr>`)
      .join('');
  }
  fillTable();
  document.addEventListener('i18n:change', fillTable);

  let view = fitCanvas(canvas);
  let progress = prefersReducedMotion() ? 1 : 0;
  let hoverIdx = -1;
  let animating = false;

  const PAD = { l: 16, r: 16, t: 28, b: 34 };
  const xOf = (year, w) => PAD.l + ((year - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * (w - PAD.l - PAD.r);
  const yOf = (lvl, h) => (h - PAD.b) - (lvl / 100) * (h - PAD.t - PAD.b);
  const points = (w, h) => MILESTONES.map((m) => ({ x: xOf(m.year, w), y: yOf(m.level, h), m }));

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function label(ctx, x, y, text, align, w) {
    ctx.font = '600 11px "Sora", system-ui, sans-serif';
    ctx.fillStyle = '#93A8C9';
    ctx.textAlign = align;
    ctx.fillText(text, clamp(x, PAD.l, w - PAD.r), Math.max(y, PAD.t + 2));
    ctx.textAlign = 'start';
  }

  function tooltip(ctx, p, w, h) {
    const m = p.m;
    const lines = [`${Math.floor(m.year)} · ${m.org}`, m.title];
    ctx.font = '11px "IBM Plex Mono", monospace';
    const tw = Math.max(...lines.map((l) => ctx.measureText(l).width)) + 22;
    const bx = clamp(p.x - tw / 2, 4, w - tw - 4);
    const by = clamp(p.y - 52, 4, h - 46);
    ctx.fillStyle = 'rgba(12,22,38,.97)';
    ctx.strokeStyle = '#34E1FF';
    ctx.lineWidth = 1;
    roundRect(ctx, bx, by, tw, 38, 8);
    ctx.fill();
    ctx.stroke();
    ctx.textAlign = 'left';
    ctx.fillStyle = '#34E1FF';
    ctx.fillText(lines[0], bx + 11, by + 15);
    ctx.fillStyle = '#E8F0FB';
    const title = lines[1].length > 28 ? `${lines[1].slice(0, 27)}…` : lines[1];
    ctx.fillText(title, bx + 11, by + 30);
    ctx.textAlign = 'start';
  }

  function render() {
    const { ctx, w, h } = view;
    ctx.clearRect(0, 0, w, h);
    const pts = points(w, h);
    const plotL = PAD.l;
    const plotR = w - PAD.r;
    const xCut = plotL + progress * (plotR - plotL);

    // gridlines
    ctx.strokeStyle = 'rgba(33,56,94,.5)';
    ctx.lineWidth = 1;
    for (const lv of [0, 50, 100]) {
      const y = yOf(lv, h);
      ctx.beginPath();
      ctx.moveTo(plotL, y);
      ctx.lineTo(plotR, y);
      ctx.stroke();
    }
    // year ticks
    ctx.fillStyle = '#5E7298';
    ctx.font = '10px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (const yr of [2012, 2016, 2020, 2024]) ctx.fillText(`'${String(yr).slice(2)}`, xOf(yr, w), h - PAD.b + 10);
    ctx.textBaseline = 'alphabetic';

    // revealed portion of the line (interpolate the partial segment at xCut)
    const rev = [];
    for (let i = 0; i < pts.length; i++) {
      if (pts[i].x <= xCut) { rev.push(pts[i]); continue; }
      const p0 = pts[i - 1];
      if (p0 && p0.x <= xCut) {
        const t = (xCut - p0.x) / (pts[i].x - p0.x);
        rev.push({ x: xCut, y: p0.y + (pts[i].y - p0.y) * t });
      }
      break;
    }

    if (rev.length >= 1) {
      const gradA = ctx.createLinearGradient(0, PAD.t, 0, h - PAD.b);
      gradA.addColorStop(0, 'rgba(52,225,255,.34)');
      gradA.addColorStop(1, 'rgba(52,225,255,0)');
      ctx.beginPath();
      ctx.moveTo(rev[0].x, h - PAD.b);
      rev.forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.lineTo(rev[rev.length - 1].x, h - PAD.b);
      ctx.closePath();
      ctx.fillStyle = gradA;
      ctx.fill();

      const gradL = ctx.createLinearGradient(plotL, 0, plotR, 0);
      gradL.addColorStop(0, '#34E1FF');
      gradL.addColorStop(1, '#7C5CFF');
      ctx.beginPath();
      rev.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      ctx.strokeStyle = gradL;
      ctx.lineWidth = 3;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.shadowColor = 'rgba(52,225,255,.5)';
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // milestone nodes (only the revealed ones)
    pts.forEach((p) => {
      if (p.x > xCut + 0.5) return;
      const m = p.m;
      if (m.highlight) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
        ctx.fillStyle = '#34E1FF';
        ctx.shadowColor = 'rgba(52,225,255,.85)';
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#E8F0FB';
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#0C1626';
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = m.leap ? '#7C5CFF' : '#34E1FF';
        ctx.stroke();
      }
    });

    // key labels once fully drawn
    if (progress >= 0.999) {
      pts.forEach((p, i) => {
        const m = p.m;
        if (m.highlight) label(ctx, p.x - 4, p.y - 16, 'Sr Principal, EMEA', 'right', w);
        else if (m.leap) label(ctx, p.x, p.y - 14, 'NEOMA MBA · France', 'center', w);
        else if (i === 0) label(ctx, p.x, p.y - 14, 'NIT Warangal', 'left', w);
      });
    }

    if (hoverIdx >= 0) tooltip(ctx, pts[hoverIdx], w, h);
  }

  function startAnim() {
    if (animating) return;
    animating = true;
    let elapsed = 0;
    const dur = 1700;
    const tick = (dt) => {
      elapsed += dt * 1000;
      progress = easeOutCubic(Math.min(elapsed / dur, 1));
      render();
      if (elapsed >= dur) {
        progress = 1;
        render();
        removeTick(tick);
        animating = false;
      }
    };
    addTick(tick);
  }

  canvas.addEventListener('mousemove', (e) => {
    if (progress < 0.999) return;
    const r = canvas.getBoundingClientRect();
    const mx = e.clientX - r.left;
    const my = e.clientY - r.top;
    const pts = points(view.w, view.h);
    let best = -1;
    let bd = 1e9;
    pts.forEach((p, i) => {
      const d = Math.hypot(p.x - mx, p.y - my);
      if (d < 24 && d < bd) { bd = d; best = i; }
    });
    if (best !== hoverIdx) {
      hoverIdx = best;
      canvas.style.cursor = best >= 0 ? 'pointer' : 'default';
      render();
    }
  });
  canvas.addEventListener('mouseleave', () => {
    if (hoverIdx !== -1) { hoverIdx = -1; render(); }
  });

  let rt;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => { view = fitCanvas(canvas); render(); }, 150);
  }, { passive: true });

  render();
  if (!prefersReducedMotion()) onVisible(canvas, startAnim, { threshold: 0.3 });
}
