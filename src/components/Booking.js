import { BOOKINGS_URL, BOOKINGS_PLACEHOLDER, CONTACT } from '../config.js';
import { t } from '../data/i18n.js';
import { $, el, onVisible } from '../lib/dom.js';

// Scheduler embed (Calendly / Cal.com / MS Bookings): lazy iframe + always-present fallback.
// Before the URL is configured, shows a setup note + an email fallback (never a broken iframe).

// Calendly: hide the GDPR banner for a cleaner embed. (Colour theming is a paid
// Calendly feature, ignored on free plans, so we keep the default readable widget.)
function embedUrl(url) {
  if (/calendly\.com/i.test(url)) {
    const sep = url.includes('?') ? '&' : '?';
    return `${url}${sep}hide_gdpr_banner=1`;
  }
  return url;
}

function build() {
  const mount = $('#booking-mount');
  if (!mount) return;
  mount.innerHTML = '';

  mount.appendChild(el('div', { class: 'booking__bar' }, [
    el('span', { class: 't', text: t('booking.barT') }),
    el('span', { class: 's', text: t('booking.barS') }),
  ]));

  if (BOOKINGS_PLACEHOLDER) {
    mount.appendChild(el('div', { class: 'booking__note', html: t('booking.note') }));
    mount.appendChild(el('div', { class: 'booking__fallback' }, [
      el('span', { text: t('booking.fallbackPrompt') }),
      el('a', {
        class: 'btn btn-cta',
        href: `mailto:${CONTACT.email}?subject=${encodeURIComponent('Discovery call — career coaching')}`,
        html: t('booking.emailBtn'),
      }),
    ]));
    return;
  }

  const frame = el('iframe', {
    class: 'booking__frame',
    title: 'Book a call with Debanjan Patra',
    loading: 'lazy',
    referrerpolicy: 'strict-origin-when-cross-origin',
    allow: 'fullscreen',
  });
  mount.appendChild(frame);
  mount.appendChild(el('div', { class: 'booking__fallback' }, [
    el('span', { text: t('booking.fallbackOpen') }),
    el('a', { class: 'btn btn-ghost', href: BOOKINGS_URL, target: '_blank', rel: 'noopener', html: t('booking.openBtn') }),
  ]));

  onVisible(mount, () => { if (!frame.src) frame.src = embedUrl(BOOKINGS_URL); }, { threshold: 0.1 });
}

export function initBooking() {
  build();
  document.addEventListener('i18n:change', build);
}
