// =============================================================================
//  PRICING — edit names, prices and deliverables here. Prices are PLACEHOLDERS.
//  `id` must match config.js → BOOKINGS_SERVICE. Each item carries a parallel
//  `fr` block for the French version (names/prices stay the same in both).
// =============================================================================

export const CURRENCY = '€';

export const DISCOVERY = {
  id: 'discovery',
  name: 'Discovery Call',
  priceLabel: 'Free · 30 min',
  promise: 'No pitch. We map your situation and decide together whether the programme fits.',
  cta: 'Book a free discovery call',
  fr: {
    name: 'Appel découverte',
    priceLabel: 'Gratuit · 30 min',
    promise: 'Pas d’argumentaire. On fait le point sur votre situation et on décide ensemble si le programme vous convient.',
    cta: 'Réserver un appel découverte gratuit',
  },
};

export const TIERS = [
  {
    id: 'positioning',
    name: 'Le Positionnement',
    tagline: 'Positioning Sprint',
    price: 450,                 // EDIT €
    unit: 'one-off',
    popular: false,
    promise: 'A sharp restart for the self-driven job-seeker.',
    forWhom: 'You’ll run the search yourself — you just need it pointed in the right direction.',
    features: [
      '90-minute strategy deep-dive',
      'European-format CV rewrite',
      'LinkedIn profile overhaul (recruiter-facing)',
      'Target-role & market map (companies, cities, titles)',
      'One async follow-up review (within 7 days)',
    ],
    fr: {
      tagline: 'Sprint de positionnement',
      unit: 'ponctuel',
      promise: 'Un redémarrage net pour le chercheur autonome.',
      forWhom: 'Vous menez la recherche vous-même — il vous faut juste la bonne direction.',
      features: [
        'Entretien stratégique de 90 min',
        'Réécriture du CV au format européen',
        'Refonte du profil LinkedIn (côté recruteur)',
        'Cartographie des postes & du marché cibles',
        'Une relecture asynchrone de suivi (sous 7 jours)',
      ],
    },
  },
  {
    id: 'launch',
    name: 'The Europe Launch Method',
    tagline: 'Flagship 6-week programme',
    price: 1900,                // EDIT €
    unit: '6-week programme',
    popular: true,
    ribbon: 'Le plus choisi',
    promise: 'The full system to land a role in Europe in one or two quarters.',
    forWhom: 'You’re serious about moving and want a guide who has done it.',
    features: [
      'Everything in Le Positionnement',
      '6 weekly 1:1 coaching sessions',
      'Outreach scripts that actually get replies',
      'Interview & case-prep with mock rounds',
      'Salary & offer negotiation playbook',
      'Recruiter + network activation strategy',
      'Direct support between sessions (WhatsApp / email)',
    ],
    fr: {
      tagline: 'Programme phare de 6 semaines',
      unit: 'programme de 6 semaines',
      ribbon: 'Le plus choisi',
      promise: 'Le système complet pour décrocher un poste en Europe en un à deux trimestres.',
      forWhom: 'Vous êtes décidé à venir et voulez un guide qui l’a fait.',
      features: [
        'Tout Le Positionnement',
        '6 séances individuelles hebdomadaires',
        'Scripts d’approche qui obtiennent des réponses',
        'Préparation aux entretiens & études de cas',
        'Plan de négociation salariale',
        'Stratégie recruteurs + activation du réseau',
        'Soutien entre les séances (WhatsApp / e-mail)',
      ],
    },
  },
  {
    id: 'executive',
    name: 'The Executive Partner',
    tagline: 'Accompagnement Exécutif',
    price: 4500,                // EDIT €
    unit: '12-week retainer',
    popular: false,
    promise: 'High-stakes, senior moves across EMEA — handled with care.',
    forWhom: 'Director / VP / senior-IC candidates making a deliberate, high-value move.',
    features: [
      'Everything in The Europe Launch Method',
      '12 weeks of 1:1 partnership',
      'Personal-brand & thought-leadership plan',
      'Mock executive panels with structured feedback',
      'Warm introductions where appropriate',
      'Offer, relocation & visa-strategy guidance*',
      'Priority access & fast turnarounds',
    ],
    footnote: '*Coaching and strategy — not legal or immigration advice.',
    fr: {
      tagline: 'Accompagnement Exécutif',
      unit: 'accompagnement de 12 semaines',
      promise: 'Des mouvements seniors à fort enjeu à travers l’EMEA — menés avec soin.',
      forWhom: 'Profils Directeur / VP / senior réalisant une transition réfléchie et à forte valeur.',
      features: [
        'Tout The Europe Launch Method',
        '12 semaines de partenariat individuel',
        'Plan de marque personnelle & leadership d’opinion',
        'Simulations de jurys exécutifs avec retours',
        'Mises en relation directes le cas échéant',
        'Conseil offre, relocation & stratégie visa*',
        'Accès prioritaire & délais rapides',
      ],
      footnote: '*Coaching et stratégie — pas de conseil juridique ou d’immigration.',
    },
  },
];
