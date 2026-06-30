// =============================================================================
//  i18n — EN/FR.
//  Static prose: elements carry data-i18n="key" (textContent) or
//  data-i18n-html="key" (innerHTML); applyStatic() swaps them.
//  Dynamic/data-driven copy (pricing, faq, stats) lives in its own data file
//  with parallel `fr` fields; components read getLang() and re-render on
//  the `i18n:change` event.
// =============================================================================

const S = {
  en: {
    'nav.why': 'Why me', 'nav.method': 'The method', 'nav.pricing': 'Pricing',
    'nav.readiness': 'Readiness', 'nav.faq': 'FAQ', 'nav.book': 'Book a call',

    'hero.eyebrow': 'Career coaching · France & Europe',
    'hero.h1a': 'Land your next role in Europe — ',
    'hero.h1b': 'without learning the rules the hard way.',
    'hero.sub': 'I moved from India to France and rose to Senior Principal, EMEA at a global tech firm. Now I help ambitious internationals do the same — faster.',
    'hero.cta1': 'Book a free discovery call', 'hero.cta2': 'See how it works',
    'hero.cred1': 'Senior Principal, EMEA · Aera Technology',
    'hero.cred2': 'NEOMA International MBA',
    'hero.cred3': 'Based in Paris · 5 languages',
    'hero.tag': 'India → France → EMEA',
    'hero.badgeNum': '13+ yrs', 'hero.badgeUnit': 'Ops · Strategy · EMEA',

    'trust.label': 'Built across',

    'problem.eyebrow': 'The real obstacle',
    'problem.h2': 'It’s not your talent. It’s the rulebook nobody handed you.',
    'problem.lead': 'Skilled professionals get stuck at the European border not because they aren’t good enough — but because the market plays by rules they were never told. These are the four that stop most people.',
    'problem.c1t': 'Your CV gets filtered out',
    'problem.c1b': 'European formats, length and framing differ from Indian, US or Gulf norms — and screening tools bin yours before a human ever reads it.',
    'problem.c2t': 'The visa maze',
    'problem.c2b': 'Passeport Talent, EU Blue Card, salarié… employers hesitate when they’re unsure of the route. Positioning fixes that.',
    'problem.c3t': '“You must be fluent in French”',
    'problem.c3b': 'A myth for a huge share of roles. The trick is knowing which doors are open in English — and walking through them.',
    'problem.c4t': 'A network you don’t have — yet',
    'problem.c4b': 'Most European roles are filled through people, not portals. You need a way into the hidden job market.',

    'story.eyebrow': 'The proof is the path',
    'story.h2': 'I didn’t read about this leap. I made it.',
    'story.lead': 'From a chemical-engineering campus in India to leading decision-intelligence engagements across EMEA from Paris — in just over a decade. Every step taught me something about how this market really works.',
    'story.li1': '5 years at PepsiCo India — a beverage line serving 34% of the national market.',
    'story.li2': 'The leap: NEOMA International MBA in Reims, plus Saint-Cyr leadership & Politecnico di Milano.',
    'story.li3': 'Aera Technology: Solutions Architect → Associate Principal → Principal → Senior Principal, EMEA.',
    'story.punch': 'I’ve done the exact thing you’re trying to do. Now I help you compress the timeline.',
    'story.chartTitle': 'Career trajectory · scope & seniority',
    'story.chartRange': '2012 → today',
    'story.tableCaption': 'Career milestones',
    'story.thYear': 'Year', 'story.thRole': 'Role', 'story.thOrg': 'Organisation',

    'method.eyebrow': 'The method',
    'method.lead': 'Four phases that take you from a foreign CV to a signed European offer. Not vague “coaching” — a repeatable system, run with you, one-to-one.',
    'method.v1t': 'A CV that clears the filter', 'method.v1b': 'Reformatted to European norms so recruiters read it — not bin it.',
    'method.v2t': 'A market map, not a job-board scroll', 'method.v2b': 'The exact roles, companies and cities that fit you — and who to reach.',
    'method.v3t': 'The unwritten rules, decoded', 'method.v3b': 'Visas, language, interview styles and salary bands — from someone who lived them.',
    'method.v4t': 'A network you can borrow', 'method.v4b': 'Outreach that gets replies, and warm intros where they count.',
    'method.v5t': 'Offers you can negotiate', 'method.v5b': 'Walk into the salary conversation with a playbook, not a hope.',
    'method.v6t': 'Proof it works — me', 'method.v6b': 'India → France → EMEA leadership in under a decade, systematised for you.',
    'method.s1t': 'Position', 'method.s1b': 'Pin down the roles, companies and cities that fit — and rebuild your CV & LinkedIn so European recruiters can’t overlook you.', 'method.s1o': 'A market-ready profile',
    'method.s2t': 'Penetrate', 'method.s2b': 'Reach the market job boards hide: targeted outreach, warm introductions, and a network you can actually borrow.', 'method.s2o': 'Conversations with real decision-makers',
    'method.s3t': 'Land', 'method.s3b': 'Get interview-ready for European styles — structured prep and mock rounds until you’re sharp under pressure.', 'method.s3o': 'Offers on the table',
    'method.s4t': 'Negotiate', 'method.s4b': 'Turn an offer into the right offer: salary bands, contracts, relocation and the moves most candidates miss.', 'method.s4o': 'The role — on your terms',

    'services.eyebrow': 'Work with me',
    'services.h2': 'Three ways in. One free call to start.',
    'services.lead': 'Pick the level of support that fits where you are. Every path starts with a free discovery call — no pressure, no pitch.',
    'services.note': 'Prices in euros. Not sure which fits? <a href="#booking" style="color:var(--cyan)">Start with the free discovery call</a> and we’ll decide together.',

    'readiness.eyebrow': 'Measure it',
    'readiness.h2': 'How launch-ready are you?',
    'readiness.lead': 'Move the five sliders to your honest reality. Your live readiness score updates instantly — and shows the first gap to close.',

    'proof.eyebrow': 'By the numbers', 'proof.h2': 'A path you can trust.',
    'proof.ph': 'Placeholder', 'proof.client': 'Client name',
    'proof.tc1q': '“Add a real client quote here — the transformation, in their words.”', 'proof.tc1r': 'Role · landed in <city>',
    'proof.tc2q': '“A second testimonial — ideally naming the outcome and the timeframe.”', 'proof.tc2r': 'Role · moved from <country>',
    'proof.tc3q': '“A third — short, specific and credible beats long and generic.”', 'proof.tc3r': 'Role · <industry>',
    'proof.emeaEyebrow': 'EMEA reach', 'proof.emeaH3': 'From Paris, across the region.',
    'proof.emeaP': 'A decade of engagements spanning Europe, the Middle East and Africa means a feel for how hiring really works market-by-market — not just in one city.',

    'faq.eyebrow': 'Straight answers', 'faq.h2': 'The questions internationals actually ask.',

    'booking.eyebrow': 'On commence ?', 'booking.h2': 'Book your free discovery call.',
    'booking.lead': 'A free 30-minute conversation. We map your situation and decide — honestly — whether and how I can help. Shall we begin?',
    'booking.barT': 'Discovery Call with Debanjan', 'booking.barS': 'Free · 30 minutes · by video',
    'booking.note': 'Live scheduling switches on the moment your Microsoft Bookings link is added.<br><br>Open <code>src/config.js</code> and replace <code>REPLACE_ME</code> in <code>BOOKINGS_URL</code> with your Bookings page link.',
    'booking.fallbackPrompt': 'In the meantime:',
    'booking.fallbackOpen': 'Prefer a new tab — or the embed not loading?',
    'booking.emailBtn': 'Email me to book →', 'booking.openBtn': 'Open the booking page ↗',

    'footer.tagline': 'Personal career coaching for internationals building a future in France & Europe.',
    'footer.cta': 'Book a free call', 'footer.navHead': 'Navigate', 'footer.connectHead': 'Connect',
    'footer.readiness': 'Readiness check', 'footer.email': 'Email', 'footer.cv': 'View my CV (PDF)',
    'footer.legal': 'Debanjan Patra · Independent coaching practice — views and services my own, not affiliated with my employer. Career coaching, not legal or immigration advice.',

    'common.bookCta': 'Book a call →',
  },

  fr: {
    'nav.why': 'Pourquoi moi', 'nav.method': 'La méthode', 'nav.pricing': 'Tarifs',
    'nav.readiness': 'Préparation', 'nav.faq': 'FAQ', 'nav.book': 'Réserver un appel',

    'hero.eyebrow': 'Coaching de carrière · France & Europe',
    'hero.h1a': 'Décrochez votre prochain poste en Europe — ',
    'hero.h1b': 'sans apprendre les règles à vos dépens.',
    'hero.sub': 'Je suis parti d’Inde pour la France et je suis devenu Senior Principal EMEA dans une entreprise tech mondiale. J’aide aujourd’hui des profils internationaux ambitieux à faire de même — plus vite.',
    'hero.cta1': 'Réserver un appel découverte gratuit', 'hero.cta2': 'Voir comment ça marche',
    'hero.cred1': 'Senior Principal, EMEA · Aera Technology',
    'hero.cred2': 'MBA International NEOMA',
    'hero.cred3': 'Basé à Paris · 5 langues',
    'hero.tag': 'Inde → France → EMEA',
    'hero.badgeNum': '13+ ans', 'hero.badgeUnit': 'Opérations · Stratégie · EMEA',

    'trust.label': 'Forgé au sein de',

    'problem.eyebrow': 'Le vrai obstacle',
    'problem.h2': 'Ce n’est pas votre talent. C’est le règlement qu’on ne vous a jamais donné.',
    'problem.lead': 'Les professionnels qualifiés se heurtent à la frontière européenne non par manque de talent, mais parce que le marché suit des règles qu’on ne leur a jamais expliquées. Voici les quatre qui bloquent le plus de monde.',
    'problem.c1t': 'Votre CV est filtré',
    'problem.c1b': 'Les formats, la longueur et la mise en avant diffèrent des normes indiennes, américaines ou du Golfe — et les outils de tri l’écartent avant qu’un humain ne le lise.',
    'problem.c2t': 'Le labyrinthe des visas',
    'problem.c2b': 'Passeport Talent, Carte bleue européenne, salarié… les employeurs hésitent quand la voie n’est pas claire. Un bon positionnement règle cela.',
    'problem.c3t': '« Il faut parler français couramment »',
    'problem.c3b': 'Un mythe pour une large part des postes. L’astuce : savoir quelles portes sont ouvertes en anglais — et les franchir.',
    'problem.c4t': 'Un réseau que vous n’avez pas — encore',
    'problem.c4b': 'La plupart des postes en Europe se pourvoient par les gens, pas par les portails. Il vous faut une entrée vers le marché caché.',

    'story.eyebrow': 'La preuve, c’est le parcours',
    'story.h2': 'Je n’ai pas lu cette histoire. Je l’ai vécue.',
    'story.lead': 'D’un campus d’ingénierie chimique en Inde à la direction d’engagements en decision intelligence à travers l’EMEA depuis Paris — en un peu plus d’une décennie. Chaque étape m’a appris comment ce marché fonctionne vraiment.',
    'story.li1': '5 ans chez PepsiCo Inde — une ligne de production servant 34 % du marché national.',
    'story.li2': 'Le grand saut : MBA International NEOMA à Reims, plus le leadership à Saint-Cyr et un échange au Politecnico di Milano.',
    'story.li3': 'Aera Technology : Solutions Architect → Associate Principal → Principal → Senior Principal, EMEA.',
    'story.punch': 'J’ai fait exactement ce que vous cherchez à faire. Je vous aide maintenant à raccourcir le délai.',
    'story.chartTitle': 'Trajectoire de carrière · périmètre & séniorité',
    'story.chartRange': '2012 → aujourd’hui',
    'story.tableCaption': 'Étapes de carrière',
    'story.thYear': 'Année', 'story.thRole': 'Poste', 'story.thOrg': 'Organisation',

    'method.eyebrow': 'La méthode',
    'method.lead': 'Quatre phases pour passer d’un CV étranger à une offre européenne signée. Pas du « coaching » vague — un système reproductible, mené avec vous, en tête-à-tête.',
    'method.v1t': 'Un CV qui passe le filtre', 'method.v1b': 'Reformaté aux normes européennes pour que les recruteurs le lisent — au lieu de l’écarter.',
    'method.v2t': 'Une carte du marché, pas un défilement d’offres', 'method.v2b': 'Les postes, entreprises et villes qui vous correspondent — et qui contacter.',
    'method.v3t': 'Les règles tacites, décodées', 'method.v3b': 'Visas, langue, styles d’entretien et fourchettes de salaire — par quelqu’un qui les a vécus.',
    'method.v4t': 'Un réseau que vous pouvez emprunter', 'method.v4b': 'Une approche qui obtient des réponses, et des mises en relation qui comptent.',
    'method.v5t': 'Des offres que vous pouvez négocier', 'method.v5b': 'Abordez la discussion salariale avec un plan, pas un espoir.',
    'method.v6t': 'La preuve que ça marche — moi', 'method.v6b': 'Inde → France → leadership EMEA en moins de dix ans, systématisé pour vous.',
    'method.s1t': 'Positionner', 'method.s1b': 'Définir les postes, entreprises et villes qui correspondent — et reconstruire votre CV et LinkedIn pour que les recruteurs européens ne puissent vous ignorer.', 'method.s1o': 'Un profil prêt pour le marché',
    'method.s2t': 'Pénétrer', 'method.s2b': 'Atteindre le marché que les portails cachent : approche ciblée, mises en relation et un réseau que vous pouvez emprunter.', 'method.s2o': 'Des échanges avec de vrais décideurs',
    'method.s3t': 'Décrocher', 'method.s3b': 'Être prêt pour les entretiens à l’européenne — préparation structurée et simulations jusqu’à être affûté sous pression.', 'method.s3o': 'Des offres sur la table',
    'method.s4t': 'Négocier', 'method.s4b': 'Transformer une offre en la bonne offre : salaire, contrat, relocation et les leviers que la plupart oublient.', 'method.s4o': 'Le poste — à vos conditions',

    'services.eyebrow': 'Travailler avec moi',
    'services.h2': 'Trois façons de commencer. Un appel gratuit pour démarrer.',
    'services.lead': 'Choisissez le niveau d’accompagnement adapté à votre situation. Chaque parcours commence par un appel découverte gratuit — sans pression, sans argumentaire.',
    'services.note': 'Tarifs en euros. Vous hésitez ? <a href="#booking" style="color:var(--cyan)">Commencez par l’appel découverte gratuit</a> et nous déciderons ensemble.',

    'readiness.eyebrow': 'Mesurez-le',
    'readiness.h2': 'Êtes-vous prêt à vous lancer ?',
    'readiness.lead': 'Déplacez les cinq curseurs selon votre réalité. Votre score de préparation se met à jour instantanément — et révèle la première lacune à combler.',

    'proof.eyebrow': 'En chiffres', 'proof.h2': 'Un parcours auquel se fier.',
    'proof.ph': 'Espace réservé', 'proof.client': 'Nom du client',
    'proof.tc1q': '« Ajoutez ici un vrai témoignage client — la transformation, dans ses mots. »', 'proof.tc1r': 'Poste · arrivé(e) à <ville>',
    'proof.tc2q': '« Un deuxième témoignage — idéalement en nommant le résultat et le délai. »', 'proof.tc2r': 'Poste · venu(e) de <pays>',
    'proof.tc3q': '« Un troisième — court, précis et crédible vaut mieux que long et générique. »', 'proof.tc3r': 'Poste · <secteur>',
    'proof.emeaEyebrow': 'Rayonnement EMEA', 'proof.emeaH3': 'Depuis Paris, à travers la région.',
    'proof.emeaP': 'Une décennie d’engagements couvrant l’Europe, le Moyen-Orient et l’Afrique donne le sens de la façon dont le recrutement fonctionne réellement, marché par marché — pas seulement dans une ville.',

    'faq.eyebrow': 'Réponses directes', 'faq.h2': 'Les questions que les profils internationaux posent vraiment.',

    'booking.eyebrow': 'On commence ?', 'booking.h2': 'Réservez votre appel découverte gratuit.',
    'booking.lead': 'Une conversation gratuite de 30 minutes. On fait le point sur votre situation et on décide — honnêtement — si et comment je peux vous aider. On y va ?',
    'booking.barT': 'Appel découverte avec Debanjan', 'booking.barS': 'Gratuit · 30 minutes · en visio',
    'booking.note': 'La réservation en ligne s’activera dès que votre lien Microsoft Bookings sera ajouté.<br><br>Ouvrez <code>src/config.js</code> et remplacez <code>REPLACE_ME</code> dans <code>BOOKINGS_URL</code> par le lien de votre page Bookings.',
    'booking.fallbackPrompt': 'En attendant :',
    'booking.fallbackOpen': 'Préférez un nouvel onglet — ou l’intégration ne charge pas ?',
    'booking.emailBtn': 'M’écrire pour réserver →', 'booking.openBtn': 'Ouvrir la page de réservation ↗',

    'footer.tagline': 'Coaching de carrière personnalisé pour les profils internationaux qui construisent leur avenir en France & en Europe.',
    'footer.cta': 'Réserver un appel gratuit', 'footer.navHead': 'Naviguer', 'footer.connectHead': 'Contact',
    'footer.readiness': 'Test de préparation', 'footer.email': 'Par e-mail', 'footer.cv': 'Voir mon CV (PDF)',
    'footer.legal': 'Debanjan Patra · Pratique de coaching indépendante — opinions et services personnels, sans lien avec mon employeur. Coaching de carrière, pas de conseil juridique ou d’immigration.',

    'common.bookCta': 'Réserver un appel →',
  },
};

