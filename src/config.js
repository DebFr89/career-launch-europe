// =============================================================================
//  SITE CONFIG  —  edit this file to wire up booking + contact details.
//  This is the ONE place to change your scheduling link and contact info.
// =============================================================================

// --- BOOKING ----------------------------------------------------------------
// Paste your Microsoft Bookings page URL here (replace the whole string).
// It looks like:
//   https://outlook.office365.com/owa/calendar/<your-slug>@<tenant>/bookings/
// Until you do, the booking section shows a button + a setup note (no broken iframe).
export const BOOKINGS_URL = 'https://outlook.office365.com/owa/calendar/REPLACE_ME/bookings/';

// OPTIONAL: if you create one Microsoft Bookings *service* per package, paste the
// per-service deep links here so each pricing button opens the right one.
// Leave blank to send every button to the main BOOKINGS_URL above.
export const BOOKINGS_SERVICE = {
  discovery: '',
  positioning: '',
  launch: '',
  executive: '',
};

// --- CONTACT ----------------------------------------------------------------
export const CONTACT = {
  name: 'Debanjan Patra',
  email: 'debanjan.patra@hotmail.com',        // personal email (this is an independent practice)
  linkedin: 'https://www.linkedin.com/in/debanjanpatra',
  linkedinLabel: 'linkedin.com/in/debanjanpatra',
  location: 'Paris · serving all of EMEA',
  cv: './assets/cv-debanjan-patra.pdf',
};

export const SITE_URL = 'https://debfr89.github.io/career-launch-europe/';

// Helper: resolve the booking link for a given package id (falls back to main URL).
export function bookingLinkFor(serviceId) {
  const specific = BOOKINGS_SERVICE[serviceId];
  return specific && specific.trim() ? specific : BOOKINGS_URL;
}

// True while the placeholder hasn't been replaced — used to show the setup note.
export const BOOKINGS_PLACEHOLDER = BOOKINGS_URL.includes('REPLACE_ME');
