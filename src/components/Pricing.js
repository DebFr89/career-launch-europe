import { TIERS, DISCOVERY, CURRENCY } from '../data/pricing.js';
import { bookingLinkFor, BOOKINGS_PLACEHOLDER } from '../config.js';
import { getLang, t } from '../data/i18n.js';
import { $, el } from '../lib/dom.js';

const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';

// Localised field accessor: prefer item.fr[field] in French, else the base field.
const loc = (item, field) => (getLang() === 'fr' && item.fr && item.fr[field] != null ? item.fr[field] : item[field]);

// Where a "book" CTA points. Before the Bookings URL is configured we send people
// to the on-page booking section (which shows the setup note / email fallback).
function cta(serviceId) {
  if (BOOKINGS_PLACEHOLDER) return { href: '#booking' };
  return { href: bookingLinkFor(serviceId), target: '_blank', rel: 'noopener' };
}

function render() {
  const grid = $('#pricing-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const oldBanner = grid.parentElement.querySelector('.discovery-banner');
  if (oldBanner) oldBanner.remove();

  const banner = el('div', { class: 'discovery-banner' }, [
    el('div', {}, [
      el('span', { class: 'discovery-banner__tag', text: loc(DISCOVERY, 'priceLabel') }),
      el('b', { text: loc(DISCOVERY, 'name') }),
      el('p', { text: loc(DISCOVERY, 'promise') }),
    ]),
    el('a', { class: 'btn btn-cta', ...cta(DISCOVERY.id), html: `${loc(DISCOVERY, 'cta')} &rarr;` }),
  ]);
  grid.parentElement.insertBefore(banner, grid);

  const locale = getLang() === 'fr' ? 'fr-FR' : 'en-US';
  for (const tier of TIERS) {
    const ribbon = loc(tier, 'ribbon');
    const footnote = loc(tier, 'footnote');
    const features = el('ul', { class: 'tier__features' },
      loc(tier, 'features').map((f) => el('li', { html: `${CHECK}<span>${f}</span>` })));

    grid.appendChild(el('article', { class: `tier${tier.popular ? ' tier--popular' : ''}` }, [
      tier.popular && ribbon ? el('span', { class: 'tier__ribbon', text: ribbon }) : null,
      el('div', { class: 'tier__name', text: tier.name }),
      el('div', { class: 'tier__tagline', text: loc(tier, 'tagline') }),
      el('div', { class: 'tier__price' }, [
        el('span', { class: 'cur', text: CURRENCY }),
        el('span', { class: 'amt', text: tier.price.toLocaleString(locale) }),
      ]),
      el('div', { class: 'tier__unit', text: loc(tier, 'unit') }),
      el('p', { class: 'tier__promise', text: loc(tier, 'promise') }),
      el('p', { class: 'tier__for', text: loc(tier, 'forWhom') }),
      features,
      footnote ? el('p', { class: 'tier__foot', text: footnote }) : null,
      el('a', { class: 'btn', ...cta(tier.id), html: t('common.bookCta') }),
    ]));
  }
}

export function initPricing() {
  render();
  document.addEventListener('i18n:change', render);
}
