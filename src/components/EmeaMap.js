import { CITIES, HUB } from '../data/nodes.js';
import { $ } from '../lib/dom.js';

// Abstract "EMEA reach" constellation — Paris hub with radiating, pulsing nodes (SVG/SMIL).
export function initEmeaMap() {
  const svg = $('#emea-map');
  if (!svg) return;

  svg.setAttribute('viewBox', '0 0 100 90');
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hub = CITIES.find((c) => c.hub) || CITIES[0];

  const edges = CITIES.filter((c) => !c.hub)
    .map((c) => `<line x1="${hub.x}" y1="${hub.y}" x2="${c.x}" y2="${c.y}" stroke="rgba(52,225,255,.16)" stroke-width="0.4"/>`)
    .join('');

  const dots = CITIES.map((c, i) => {
    const r = c.hub ? 2.4 : 1.4;
    const fill = c.hub ? '#34E1FF' : '#7C5CFF';
    const delay = (i % 6) * 0.5;
    const ping = reduce ? '' :
      `<circle cx="${c.x}" cy="${c.y}" r="${r}" fill="${fill}" opacity="0.3">
         <animate attributeName="r" values="${r};${(r * 2.6).toFixed(1)};${r}" dur="3s" begin="${delay}s" repeatCount="indefinite"/>
         <animate attributeName="opacity" values="0.35;0;0.35" dur="3s" begin="${delay}s" repeatCount="indefinite"/>
       </circle>`;
    return `<g><title>${c.name}</title>${ping}<circle cx="${c.x}" cy="${c.y}" r="${r}" fill="${fill}"/></g>`;
  }).join('');

  const hubLabel = `<text x="${hub.x + 3.2}" y="${hub.y + 1.1}" fill="#E8F0FB" font-size="3.4" font-family="IBM Plex Mono, monospace">${HUB}</text>`;

  svg.innerHTML = edges + dots + hubLabel;
}
