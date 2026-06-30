import { tScorecard } from '../data/i18n.js';
import { $, el, on } from '../lib/dom.js';

// Interactive "Relocation Readiness" lead magnet: 5 sliders → live gauge + radar + verdict.
const RADAR_C = 70;
const RADAR_R = 52;
const angleOf = (i, n) => -Math.PI / 2 + i * ((2 * Math.PI) / n);

function radarPoints(state) {
  const n = state.length;
  return state.map((a, i) => {
    const ang = angleOf(i, n);
    const r = (a.value / 100) * RADAR_R;
    return `${(RADAR_C + Math.cos(ang) * r).toFixed(1)},${(RADAR_C + Math.sin(ang) * r).toFixed(1)}`;
  }).join(' ');
}

function radarSvg(state) {
  const n = state.length;
  let grid = '';
  for (const f of [0.5, 1]) {
    const pts = state.map((a, i) => {
      const ang = angleOf(i, n);
      return `${(RADAR_C + Math.cos(ang) * RADAR_R * f).toFixed(1)},${(RADAR_C + Math.sin(ang) * RADAR_R * f).toFixed(1)}`;
    }).join(' ');
    grid += `<polygon points="${pts}" fill="none" stroke="#21385E" stroke-width="0.6"/>`;
  }
  let spokes = '';
  state.forEach((a, i) => {
    const ang = angleOf(i, n);
    spokes += `<line x1="${RADAR_C}" y1="${RADAR_C}" x2="${(RADAR_C + Math.cos(ang) * RADAR_R).toFixed(1)}" y2="${(RADAR_C + Math.sin(ang) * RADAR_R).toFixed(1)}" stroke="#21385E" stroke-width="0.5"/>`;
  });
  return `<svg viewBox="0 0 140 140" width="100%" role="img" aria-label="Readiness radar across five dimensions">
    ${grid}${spokes}
    <polygon id="sc-poly" points="${radarPoints(state)}" fill="rgba(52,225,255,.18)" stroke="#34E1FF" stroke-width="1.2"/>
  </svg>`;
}

function build() {
  const mount = $('#scorecard');
  if (!mount) return;
  mount.innerHTML = '';

  const cfg = tScorecard();
  const defaults = { clarity: 60, cv: 35, language: 55, network: 30, visa: 45 };
  const state = cfg.axes.map((a) => ({ ...a, value: defaults[a.key] ?? 40 }));

  const controls = el('div', { class: 'score__controls' });
  state.forEach((ax) => {
    const out = el('b', { text: `${ax.value}%` });
    const input = el('input', {
      type: 'range', min: '0', max: '100', value: String(ax.value),
      'aria-label': ax.label, 'aria-valuetext': `${ax.label}: ${ax.value} percent`,
    });
    input.style.setProperty('--p', `${ax.value}%`);
    on(input, 'input', () => {
      ax.value = +input.value;
      out.textContent = `${ax.value}%`;
      input.style.setProperty('--p', `${ax.value}%`);
      input.setAttribute('aria-valuetext', `${ax.label}: ${ax.value} percent`);
      update();
    });
    controls.appendChild(el('div', { class: 'score__row' }, [el('label', {}, [ax.label, out]), input]));
  });

  const C = 2 * Math.PI * 52;
  const gauge = el('div', { class: 'gauge' });
  gauge.innerHTML = `
    <svg viewBox="0 0 120 120" width="100%">
      <defs><linearGradient id="sc-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#34E1FF"/><stop offset="1" stop-color="#7C5CFF"/>
      </linearGradient></defs>
      <circle cx="60" cy="60" r="52" fill="none" stroke="#172A49" stroke-width="10"/>
      <circle id="sc-arc" cx="60" cy="60" r="52" fill="none" stroke="url(#sc-grad)" stroke-width="10"
              stroke-linecap="round" transform="rotate(-90 60 60)" stroke-dasharray="0 ${C.toFixed(1)}"/>
    </svg>
    <div class="gauge__num"><b id="sc-score">0</b><small>${cfg.scoreSuffix}</small></div>`;

  const radar = el('div', { class: 'radar', html: radarSvg(state) });
  const verdict = el('div', { class: 'verdict', 'aria-live': 'polite' });
  mount.append(controls, el('div', { class: 'score__viz' }, [gauge, radar, verdict]));

  const arc = gauge.querySelector('#sc-arc');
  const scoreEl = gauge.querySelector('#sc-score');
  const poly = radar.querySelector('#sc-poly');

  function update() {
    const score = Math.round(state.reduce((s, a) => s + a.value, 0) / state.length);
    scoreEl.textContent = String(score);
    arc.setAttribute('stroke-dasharray', `${(C * score / 100).toFixed(1)} ${C.toFixed(1)}`);
    if (poly) poly.setAttribute('points', radarPoints(state));
    const band = [...cfg.bands].reverse().find((b) => score >= b.min) || cfg.bands[0];
    const weakest = state.reduce((min, a) => (a.value < min.value ? a : min), state[0]);
    verdict.innerHTML = `<b>${band.headline}</b><p>${cfg.gaps[weakest.key]}</p><a href="#booking">${cfg.cta}</a>`;
  }

  update();
}

export function initScorecard() {
  build();
  document.addEventListener('i18n:change', build);
}
