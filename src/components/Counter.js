import { STATS } from '../data/stats.js';
import { getLang } from '../data/i18n.js';
import { $, el, onVisible, prefersReducedMotion } from '../lib/dom.js';
import { addTick, removeTick } from '../lib/raf.js';
import { easeOutCubic } from '../lib/easing.js';

const fmt = (v, suffix) => Math.round(v).toLocaleString(getLang() === 'fr' ? 'fr-FR' : 'en-US') + (suffix || '');

export function initCounters() {
  const grid = $('#stats-grid');
  if (!grid) return;
  let animated = false;

  function build() {
    grid.innerHTML = '';
    const fr = getLang() === 'fr';
    for (const s of STATS) {
      const num = el('b', { text: fmt(s.value, s.suffix) });        // final value is the default
      grid.appendChild(el('div', { class: 'stat' }, [num, el('span', { text: fr && s.labelFr ? s.labelFr : s.label })]));

      if (!animated && !prefersReducedMotion()) {
        onVisible(num, () => {
          let elapsed = 0;
          num.textContent = fmt(0, s.suffix);
          const tick = (dt) => {
            elapsed += dt * 1000;
            const t = Math.min(elapsed / 1300, 1);
            num.textContent = fmt(s.value * easeOutCubic(t), s.suffix);
            if (t >= 1) removeTick(tick);
          };
          addTick(tick);
        });
      }
    }
    animated = true;   // only the first build animates; language re-renders snap to final
  }

  build();
  document.addEventListener('i18n:change', build);
}
