import { FAQS } from '../data/faq.js';
import { getLang } from '../data/i18n.js';
import { $, el, on } from '../lib/dom.js';

function render() {
  const list = $('#faq-list');
  if (!list) return;
  list.innerHTML = '';
  const fr = getLang() === 'fr';

  FAQS.forEach((item, i) => {
    const q = fr && item.qFr ? item.qFr : item.q;
    const a = fr && item.aFr ? item.aFr : item.a;
    const answer = el('div', { class: 'faq__a', id: `faq-a-${i}`, role: 'region' }, [el('p', { text: a })]);
    const btn = el('button', {
      class: 'faq__q', type: 'button', 'aria-expanded': 'false', 'aria-controls': `faq-a-${i}`,
    }, [el('span', { text: q }), el('span', { class: 'ico', 'aria-hidden': 'true' })]);

    on(btn, 'click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      answer.style.maxHeight = open ? '0px' : `${answer.scrollHeight}px`;
    });
    list.appendChild(el('div', { class: 'faq__item' }, [btn, answer]));
  });
}

export function initFaq() {
  render();
  document.addEventListener('i18n:change', render);
  on(window, 'resize', () => {
    const list = $('#faq-list');
    if (!list) return;
    list.querySelectorAll('.faq__q[aria-expanded="true"]').forEach((b) => {
      const a = b.nextElementSibling;
      if (a) a.style.maxHeight = `${a.scrollHeight}px`;
    });
  }, { passive: true });
}