// --- Scorecard copy (structured) ---
const SC = {
  en: {
    axes: [
      { key: 'clarity', label: 'Target role & country clarity' },
      { key: 'cv', label: 'European-format CV ready' },
      { key: 'language', label: 'Language comfort for your market' },
      { key: 'network', label: 'Network in your target market' },
      { key: 'visa', label: 'Visa / work-permit path understood' },
    ],
    bands: [
      { min: 0, headline: 'Early days — and that’s fine.' },
      { min: 40, headline: 'You’re on your way.' },
      { min: 66, headline: 'You’re close. Let’s sharpen it.' },
      { min: 86, headline: 'You’re launch-ready.' },
    ],
    gaps: {
      clarity: 'Your biggest gap is clarity — we start by mapping exactly which roles, companies and cities fit you.',
      cv: 'Your biggest gap is your CV — we rebuild it to European norms so recruiters actually read it.',
      language: 'Your biggest gap is language confidence — we target English-friendly roles and build a realistic plan.',
      network: 'Your biggest gap is your network — exactly what we activate in the outreach phase.',
      visa: 'Your biggest gap is the visa path — we position you for routes like the Passeport Talent or EU Blue Card.',
    },
    scoreSuffix: '% launch-ready',
    cta: 'Turn this score into a plan →',
  },
  fr: {
    axes: [
      { key: 'clarity', label: 'Clarté du poste & du pays cibles' },
      { key: 'cv', label: 'CV au format européen prêt' },
      { key: 'language', label: 'Aisance linguistique pour votre marché' },
      { key: 'network', label: 'Réseau sur votre marché cible' },
      { key: 'visa', label: 'Voie de visa / permis comprise' },
    ],
    bands: [
      { min: 0, headline: 'Les débuts — et c’est normal.' },
      { min: 40, headline: 'Vous êtes en bonne voie.' },
      { min: 66, headline: 'Vous y êtes presque. Affinons.' },
      { min: 86, headline: 'Vous êtes prêt à vous lancer.' },
    ],
    gaps: {
      clarity: 'Votre plus grande lacune, c’est la clarté — on commence par cartographier précisément les postes, entreprises et villes qui vous correspondent.',
      cv: 'Votre plus grande lacune, c’est votre CV — on le reconstruit aux normes européennes pour que les recruteurs le lisent vraiment.',
      language: 'Votre plus grande lacune, c’est l’aisance linguistique — on cible les postes ouverts en anglais et on bâtit un plan réaliste.',
      network: 'Votre plus grande lacune, c’est votre réseau — précisément ce qu’on active dans la phase d’approche.',
      visa: 'Votre plus grande lacune, c’est la voie de visa — on vous positionne pour le Passeport Talent ou la Carte bleue européenne.',
    },
    scoreSuffix: '% prêt',
    cta: 'Transformez ce score en plan →',
  },
};

