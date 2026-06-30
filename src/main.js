// Bootstrap — apply language, wire footer + language toggle, init every component.
import { $, $$, on } from './lib/dom.js';
import { CONTACT } from './config.js';
import { initI18n, setLang } from './data/i18n.js';
import { initNav } from './components/Nav.js';
import { initReveal } from './components/Reveal.js';
import { initCounters } from './components/Counter.js';
import { initPricing } from './components/Pricing.js';
import { initFaq } from './components/Faq.js';
import { initBooking } from './components/Booking.js';
import { initTrajectory } from './components/TrajectoryChart.js';
import { initNetworkHero } from './components/NetworkHero.js';
import { initScorecard } from './components/Scorecard.js';
import { initEmeaMap } from './components/EmeaMap.js';

function fillFooter() {
  const email = $('#footer-email');
  if (email) { email.href = `mailto:${CONTACT.email}`; email.textContent = CONTACT.email; }
  const li = $('#footer-linkedin');
  if (li) { li.href = CONTACT.linkedin; li.textContent = CONTACT.linkedinLabel; }
  const cv = $('#footer-cv');
  if (cv) cv.href = CONTACT.cv;          // text comes from data-i18n
  const loc = $('#footer-loc');
  if (loc) loc.textContent = CONTACT.location;
  const yr = $('#year');
  if (yr) yr.textContent = String(new Date().getFullYear());
}

function wireLangToggle() {
  $$('[data-lang-btn]').forEach((btn) => on(btn, 'click', () => setLang(btn.getAttribute('data-lang-btn'))));
}

const safe = (fn) => { try { fn(); } catch (e) { console.error(`[init] ${fn.name} failed`, e); } };

// i18n must run before components so they render in the detected language.
safe(initI18n);
[fillFooter, wireLangToggle, initNav, initReveal, initCounters, initPricing, initFaq,
 initBooking, initTrajectory, initNetworkHero, initScorecard, initEmeaMap].forEach(safe);

// Register the service worker on secure contexts only (https or localhost).
if ('serviceWorker' in navigator) {
  const secure = location.protocol === 'https:' || ['localhost', '127.0.0.1'].includes(location.hostname);
  if (secure) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js', { scope: './' }).catch((e) => console.warn('[sw] register failed', e));
    });
  }
}
