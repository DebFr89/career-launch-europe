// Career trajectory — drives the animated TrajectoryChart in #story.
// `level` (0–100) = scope/seniority on the y-axis; `year` = x-axis.
// `leap: true` marks the India→France pivot; `highlight: true` marks the current role.
// `titleFr` localises the screen-reader data table; chart node labels are proper nouns.

export const YEAR_MIN = 2012;
export const YEAR_MAX = 2026;

export const MILESTONES = [
  { year: 2012, level: 12, title: 'B.Tech, Chemical Engineering', titleFr: 'B.Tech, génie chimique', org: 'NIT Warangal', place: 'India' },
  { year: 2013, level: 22, title: 'Graduate Trainee → Project Coordinator', titleFr: 'Graduate Trainee → Coordinateur de projet', org: 'PepsiCo', place: 'India' },
  { year: 2014, level: 34, title: 'Manufacturing Supervisor', titleFr: 'Superviseur de production', org: 'PepsiCo', place: 'India',
    note: 'Beverage line serving 34% of PepsiCo India' },
  { year: 2016, level: 45, title: 'Assistant Manager, Operations', titleFr: 'Assistant Manager, Opérations', org: 'PepsiCo', place: 'India' },
  { year: 2018, level: 55, title: 'International MBA', titleFr: 'MBA International', org: 'NEOMA Business School', place: 'Reims, France',
    leap: true, note: 'The leap: India → France (+ Saint-Cyr, Politecnico di Milano)' },
  { year: 2018.6, level: 60, title: 'Strategy Consultant', titleFr: 'Consultant en stratégie', org: 'Prise de Mousse', place: 'Reims, France' },
  { year: 2019, level: 68, title: 'Solutions Architect', titleFr: 'Solutions Architect', org: 'Aera Technology', place: 'Paris, France' },
  { year: 2021, level: 78, title: 'Associate Principal, Client Engagements EMEA', titleFr: 'Associate Principal, Client Engagements EMEA', org: 'Aera Technology', place: 'Paris' },
  { year: 2022, level: 88, title: 'Principal, Client Engagements EMEA', titleFr: 'Principal, Client Engagements EMEA', org: 'Aera Technology', place: 'Paris' },
  { year: 2024.8, level: 100, title: 'Senior Principal, Client Engagements EMEA', titleFr: 'Senior Principal, Client Engagements EMEA', org: 'Aera Technology', place: 'Paris',
    highlight: true, note: 'Today — leading decision-intelligence engagements across EMEA' },
];