let lang = detectLang();

function detectLang() {
  try {
    const u = new URLSearchParams(location.search).get('lang');
    if (u && S[u]) return u;
    const ls = localStorage.getItem('cle-lang');
    if (ls && S[ls]) return ls;
  } catch (e) { /* ignore */ }
  const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
  return S[nav] ? nav : 'en';
}

export const getLang = () => lang;
export const t = (key) => (S[lang] && S[lang][key]) ?? S.en[key] ?? '';
export const tScorecard = () => SC[lang] || SC.en;

export function applyStatic(root = document) {
  root.querySelectorAll('[data-i18n]').forEach((el) => { const v = t(el.getAttribute('data-i18n')); if (v) el.textContent = v; });
  root.querySelectorAll('[data-i18n-html]').forEach((el) => { const v = t(el.getAttribute('data-i18n-html')); if (v) el.innerHTML = v; });
}

export function setLang(l) {
  if (!S[l] || l === lang) { syncToggle(); return; }
  lang = l;
  try { localStorage.setItem('cle-lang', l); } catch (e) { /* ignore */ }
  document.documentElement.lang = l;
  applyStatic();
  syncToggle();
  document.dispatchEvent(new CustomEvent('i18n:change', { detail: { lang: l } }));
}

function syncToggle() {
  document.querySelectorAll('[data-lang-btn]').forEach((b) => {
    b.setAttribute('aria-pressed', String(b.getAttribute('data-lang-btn') === lang));
  });
}

// Apply the detected language on first load (before components render).
export function initI18n() {
  document.documentElement.lang = lang;
  applyStatic();
  syncToggle();
}
